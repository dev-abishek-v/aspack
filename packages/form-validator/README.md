# @aspack/form-validator

Form validation tools with schema support.

## Installation

```
npm install @aspack/form-validator
```

## Usage

```javascript
const { validate, TYPES } = require('@aspack/form-validator');

// Define a validation schema
const userSchema = {
  username: {
    required: true,
    type: TYPES.STRING,
    minLength: 3,
    maxLength: 20
  },
  email: {
    required: true,
    type: TYPES.EMAIL
  },
  age: {
    type: TYPES.NUMBER,
    min: 18
  }
};

// Validate a form
const formData = {
  username: 'john_doe',
  email: 'john.doe@example.com',
  age: 25
};

const result = validate(formData, userSchema);

console.log(result.isValid); // true

// Example with validation errors
const invalidForm = {
  username: 'j',
  email: 'not-an-email',
  age: 16
};

const invalidResult = validate(invalidForm, userSchema);

console.log(invalidResult.isValid); // false
console.log(invalidResult.errorMap);
// {
//   username: ['Minimum length is 3'],
//   email: ['Invalid format'],
//   age: ['Minimum value is 18']
// }
```

## License

MIT
