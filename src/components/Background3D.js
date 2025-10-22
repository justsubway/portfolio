import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Background3D = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create multiple particle systems for more complexity
    const createParticleSystem = (count, color, size, spread) => {
      const geometry = new THREE.BufferGeometry();
      const posArray = new Float32Array(count * 3);
      const colorArray = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        posArray[i3] = (Math.random() - 0.5) * spread;
        posArray[i3 + 1] = (Math.random() - 0.5) * spread;
        posArray[i3 + 2] = (Math.random() - 0.5) * spread;

        // Color variation
        const colorVariation = 0.3;
        colorArray[i3] = color.r + (Math.random() - 0.5) * colorVariation;
        colorArray[i3 + 1] = color.g + (Math.random() - 0.5) * colorVariation;
        colorArray[i3 + 2] = color.b + (Math.random() - 0.5) * colorVariation;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

      const material = new THREE.PointsMaterial({
        size: size,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      return new THREE.Points(geometry, material);
    };

    // Create different particle systems
    const mainParticles = createParticleSystem(2000, new THREE.Color(0x00B8D9), 0.02, 12);
    const accentParticles = createParticleSystem(1000, new THREE.Color(0x7C5CFF), 0.015, 8);
    const backgroundParticles = createParticleSystem(500, new THREE.Color(0x4A90E2), 0.01, 20);

    scene.add(mainParticles);
    scene.add(accentParticles);
    scene.add(backgroundParticles);

    particlesRef.current = { mainParticles, accentParticles, backgroundParticles };

    // Different rotation speeds for each particle system
    gsap.to(mainParticles.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 25,
      repeat: -1,
      ease: 'none',
    });

    gsap.to(accentParticles.rotation, {
      x: -Math.PI * 2,
      y: Math.PI * 2,
      duration: 30,
      repeat: -1,
      ease: 'none',
    });

    gsap.to(backgroundParticles.rotation, {
      x: Math.PI * 2,
      y: -Math.PI * 2,
      duration: 40,
      repeat: -1,
      ease: 'none',
    });

    // Enhanced mouse movement effect
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Different responsiveness for each particle system
      gsap.to(mainParticles.rotation, {
        x: mouseY * 0.3,
        y: mouseX * 0.3,
        duration: 1.5,
      });

      gsap.to(accentParticles.rotation, {
        x: -mouseY * 0.2,
        y: mouseX * 0.4,
        duration: 2,
      });

      gsap.to(backgroundParticles.rotation, {
        x: mouseY * 0.1,
        y: -mouseX * 0.2,
        duration: 2.5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Enhanced scroll effect
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;
        mainParticles.rotation.x = progress * Math.PI * 0.5;
        mainParticles.rotation.y = progress * Math.PI * 0.5;
        
        accentParticles.rotation.x = -progress * Math.PI * 0.3;
        accentParticles.rotation.y = progress * Math.PI * 0.7;
        
        backgroundParticles.rotation.x = progress * Math.PI * 0.2;
        backgroundParticles.rotation.y = -progress * Math.PI * 0.4;
      },
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Clean up all particle systems
      scene.remove(mainParticles);
      scene.remove(accentParticles);
      scene.remove(backgroundParticles);
      
      mainParticles.geometry.dispose();
      mainParticles.material.dispose();
      accentParticles.geometry.dispose();
      accentParticles.material.dispose();
      backgroundParticles.geometry.dispose();
      backgroundParticles.material.dispose();
      
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Background3D; 