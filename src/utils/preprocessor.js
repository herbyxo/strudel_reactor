/**
 * Preprocessor utility functions
 * Pure functions for text processing - no React dependencies
 */

/**
 * Replace a single tag in the text based on control value
 * @param {string} text - The text to process
 * @param {string} tag - The tag to replace (e.g., '<p1_Radio>')
 * @param {string} replacement - What to replace it with
 * @returns {string} - Processed text
 */
 export function replaceTag(text, tag, replacement) {
    return text.replaceAll(tag, replacement);
  }
  
  /**
   * Process text based on control values
   * @param {string} text - Raw preprocessor text
   * @param {object} controls - Control values object
   * @returns {string} - Processed text ready for Strudel
   */
   export function processText(text, controls) {
    let processed = text;
    
    // Process P1 - silence the selected instrument
    if (controls.p1 === 'hush' && controls.p1_instrument) {
      processed = silenceInstrument(processed, controls.p1_instrument, 'P1');
    }
    
    // Process P2 - silence the selected instrument
    if (controls.p2 === 'hush' && controls.p2_instrument) {
      processed = silenceInstrument(processed, controls.p2_instrument, 'P2');
    }
    
    return processed;
  }
  
  /**
   * Silence an instrument by wrapping it in .silence()
   * This keeps the code valid but makes it silent
   */
  function silenceInstrument(text, instrumentName, controlName) {
    const lines = text.split('\n');
    const instrumentLabel = instrumentName + ':';
    
    for (let i = 0; i < lines.length; i++) {
      const trimmedLine = lines[i].trim();
      
      // Find the instrument label line
      if (trimmedLine.startsWith(instrumentLabel)) {
        // Mark it as muted
        if (lines[i].includes('// MUTED BY')) {
          // Already muted by another control
          lines[i] = lines[i].replace(/\/\/ MUTED BY (.+)/, `// MUTED BY $1 & ${controlName}`);
        } else {
          lines[i] = lines[i] + ` // MUTED BY ${controlName}`;
        }
        
        // Find the end of this instrument block
        let j = i + 1;
        let instrumentBlock = [];
        
        while (j < lines.length) {
          const nextLine = lines[j].trim();
          
          // Stop if we hit another instrument label or empty line followed by a label
          if (nextLine.endsWith(':') || (nextLine === '' && lines[j + 1]?.trim().endsWith(':'))) {
            break;
          }
          
          if (nextLine !== '') {
            instrumentBlock.push(j);
          }
          j++;
        }
        
        // Find the last line of actual code (not comments)
        let lastCodeLine = -1;
        for (let k = instrumentBlock.length - 1; k >= 0; k--) {
          const lineIdx = instrumentBlock[k];
          if (!lines[lineIdx].trim().startsWith('//')) {
            lastCodeLine = lineIdx;
            break;
          }
        }
        
        // Add .silence() to the last line of code
        if (lastCodeLine >= 0) {
          const line = lines[lastCodeLine];
          
          // Check if line already has .silence()
          if (!line.includes('.silence()')) {
            // Remove trailing comma if exists, add .silence()
            lines[lastCodeLine] = line.replace(/,?\s*$/, '') + '.silence()';
          }
        }
        
        break;
      }
    }
    
    return lines.join('\n');
  }
  
  /**
   * Validate preprocessor text for common issues
   * @param {string} text - Text to validate
   * @returns {object} - { valid: boolean, errors: string[] }
   */
  export function validatePreprocessorText(text) {
    const errors = [];
    
    // Check for unclosed tags (basic check)
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
  
  /**
   * Extract all preprocessor tags from text
   * @param {string} text - Text to analyze
   * @returns {string[]} - Array of unique tags found
   */
  export function extractTags(text) {
    const tagPattern = /<[^>]+>/g;
    const matches = text.match(tagPattern) || [];
    return [...new Set(matches)]; // Remove duplicates
  }