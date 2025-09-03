import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const CONFIG = {
  // Particle system
  PARTICLE_COUNT: 7000, // Total number of particles
  PARTICLE_DENSITY: 1, // Controls how densely particles are distributed (0.1 to 2.0)
  MODEL_SCALE: 2,
  MODEL_TYPE: 'custom', // 'sphere', 'torus', or 'custom'
  CUSTOM_MODEL_PATH: '/octocatfinal.glb', // Path to your custom model
  
  // Rotation settings
  ROTATION: {
    ENABLED: true,
    SPEED: 0.5, // Rotation speed (adjust this to change how fast it spins)
    AXIS: 'y', // 'x', 'y', 'z', or 'all'
    OSCILLATE: false, // If true, rotation will oscillate back and forth
    OSCILLATION_SPEED: 1.0, // Speed of oscillation
    OSCILLATION_AMPLITUDE: 0.5 // How far it oscillates
  },
  
  // Particle appearance
  PARTICLE_SIZE: 0.04,
  COLORS: {
    MAX_DISTANCE: "#ffffff", // White
    MEDIUM: "#00ffff",      // Cyan
    CLOSE: "#ffff00",       // Yellow
    NORMAL: "#808080"       // Gray
  },
  
  // Interaction
  MOUSE_INFLUENCE_RADIUS: 0.5,
  PUSH_STRENGTH: 0.2,
  SPRING_STRENGTH: 0.05,
  MAX_DISPLACEMENT: 1,
  RETURN_SPEED: 0.1,
  
  // Wave effect
  WAVE_SPEED: 2,
  WAVE_AMPLITUDE: 0.1,
  WAVE_FREQUENCY: 2
};

