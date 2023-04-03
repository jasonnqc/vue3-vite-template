# Module Imports Sort

Powered by [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort).

Imports will be grouped and sorted by each category, follow this rule set:

```ts
// Node.js built-ins prefixed with `node:`.
import path from 'node:path';

// Vue or Vite related packages.
import ImageMin from 'vite-plugin-imagemin';

// Side effect imports.
import 'virtual:svg-icons-register';

// Absolute imports and other imports such as Vue-style `@/foo`.
import type { ButtonTheme } from '@/composables/useButtonStyle';

// Parent imports.
import { API_USER } from '../endpoints';

// Relative imports, anything that starts with a dot.
import { useAxiosInstance } from './useAxiosInstance';

// File imports.
import './assets/scss/main.scss';
```
