# Contributing

Thanks for being willing to contirbute!

**Working on your first Pull Request?** You can learn how from this *free* series
[How to Contribute to an Open Source Project on GitHub][egghead]

## Project setup

1. Fork and clone the repo
2. `$ npm install` to install dependencies
3. `$ npm start validate` to validate you've got it working
4. Create a branch for your PR

## Add an example

Is the example just a code snippet or is it a full fledged project? If it is a code snippet, go ahead and add it to our [examples readme file][examples-readme]
If it is an example that requires you to create a new, albeit, mini-project, here are the steps to add it.
  - Create a new folder inside our [`examples`][examples-readme] folder.
  - Name it to describe what your example is about.
  - You can create a new `npm`/`yarn` setup inside this folder.
  - Don't forget to add a `readme.md` inside your example folder.
  - Now add the commands to validate and build your example project to our `package-scripts`.
  - Navigate to the `package-scripts.js` and the `examples` command.
  - Add a new command specific to your example folder.
  - Here, you can provide the scripts that need to be run to validate and build your folder. Use the awesome [`nps`][nps], which has a ton of utilities to help you.
  - Run `npm start examples` to make sure all your setup is correct.

You should have a great example running on `glamorous` by now. Go ahead and submit a PR!

[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[examples-readme]: ./examples
[nps]: https://npmjs.com/package/nps
