/* eslint-disable */
// @ts-nocheck

/**
 * Useful for re-injecting the script during development
 */
function Reset() {
  if (window.loopInstance) clearInterval(window.loopInstance);
  if (window.quickLoopInstance) clearInterval(window.quickLoopInstance);
}

/**
 * Quick loop function
 *
 * Interates far quicker than the main loop
 */
function QuickLoop() {
  // Hide the blocker because it's annoying af
  HideBlocker();

  // Disable New Relic monitoring
  disableNewRelic();
}

/**
 * Main loop function
 */
function Loop() {
  Advance();

  const activity = getActivityType();

  ExecuteActivity(activity);
}

/**
 * Pause loops for a certain amount of time
 * @param {number} ms
 */
function Pause(ms) {
  clearInterval(window.loopInstance);
  clearInterval(window.quickLoopInstance);

  setTimeout(() => {
    window.loopInstance = setInterval(Loop, 3000);
    window.quickLoopInstance = setInterval(QuickLoop, 100);
  }, ms);
}

/**
 * Runs on script injection
 */
function onLoad() {
  Reset();

  initListener();
}

onLoad();

// ----------------- functions -----------------

function Start() {
  Reset();

  window.loopInstance = setInterval(Loop, 3000);
  window.quickLoopInstance = setInterval(QuickLoop, 100);
}

function Stop() {
  Reset();
}
