/**
 * Preprocessor utility functions
 */

 export function replaceTag(text, tag, replacement) {
  return text.replaceAll(tag, replacement);
}

export function processText(text, controls) {
  let processed = text;
  
  // Process each control and add comments
  const controlInfo = [
    { name: 'p1', tag: '<p1_Radio>', label: 'Bass Line' },
    { name: 'p2', tag: '<p2_Radio>', label: 'Arpeggio' },
    { name: 'p3', tag: '<p3_Radio>', label: 'Kick Drum' },
    { name: 'p4', tag: '<p4_Radio>', label: 'Shaker' },
    { name: 'p5', tag: '<p5_Radio>', label: 'Hi-Hats (Closed)' },
   
  ];
  
  controlInfo.forEach(control => {
    if (controls[control.name] === 'hush') {
      // Replace tag with underscore and add comment
      processed = addMuteComment(processed, control.tag, control.label);
      processed = replaceTag(processed, control.tag, '_');
    } else {
      // Just remove the tag
      processed = replaceTag(processed, control.tag, '');
    }
  });
  
  return processed;
}

/**
 * Add a comment at the end of lines containing the tag
 */
function addMuteComment(text, tag, instrumentName) {
  const lines = text.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    // If line contains the tag and doesn't already have a MUTED comment
    if (lines[i].includes(tag) && !lines[i].includes('// MUTED:')) {
      // Add comment at the end of the line
      lines[i] = lines[i].trimEnd() + ` // MUTED: ${instrumentName}`;
    }
  }
  
  return lines.join('\n');
}

export function validatePreprocessorText(text) {
  const errors = [];
  
  const openTags = (text.match(/</g) || []).length;
  const closeTags = (text.match(/>/g) || []).length;
  
  if (openTags !== closeTags) {
    errors.push('Mismatched angle brackets detected');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function extractTags(text) {
  const tagPattern = /<[^>]+>/g;
  const matches = text.match(tagPattern) || [];
  return [...new Set(matches)];
}