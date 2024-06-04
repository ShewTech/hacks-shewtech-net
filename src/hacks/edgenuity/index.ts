export default {
  id: 'edgenuity',
  name: 'Edgenuity',
  visible: true,
  functions: {
    Start: 'Start',
    Stop: 'Stop',
  },
  dependencies: [],
  scripts: [
    'utils.js',
    // ---- activities ----
    'activities/vocabulary.js',
    'activities/quiz.js',
    // --------------------
    'main.js',
  ],
};
