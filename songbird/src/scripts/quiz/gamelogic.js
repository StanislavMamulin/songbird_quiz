import { getTitleFromAnswerButton, getAnswersForCategory } from './getdata';
import { quizCategories } from '../../data/birds';

let currentCategoryIndex = 0;

export const answerClickHandler = (title) => {
  getTitleFromAnswerButton(title);
};

export const switchToNextCategory = () => {
  if (currentCategoryIndex > quizCategories.length - 1) {
    currentCategoryIndex = 0;
    // finish game
  } else {
    currentCategoryIndex += 1;
  }
};

export const getAnswersForCurrentCategory = () => getAnswersForCategory(currentCategoryIndex);
