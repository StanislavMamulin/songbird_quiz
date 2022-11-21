import { CategoryItem, activateCategory, disableCategory } from '../../../components/CategoryItem/index';
import { BirdPlayer, initPlayer } from '../../../components/BirdPlayer';
import { quizCategories } from '../../../data/birds';
import { generateAnswersList } from '../../../components/Answers';

const categories = [];

const fillInTheCategoriesList = () => {
  const categoriesListElement = document.querySelector('.question-categories');

  quizCategories.forEach((category) => {
    const categoryItem = CategoryItem({ title: category });
    categoriesListElement.append(categoryItem);
    categories.push(categoryItem);
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

export const setActiveCategory = (categoryIndex) => {
  categories.forEach((category) => disableCategory(category));
  activateCategory(categories[categoryIndex]);
};
