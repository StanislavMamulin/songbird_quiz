import './styles.css';
import { AnswerButton } from '../AnswerButton/index';

export const generateAnswersList = (answers = [], answerClickHandler = () => {}) => {
  const answersElement = document.querySelector('.answers');

  answers.forEach((answer) => {
    answersElement.append(AnswerButton({ title: answer, onclick: answerClickHandler }));
  });
};
