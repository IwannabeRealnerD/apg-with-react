# Build

- This document contains information related to the build system of the project

## 1. Ignore type check and ESLint check druin build

- In the project, type checks and ESLint checks are intentionally ignored during the build process to improve performance.
- This is achieved by setting `ignoreDuringBuilds` to true in the `next.config.js` file.

```javascript
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreDuringBuilds: true,
  },
};
```

- Type checks and ESLint checks are important for the project. However, since these checks are already implemented in pre-commit and pre-push hooks, they can be ignored during the build process to improve build performance.
