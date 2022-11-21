import { getTitleFromAnswerButton, getAnswersForCategory, getRandomBirdFromCategory } from './getdata';
import { quizCategories } from '../../data/birds';
import { changeTheBird } from '../../components/BirdPlayer';
import { answerStatuses } from '../../data/statuses';
import { setStatusForButton } from '../../components/Answers/index';
import { setActiveCategory } from './ui/ui';

let currentCategoryIndex = 0;
let currentBird;
let isAnswerFinded = false;

export const answerClickHandler = (title) => {
  if (isAnswerFinded) {
    return;
  }

  const birdName = getTitleFromAnswerButton(title);
  if (birdName === currentBird.name) {
    setStatusForButton(birdName, answerStatuses.correct);
    isAnswerFinded = true;
  } else {
    setStatusForButton(birdName, answerStatuses.wrong);
  }
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
  setActiveCategory(currentCategoryIndex);
};
