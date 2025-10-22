import React from 'react';
import { motion } from 'framer-motion';
import './AssessmentsSection.css';

const AssessmentsSection = ({ lang = 'en' }) => {

  // Localization strings
  const strings = {
    en: {
      title: 'Assessments & Certifications',
      intro: 'Validated cognitive and personality assessments that support my profile and work style.',
      softSkillsHeading: 'Soft skills snapshot',
      logicTest: {
        title: 'Logic Test — Alva Labs',
        summary: 'Above average logical ability — 93rd–98th percentile.',
        highlights: [
          'Efficient at processing complex information',
          'Strong problem-solving under pressure',
          'Top 5% percentile performance'
        ]
      },
      personalityTest: {
        title: 'Personality Profile — Alva Labs',
        summary: 'Balanced Big Five profile — resilient, diligent, curious.',
        highlights: [
          'Determined and goal-oriented',
          'Calm under pressure and resilient',
          'Curious and intellectually engaged'
        ]
      },
      buttons: {
        viewReport: 'View full report (PDF)',
        download: 'Download'
      },
      footer: 'Reports provided by Alva Labs — view full reports for methodology and full results.',
      validation: 'Professional assessments validating my skills and capabilities'
    },
    gr: {
      title: 'Αξιολογήσεις και Πιστοποιήσεις',
      intro: 'Ελεγχόμενες γνωστικές και προσωπικότητας αξιολογήσεις που ενισχύουν το προφίλ μου και τον τρόπο εργασίας μου.',
      softSkillsHeading: 'Σύντομη παρουσίαση δεξιοτήτων',
      logicTest: {
        title: 'Λογική Δοκιμασία — Alva Labs',
        summary: 'Πάνω από τον μέσο όρο στην λογική σκέψη — 93η–98η εκατοστιαία θέση.',
        highlights: [
          'Αποτελεσματική επεξεργασία σύνθετων πληροφοριών',
          'Ισχυρή επίλυση προβλημάτων υπό πίεση',
          'Επίδοση στο κορυφαίο 5%'
        ]
      },
      personalityTest: {
        title: 'Προφίλ Προσωπικότητας — Alva Labs',
        summary: 'Ισορροπημένο προφίλ Big Five — ανθεκτικός, επιμελής, περίεργος.',
        highlights: [
          'Αποφασιστικός και στοχοπροσηλωμένος',
          'Ήρεμος υπό πίεση και ανθεκτικός',
          'Περίεργος και διανοητικά ενεργός'
        ]
      },
      buttons: {
        viewReport: 'Δείτε ολόκληρη την αναφορά (PDF)',
        download: 'Λήψη'
      },
      footer: 'Αναφορές από την Alva Labs — δείτε τις πλήρεις αναφορές για μεθοδολογία και πλήρη αποτελέσματα.',
      validation: 'Επαγγελματικές αξιολογήσεις που επιβεβαιώνουν τις δεξιότητές μου'
    }
  };

  const t = strings[lang] || strings.en;

  // Soft skills keywords
  const softSkills = lang === 'gr' 
    ? ['Ανθεκτικός', 'Στοχοπροσηλωμένος', 'Περίεργος', 'Λογικός']
    : ['Resilient', 'Goal-Oriented', 'Curious', 'Logical'];

  // Assessment data
  const assessments = [
    {
      id: 'logic',
      title: t.logicTest.title,
      summary: t.logicTest.summary,
      percentage: 95,
      highlights: t.logicTest.highlights,
      pdfPath: '/Alva Labs Logic Test Report - George Arampatzis.pdf',
      downloadFilename: 'Logic-Test-George-Arampatzis.pdf',
      badgeText: 'Top 5%'
    },
    {
      id: 'personality',
      title: t.personalityTest.title,
      summary: t.personalityTest.summary,
      percentage: 80,
      highlights: t.personalityTest.highlights,
      pdfPath: '/Alva Labs Personality Test Report - George Arampatzis.pdf',
      downloadFilename: 'Personality-Test-George-Arampatzis.pdf',
      badgeText: 'Balanced'
    }
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const handleDownload = (pdfPath, filename) => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const RadialProgress = ({ percentage, size = 120 }) => {
    const radius = (size - 16) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="radial-progress" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="bg-circle"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="progress-circle"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </svg>
        <div className="progress-text">{percentage}%</div>
      </div>
    );
  };

  return (
    <section id="assessments" className="assessments">
      <div className="assessments-content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            {t.title}
          </motion.h2>
          
          <motion.p className="section-intro" variants={itemVariants}>
            {t.intro}
          </motion.p>

          <div className="assessments-grid">
            {/* Left column - Soft skills and validation */}
            <motion.div className="left-column" variants={itemVariants}>
              <div className="soft-skills-card">
                <h3 className="soft-skills-title">{t.softSkillsHeading}</h3>
                <div className="soft-skills-tags">
                  {softSkills.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="soft-skill-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="validation-card">
                <h4 className="validation-title">Professional Validation</h4>
                <p className="validation-text">{t.validation}</p>
              </div>
            </motion.div>

            {/* Right column - Assessment cards */}
            <motion.div className="assessments-cards" variants={containerVariants}>
              {assessments.map((assessment, index) => (
                <motion.div
                  key={assessment.id}
                  className="assessment-card"
                  variants={itemVariants}
                >
                  <div className="assessment-header">
                    <div>
                      <h3 className="assessment-title">{assessment.title}</h3>
                      <p className="assessment-summary">{assessment.summary}</p>
                    </div>
                    <div className="assessment-badge">
                      <svg className="assessment-badge-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {assessment.badgeText}
                    </div>
                  </div>

                  <div className="progress-container">
                    <RadialProgress percentage={assessment.percentage} />
                  </div>

                  <div className="progress-bar-container">
                    <motion.div
                      className="progress-bar"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${assessment.percentage}%` }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    />
                  </div>

                  <div className="assessment-highlights">
                    <ul>
                      {assessment.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex}>{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="assessment-actions">
                    <a
                      href={assessment.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="assessment-button primary"
                    >
                      <svg className="assessment-button-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      {t.buttons.viewReport}
                    </a>
                    <button
                      onClick={() => handleDownload(assessment.pdfPath, assessment.downloadFilename)}
                      className="assessment-button secondary"
                    >
                      <svg className="assessment-button-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      {t.buttons.download}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div className="assessment-footer" variants={itemVariants}>
            <p>{t.footer}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AssessmentsSection;