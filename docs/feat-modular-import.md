# Enhanced Modular Import

Powered by [vite-plugin-importus](https://github.com/Geocld/vite-plugin-importus).

## Sugar syntax

Thanks to this plugin, we can freely use the splendid destructuring import on some libraries like [Lodash](https://lodash.com/) without suffering the large bundle size later. You can read more about this [here](https://dev.to/yutro/lodash-import-done-right-290n).

Basically, it will transform this:

```ts
import { differenceBy } from 'lodash';
```

into this under the hook:

```ts
import differenceBy from 'lodash/differenceBy';
```
