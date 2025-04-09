# @aspack/json-utils

Enhanced JSON utilities for parsing, validation, and transformation.

## Installation

```
npm install @aspack/json-utils
```

## Usage

```javascript
const jsonUtils = require('@aspack/json-utils');

// Safe JSON parsing with fallback
const data = jsonUtils.parse('{"name": "John"}'); // {name: 'John'}
const invalidData = jsonUtils.parse('invalid json', {}); // {}

// Get nested properties with path notation
const user = {
  profile: {
    name: 'John',
    details: {
      age: 30
    }
  }
};

const name = jsonUtils.getPath(user, 'profile.name'); // 'John'
const age = jsonUtils.getPath(user, 'profile.details.age'); // 30
const missing = jsonUtils.getPath(user, 'profile.missing', 'Not found'); // 'Not found'
```

## License

MIT
