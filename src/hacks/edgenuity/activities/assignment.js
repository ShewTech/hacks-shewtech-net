/* eslint-disable */
// @ts-nocheck

RegisterActivity('Assignment', () => {
  /**
   * Mode to use for question answering
   * click - clicks the correct answer
   * highlight - highlights the correct answer
   * @type {'click' | 'highlight'}
   */
  const MODE = 'click';

  if (API.Frame.isComplete()) {
    API.FrameChain.nextFrame();
  } else {
    // must be a comphrension check
    const questions = API.Frame.StackProgress.reduce(
      (acc, stack) =>
        stack.TaskProgress ? acc.concat(stack.TaskProgress) : acc,
      []
    ).filter((task) => !task.Complete);

    const answers = Promise.all(
      questions.map(async (question) => {
        // If there is more than 1 question, then
        // we are likely dealing with a passage with
        // multiple dropdowns within it
        const q =
          questions.length > 1
            ? API.childWindow.$(`[qid="${question.Guid}"]`)
            : API.childWindow.$('body');

        if (q.length === 0) {
          return Promise.resolve(null);
        }

        const html =
          questions.length > 1
            ? `Passage: """${API.childWindow.$('body')[0].innerText}""" Question: """${q[0].innerText}""`
            : q[0].innerText;

        return {
          id: question.Guid,
          data: await getChatCompletion(
            html,
            'You are a helpful AI that answers multiple choice questions from parsed html text. If there is an "X " preceeding the choice, that choice is incorrect. Respond in the exact following format (entire response must be json parsable): { "answer": "<exact answer text from provided question>" }'
          ),
        };
      })
    );

    answers
      .then((responses) => {
        responses
          .filter((response) => response !== null)
          .forEach((response) => {
            response.data.json().then((data) => {
              const answer = JSON.parse(
                data.choices[0].message.content
                  .replaceAll('```json', '')
                  .replaceAll('```', '')
              ).answer;

              const select = API.childWindow.$(`[qid="${response.id}"] select`);

              if (select.length > 0) {
                const options = select.find('option');

                for (let i = 0; i < options.length; i++) {
                  if (options[i].innerText === answer) {
                    select.val(options[i].value);
                    break;
                  }
                }
              } else {
                const correctAnswer = API.childWindow.$(
                  `div:contains(${answer}):last`
                );

                if (correctAnswer) {
                  if (MODE === 'click') {
                    correctAnswer.click();
                  } else {
                    correctAnswer.css('background-color', 'yellow');
                  }
                } else {
                  console.log('Answer not found:', answer);
                }
              }
            });
          });
      })
      .then(() => {
        // if (MODE === 'click') API.Frame.check();
      });

    // API.Frame.complete();
  }
});
