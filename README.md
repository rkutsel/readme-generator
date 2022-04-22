### The MIT License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Markdown README Generator

## Description

Inspired by this [guide](https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide) on how to create a professional **README** in Markdown, this little cli helper generates a boilerplate **README** file for you. And to be completely honest, it wasn't just an inspiration, but also a part of one of my homeworks at [UW Coding Bootcamp](https://bootcamp.uw.edu).

It currently has the capability to generate either a bare minimum `Minimal` or a full boilerplate `Extended` version of **README** which determines the scope of generated content. It can also generate a **LICENSE** file with copyright information with `[year]` and `[fullname]` if the option to do so is chosen. Generated content is saved in `./generated-content` directory. It's worth mentioning that this little cli helper relies on [GitHub API](https://docs.github.com/en/rest) that pulls licensing data mostly because it made more sense to me and also made the work a little easier. This way I didn't have to do this work with files locally. Wanted to call it out in case you wanted to use it on an airplane that doesn't have free Internet.

## Installation Instructions

> NOTE: Make sure you have `Node.JS ~v16.14.2` and `NPM ~8.5.0` installed. You can quickly check this by running `node -v` for Node.JS and `npm -v` for NPM in your terminal.

Once the above is confirmed, you can go ahead and clone the repo and install the dependencies by running `npm i` in your terminal. I recommend you install them locally. You should run and get somewhat similar output like the one bellow:

```bash
>npm i

added 57 packages, and audited 58 packages in 1s

17 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## Usage with Examples

## Contribute

Reach out if you feel like contributing or if you saw something that shouldn't be there.
