## Setup

- Required **Node 16** or higher
- **Visual Studio Code** is recommended
- Make sure to install the [suggested extensions](.vscode/extensions.json), then:

```bash
# install required packages, register git hooks and generate auto-import types
pnpm install
```

## Commands

```bash
# serve with hot reload at localhost:5173
pnpm dev

# build for production env
pnpm build

# build for dev env
pnpm build:dev

# build for staging env
pnpm build:sta

# launch preview server at localhost:4173
pnpm preview

# view visualized bundle outputs
pnpm vis:bundle

# view visualized Tailwind CSS configuration
pnpm vis:tailwind

# code lint and format check
pnpm check:code

# code lint and format fix (modified files)
pnpm fix:code
```

## What included

- [x] [Vue 3](https://github.com/vuejs/core) + [Vite 3](https://github.com/vitejs/vite) + [Pinia](https://pinia.vuejs.org/) + [ESBuild](https://github.com/evanw/esbuild)
- [x] [VueUse](https://vueuse.org/) + [Lodash](https://lodash.com/)
- [x] [File based routing](https://github.com/posva/unplugin-vue-router#routes-folder-structure)
- [x] [File based layout](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
- [x] [Typed route names](https://github.com/posva/unplugin-vue-router)
- [x] [i18n ready](./docs/feat-i18n.md)
- [x] [Tailwind 3](https://tailwindcss.com/) + [Config visualizer](https://github.com/rogden/tailwind-config-viewer)
- [x] [SASS support](https://sass-lang.com/) + [Global helpers](https://github.com/vitejs/vite/issues/832)
- [x] [Auto import modules](./docs/feat-auto-import-modules.md)
- [x] [Auto import components](./docs/feat-auto-import-components.md)
- [x] [Cacheable Axios requests](https://github.com/arthurfiorette/axios-cache-interceptor)
- [x] [SVG sprite](./docs/feat-svg-sprite.md)
- [x] [Image optimization](https://github.com/vbenjs/vite-plugin-imagemin)
- [x] Base components
- [x] [Bundle visualizer](https://socket.dev/npm/package/vite-bundle-visualizer)
- [x] [Enhanced modular import](./docs/feat-modular-import.md)
- [x] [Module imports sort](./docs/feat-module-imports-sort.md)
- [x] [Validate env variables at dev or build time](https://github.com/Julien-R44/vite-plugin-validate-env)
- [x] [Auto remove all `console.log` in production build](https://github.com/xiaoxian521/vite-plugin-remove-console)
- [x] [Eslint](https://eslint.org/) + [Stylelint](https://stylelint.io/) + [Prettier](https://prettier.io/)
- [x] [Git hooks](https://github.com/typicode/husky): [Lint branch name](https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e) + [commit message](https://commitlint.js.org/)

## How-tos

- [How to make API requests](./docs/how-to-make-api-requests.md)
- [How to set ENV files](./docs/how-to-set-env-files.md)
