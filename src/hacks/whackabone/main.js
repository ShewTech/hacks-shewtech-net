/* eslint-disable */
// @ts-nocheck

function Run() {
  setInterval(() => {
    Object.keys(GDAPI.currentScene._runtimeGame._variables._variables.items)
      .filter((a) => a.includes('complete'))
      .forEach((p) => {
        GDAPI.currentScene._runtimeGame._variables._variables.items[p]._type =
          'boolean';
        GDAPI.currentScene._runtimeGame._variables._variables.items[p]._bool =
          true;
        GDAPI.currentScene._runtimeGame._variables._variables.items[
          p.substring(0, 2) + 'TotalScore'
        ] = GDAPI.currentScene._runtimeGame._variables._variables.items[p];
        GDAPI.currentScene._runtimeGame._variables._variables.items[
          p.substring(0, 2) + 'TotalScore'
        ]._type = 'number';
        GDAPI.currentScene._runtimeGame._variables._variables.items[
          p.substring(0, 2) + 'TotalScore'
        ]._value = 100;
      });
    GDAPI.currentScene._runtimeGame._variables._variables.items.totalScore =
      GDAPI.currentScene._runtimeGame._variables._variables.items.readyForNext =
      GDAPI.currentScene._runtimeGame._variables._variables.items.WNCounter =
      GDAPI.currentScene._runtimeGame._variables._variables.items.WWNewTotal =
        GDAPI.currentScene._runtimeGame._variables._variables.items.CBTotalScore;
  }, 100);
}
