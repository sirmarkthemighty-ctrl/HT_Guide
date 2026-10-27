#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

process.env.BROWSERSLIST_IGNORE_OLD_DATA = '1';

const ROOT = path.resolve(__dirname, '..');
const SRC = __dirname;
const OUT = path.join(ROOT, 'ht-guide.html');
// The extra copy one folder up is only written from the Med Applications working folder, not from a repo copy
const OUT_ROOT = path.basename(ROOT) === 'Med Applications' ? path.resolve(__dirname, '../../ht-guide.html') : null;
const TOOLS = path.join(process.env.LOCALAPPDATA || os.homedir(), 'med-apps-build');

const VENDOR = ['react/umd/react.production.min.js', 'react-dom/umd/react-dom.production.min.js'];

function buildCss() {
  const tmp = path.join(os.tmpdir(), `ht-guide-${process.pid}.css`);
  const cli = path.join(TOOLS, 'node_modules', 'tailwindcss', 'lib', 'cli.js');
  execFileSync(process.execPath, [cli, '-c', path.join(SRC, 'tailwind.config.js'), '-i', path.join(SRC, 'styles.css'), '-o', tmp, '--minify'], { stdio: 'ignore', env: process.env });
  const css = fs.readFileSync(tmp, 'utf8');
  fs.unlinkSync(tmp);
  return css;
}

async function buildJs() {
  const Babel = require(path.join(TOOLS, 'node_modules', '@babel', 'standalone'));
  const files = [
    'icons.js',
    'drugsData.js',
    'guidelinesData.js',
    'translations.js',
    'components-card.js',
    'components-layout.js',
    'components-modals.js',
    'components-modals-2.js',
    'components-tools.js',
    'app.jsx'
  ];
  const fullJsx = files.map(f => {
    const p = path.join(SRC, f);
    if (!fs.existsSync(p)) throw new Error(`Missing source file: ${f}`);
    return fs.readFileSync(p, 'utf8');
  }).join('\n\n');

  const plain = Babel.transform(fullJsx, { presets: ['react'], filename: 'app.jsx', compact: false }).code;
  if (process.argv.includes('--no-minify')) return plain;
  const { minify } = require(path.join(TOOLS, 'node_modules', 'terser'));
  const out = await minify(plain, { compress: { passes: 2 }, mangle: true, toplevel: false, format: { comments: false } });
  if (!out.code) throw new Error('terser produced no output');
  return out.code;
}

(async () => {
  const started = Date.now();
  console.log('Building Thai HT Guide App (Tailwind CSS + Babel + Terser)...');
  const css = buildCss();
  const js = await buildJs();
  const shell = fs.readFileSync(path.join(SRC, 'shell.html'), 'utf8');
  
  const read = (v) => fs.readFileSync(path.join(TOOLS, 'node_modules', v), 'utf8').replace(/<\/script/gi, '<\\/script');
  const vendor = VENDOR.map(v => `<script>\n${read(v)}\n</script>`).join('\n');
  
  if (/<\/script/i.test(js)) throw new Error('app code contains a literal </script');
  const fill = (s) => s.replace('<!--__VENDOR__-->', () => vendor).replace('/*__CSS__*/', () => css).replace('/*__JS__*/', () => js);
  const html = fill(shell);
  // Artifact copy: the Artifact host adds its own doctype/html/head/body skeleton, so strip ours from the shell
  const artShell = shell
    .replace(/<!DOCTYPE html>\s*/i, '')
    .replace(/<html[^>]*>\s*/i, '')
    .replace(/<\/?head>\s*/gi, '')
    .replace(/<body[^>]*>\s*/i, '')
    .replace(/\s*<\/body>\s*<\/html>\s*$/i, '\n');
  fs.writeFileSync(OUT.replace(/\.html$/, '.artifact.html'), fill(artShell));
  
  fs.writeFileSync(OUT, html);
  if (OUT_ROOT) fs.writeFileSync(OUT_ROOT, html);
  
  const gz = require('zlib').gzipSync(html).length;
  console.log(`Successfully built:`);
  console.log(` -> ${OUT} (${(html.length / 1024).toFixed(0)} KB, ${(gz / 1024).toFixed(0)} KB gzipped)`);
  if (OUT_ROOT) console.log(` -> ${OUT_ROOT}`);
  console.log(`Finished in ${Date.now() - started} ms.`);
})().catch((e) => {
  console.error('Build failed:', e);
  process.exitCode = 1;
});
