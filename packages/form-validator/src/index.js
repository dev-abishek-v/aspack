/**
 * Form validation tools
 * @module form-validator
 */

// Validation types
const TYPES = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  ARRAY: 'array',
  EMAIL: 'email',
  URL: 'url'
};

// Validation rule functions
const RULES = {
  // Type checks
  required: (value) => value !== undefined && value !== null && value !== '',
  type: (value, type) => {
    if (value === undefined || value === null) return true;
    
    switch (type) {
      case TYPES.STRING:
        return typeof value === 'string';
      case TYPES.NUMBER:
        return typeof value === 'number' && !isNaN(value);
      case TYPES.BOOLEAN:
        return typeof value === 'boolean';
      case TYPES.OBJECT:
        return typeof value === 'object' && !Array.isArray(value) && value !== null;
      case TYPES.ARRAY:
        return Array.isArray(value);
      case TYPES.EMAIL:
        return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case TYPES.URL:
        try {
          new URL(value);
          return true;
        } catch (e) {
          return false;
        }
      default:
        return false;
    }
  },
  
  // String rules
  minLength: (value, min) => {
    if (value === undefined || value === null) return true;
    return String(value).length >= min;
  },
  maxLength: (value, max) => {
    if (value === undefined || value === null) return true;
    return String(value).length <= max;
  },
  pattern: (value, pattern) => {
    if (value === undefined || value === null || value === '') return true;
    return new RegExp(pattern).test(value);
  },
  
  // Number rules
  min: (value, min) => {
    if (value === undefined || value === null) return true;
    return Number(value) >= min;
  },
  max: (value, max) => {
    if (value === undefined || value === null) return true;
    return Number(value) <= max;
  }
};

/**
 * Validates a form value against a schema
 * @param {*} value - Value to validate
 * @param {object} schema - Validation schema
 * @returns {object} Validation result with isValid and errors
 */
function validateField(value, schema) {
  const errors = [];
  
  // Check each rule in the schema
  Object.entries(schema).forEach(([rule, ruleValue]) => {
    if (rule in RULES) {
      const isValid = RULES[rule](value, ruleValue);
      if (!isValid) {
        let message = `Failed ${rule} validation`;
        
        // Create more specific error messages
        if (rule === 'type') {
          message = `Expected ${ruleValue}, got ${typeof value}`;
        } else if (rule === 'minLength') {
          message = `Minimum length is ${ruleValue}`;
        } else if (rule === 'maxLength') {
          message = `Maximum length is ${ruleValue}`;
        } else if (rule === 'required') {
          message = 'This field is required';
        } else if (rule === 'min') {
          message = `Minimum value is ${ruleValue}`;
        } else if (rule === 'max') {
          message = `Maximum value is ${ruleValue}`;
        } else if (rule === 'pattern') {
          message = 'Invalid format';
        }
        
        errors.push({ rule, message });
      }
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates an entire form against a schema
 * @param {object} formData - Form data to validate
 * @param {object} schema - Validation schema
 * @returns {object} Validation result with isValid, errors and errorMap
 */
function validate(formData, schema) {
  const results = {};
  let isValid = true;
  
  // Validate each field in the schema
  Object.entries(schema).forEach(([field, fieldSchema]) => {
    const value = formData[field];
    const result = validateField(value, fieldSchema);
    
    if (!result.isValid) {
      isValid = false;
    }
    
    results[field] = result;
  });
  
  return {
    isValid,
    results,
    // For convenience, extract just error messages by field
    errorMap: Object.entries(results).reduce((acc, [field, result]) => {
      if (result.errors.length > 0) {
        acc[field] = result.errors.map(err => err.message);
      }
      return acc;
    }, {})
  };
}

// Export functions and constants
module.exports = {
  validate,
  validateField,
  TYPES,
  RULES
};
