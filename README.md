# jspsych-experiment-template

This project was generated using `jspsych-experiment-template`. It leverages
`jspsych-builder` (and therefore Babel, Webpack, SASS and even TypeScript) to
ease jsPsych development and automate the build process.

jsPsych is a JavaScript framework for creating browser based experiments. If you
don't know it, you should [learn the basics][3] first.

## How to use this template

The package manager used is yarn ([for a quick introduction, see here][1]). Make
sure you have it installed in order to use this template to develop jsPsych
experiments.

As with every modern Javascript project, after cloning the source code you need
to install the project dependencies (other pieces of code that this project
depends on) with `yarn install`. This step is only required at the beginning and
when the dependencies change (when someone else who is working on the experiment
installes a plugin, for example).

The experiment timeline can be built inside the `run()` function in the
`src/experiment.js` file. Note that you **should not** change the function
definition itself, but only the content of it, since this function is called
by `jspsych-builder` internally.

### Available commands

These commands must be run inside the project directory.

**`yarn run dev`**

This will spin up the development server under http://localhost:3000. When the
experiment timeline is finished, the resulting data will be printed on the
browser console.

**`yarn run build`**

This will compile and package the source files into a `.zip` file and save it
in the `packaged` directory. This file can be served on any webserver or even
run locally in a browser. **However, the resulting data is not saved anywhere,
but again just printed on the browser console.** This behavior might be
adjusted, of course. To learn how, refer to the [`jspsych-builder` docs][2].

**`yarn run build --jatos`**

This will compile and package the source files into a `.jzip` file and save it
in the `packaged` directory. The package can be imported to a JATOS server
(using the GUI option _Import Study_). The resulting data is passed to the
JATOS server in CSV form.

### How to add plugins

Plugins are added as yarn dependencies. First, you need to figure out the name
of the plugin package. To do so, one option is to head to npmjs.com and [search
for `@jspsych-plugin`][4]. This way you get a list of all plugin packages
released by jsPsych.

If you want to add, let's say the [animation plugin][5], the full name that you
should have found on npmjs.com is "`@jspsych/plugin-animation`". To add it to
your experiment run:

```shell
$ yarn add @jspsych/plugin-animation
```

In your `src/experiment.js` file (as well as in every other JavaScript file you
use to build your timelines), import the plugin by adding the following line
to the top of the file:

```javascript
...

import AnimationPlugin from '@jspsych/plugin-animation';

...
```

As you can see, there are already three plugins imported in this template by
default, the [FullscreenPlugin][6], the [HtmlKeyboardResponsePlugin][7] and the
[PreloadPlugin][8].

To use your newly added plugin, create a trial object of the type of your plugin
and add it to your timeline:

```javascript
...

const myAnimationTrial = {
  type: AnimationPlugin,
  ...
};
timeline.push(myAnimationTrial);

...
```

To learn how to configure the trials created with a certain plugin, refer to the
[plugin overview page][10] and the [specific plugin's documentation][9] on the
jsPsych website.

### How to customize the look & feel

To change the browser tab title, change the content of the _title_ pragma at the
top of the `src/experiment.js` file.

```javascript
/**
 * @title Add the desired browser tab title here
 * ...
 */
```

To customize the visual appearance of the experiment, refer to the [jsPsych
documentation][11]. I would recommend to use a CSS stylesheet, but beware:
adding a stylesheet to your experiment is not done in the same way as the
jsPsych documentation states. Instead, you can simply add a line like this one
to your experiment file or every other JavaScript file:

```javascript
import '../styles/main.scss';
```

As you can see, this line is already present in the `src/experiment.js` file,
and the `styles/main.scss` file also already exists. You might have noticed that
this stylesheet is a `.scss` file instead of a normal `.css` file. This is
because this template (thanks to `jspsych-builder`) supports the
[SASS language][12] for styling. SASS is a superset of CSS and you can therefore
just write normal CSS if you do not need the additional features SASS provides.

### On TypeScript

TypeScript is a superset of JavaScript providing a type system, which can make
your code more robust. To use it, just rename your `.js` fies to `.ts` files,
write your code in TypeScript, and `jspsych-builder` takes care of the rest. To
learn TypeScript, refer to [their documentation][13].

[1]: https://yarnpkg.com/getting-started
[2]: https://github.com/bjoluc/jspsych-builder
[3]: https://www.jspsych.org/7.0/
[4]: https://www.npmjs.com/search?q=%40jspsych%2Fplugin
[5]: https://www.jspsych.org/7.0/plugins/animation/
[6]: https://www.jspsych.org/7.0/plugins/fullscreen/
[7]: https://www.jspsych.org/7.0/plugins/html-keyboard-response/
[8]: https://www.jspsych.org/7.0/plugins/preload/
[9]: https://www.jspsych.org/7.0/plugins/list-of-plugins/
[10]: https://www.jspsych.org/7.0/overview/plugins/
[11]: https://www.jspsych.org/7.0/overview/style/
[12]: https://sass-lang.com/
[13]: https://www.typescriptlang.org/
