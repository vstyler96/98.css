#!/usr/bin/env node
const dedent = require("dedent");
const ejs = require("ejs");
const fs = require("fs");
const glob = require("glob");
const hljs = require("highlight.js");
const mkdirp = require("mkdirp");
const path = require("path");
const postcss = require("postcss");
const plugins = [
  require("cssnano"),
  require("autoprefixer"),
  require("postcss-import"),
  require("postcss-nested"),
  require("postcss-calc"),
  require("postcss-base64")({
    root: process.cwd() + "/gui",
    extensions: [".png", ".svg", ".gif"],
  }),
];

const { homepage, version } = require("./package.json");

/**
 *
 * @param {Object} options
 * @param {boolean} [options.usePrefix] - Whether to apply a prefix for the CSS selectors.
 * @param {boolean} [options.useInlineVars] - Whether to inline CSS variables.
 */
async function buildCSS({ usePrefix, useInlineVars } = {}) {
  const input = `/*! 98.css v${version} - ${homepage} */\n` + fs.readFileSync("gui/index.scss");

  let targetFile = "dist/98.css";
  let parser = postcss(plugins);

  if (usePrefix) {
    targetFile = "dist/98.scoped.css";
    parser = postcss([
      ...plugins,
      require("postcss-prefix-selector")({
        prefix: ".win98",
        transform: (prefix, selector, prefixed) => {
          if ("body" === selector) return selector + prefix;
          if (":root" === selector) return prefix;
          return prefixed;
        },
      }),
    ]);
  }
  if (useInlineVars) {
    targetFile = "dist/98.inline.css";
    parser = postcss([...plugins, require("postcss-css-variables")]);
  }

  const result = await parser.process(input, {
    from: "gui/index.scss",
    to: targetFile,
    map: { inline: false },
  });

  mkdirp.sync("dist");
  fs.writeFileSync(targetFile, result.css);
  fs.writeFileSync(targetFile + ".map", result.map.toString());
}

async function buildComponents() {
  const files = fs.readdirSync("gui");
  const targetFolder = "dist/gui";
  const variablesFile = "_variables.scss";

  const fileResults = files
    .filter((file) => file.startsWith("_") && file !== variablesFile)
    .map((file) => ({
      name: file.slice(1),
      content: fs.readFileSync("gui/" + variablesFile) + fs.readFileSync("gui/" + file),
    }));

  const parsedResults = fileResults.map(async (file) => {
    const target = targetFolder + "/" + file.name.replace("scss", "css");
    const parser = postcss([...plugins, require("postcss-css-variables")]);
    return {
      target,
      parsed: await parser.process(file.content, {
        from: "gui/" + file.name,
        to: target,
        map: { inline: false },
      }),
    };
  });

  mkdirp.sync(targetFolder);
  const results = await Promise.all(parsedResults);
  results.forEach((result) => fs.writeFileSync(result.target, result.parsed.css));
}

// Fonts are not inlined: copy them next to every stylesheet that references "./fonts/"
function copyFonts() {
  for (const dest of ["dist/fonts", "dist/gui/fonts"]) {
    mkdirp.sync(dest);
    glob.sync("gui/fonts/*.woff*").forEach((file) => fs.copyFileSync(file, path.join(dest, path.basename(file))));
  }
}

function buildDocs() {
  let id = 0;
  function getNewId() {
    return ++id;
  }
  function getCurrentId() {
    return id;
  }

  const template = fs.readFileSync("docs/index.html.ejs", "utf-8");
  function example(code) {
    const magicBrackets = /\[\[(.*)\]\]/g;
    const dedented = dedent(code);
    const inline = dedented.replace(magicBrackets, "$1");
    const escaped = hljs.highlight("html", dedented.replace(magicBrackets, ""));

    return `<div class="example">
      ${inline}
      <details>
        <summary>Show code</summary>
        <pre><code>${escaped.value}</code></pre>
      </details>
    </div>`;
  }

  glob.sync("docs/*", { ignore: ["docs/*.ejs"] }).forEach((srcFile) =>
    fs.copyFileSync(srcFile, path.join("dist", path.basename(srcFile)))
  );
  fs.writeFileSync(
    path.join(__dirname, "/dist/index.html"),
    ejs.render(
      template,
      {
        getNewId,
        getCurrentId,
        example,
      },
      { views: [path.resolve(__dirname, "./docs")] }
    )
  );
}

async function build(mode) {
  try {
    await buildCSS();
    copyFonts();
    buildDocs();

    if (mode === "production") {
      await buildCSS({ usePrefix: true });
      await buildCSS({ useInlineVars: true });
      await buildComponents();
    }
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}
module.exports = build;

if (require.main === module) build("production");
