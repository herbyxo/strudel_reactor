/**
 * Preprocessor utility functions
 */

 export function replaceTag(text, tag, replacement) {
  return text.replaceAll(tag, replacement);
}

export function adjustReverbValues(text, reverb) {
  // Map slider 0–100 to a factor.
  // Here: 50% ≈ original, <50 = drier, >50 = wetter.
  const reverbFactor = reverb / 50; // tweak if you like

  // This will catch:
  // - room(0.6)
  // - room(0.3)
  // - room(sine.range(0.1,0.4))
  // and wrap the inner expression in (* factor)
  return text.replace(/room\(([^)]+)\)/g, (match, inner) => {
    return `room((${inner})*${reverbFactor.toFixed(3)})`;
  });
}


export function adjustGainValues(text, volume) {
  // Map slider 0–100 to a 0–1 factor
  const volumeFactor = volume / 100;

  let output = text;

  
  output = output.replace(/(?<!post)gain\(([\d.]+)\)/g, (match, baseGain) => {
    const base = parseFloat(baseGain);
    if (isNaN(base)) return match;
    const newGain = base * volumeFactor;
    return `gain(${newGain.toFixed(3)})`;
  });

  
  output = output.replace(/postgain\(([\d.]+)\)/g, (match, baseGain) => {
    const base = parseFloat(baseGain);
    if (isNaN(base)) return match;
    const newGain = base * volumeFactor;
    return `postgain(${newGain.toFixed(3)})`;
  });

  return output;
}


      export function processText(text, controls, tempo = 140, volume = 80, reverb = 40) {
        
        let processed = text;
  

  // Process tempo tag
  processed = replaceTag(processed, '<tempo>', tempo.toString());
  
  // Process each control and add comments
  const controlInfo = [
    { name: 'p1', tag: '<p1_Radio>', label: 'Bass Line' },
    { name: 'p2', tag: '<p2_Radio>', label: 'Arpeggio' },
    { name: 'p3', tag: '<p3_Radio>', label: 'Kick Drum' },
    { name: 'p4', tag: '<p4_Radio>', label: 'Shaker' },
    { name: 'p5', tag: '<p5_Radio>', label: 'Hi-Hats (Closed)' },
  ];
  
  // Comments for what is muted
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

  processed = adjustGainValues(processed, volume);

  processed = adjustReverbValues(processed, reverb);
  
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