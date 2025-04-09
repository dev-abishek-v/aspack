# ASPACK - Advanced Software Package Manager

ASPACK is a comprehensive utility library providing various tools for JavaScript development. It's designed as a monorepo where you can install the entire suite or individual packages as needed.

## Installation

### Install the entire suite:

```
npm install aspack
```

### Install individual packages:

```
npm install @aspack/json-utils
npm install @aspack/form-validator
```

## Usage

### Using the entire suite:

```javascript
const aspack = require('aspack');

// Use JSON utilities
const parsedData = aspack.jsonUtils.parse(jsonString);

// Use form validation
const isValid = aspack.formValidator.validate(formData, schema);
```

### Using individual packages:

```javascript
const jsonUtils = require('@aspack/json-utils');
const parsedData = jsonUtils.parse(jsonString);

// OR

const { validate } = require('@aspack/form-validator');
const isValid = validate(formData, schema);
```

## Available Packages

- **@aspack/json-utils**: Enhanced JSON parsing and manipulation utilities
- **@aspack/form-validator**: Form validation tools with schema support

## License

MIT
