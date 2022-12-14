/**
 * @title IMAPC
 * @description A perceptual detection experiment
 * @version 1.0.0
 *
 * The following lines specify which media directories will be packaged and
 * preloaded by jsPsych. Modify them to arbitrary paths (or comma-separated
 * lists of paths) within the `media` directory, or just delete them.
 *
 * @assets media/audio
 */

export function licenseNotice() {
  /*! *******************

  If you want to, add your own license statement here. It will be placed in a
  file next to the JavaScript bundle. If you don't need this, just delete the
  whole export block.

  ******************** */
}

// Import stylesheets (.scss or .css).
import '../styles/main.scss';

import { initJsPsych } from 'jspsych';

import FullscreenPlugin from '@jspsych/plugin-fullscreen';
import HtmlKeyboardResponsePlugin from '@jspsych/plugin-html-keyboard-response';
import PreloadPlugin from '@jspsych/plugin-preload';
import { getPracticeTimeline } from './practice';
import GaborStimulusPlugin from '@kogpsy/jspsych-gabor-stimulus-plugin';

const NUMBER = 3;

/**
 * This method will be executed by jsPsych Builder and is expected to run the
 * jsPsych experiment
 *
 * @param {object} options Options provided by jsPsych Builder
 * @param {any} [options.input] A custom object that can be specified via the
 * JATOS web interface ("JSON study input").
 * @param {"development"|"production"|"jatos"} options.environment The context
 * in which the experiment is run: `development` for `jspsych run`, `production`
 * for `jspsych build`, and "jatos" if served by JATOS
 * @param {{images: string[]; audio: string[]; video: string[];, misc:
 * string[];}} options.assetPaths An object with lists of file paths for the
 * respective `@...Dir` pragmas
 */
export async function run({ assetPaths, input = {}, environment }) {
  // Initiate the jsPsych object
  const jsPsych = initJsPsych();

  // Define the main timeline array
  const timeline = [];

  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images,
    audio: assetPaths.audio,
    video: assetPaths.video,
  });

  // Welcome screen
  timeline.push({
    type: HtmlKeyboardResponsePlugin,
    stimulus: '<p>Welcome!<p/>',
  });

  // Switch to fullscreen
  timeline.push({
    type: FullscreenPlugin,
    fullscreen_mode: true,
  });

  const practiceTimeline = getPracticeTimeline();
  timeline.push(practiceTimeline);

  // Define configuration object
  const config = {
    stimulus: {
      size: 200,
      rotation: 45,
    },
    fixation_cross: {
      size: 20,
      weight: 4,
      color: 'white',
    },
  };

  const gaborTrial = {
    type: GaborStimulusPlugin,
    data: {
      rotation: jsPsych.timelineVariable('rotation'),
    },
    config: () => {
      const rotation = jsPsych.timelineVariable('rotation');

      return {
        stimulus: {
          size: 200,
          rotation: rotation,
        },
        fixation_cross: {
          size: 20,
          weight: 4,
          color: 'white',
        },
      };
    },
    choices: ['f', 'j'],
  };

  // Push the plugin to the timeline
  timeline.push({
    timeline: [gaborTrial],
    timeline_variables: [{ rotation: 45 }, { rotation: 105 }],
    sample: {
      type: 'fixed-repetitions',
      size: NUMBER,
    },
  });

  // Run the experiment
  await jsPsych.run(timeline);

  // Get the resulting data
  const resultData = jsPsych.data.get();
  // If the experiment is run by JATOS, pass the resulting data to the server
  // in CSV form.
  if (environment === 'jatos') {
    // Some editors may throw errors here if TypeScript is used, since the jatos
    // object is not created here but injected at runtime. This is why for the
    // following line, TypeScript errors are ignored.
    // @ts-ignore
    jatos.submitResultData(resultData.csv(), jatos.startNextComponent);
  }
  // In every other environment, print the data to the browser console in JSON
  // form. Here you can adjust what should happen to the data if the experiment
  // is served, e.g. by a common httpd server.
  else {
    console.log('End of experiment. Results:');
    console.log(resultData);
    resultData.localSave('csv', 'data.csv');
  }
}
