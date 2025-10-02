# AssessmentsSection Component

A professional React component for displaying assessments and certifications in a personal portfolio.

## Files Created

- `src/components/AssessmentsSection.js` - Main component with English/Greek localization
- `src/components/RadialProgress.js` - Animated radial progress indicator
- `src/components/ReportCard.js` - Individual assessment report card
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration

## PDF File Placement

Place your PDF files in one of these locations:

### Option 1: Public Directory (Recommended for production)
```
public/
  reports/
    Alva Labs Logic Test Report - George Arampatzis.pdf
    Alva Labs Personality Test Report - George Arampatzis.pdf
```

Then update the PDF paths in `AssessmentsSection.js`:
```javascript
pdfPath: '/reports/Alva Labs Logic Test Report - George Arampatzis.pdf'
pdfPath: '/reports/Alva Labs Personality Test Report - George Arampatzis.pdf'
```

### Option 2: Development Path (Current)
The component currently uses the provided paths:
```javascript
pdfPath: '/mnt/data/Alva Labs Logic Test Report - George Arampatzis.pdf'
pdfPath: '/mnt/data/Alva Labs Personality Test Report - George Arampatzis.pdf'
```

## Usage

```jsx
import AssessmentsSection from './components/AssessmentsSection';

// English version
<AssessmentsSection lang="en" />

// Greek version
<AssessmentsSection lang="gr" />
```

## Features

- ✅ Responsive two-column layout
- ✅ Animated radial progress indicators
- ✅ Hover effects and smooth transitions
- ✅ English/Greek localization
- ✅ Accessibility features (ARIA labels, keyboard navigation)
- ✅ PDF viewing and download functionality
- ✅ Soft skills snapshot display
- ✅ Professional design with Tailwind CSS

## Dependencies

- React 19.1.0+
- Framer Motion 12.18.1+
- Tailwind CSS 3.x
- React Icons 5.5.0+

## Accessibility Checklist

- ✅ Semantic HTML structure (section, article, h2, ul)
- ✅ ARIA labels for progress indicators and buttons
- ✅ Keyboard focus styles visible
- ✅ Screen reader friendly content structure
- ✅ Proper heading hierarchy
- ✅ Descriptive link text for PDF actions

## Customization

The component accepts a `lang` prop with values:
- `'en'` - English (default)
- `'gr'` - Greek

All text content is localized and can be easily modified in the `strings` object within the component.

