/**
 * Preprocessor utility functions
 */

 export function replaceTag(text, tag, replacement) {
  return text.replaceAll(tag, replacement);
}

export function processText(text, controls) {
  let processed = text;
  
  // Process p1 control (Bass)
  if (controls.p1 === 'hush') {
    processed = replaceTag(processed, '<p1_Radio>', '_');
  } else {
    processed = replaceTag(processed, '<p1_Radio>', '');
  }
  
  // Process p2 control (Arp)
  if (controls.p2 === 'hush') {
    processed = replaceTag(processed, '<p2_Radio>', '_');
  } else {
    processed = replaceTag(processed, '<p2_Radio>', '');
  }
  
  // Process p3 control (Kick)
  if (controls.p3 === 'hush') {
    processed = replaceTag(processed, '<p3_Radio>', '_');
  } else {
    processed = replaceTag(processed, '<p3_Radio>', '');
  }
  
  // Process p4 control (Shaker)
  if (controls.p4 === 'hush') {
    processed = replaceTag(processed, '<p4_Radio>', '_');
  } else {
    processed = replaceTag(processed, '<p4_Radio>', '');
  }
  
  // Process p5 control (Hi-Hats)
  if (controls.p5 === 'hush') {
    processed = replaceTag(processed, '<p5_Radio>', '_');
  } else {
    processed = replaceTag(processed, '<p5_Radio>', '');
  }
  
  return processed;
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