# SVG (Icon) Sprite

Powered by [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons).

All SVG files inside `src/assets/icons` will become a sprite and can be use inside Vue templates using `SvgIcon` component.

```html
<SvgIcon name="close" class="h-4 w-4 text-orange" />
```

The `name` prop here is the SVG file name inside `/icons` directory.

## Styling

As you can see above, you can use Tailwind (or any CSS/SASS class) to style the icon.

On side note about icon color: Make sure you set all fills and strokes inside the SVG code to `currentColor` so that it can utilize the current text color.

```html
<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.79298 17.3729C3.68032 17.258" fill="currentColor" />
</svg>
```
