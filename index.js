const fs = require('fs');
const p = require('path');
const jsonify = require('jsonify-css');

const exit = t => (path, state) => {
  if (!isImportingCSS(path)) return;
  const decls = getImportDecls(path);
  const filepath = getFilepath(path, state);
  const css = getCSS(filepath);
  const styles = jsonify({ root: p.dirname(filepath) })(css);
  const objify = obj => Array.isArray(obj)
    ? t.arrayExpression(obj.map(x => 'string' === typeof x
      ? t.stringLiteral(x)
      : objify(x)))
    : t.objectExpression(Object.keys(obj)
      .map(k => t.objectProperty(
        t.stringLiteral(k),
        'object' === typeof obj[k]
          ? objify(obj[k])
          : t.stringLiteral(obj[k])
      )));
  const memberImports = decls.member.map(x =>
    t.variableDeclaration('var', [
      t.variableDeclarator(
        t.identifier(x.imported.name),
        !(x.imported.name in styles)
          ? (x.imported.name === 'raw' ? t.stringLiteral(css) : t.identifier('undefined'))
          : t.arrayExpression(styles[x.imported.name].map(objify))
      )
    ]));
  const fullImport = decls.full.map(x =>
    t.variableDeclaration('var', [
      t.variableDeclarator(
        t.identifier(x.local.name),
          objify(
            styles.rule.concat(styles.media)
            .reduce((a, b) => Object.assign({}, a, b), {})
          ))
    ]));
  path.replaceWithMultiple([
    ...fullImport,
    ...memberImports,
  ]);
};

const isImportingCSS = path =>
  '.css' === p.parse(path.node.source.value).ext;

const getImportDecls = path => ({
  full: path.node.specifiers
    .filter(x => x.type !== 'ImportSpecifier'),
  member: path.node.specifiers
    .filter(x => x.type === 'ImportSpecifier'),
});

const getFilepath = (path, state) => {
  const dir = state.file.opts.filename[0] === '.'
    ? p.dirname(p.resolve(state.file.opts.filename))
    : 'node_modules';
  return p.resolve(dir, path.node.source.value);
};

const getCSS = filepath =>
  fs.readFileSync(filepath, 'utf8');

module.exports = opts => ({
  visitor: {
    ImportDeclaration: {
      exit: exit(opts.types)
    }
  }
});