function InteractiveParticles() {
  const points = useRef();
  const group = useRef(); // Add ref for the group
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const originalPositions = useRef(null);
  const velocities = useRef(null);
  const isReturning = useRef(new Array(CONFIG.PARTICLE_COUNT).fill(false));
  const returnStartTime = useRef(new Array(CONFIG.PARTICLE_COUNT).fill(0));
  const lastPushTime = useRef(new Array(CONFIG.PARTICLE_COUNT).fill(0));
  const [error, setError] = useState(null);

  // Load the model with error handling
  const { scene } = useGLTF(CONFIG.CUSTOM_MODEL_PATH, undefined, 
    (error) => {
      console.error('Error loading model:', error);
      setError(error.message);
    }
  );

  // Apply initial rotation to make the model stand upright
  useEffect(() => {
    if (scene) {
      console.log('Model loaded, applying rotation');
      // Reset all rotations first
      scene.rotation.set(0, 0, 0);
      
      // Apply rotations in sequence
      scene.rotateX(-Math.PI / 2);
      scene.rotateY(Math.PI);
      
      // Log the final rotation
      console.log('Final rotation:', {
        x: scene.rotation.x,
        y: scene.rotation.y,
        z: scene.rotation.z
      });
    }
  }, [scene]);

  // Create particles from the model
  const particles = useMemo(() => {
    if (!scene) {
      console.log('No scene available yet');
      return new Float32Array();
    }

    const temp = [];
    let vertexCount = 0;
    let positions = null;
    let boundingBox = new THREE.Box3();

    try {
      // First pass: calculate bounding box
      scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry.computeBoundingBox();
          boundingBox.union(child.geometry.boundingBox);
        }
      });

      // Calculate model size and center
      const size = new THREE.Vector3();
      boundingBox.getSize(size);
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);

      console.log('Model dimensions:', {
        size: size,
        center: center
      });

      // Find the maximum dimension for scaling
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim; // Scale to fit in a 2x2x2 box

      // Second pass: collect vertices
      scene.traverse((child) => {
        if (child.isMesh) {
          const geometry = child.geometry;
          
          // Ensure geometry has position attribute
          if (!geometry.attributes.position) {
            console.error('No position attribute found in geometry');
            return;
          }

          const positionAttribute = geometry.getAttribute('position');
          const vertexCount = positionAttribute.count;
          
          // Create a temporary array for this mesh's vertices
          const meshPositions = new Float32Array(vertexCount * 3);
          
          // Copy and transform vertices
          for (let i = 0; i < vertexCount; i++) {
            const x = positionAttribute.getX(i);
            const y = positionAttribute.getY(i);
            const z = positionAttribute.getZ(i);
            
            // Center and scale the vertex
            const centeredX = (x - center.x) * scale * CONFIG.MODEL_SCALE;
            const centeredY = (y - center.y) * scale * CONFIG.MODEL_SCALE;
            const centeredZ = (z - center.z) * scale * CONFIG.MODEL_SCALE;
            
            // Apply rotation to vertices directly
            const rotatedX = centeredX;
            const rotatedY = -centeredZ; // Swap Y and Z and negate Z
            const rotatedZ = centeredY;
            
            meshPositions[i * 3] = rotatedX;
            meshPositions[i * 3 + 1] = rotatedY;
            meshPositions[i * 3 + 2] = rotatedZ;
          }
          
          // Add vertices to the main array
          temp.push(...meshPositions);
        }
      });

      console.log('Total vertices collected:', temp.length / 3);
      
      // Apply particle density
      const targetCount = Math.floor(CONFIG.PARTICLE_COUNT * CONFIG.PARTICLE_DENSITY);
      
      // If we have too many vertices, sample them
      if (temp.length / 3 > targetCount) {
        const sampledPositions = new Float32Array(targetCount * 3);
        const step = Math.floor(temp.length / 3 / targetCount);
        
        for (let i = 0; i < targetCount; i++) {
          const sourceIndex = i * step * 3;
          sampledPositions[i * 3] = temp[sourceIndex];
          sampledPositions[i * 3 + 1] = temp[sourceIndex + 1];
          sampledPositions[i * 3 + 2] = temp[sourceIndex + 2];
        }
        
        return sampledPositions;
      }

      return new Float32Array(temp);
    } catch (err) {
      console.error('Error creating particles:', err);
      setError(err.message);
      return new Float32Array();
    }
  }, [scene]);

  // Initialize velocities and store original positions
  useEffect(() => {
    if (points.current) {
      originalPositions.current = new Float32Array(points.current.geometry.attributes.position.array);
      velocities.current = new Float32Array(points.current.geometry.attributes.position.array.length).fill(0);
    }
  }, [particles]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Function to interpolate between two colors
  const interpolateColor = (color1, color2, factor) => {
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
    
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Function to get color based on displacement ratio
  const getColorForDisplacement = (displacementRatio) => {
    if (displacementRatio <= 0) return CONFIG.COLORS.NORMAL;
    if (displacementRatio >= 1) return CONFIG.COLORS.MAX_DISTANCE;
    
    if (displacementRatio < 0.33) {
      const factor = displacementRatio / 0.33;
      return interpolateColor(CONFIG.COLORS.NORMAL, CONFIG.COLORS.CLOSE, factor);
    } else if (displacementRatio < 0.66) {
      const factor = (displacementRatio - 0.33) / 0.33;
      return interpolateColor(CONFIG.COLORS.CLOSE, CONFIG.COLORS.MEDIUM, factor);
    } else {
      const factor = (displacementRatio - 0.66) / 0.34;
      return interpolateColor(CONFIG.COLORS.MEDIUM, CONFIG.COLORS.MAX_DISTANCE, factor);
    }
  };

  useFrame((state, delta) => {
    if (group.current && CONFIG.ROTATION.ENABLED) {
      if (CONFIG.ROTATION.OSCILLATE) {
        // Oscillating rotation
        const oscillation = Math.sin(state.clock.elapsedTime * CONFIG.ROTATION.OSCILLATION_SPEED) 
          * CONFIG.ROTATION.OSCILLATION_AMPLITUDE;
        
        if (CONFIG.ROTATION.AXIS === 'all') {
          group.current.rotation.x = oscillation;
          group.current.rotation.y = oscillation;
          group.current.rotation.z = oscillation;
        } else {
          group.current.rotation[CONFIG.ROTATION.AXIS] = oscillation;
        }
      } else {
        // Continuous rotation
        if (CONFIG.ROTATION.AXIS === 'all') {
          group.current.rotation.x += delta * CONFIG.ROTATION.SPEED;
          group.current.rotation.y += delta * CONFIG.ROTATION.SPEED;
          group.current.rotation.z += delta * CONFIG.ROTATION.SPEED;
        } else {
          group.current.rotation[CONFIG.ROTATION.AXIS] += delta * CONFIG.ROTATION.SPEED;
        }
      }
    }

    if (points.current && originalPositions.current && velocities.current) {
      const positions = points.current.geometry.attributes.position.array;
      const mouseX = mousePosition.x * 2;
      const mouseY = mousePosition.y * 2;
      const currentTime = state.clock.elapsedTime;
      const colors = new Float32Array(positions.length);

      // Update each particle's position
      for (let i = 0; i < positions.length; i += 3) {
        const particleIndex = i / 3;
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        const originalX = originalPositions.current[i];
        const originalY = originalPositions.current[i + 1];
        const originalZ = originalPositions.current[i + 2];
        
        // Calculate distance and direction from mouse (projected onto screen)
        const dx = x - mouseX;
        const dy = y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate current displacement from original position
        const currentDisplacement = Math.sqrt(
          Math.pow(x - originalX, 2) + 
          Math.pow(y - originalY, 2) +
          Math.pow(z - originalZ, 2)
        );
        
        // Calculate displacement ratio (0 to 1)
        const displacementRatio = Math.min(currentDisplacement / CONFIG.MAX_DISPLACEMENT, 1);
        
        // Get color based on displacement ratio
        const color = getColorForDisplacement(displacementRatio);
        const [r, g, b] = color.match(/\w\w/g).map(c => parseInt(c, 16) / 255);
        colors[i] = r;
        colors[i + 1] = g;
        colors[i + 2] = b;
        
        // Create wave effect
        const wave = Math.sin(state.clock.elapsedTime * CONFIG.WAVE_SPEED + distance * CONFIG.WAVE_FREQUENCY) * CONFIG.WAVE_AMPLITUDE;
        
        // Apply push force when mouse is close
        if (distance < CONFIG.MOUSE_INFLUENCE_RADIUS) {
          const force = (1 - distance / CONFIG.MOUSE_INFLUENCE_RADIUS) * CONFIG.PUSH_STRENGTH;
          velocities.current[i] += dx * force;
          velocities.current[i + 1] += dy * force;
          velocities.current[i + 2] += wave * force;
          lastPushTime.current[particleIndex] = currentTime;
          isReturning.current[particleIndex] = false;
        }

        // Start returning if enough time has passed since last push
        if (!isReturning.current[particleIndex] && 
            currentTime - lastPushTime.current[particleIndex] > 0.1) {
          isReturning.current[particleIndex] = true;
          returnStartTime.current[particleIndex] = currentTime;
        }

        // Handle return to original position
        if (isReturning.current[particleIndex]) {
          const timeSinceReturnStart = currentTime - returnStartTime.current[particleIndex];
          const returnProgress = Math.min(timeSinceReturnStart * CONFIG.RETURN_SPEED, 1);
          
          // Smooth return to original position
          positions[i] = x + (originalX - x) * returnProgress;
          positions[i + 1] = y + (originalY - y) * returnProgress;
          positions[i + 2] = z + (originalZ - z) * returnProgress;
          
          // Reset velocity when returning
          velocities.current[i] *= 0.9;
          velocities.current[i + 1] *= 0.9;
          velocities.current[i + 2] *= 0.9;
        } else {
          // Normal physics when not returning
          velocities.current[i] *= 0.95;
          velocities.current[i + 1] *= 0.95;
          velocities.current[i + 2] *= 0.95;
          positions[i] += velocities.current[i];
          positions[i + 1] += velocities.current[i + 1];
          positions[i + 2] += velocities.current[i + 2];
        }

        // Limit maximum displacement from original position
        if (currentDisplacement > CONFIG.MAX_DISPLACEMENT) {
          const scale = CONFIG.MAX_DISPLACEMENT / currentDisplacement;
          positions[i] = originalX + (positions[i] - originalX) * scale;
          positions[i + 1] = originalY + (positions[i + 1] - originalY) * scale;
          positions[i + 2] = originalZ + (positions[i + 2] - originalZ) * scale;
          velocities.current[i] *= 0.5;
          velocities.current[i + 1] *= 0.5;
          velocities.current[i + 2] *= 0.5;
        }
      }

      // Update the geometry
      points.current.geometry.attributes.position.needsUpdate = true;
      points.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  });

  return (
    <group ref={group}>
      {error && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="red" />
        </mesh>
      )}
      <Points
        ref={points}
        positions={particles}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          vertexColors
          size={CONFIG.PARTICLE_SIZE}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function ParticleLoader() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 0
    }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <InteractiveParticles />
      </Canvas>
    </div>
  );
} 