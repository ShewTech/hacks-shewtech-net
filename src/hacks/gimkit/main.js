/* eslint-disable */
// @ts-nocheck

var interval;

function React(i) {
  return i[Object.keys(i)[1]];
}

function Value(i) {
  return {
    target: {
      value: i,
    },
  };
}

function GetQuestion() {
  return [...document.querySelectorAll('div')]
    .map(React)
    .find((i) => i?.children?.props?.currentQuestion).children.props
    .currentQuestion;
}

function GetAnswer(i = GetQuestion()) {
  return i.answers.indexOf(i.answers.find((i) => i.correct));
}

function GetQuestionRegular() {
  return [...document.querySelectorAll('div')]
    .map(React)
    .filter((i) => i?.children?.length > 1)
    .find((i) => i.children[1].props?.answers).children[1].props;
}

function RunRegular() {
  try {
    var i,
      e = document.querySelector(
        '#content > div > div:nth-child(1) > div > div > div.maxAll.flex-column > div > div > div:nth-child(2)'
      ),
      t = GetQuestionRegular();
    document.querySelector('input')
      ? React(document.querySelector('input')).onChange(
          Value(t.answers[0].text)
        )
      : ((i = GetAnswer(t)), React(e.children[i]).onClick({})),
      NextRegular();
  } catch {
    try {
      NextRegular();
    } catch {}
  }
}

function NextRegular() {
  React(
    document.querySelector(
      '#content > div > div:nth-child(1) > div > div > div.maxAll.flex-column > div > div > div > div > span:nth-child(2)'
    ) ??
      document.querySelector(
        '#content > div > div:nth-child(1) > div > div > div.maxAll.flex-column > div > div > div:nth-child(2) > div > div'
      )
  ).onClick({});
}

function RunBait() {
  try {
    Open();
    var i,
      e = document.querySelector(
        '#game-div > div > div > div.maxAll > div > div > div:nth-child(2) > div > div:nth-child(2)'
      ),
      t = GetQuestion();
    document.querySelector('input')
      ? React(document.querySelector('input')).onChange(
          Value(t.answers[0].text)
        )
      : ((i = GetAnswer(t)), React(e.children[i]).onClick({})),
      Next();
  } catch {
    try {
      Close();
    } catch {}
  }
}

function RunFish() {
  try {
    FishAgain();
  } catch {
    try {
      Open();
    } catch {}
  }
}

function FishAgain() {
  document
    .querySelector(
      '#game-div > div > div > div.maxAll > div > div > div.medium-shadow.flex-column.vc > div > div > button:nth-child(1)'
    )
    .click();
}

function Open() {
  React(
    document.querySelector('#game-div > div > div > div.maxAll.hc > div > div')
  ).onClick({
    stopPropagation: () => {},
  });
}

function Close() {
  React(
    document.querySelector(
      '#game-div > div > div > div.maxAll > div > div > div.flex.maxWidth.between.vc > span'
    )
  ).onClick({});
}

function Next() {
  React(
    document.querySelector(
      '#game-div > div > div > div.maxAll > div > div > div:nth-child(2) > div > div > div > span:nth-child(2)'
    ) ??
      document.querySelector(
        '#game-div > div > div > div.sc-jGDUUe.FGTQT.maxAll > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div'
      )
  ).onClick({});
}

function Bait() {
  try {
    Stop();
  } catch {}
  interval = setInterval(RunBait, 100);
}

function Fish() {
  try {
    Stop();
  } catch {}
  interval = setInterval(RunFish, 100);
}

function Regular() {
  try {
    Stop();
  } catch {}
  interval = setInterval(RunRegular, 300);
}

function Stop() {
  clearInterval(interval);
}
