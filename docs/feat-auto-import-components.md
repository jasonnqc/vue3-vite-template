# Auto Import Components

Powered by [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components).

All components defined in `src/components` can be used without the need of importing them inside other Vue SFC.

## Naming rule

Except components inside `/base` directory, other component names will be prefixed by their parent directory name respectively. For example:

```bash
├── modal
│   ├── AppError.vue
│   └── AppLoading.vue
```

These components will be used as `ModalAppError` and `ModalAppLoading` in other Vue templates.
