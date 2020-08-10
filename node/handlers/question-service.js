// var randomMathQuestion = require('random-math-question');
var randomMathQuestion = require('../utils/math-question-generator')
const CONSTANTS = require('./../config/constants');
var rn = require('random-number');
module.exports = {
  getAll
};


async function getAll() {
  var allQuestions = [];
  const questionCount = CONSTANTS.TOTAL_NUMBER_OF_QUESTIONS;
  for(i = 0; i < questionCount; i++) {
    var randomNumber = rn({ min: 1, max: 5, integer: true });
    switch(randomNumber) {
      case 1:
      case 2:
        var mathQuestion = randomMathQuestion.getMathQuestion({
          numberRange: '1-10',
          amountOfNumber: '2-3',
          operations: ['+', '-'],
        });
        break;
      case 3:
        var mathQuestion = randomMathQuestion.getAPSequenceQuestion({
          firstNumber: '1-5',
          totalNumbers: '5-6',
          difference: '2-10',
        });
        break;
      case 4:
        var mathQuestion = randomMathQuestion.getGPSequenceQuestion({
          firstNumber: '1-5',
          totalNumbers: '4-6',
          commonRatio: '2-5',
        });
        break;
        case 5:
          var mathQuestion = randomMathQuestion.getNumberCruncher({
            numberRange: '1-100',
            amountOfNumber: '5-8',
            operations: [ '+', '-'],
          });
        break;
      default:
        var mathQuestion = randomMathQuestion.getMathQuestion({
          numberRange: '1-10',
          amountOfNumber: '2-3',
          operations: [ '+', '-'],
        });
    }
    allQuestions.push(mathQuestion);

  }

  return allQuestions;
}

