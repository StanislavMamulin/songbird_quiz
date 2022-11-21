import { getTitleFromAnswerButton, getAnswersForCategory, getRandomBirdFromCategory } from './getdata';
import { quizCategories } from '../../data/birds';
import { changeTheBird } from '../../components/BirdPlayer';

let currentCategoryIndex = 0;
let currentBird;

export const answerClickHandler = (title) => {
  getTitleFromAnswerButton(title);
};

export const switchToNextCategory = () => {
  if (currentCategoryIndex > quizCategories.length - 1) {
    currentCategoryIndex = 0;
    // finish game
  } else {
    currentCategoryIndex += 1;
    currentBird = getRandomBirdFromCategory(currentCategoryIndex);
  }
};

export const getAnswersForCurrentCategory = () => getAnswersForCategory(currentCategoryIndex);

export const startTheGame = () => {
  currentBird = getRandomBirdFromCategory(currentCategoryIndex);
  changeTheBird(currentBird);
};
