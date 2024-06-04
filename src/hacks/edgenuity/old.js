/* eslint-disable */
// @ts-nocheck

var $, jQuery;
$ = jQuery = window.jQuery;

/**
 * Mode to use for question answering
 * click - clicks the correct answer
 * highlight - highlights the correct answer
 * @type {'click' | 'highlight'}
 */
var MODE = 'highlight';

function askChatGPT() {
  // if activty title includes test or quiz, and activity status is Active
  if (
    ['Pre-Test', 'Test', 'Quiz'].includes((x = $('#activity-title').text())) &&
    $('#activity-status').text() == 'Active'
  ) {
    clearInterval(advanceInterval);

    // get the question
    var question = $('#stageFrame')
      .contents()
      .find('div.question-container')
      .children()[
      Number(
        $('#stageFrame')
          .contents()
          .find('.plainbtn.alt.icon.yellow.selected')
          .text()
      ) - 1
    ]?.innerText;

    console.log('Question:', {
      container: $('#stageFrame').contents().find('div.question-container'),
      questionNum: Number(
        $('#stageFrame')
          .contents()
          .find('.plainbtn.alt.icon.yellow.selected')
          .text()
      ),
      questionElem: $('#stageFrame')
        .contents()
        .find('div.question-container')
        .children()[
        Number(
          $('#stageFrame')
            .contents()
            .find('.plainbtn.alt.icon.yellow.selected')
            .text()
        ) - 1
      ],
      question: question,
    });

    if (!question || question == '') {
      console.log('No question found');
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
        var answer = data.choices[0].message.content;
        console.log('Answer from GPT-4o:', answer);

        // select the answer
        var parsedAnswer = JSON.parse(answer.replaceAll('```', ''));

        // select the answer choice with the exact text from the answer
        var answerChoices = $('#stageFrame')
          .contents()
          .find('div.question-container')
          .children()
          [
            Number(
              $('#stageFrame')
                .contents()
                .find('.plainbtn.alt.icon.yellow.selected')
                .text()
            ) - 1
          ].querySelectorAll('.answer-choice');

        for (var i = 0; i < answerChoices.length; i++) {
          if (answerChoices[i].innerText.includes(parsedAnswer.answer)) {
            console.log(MODE);
            if (MODE == 'click') {
              // click the answer
              answerChoices[i].querySelector('input').click();

              var button = $('#stageFrame')
                .contents()
                .find('.uibtn.uibtn-arrow-next.uibtn-blue');

              setTimeout(() => {
                // advance to the next question
                button[0].click();
              }, Math.random() * 1000);
            } else {
              // highlight the answer
              answerChoices[i].style.backgroundColor = 'yellow';
            }

            break;
          }
        }
      });
    });
  } else {
    console.log('Not a test or quiz');
  }
}

function advance() {
  // check if can advance to next activity
  let nextActivity = $('.footnav.goRight');

  // if disabled class is not present, click it
  if (!nextActivity.hasClass('disabled')) {
    nextActivity.click();
    clearInterval(advanceInterval);
    setTimeout(() => {
      advanceInterval = setInterval(() => {
        advance();
      }, 100);
    }, 5000);
  }

  // check if it's an Instruction
  if (
    ['Instruction', 'Warm-Up', 'Assignment'].includes(
      $('#activity-title').text()
    )
  ) {
    var next = $('#stageFrame').contents().find('.FrameRight');

    if (next.length == 0) {
      console.log('No next button found');
      return;
    }

    // if the opacity is below 1, click it
    if (next.css('opacity') < 1) {
      next.click();
      clearInterval(advanceInterval);
      setTimeout(() => {
        advanceInterval = setInterval(() => {
          advance();
        }, 100);
      }, 5000);
    } else {
      console.log('Next button is not ready');
    }
  } else {
    console.log('Not an instruction');
  }
}

var interval;
var advanceInterval;

function Start() {
  interval = setInterval(
    () => {
      askChatGPT();
    },
    // between 3 and 5 seconds
    Math.random() * 2000 + 3000
  );

  advanceInterval = setInterval(() => {
    advance();
  }, 100);
}

function Stop() {
  clearInterval(interval);
}
