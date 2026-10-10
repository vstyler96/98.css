## 98.css

<a href="https://www.npmjs.com/package/@vstyler96/98.css"><img height="20" alt="npm" src="https://img.shields.io/npm/v/@vstyler96/98.css" /></a>
<a href="https://www.npmjs.com/package/@vstyler96/98.css"><img height="20" alt="npm downloads" src="https://img.shields.io/npm/dt/@vstyler96/98.css" /></a>
<a href="https://unpkg.com/@vstyler96/98.css@2/dist/98.css"><img height="20" alt="gzip size" src="https://img.shields.io/bundlephobia/minzip/@vstyler96/98.css" /></a>

A design system for building faithful recreations of old UIs.

<img alt="a screenshot of a window with the title 'My First VB4 Program' and two buttons OK and Cancel, styled like a Windows 98 dialog" src="https://github.com/jdan/98.css/blob/main/docs/window.png?raw=true" height="133"> <img alt="a magnified view showing pixel-perfect borders on a scrollbar and button element" src="https://github.com/jdan/98.css/blob/main/docs/zoom.png?raw=true?raw=true" height="133">

98.css is a CSS file that takes semantic HTML and makes it look pretty. It does not ship with any JavaScript, so it is compatible with your frontend framework of choice.

It shares one markup API with [XP.css](https://botoxparty.github.io/XP.css/), [7.css](https://khang-nd.github.io/7.css/), system.css and x.css: the same HTML renders in each library, only the look changes.

| | |
|---|---|
| Package | `@vstyler96/98.css` |
| Version | 2.0.0 |
| Scope class | `.win98` (scoped build only) |
| CSS variable prefix | `--w98-` |

### Installation / Usage

The easiest way to use 98.css is to import it from [unpkg](https://unpkg.com/).

```html
<!DOCTYPE html>
<html>
<head>
  <title>98.css example</title>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="https://unpkg.com/@vstyler96/98.css@2/dist/98.css" />
</head>

<body>
  <div class="window" style="margin: 32px; width: 250px">
    <div class="title-bar">
      <div class="title-bar-text">
        My First VB4 Program
      </div>
    </div>
    <div class="window-body">
      <p>Hello, world!</p>
    </div>
  </div>
</body>
</html>
```

The same file is on jsDelivr: `https://cdn.jsdelivr.net/npm/@vstyler96/98.css@2/dist/98.css`.

Alternatively, grab 98.css from [the releases page](https://github.com/vstyler96/98.css/releases) or [npm](https://www.npmjs.com/package/@vstyler96/98.css):

```
npm install @vstyler96/98.css
```

and import it from your bundler:

```js
import "@vstyler96/98.css/dist/98.css";
```

Here is an example of [98.css being used with React](https://codesandbox.io/s/objective-chandrasekhar-t5t6h?file=/src/index.js), and [an example with vanilla JavaScript](https://codesandbox.io/s/late-sound-miqho?file=/index.html).

Refer to the [documentation page](https://jdan.github.io/98.css/) for every component with live examples.

#### Builds

| File | What it is |
|---|---|
| `dist/98.css` | Default build. Custom properties (`--w98-*`) stay live, so you can re-theme at runtime. |
| `dist/98.scoped.css` | Every selector is prefixed with `.win98`; only elements inside a `.win98` container are styled. |
| `dist/98.inline.css` | Custom properties resolved to plain values. |
| `dist/gui/<component>.css` | One file per component, variables inlined. The `@font-face` rules live in `typography.css`. |

Icons are inlined. Fonts are not: keep the `fonts/` folder next to the stylesheet you use.

98.css does not style `body`. Scrollbars are opt-in with the `has-scrollbar` class.

### Components

| Component | Markup |
|---|---|
| Window | `.window` (`.is-bright`, `.inactive`) > `.title-bar` (`.inactive`) > `.title-bar-text` + `.title-bar-controls`; `.window-body` (`.has-space`); `.window-footer`; `.status-bar` > `.status-bar-field` |
| Title-bar buttons | `.title-bar-controls > button[aria-label="Minimize\|Maximize\|Restore\|Help\|Close"]` or `button.is-minimize/.is-maximize/.is-restore/.is-help/.is-close` |
| Dialog | `.window[role=dialog]`: fixed and centred, shown on `:target` or `[open]` |
| Button | `button`, `[role=button]`, `input[type=submit\|reset]`; `.default`, `.active`, `.focused`, `:disabled`; `label[role=button] > input[type=file]`; `input[type=file]::file-selector-button` |
| Checkbox | `input[type=checkbox] + label` |
| OptionButton | `input[type=radio] + label` |
| TextBox | `input[type=text\|password\|email\|url\|tel\|number]`, `textarea` |
| SearchBox | `input[type=search]`; `.searchbox` > `input[type=search]` + `button[aria-label=search]` |
| ComboBox | `.combobox` > `input[type=text]` + `button` |
| Dropdown | `select` |
| ListBox | `[role=listbox]` > `[role=option][aria-selected=true]`, or `select[multiple]`; `.has-hover`, `.has-shadow` |
| ListView | `table`; `.has-shadow`, `.is-striped`, `.has-hover`, `.is-full`; `th.highlighted`, `th.indicator` (`.up`); `th.is-center`, `td.is-center`; `tr.highlighted` |
| GroupBox | `fieldset` > `legend`; `.field-row`, `.field-row-stacked` |
| Tabs | `menu[role=tablist]` (`.justified`) > `button[aria-selected=true]`, followed by `[role=tabpanel]` |
| TreeView | `ul.tree-view` (`.has-container`, `.has-connector`, `.has-collapse-button`) with nested `ul` and `details` > `summary` |
| Collapse | `details` > `summary` |
| Menu | `ul[role=menu]` (`.can-hover`) > `li[role=menuitem]` (`[aria-haspopup=true]`, `[aria-disabled]`, `.has-divider`) > `a` / `button` / nested `ul[role=menu]` |
| MenuBar | `ul[role=menubar]` (`.can-hover`) > `li[role=menuitem]` > `ul[role=menu]` |
| ProgressBar | `div[role=progressbar]` > `div` (width = value); `.paused`, `.error`, `.animate`, `.marquee`, `.is-smooth` |
| Slider | `input[type=range]` (`.has-box-indicator`), `.is-vertical` wrapper |
| Spinner | `.spinner` / `.loader` (`.animate`): the hourglass cursor |
| Balloon | `[role=tooltip]` (`.is-top`, `.is-left`) |
| Scrollbar | `.has-scrollbar` (WebKit/Blink only) |
| Typography | `a`, `pre`, `code`; `.instruction` (`.instruction-primary`), `.header` (`.header-document`, `.header-group`) |

98.css extras (not part of the shared API): `.sunken-panel`, `.vertical-bar`, `.field-border` (`.is-disabled`), `.status-field-border`, `table.interactive`.

A ListView example with the table modifiers:

```html
<table class="is-striped has-hover is-full">
  <thead>
    <tr><th>Name</th><th class="is-center">Size</th></tr>
  </thead>
  <tbody>
    <tr><td>autoexec.bat</td><td class="is-center">1 KB</td></tr>
    <tr class="highlighted"><td>win.ini</td><td class="is-center">4 KB</td></tr>
  </tbody>
</table>
```

### Migrating from v0.x / 1.x

**From 1.x:** nothing was removed. 2.0 adds the ListView modifiers `.is-striped`, `.has-hover`, `.is-full` and `.is-center`, with the variables `--w98-lv-bg-alt`, `--w98-lv-bg-h` and `--w98-lv-c-h`.

**From v0.x:** this is a clean break; old class names are **not** kept as aliases.

- **Package:** the package moved from `98.css` to `@vstyler96/98.css`.
- **Title-bar buttons:** `.close`, `.minimize`, `.maximize`, `.restore`, `.help` → `.is-close`, `.is-minimize`, `.is-maximize`, `.is-restore`, `.is-help`. `aria-label="Close"` (and the other English labels) still work without a class.
- **Tabs:** `menu[role=tablist] > li[role=tab] > a` → `menu[role=tablist] > button[aria-selected=true]`. `.multirows` → `.justified`. Any `[role=tabpanel]` is styled, not only `.window[role=tabpanel]`.
- **Progress:** `.progress-indicator > .progress-indicator-bar` → `div[role=progressbar] > div`. Segmented is now the default; `.is-smooth` gives the old solid bar.
- **Tree view:** the white box, dotted connectors and +/- buttons are opt-in: `ul.tree-view.has-container.has-connector.has-collapse-button` gives the v0 look.
- **Scrollbars:** no more global `::-webkit-scrollbar`. Add `.has-scrollbar` to each scrolling element.
- **Global rules removed:** `body`, `h1`–`h4`, `u` and the global `:disabled` color. Each component styles its own disabled state.
- **Search inputs** are styled by the SearchBox component.
- **Extras:** `.field-border-disabled` → `.field-border.is-disabled`.
- **Paths:** `style.css` is gone; the source is `gui/index.scss`. `icon/` → `gui/icon/`, `fonts/converted/` → `gui/fonts/`.
- **Custom properties** are prefixed with `--w98-` and renamed after their role:

  | v0.x | 2.0 |
  |---|---|
  | `--surface` | `--w98-surface` |
  | `--text-color` | `--w98-el-c` |
  | `--button-highlight` / `--button-face` / `--button-shadow` / `--window-frame` | `--w98-bd-light` / `--w98-bd-face` / `--w98-bd-dark` / `--w98-bd-darker` |
  | `--dialog-blue`, `--dialog-blue-light` | `--w98-w-title-grad` |
  | `--dialog-gray`, `--dialog-gray-light` | `--w98-w-title-grad-d` |
  | `--link-blue` | `--w98-link-c` |
  | `--border-raised-outer` + `--border-raised-inner` | `--w98-el-sd` |
  | `--border-sunken-outer` + `--border-sunken-inner` | `--w98-el-sd-a` |
  | `--border-window-outer` + `--border-window-inner` | `--w98-w-sd` |
  | `--border-field` | `--w98-field-sd` |
  | `--border-status-field` | `--w98-status-sd` |
  | `--border-tab` | `--w98-tab-sd` |
  | `--default-button-border-*` | `--w98-btn-sd-default`, `--w98-btn-sd-default-a` |
  | `--element-spacing` / `--grouped-element-spacing` | `--w98-space` / `--w98-space-grouped` |
  | radio / checkbox geometry | `--w98-rd-*` / `--w98-cb-*` |

  See [`gui/_variables.scss`](gui/_variables.scss) and the top of each partial for the full list.

### Developing

The source lives in [`gui/`](gui): one partial per component (`gui/_button.scss`, `gui/_window.scss`, …), imported by `gui/index.scss`. The partials are plain CSS with nesting, processed by PostCSS (not Sass). Icons are in `gui/icon/` and fonts in `gui/fonts/`.

Use the Makefile (it runs `npm install` first whenever `package-lock.json` changes):

| Command | What it does |
|---|---|
| `make build` | Builds the four CSS outputs and the docs page into `dist/` (`npm run build`). |
| `make preview` | Builds, then watches for changes and serves the docs with live reload on http://localhost:3000 (`node server.js`). |
| `make publish` | Builds and publishes to npm (`npm run release`). |
| `make deploy` | Builds the docs and pushes them to GitHub Pages (`npm run deploy:docs`). |
| `make clean` | Deletes `dist/`. |

### Issues, Contributing, etc.

Refer to [the GitHub issues page](https://github.com/jdan/98.css/issues) to see bugs in my CSS or report new ones. I'd really like to see your pull requests (especially those new to open-source!) and will happily provide code review. 98.css is a fun, silly project and I'd like to make it a fun place to build your open-source muscle.

Thank you for checking my little project out, I hope it brought you some joy today. Consider [starring/following along on GitHub](https://github.com/jdan/98.css/stargazers) and maybe reading my posts on [Bluesky](https://bsky.app/profile/jdan.me). 👋

### License

[MIT](https://github.com/jdan/98.css/blob/main/LICENSE)
