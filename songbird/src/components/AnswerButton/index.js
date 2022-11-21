import { htmlToElement } from '../../utils/htmlToElement';
import { answerStatuses } from '../../data/statuses';

import './styles.css';
import answerButton from './index.html';

export const AnswerButton = ({ title = '', onclick = () => {} }) => {
  const itemElement = htmlToElement(answerButton);
  const titleElement = itemElement.querySelector('.answer-item__title');

  titleElement.innerText = title;
  itemElement.addEventListener('click', onclick);

  return itemElement;
};

export const setStatus = (button, answerStatus) => {
  if (answerStatus === answerStatuses.correct) {
    button.classList.add('indicator_correct');
  } else if (answerStatus === answerStatuses.wrong) {
    button.classList.add('indicator_wrong');
  }
};
