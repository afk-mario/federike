# Contributing to Federike

Federike development setup is based on [Create React App](https://create-react-app.dev/)

## Installing

To install with dev dependencies, run:

    yarn

## Dev server

To run a dev server with hot reloading:

    yarn start

Now it's running at `localhost:3000`.

## Linting

Federike uses [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) with a custom config [.eslintrc.js](https://github.com/afk-mario/federike/blob/main/.eslintrc.js).

Lint:

    yarn lint

Lint CSS:

    yarn lint:css

Automatically fix most linting issues:

    yarn lint:fix
    yarn lint:css:fix
