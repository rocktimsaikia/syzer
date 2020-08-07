# syzer :zap:

> Updates the package.json with latest dependency versions.

[![Build Status](https://travis-ci.com/RocktimSaikia/syzer.svg?branch=master?style=flat-square)](https://travis-ci.com/RocktimSaikia/syzer)
![David](https://img.shields.io/david/rocktimsaikia/syzer?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/rocktimsaikia/syzer?style=flat-square)
![NPM](https://img.shields.io/npm/l/syzer?style=flat-square)

<img src="https://github.com/rocktimsaikia/syzer/blob/master/.github/screenshot.png?raw=true" alt="screenshot" height="300px">

## Features

- checks and outputs the current and latest versions of dependencies
- updates(`-u`) `package.json` with latest dependency versions.
- ignores(`-i`) specific packages that you don't want to update.

## :cloud: Installation

```sh
# Using npm
npm install syzer -g

# Using yarn
yarn global add syzer
```

## :clipboard: Usage

1. Check the `package.json` for outdated dependencies.

```sh
$ syzer
```

2. Update the `package.json` with latest versions of all the outdated packages.

```sh
$ syzer -u
```

3. Then run `npm install` to install the latest dependencies.

---

- To ignore some specific packages to update add the flag `-i` following the package names to ignore

```sh
$ syzer -u -i nodemon express
```

## :rocket: How to contribute

Have an idea? Found a bug? See [how to contribute][contributing].

## :question: Get Help

There are few ways to get help:

1.  Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
2.  For bug reports and feature requests, open issues. :bug:

## :sparkling_heart: Support

<a href="https://www.buymeacoffee.com/7BdaxfI" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" height="35px" alt="Buy Me A Coffee" id="coffee"></a>
<a href='https://ko-fi.com/Q5Q81MAMU' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi2.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## :scroll: License

[MIT][license] © [Rocktim Saikia][website]

[license]: /LICENSE
[website]: https://github.com/rocktimsaikia
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
