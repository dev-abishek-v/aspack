/**
 * Enhanced JSON utilities
 * @module json-utils
 */

/**
 * Safely parses JSON string with error handling
 * @param {string} jsonString - JSON string to parse
 * @param {*} [defaultValue=null] - Default value to return if parsing fails
 * @returns {*} Parsed object or default value on error
 */
function parse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return defaultValue;
  }
}

/**
 * Safely stringifies a value with error handling
 * @param {*} value - Value to stringify
 * @param {number} [indent=0] - Number of spaces for indentation
 * @param {string} [defaultValue=''] - Default value to return if stringification fails
 * @returns {string} JSON string or default value on error
 */
function stringify(value, indent = 0, defaultValue = '') {
  try {
    return JSON.stringify(value, null, indent);
  } catch (error) {
    return defaultValue;
  }
}

/**
 * Gets a value from an object using a dot-notation path
 * @param {object} obj - Object to traverse
 * @param {string} path - Dot-notation path (e.g., 'user.profile.name')
 * @param {*} [defaultValue=undefined] - Default value if path doesn't exist
 * @returns {*} Value at path or default value
 */
function getPath(obj, path, defaultValue = undefined) {
  if (!obj || typeof obj !== 'object' || !path) {
    return defaultValue;
  }
  
  const parts = path.split('.');
  let current = obj;
  
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return defaultValue;
    }
    current = current[part];
  }
  
  return current !== undefined ? current : defaultValue;
}

// Export functions
module.exports = {
  parse,
  stringify,
  getPath,
};
