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
    
    // Process p1 control
    if (controls.p1 === 'hush') {
      processed = replaceTag(processed, '<p1_Radio>', '_');
    } else {
      processed = replaceTag(processed, '<p1_Radio>', '');
    }
    
    return processed;
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