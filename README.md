# babel-plugin-jsonify-css

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url] [![Coverage Status][coveralls-image]][coveralls-url]

[npm-url]:https://npmjs.org/package/babel-plugin-jsonify-css
[downloads-image]:http://img.shields.io/npm/dm/babel-plugin-jsonify-css.svg
[npm-image]:http://img.shields.io/npm/v/babel-plugin-jsonify-css.svg
[travis-url]:https://travis-ci.org/jozanza/babel-plugin-jsonify-css
[travis-image]:http://img.shields.io/travis/jozanza/babel-plugin-jsonify-css/master.svg
[david-dm-url]:https://david-dm.org/jozanza/babel-plugin-jsonify-css
[david-dm-image]:https://img.shields.io/david/jozanza/babel-plugin-jsonify-css.svg
[david-dm-dev-url]:https://david-dm.org/jozanza/babel-plugin-jsonify-css#info=devDependencies
[david-dm-dev-image]:https://img.shields.io/david/dev/jozanza/babel-plugin-jsonify-css.svg
[coveralls-image]:https://coveralls.io/repos/github/jozanza/babel-plugin-jsonify-css/badge.svg?branch=master
[coveralls-url]:https://coveralls.io/github/jozanza/babel-plugin-jsonify-css?branch=master

## Installation

`$ yarn add --dev babel-plugin-jsonify-css`

## Usage

Add `jsonify-css` to the `plugins` section of your `.babelrc`:

```js
{ "plugins": ["jsonify-css"] }
```

After setting the project, you may import CSS files like so:

```js
// .css files now conveniently expose all styles as js objects
import styles, {
  rule,
  media,
  keyframes,
  fontFace,
  charset,
  raw
} from 'some-package/foo.css';

// If you are using glamor, you can easily generate styles like so
import { css } from 'glamor';
const className = css(styles);

// Don't forget any custom fonts or animations :)
const fonts = fontFace.map(x => css.fontFace(x));
const animations = keyframes.reduce((a, [name, timeline]) => {
  a[name] = css.keyframe(timeline);
  return a;
}, {});
```

## License

[MIT License](http://opensource.org/licenses/MIT)
