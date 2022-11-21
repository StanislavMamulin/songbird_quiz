import { CategoryItem } from '../../../components/CategoryItem/index';
import { BirdPlayer, initPlayer } from '../../../components/BirdPlayer';
import { quizCategories } from '../../../data/birds';
import { generateAnswersList } from '../../../components/Answers';

const fillInTheCategoriesList = () => {
  const categoriesListElement = document.querySelector('.question-categories');

  quizCategories.forEach((category) => {
    categoriesListElement.append(CategoryItem({ title: category }));
  });
};

const addPlayer = () => {
  const currentQuestionElement = document.querySelector('.current-question');
  currentQuestionElement.append(BirdPlayer);
  initPlayer();
};

export const makeQuizUI = (answersList = [], answerClickHandler = () => {}) => {
  fillInTheCategoriesList();
  addPlayer();
  generateAnswersList(answersList, answerClickHandler);
};
