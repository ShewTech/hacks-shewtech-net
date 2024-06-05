/* eslint-disable */
// @ts-nocheck

RegisterActivity(
  ['Quiz', 'Pre-Test', 'Test', 'Unit Test', 'Unit 1 Quiz'],
  () => {
    /**
     * Fail pretests
     *
     * This is useful for bypassing possible suspision of cheating
     */
    const FAIL_PRETESTS = false;

    /**
     * Mode to use for question answering
     * click - clicks the correct answer
     * highlight - highlights the correct answer
     * @type {'click' | 'highlight'}
     */
    const MODE = 'highlight';

    // get the question
    const question = $('div.question-container').children()[
      Number($('.plainbtn.alt.icon.yellow.selected').text()) - 1
    ]?.innerText;

    if (!question || question == '') {
      console.warn('No question found');
      return;
    }

    // if fail pretests is enabled, choose a random answer and click it
    if (FAIL_PRETESTS) {
      const choices = $('div.question-container')
        .children()
        .find('.answer-choice');

      const randomAnswer = choices[Math.floor(Math.random() * choices.length)];

      randomAnswer.click();

      setTimeout(
        () => {
          API.FrameChain.nextFrame();
        },
        Math.random() * 5000 + 1000
      );

      return;
    }

    getChatCompletion(
      question,
      'You are a helpful AI that answers multiple choice questions from parsed html text. Respond in the exact following format (entire response must be json parsable): { "answer": "<exact answer text from provided question>" }'
    ).then((response) => {
      response.json().then((data) => {
        const answer = JSON.parse(
          data.choices[0].message.content.replaceAll('```', '')
        ).answer;

        console.log('Answer:', answer);

        const correctAnswer = $('div.question-container')
          .children()
          .find('.answer-choice:contains(' + answer + ')');

        if (MODE === 'click') {
          correctAnswer.click();

          setTimeout(
            () => {
              API.FrameChain.nextFrame();
            },
            Math.random() * 5000 + 1000
          );
        } else if (MODE === 'highlight') {
          correctAnswer.css('background-color', 'yellow');
        }
      });
    });
  }
);
