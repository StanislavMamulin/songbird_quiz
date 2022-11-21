import { CategoryItem, activateCategory, disableCategory } from '../../../components/CategoryItem/index';
import { BirdPlayer, initPlayer } from '../../../components/BirdPlayer';
import { quizCategories } from '../../../data/birds';
import { generateAnswersList } from '../../../components/Answers';
import { initBirdInfo } from '../../../components/BirdInfo';

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
  const birdPlayer = BirdPlayer();
  currentQuestionElement.append(birdPlayer);
  initPlayer();
};

const addBirdInfo = () => {
  // const birdInfoElement = document.querySelector('.bird-info');
  // const birdPlayer = BirdPlayer();
  // birdPlayer.classList.add('bird-player_vertical');
  // birdInfoElement.append(birdPlayer);
  // initPlayer();
  initBirdInfo();
};

export const makeQuizUI = (answersList = [], answerClickHandler = () => {}) => {
  fillInTheCategoriesList();
  addPlayer();
  generateAnswersList(answersList, answerClickHandler);
  addBirdInfo();
};

export const setActiveCategory = (categoryIndex) => {
  categories.forEach((category) => disableCategory(category));
  activateCategory(categories[categoryIndex]);
};
