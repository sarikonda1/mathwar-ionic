var rn = require('random-number');
var math = require('mathjs');

exports.getMathQuestion = function(config) {
  //This is just so JS won't throw errors for there not being any config value when testing 'typeof config.amountOfNumber...' etc.
  if (typeof config === 'undefined')
    config = {};

  var question = '';
  var questionArguments = [];
  var totalParts = getRandomNumberOfRange(typeof config.amountOfNumber === 'undefined' ? '2-4' : config.amountOfNumber);
  for (var i = 0; i < totalParts; i++) {
    var operation = typeof config.operations === 'undefined' ? getRandomOperation()
        : config.operations[Math.floor(Math.random() * config.operations.length)];
    const numberRange = (operation == '*' || operation == '/') ? '1-10' : config.numberRange;
    var number = getRandomNumberOfRange(typeof numberRange === 'undefined' ? '1-20' : numberRange);
    if(i !== 0){
      if(operation == '/') {
        questionArguments[questionArguments.length - 1] *= number;
      }
      questionArguments.push(operation);
    }
    questionArguments.push(number);
    // question += (i !== 0 ?  ' ' + operation + ' '  : '') + number;
  }
  question = questionArguments.join(' ');
  var answer = math.evaluate(question);
  var completeQuestion = question + ' = ' + answer;
  var questionSplit = completeQuestion.split(' ');
  var randomAnswer;
  while(true){
    var index = Math.floor(Math.random()*(questionSplit.length-1)) + 1; //generate new index
    if(questionSplit[index] !== '_' && questionSplit[index] !== ' ' && questionSplit[index] !== '=' ) {
      randomAnswer = questionSplit[index];
      questionSplit[index] = '?';
      break;
    }
  }

  return {
    question: questionSplit.join(' '),
    answerType: (!isNaN(parseFloat(randomAnswer)) && !isNaN(randomAnswer - 0)) ? 1 : 2
  };

};

exports.getAPSequenceQuestion = function(config) {
  if (typeof config === 'undefined')
    config = {};
  const firstNumber = getRandomNumberOfRange( typeof config.firstNumber !== 'undefined' ? config.firstNumber : '1-100');
  const totalNumbers = getRandomNumberOfRange( typeof config.totalNumbers !== 'undefined' ? config.totalNumbers : '1-10');
  const difference = getRandomNumberOfRange( typeof config.difference !== 'undefined' ? config.difference : '1-10');
  let currentTerm = firstNumber;
  const sequenceArray = [];
  sequenceArray.push(currentTerm);
  for (var i = 1; i <= totalNumbers; i++) {
    currentTerm += difference;
    sequenceArray.push(currentTerm);
  }
  var index = Math.floor(Math.random()*(sequenceArray.length)) + 1; //generate new index
  randomAnswer = sequenceArray[index];
  sequenceArray[index] = '?';

  return {
    question: sequenceArray.join(' '),
    answerType: 3
  };
}
exports.getGPSequenceQuestion = function(config) {
  if (typeof config === 'undefined')
    config = {};
  const firstNumber = getRandomNumberOfRange( typeof config.firstNumber !== 'undefined' ? config.firstNumber : '1-10');
  const totalNumbers = getRandomNumberOfRange( typeof config.totalNumbers !== 'undefined' ? config.totalNumbers : '1-10');
  const commonRatio = getRandomNumberOfRange( typeof config.commonRatio !== 'undefined' ? config.commonRatio : '2-5');
  let currentTerm = firstNumber;
  const sequenceArray = [];
  sequenceArray.push(currentTerm);
  for (var i = 1; i <= totalNumbers; i++) {
    currentTerm *= commonRatio;
    sequenceArray.push(currentTerm);
  }
  var index = Math.floor(Math.random()*(sequenceArray.length)) + 1; //generate new index
  randomAnswer = sequenceArray[index];
  sequenceArray[index] = '?';

  return {
    question: sequenceArray.join(' '),
    answerType: 4
  };
}
exports.getNumberCruncher = function(config) {
  if (typeof config === 'undefined')
    config = {};

  var question = '';
  var questionArguments = [];
  var totalParts = getRandomNumberOfRange(typeof config.amountOfNumber === 'undefined' ? '2-4' : config.amountOfNumber);
  for (var i = 0; i < totalParts; i++) {
    var operation = typeof config.operations === 'undefined' ? getRandomOperation()
        : config.operations[Math.floor(Math.random() * config.operations.length)];
    const numberRange = (operation == '*' || operation == '/') ? '1-10' : config.numberRange;
    var number = getRandomNumberOfRange(typeof numberRange === 'undefined' ? '1-20' : numberRange);
    if(i !== 0){
      if(operation == '/') {
        questionArguments[questionArguments.length - 1] *= number;
      }
      questionArguments.push(operation);
    }
    questionArguments.push(number);
    // question += (i !== 0 ?  ' ' + operation + ' '  : '') + number;
  }
  question = questionArguments.join(' ');
  var completeQuestion = question + ' = ' + '?';


  return {
    question: completeQuestion,
    answerType: 5
  };
}

function getRandomNumberOfRange(range) {
  var rangeSplit = range.split('-');

  if (rangeSplit.length <= 0)
    return parseInt(range);

  return rn({ min: parseInt(rangeSplit[0]), max: parseInt(rangeSplit[1]), integer: true });
}

function getRandomOperation() {
  var randomNumber = rn({ min: 1, max: 4, integer: true });

  switch (randomNumber) {
    case 1:
      return '/';
    case 2:
      return '*';
    case 3:
      return '+';
    case 4:
      return '-';
  }
}
