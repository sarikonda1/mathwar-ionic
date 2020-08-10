import { Injectable } from '@angular/core';
import {
  atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt, parser
} from 'mathjs';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  randomAnswer: any;
  constructor() { }
  generateQuestion(configurations: any) {
    let mathQuestion;
    const randomNumber = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    this.randomAnswer = '';
    switch (randomNumber) {
      case 1:
        mathQuestion = this.getMathQuestion({
          numberRange: configurations.mathAddSubQuestion.numberRange,
          amountOfNumber: configurations.mathAddSubQuestion.amountOfNumber,
          operations: configurations.mathAddSubQuestion.operations,
        });
        break;
      case 2:
        mathQuestion = this.getAPSequenceQuestion({
          firstNumber: configurations.aPSequenceQuestion.firstNumber,
          totalNumbers: configurations.aPSequenceQuestion.totalNumbers,
          difference: configurations.aPSequenceQuestion.difference,
        });
        break;
      case 3:
        mathQuestion = this.getGPSequenceQuestion({
          firstNumber: configurations.gPSequenceQuestion.firstNumber,
          totalNumbers: configurations.gPSequenceQuestion.totalNumbers,
          commonRatio: configurations.gPSequenceQuestion.commonRatio,
        });
        break;
      case 4:
        mathQuestion = this.getNumberCruncher({
          numberRange: configurations.numberCruncher.numberRange,
          amountOfNumber: configurations.numberCruncher.amountOfNumber,
          operations: configurations.numberCruncher.operations,
        });
        break;
      case 5:
        mathQuestion = this.getMathMulDevQuestion({
          numberRange: configurations.mathMulDivQuestion.numberRange,
          amountOfNumber: configurations.mathMulDivQuestion.amountOfNumber,
          operations: configurations.mathMulDivQuestion.operations,
        });
        break;
      default:
        mathQuestion = this.getMathQuestion({
          numberRange: '1-20',
          amountOfNumber: '2-3',
          operations: ['/', '*', '+', '-'],
        });
    }
    return mathQuestion;
  }

  getMathQuestion(config) {
    if (typeof config === 'undefined') {
      config = {};
    }

    let question = '';
    const questionArguments = [];
    const totalParts = this.getRandomNumberOfRange(typeof config.amountOfNumber === 'undefined' ? '2-4' : config.amountOfNumber);
    for (let i = 0; i < totalParts; i++) {
      const operation = typeof config.operations === 'undefined' ? this.getRandomOperation()
        : config.operations[Math.floor(Math.random() * config.operations.length)];
      const numberRange = (operation === '*' || operation === '/') ? '1-10' : config.numberRange;
      const n = this.getRandomNumberOfRange(typeof numberRange === 'undefined' ? '1-20' : numberRange);
      if (i !== 0) {
        if (operation === '/') {
          questionArguments[questionArguments.length - 1] *= n;
        }
        questionArguments.push(operation);
      }
      questionArguments.push(n);
    }
    question = questionArguments.join(' ');
    const answer = evaluate(question);
    const completeQuestion = question + ' = ' + answer;
    const questionSplit = completeQuestion.split(' ');
    while (true) {
      const index = Math.floor(Math.random() * (questionSplit.length - 1)) + 1; // generate new index
      if (questionSplit[index] !== '_' && questionSplit[index] !== ' ' && questionSplit[index] !== '=') {
        this.randomAnswer = questionSplit[index];
        questionSplit[index] = '?';
        break;
      }
    }

    return {
      question: questionSplit.join(' '),
      answer: this.randomAnswer,
      answerType: (!isNaN(parseFloat(this.randomAnswer)) && !isNaN(this.randomAnswer - 0)) ? 1 : 2,
      questionTitle: (!isNaN(parseFloat(this.randomAnswer)) && !isNaN(this.randomAnswer - 0)) ? 'Find The Missing Number' : 'Find The Missing Operator'
    };

  }

  getMathMulDevQuestion(config) {
    if (typeof config === 'undefined') {
      config = {};
    }

    let question = '';
    const questionArguments = [];
    const totalParts = this.getRandomNumberOfRange(typeof config.amountOfNumber === 'undefined' ? '2-4' : config.amountOfNumber);
    for (let i = 0; i < totalParts; i++) {
      const operation = typeof config.operations === 'undefined' ? this.getRandomOperation()
        : config.operations[Math.floor(Math.random() * config.operations.length)];
      const numberRange = (operation === '*' || operation === '/') ? '1-10' : config.numberRange;
      const n = this.getRandomNumberOfRange(typeof numberRange === 'undefined' ? '1-20' : numberRange);
      if (i !== 0) {
        if (operation === '/') {
          questionArguments[questionArguments.length - 1] *= n;
        }
        questionArguments.push(operation);
      }
      questionArguments.push(n);
    }
    question = questionArguments.join(' ');

    const answer = evaluate(question);
    const completeQuestion = question + ' = ' + answer;
    const questionSplit = completeQuestion.split(' ');
    for (let index = 0; index < questionSplit.length; index++) {
      if (questionSplit[index] === '*') {
        questionSplit[index] = '×';
      }
      if (questionSplit[index] === '/') {
        questionSplit[index] = '÷';
      }
    }
    while (true) {
      const index = Math.floor(Math.random() * (questionSplit.length - 1)) + 1; // generate new index
      if (questionSplit[index] !== '_' && questionSplit[index] !== ' ' && questionSplit[index] !== '=') {
        this.randomAnswer = questionSplit[index];
        questionSplit[index] = '?';
        break;
      }
    }

    return {
      question: questionSplit.join(' '),
      answer: this.randomAnswer,
      answerType: (!isNaN(parseFloat(this.randomAnswer)) && !isNaN(this.randomAnswer - 0)) ? 1 : 2,
      questionTitle: (!isNaN(parseFloat(this.randomAnswer)) && !isNaN(this.randomAnswer - 0)) ? 'Find The Missing Number' : 'Find The Missing Operator'
    };

  }
  getAPSequenceQuestion(config) {
    if (typeof config === 'undefined') {
      config = {};
    }

    const firstNumber = this.getRandomNumberOfRange(typeof config.firstNumber !== 'undefined' ? config.firstNumber : '1-10');
    const totalNumbers = this.getRandomNumberOfRange(typeof config.totalNumbers !== 'undefined' ? config.totalNumbers : '1-10');
    const difference = this.getRandomNumberOfRange(typeof config.difference !== 'undefined' ? config.difference : '1-10');
    let currentTerm = firstNumber;
    const sequenceArray = [];
    sequenceArray.push(currentTerm);
    for (let i = 1; i <= totalNumbers; i++) {
      currentTerm += difference;
      sequenceArray.push(currentTerm);
    }
    const index = Math.floor(Math.random() * (sequenceArray.length - 2)) + 1; // generate new index

    this.randomAnswer = sequenceArray[index];
    sequenceArray[index] = '?';

    return {
      question: sequenceArray.join(' '),
      answer: typeof (this.randomAnswer) === 'number' ? this.randomAnswer.toString() : this.randomAnswer,
      answerType: 3,
      questionTitle: 'Complete The Sequence'
    };
  }
  getGPSequenceQuestion(config) {
    if (typeof config === 'undefined') {
      config = {};
    }
    const firstNumber = this.getRandomNumberOfRange(typeof config.firstNumber !== 'undefined' ? config.firstNumber : '1-10');
    const totalNumbers = this.getRandomNumberOfRange(typeof config.totalNumbers !== 'undefined' ? config.totalNumbers : '1-10');
    const commonRatio = this.getRandomNumberOfRange(typeof config.commonRatio !== 'undefined' ? config.commonRatio : '2-5');
    let currentTerm = firstNumber;
    const sequenceArray = [];
    sequenceArray.push(currentTerm);
    for (let i = 1; i <= totalNumbers; i++) {
      currentTerm *= commonRatio;
      sequenceArray.push(currentTerm);
    }
    const index = Math.floor(Math.random() * (sequenceArray.length - 2)) + 1;
    // generate new index
    this.randomAnswer = sequenceArray[index];
    sequenceArray[index] = '?';

    return {
      question: sequenceArray.join(' '),
      answer: typeof (this.randomAnswer) === 'number' ? this.randomAnswer.toString() : this.randomAnswer,
      answerType: 4,
      questionTitle: 'Complete The Sequence'
    };
  }

  getNumberCruncher(config) {
    if (typeof config === 'undefined') {
      config = {};
    }

    let question = '';
    const questionArguments = [];
    const totalParts = this.getRandomNumberOfRange(typeof config.amountOfNumber === 'undefined' ? '2-4' : config.amountOfNumber);
    for (let i = 0; i < totalParts; i++) {
      const operation = typeof config.operations === 'undefined' ? this.getRandomOperation()
        : config.operations[Math.floor(Math.random() * config.operations.length)];
      const numberRange = (operation === '*' || operation === '/') ? '1-10' : config.numberRange;
      const n = this.getRandomNumberOfRange(typeof numberRange === 'undefined' ? '1-20' : numberRange);
      if (i !== 0) {
        if (operation === '/') {
          questionArguments[questionArguments.length - 1] *= n;
        }
        questionArguments.push(operation);
      }
      questionArguments.push(n);
      // question += (i !== 0 ?  ' ' + operation + ' '  : '') + number;
    }
    question = questionArguments.join(' ');
    const completeQuestion = question + ' = ' + '?';


    const questionParts = completeQuestion.split('=');
    const originalQuestion = questionParts[0].split(' ');
    let finalAnswer = '';
    originalQuestion.map((oq, i) => {
      finalAnswer = i % 2 ? finalAnswer.toString().concat(oq) : evaluate(finalAnswer.toString().concat(oq));
    });
    this.randomAnswer = finalAnswer;
    return {
      question: completeQuestion,
      answer: this.randomAnswer,
      answerType: 5,
      questionTitle: 'Find The Answer'
    };
  }

  getRandomNumberOfRange(range) {
    const rangeSplit = range.split('-');

    if (rangeSplit.length <= 0) {
      return parseInt(range, 10);
    }

    return Math.floor(Math.random() * (+rangeSplit[1] - +rangeSplit[0])) + +rangeSplit[0];
  }

  getRandomOperation() {
    const randomNumber = Math.floor(Math.random() * (4 - 1 + 1) + 1);

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

  evaluteAnswer(question: any, enteredAnswer: any): boolean {
    let finalQuestion = question.replace('?', enteredAnswer);
    if (finalQuestion.includes('×')) {
      finalQuestion = finalQuestion.replace('×', '*');
    }
    if (finalQuestion.includes('÷')) {
      finalQuestion = finalQuestion.replace('÷', '/');
    }

    let questionParts;
    questionParts = finalQuestion.split('=');
    return (evaluate(questionParts[0]) === evaluate(questionParts[1]));
  }
}
