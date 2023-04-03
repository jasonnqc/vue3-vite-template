# Auto Import Modules

Powered by [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import).

Currently all modules inside these packages and directories will be auto imported, so you don't need to import them manually in Vue SFC and composables:

- `vue, vue-router, vue-i18n, pinia`
- `src/apis, src/stores, src/composables, src/utils`

## Disclaimer

This plugin will not auto import types, so you have to do it yourself.

```ts
import type { RouteLocationRaw } from 'vue-router/auto';
```
