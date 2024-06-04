/* eslint-disable */
// @ts-nocheck

RegisterActivity('Quiz', () => {
  /**
   * Mode to use for question answering
   * click - clicks the correct answer
   * highlight - highlights the correct answer
   * @type {'click' | 'highlight'}
   */
  const MODE = 'highlight';

  var $ = (jQuery = window[0].jQuery);

  // get the question
  const question = $('div.question-container').children()[
    Number($('.plainbtn.alt.icon.yellow.selected').text()) - 1
  ]?.innerText;

  if (!question || question == '') {
    console.warn('No question found');
    return;
  }

  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer {{NEXT_PUBLIC_OPENAI_API_KEY}}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful AI that answers multiple choice questions from parsed html text. Respond in the exact following format (entire response must be json parsable): { "answer": "<exact answer text from provided question>" }',
        },
        {
          role: 'user',
          content: question,
        },
      ],
    }),
  }).then((response) => {
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

        setTimeout(() => {
          $('.uibtn.uibtn-arrow-next.uibtn-blue').click();
        }, 1000);
      } else if (MODE === 'highlight') {
        correctAnswer.css('background-color', 'yellow');
      }
    });
  });
});
