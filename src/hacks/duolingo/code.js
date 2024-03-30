
/* eslint-disable */
// @ts-nocheck

var interval;

function GetQuestion() {
    return [...document.querySelectorAll("div")].map(React).filter(e => e && e.hasOwnProperty("data-test") && e["data-test"].includes("challenge"))[0]
}

function GetChallenge(e = GetQuestion()) {
    return e.children.props.children[1].props.challenge ?? GetQuestion().children.props.children[1].props.children[1]?.props?.challenge ?? GetQuestion().children.props.children[1].props.children.props.challenge
}

function React(e) {
    return e[Object.keys(e)[1]]
}

function Value(e) {
    return {
        target: {
            value: e
        }
    }
}

function Run() {
    console.log('running hack loop')
    if (!window.location.href.includes("learn")) try {
        var e = GetQuestion(),
            l = GetChallenge(e);
        ({
            "challenge challenge-translate": () => {
                if (l.challengeGeneratorIdentifier.specificType === 'reverse_translate') {
                    React(document.querySelector("textarea[data-test='challenge-translate-input']")).onChange(Value(l.correctSolutions[0])), setTimeout(DoubleNext, 200)
                    return;
                } else {
                let wordBank = document.querySelector('[data-test="word-bank"]');
                let words = [...wordBank.querySelectorAll('button')];

                new Promise((resolve) => {
                    let correctTokens = l.correctTokens;
                    let correctTokensIndex = 0;

                    let interval = setInterval(() => {
                        if (correctTokensIndex >= correctTokens.length) {
                            clearInterval(interval);
                            resolve();
                            return;
                        }

                        const correctToken = correctTokens[correctTokensIndex];
                        const word = words.find(word => word.innerText === correctToken);

                        if (word) {
                            word.click();
                        }

                        const indexToRemove = words.findIndex(word => word.innerText === correctToken);
                        if (indexToRemove !== -1) {
                            words.splice(indexToRemove, 1);
                        }

                        correctTokensIndex++;
                    }, 50)
                }
                ).then(DoubleNext)
            }
            },
            "challenge challenge-tapComplete": () => {
                let wordBank = document.querySelector('[data-test="word-bank"]');
                let buttons = [...wordBank.querySelectorAll('button')];
                
                new Promise((resolve) => {
                    let correctIndices = l.correctIndices;
                    let correctIndicesIndex = 0;

                    let interval = setInterval(() => {
                        if (correctIndicesIndex >= correctIndices.length) {
                            clearInterval(interval);
                            resolve();
                            return;
                        }

                        const correctIndex = correctIndices[correctIndicesIndex];

                        if (buttons[correctIndex]) {
                            buttons[correctIndex].click();
                        }

                        correctIndicesIndex++;
                    }, 50)
                }).then(DoubleNext)

            },
            "challenge challenge-select": () => {
                React(document.querySelectorAll('div[data-test="challenge-choice-card"')[l.correctIndex]).onClick({}), DoubleNext()
            },
            "challenge challenge-dialogue": () => {
                DoubleNext(), React(document.querySelectorAll('div[data-test="challenge-choice"]')[l.correctIndex]).onClick({}), DoubleNext()
            },
            "challenge challenge-assist": () => {
                React(document.querySelectorAll('div[data-test="challenge-choice"]')[l.correctIndex]).onClick({}), DoubleNext()
            },
            "challenge challenge-name": () => {
                React(document.querySelector("input[data-test='challenge-text-input'")).onChange(Value(l.correctSolutions[0].split(" ")[0] + " ")), setTimeout(() => React(document.querySelector("input[data-test='challenge-text-input'")).onChange(Value(React(document.querySelector("input[data-test='challenge-text-input'")).value == l.correctSolutions[0].split(" ")[0] + " " ? l.correctSolutions[0] : l.correctSolutions[0].split(" ")[1])), 100), setTimeout(DoubleNext, 200)
            },
            "challenge challenge-match": () => {
                var l = [...document.querySelectorAll('button[data-test="challenge-tap-token"]')],
                    e = GetChallenge().pairs.map(e => [e.learningToken, e.fromToken]),
                    c = l.map(React).map(e => e.children[0][0].props.children[0]);
                e.forEach((e, t) => {
                    setTimeout(() => e.forEach((e, t) => setTimeout(() => React(l[c.indexOf(e)]).onClick({}), 250 * t)), 500 * t)
                }), DoubleNext()
            },
            "challenge challenge-gapFill": () => {
                React(document.querySelectorAll('[data-test="challenge-choice"]')[l.correctIndex]).onClick({}), DoubleNext()
            },
            "challenge challenge-readComprehension": () => {
                DoubleNext(), React(document.querySelectorAll('div[data-test="challenge-choice"]')[l.correctIndex]).onClick({}), DoubleNext()
            },
            "challenge challenge-completeReverseTranslation": () => {
                React(document.querySelector("textarea[data-test='challenge-translate-input']")).onChange(Value(l.displayTokens.reduce((e, t) => e + t.text, ""))), DoubleNext()
            }
        })[e["data-test"]]()
    } catch {
        Next()
    }
}

function DoubleNext(e = 100) {
    Next(), setTimeout(Next, e)
}

function Next() {
    (document.querySelector('button[data-test="player-next"') ?? document.querySelector("button")).click()
}

function Skip() {
    document.querySelector('button[data-test="player-skip"').click()
}

function Start(e = 1e3) {
    console.log('Starting')
    interval = setInterval(Run, e)
}

function Stop() {
    console.log('Stopping')
    clearInterval(interval)
}