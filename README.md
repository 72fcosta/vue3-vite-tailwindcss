![gh-cover](https://user-images.githubusercontent.com/25357754/205466563-97a50c70-5e40-4636-b0c8-3a5cdacdc25e.png)

This template should help get you started developing with Vue3 + Vite + Tailwindcss [Live Demo](href="https://vue3-vite-tailwindcss.netlify.app).

-  ⚡️ Vue Composition API
-  ⚡️ Tailwind Dark Mode
-  ⚡️ Remove Unused CSS

## Features

-  🚀 [Vitest](https://vitest.dev)
-  🚀 [Typescript](https://www.typescriptlang.org)
-  🚀 [Zod](https://github.com/colinhacks/zod)
-  🚀 [Vue Router](https://router.vuejs.org)
-  🚀 [Pinia](https://pinia.vuejs.org)
-  🚀 [Bootstrap Icons](https://github.com/tommyip/bootstrap-icons-vue)
-  🚀 [Icongen](https://github.com/akabekobeko/npm-icon-gen)

## Ready Configs

-  ⚙️ [Prettier](https://prettier.io)
-  ⚙️ [Eslint](https://eslint.vuejs.org)
-  ⚙️ [Css Nano](https://cssnano.co)
-  ⚙️ [Css Autoprefixer](https://github.com/postcss/autoprefixer)

## Recommended IDE Setup

-  [VSCode](https://code.visualstudio.com/)
-  [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)
-  [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
-  [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
-  [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## License

[MIT](https://github.com/72fcosta/vue3-vite-tailwindcss/blob/master/LICENSE.md)
