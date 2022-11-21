import {
  getTitleFromAnswerButton,
  getAnswersForCategory,
  getRandomBirdFromCategory,
  getInfoAboutBird,
} from './getdata';
import { quizCategories } from '../../data/birds';
import { changeTheBird, showRightAnswer, pauseSong } from '../../components/BirdPlayer';
import { answerStatuses } from '../../data/statuses';
import { setStatusForButton } from '../../components/Answers/index';
import { setActiveCategory } from './ui/ui';
import { playCorrectAnswerSound, playWrongAnswerSound } from './sounds';
import { changeBird } from '../../components/BirdInfo';

let currentCategoryIndex = 0;
let currentBird;
let isAnswerFinded = false;

export const answerClickHandler = (title) => {
  // change bird in birdInfo
  const birdName = getTitleFromAnswerButton(title);
  const selectedBird = getInfoAboutBird(currentCategoryIndex, birdName);
  changeBird(selectedBird);

  if (isAnswerFinded) {
    return;
  }

  if (birdName === currentBird.name) { // correct answer
    setStatusForButton(birdName, answerStatuses.correct);
    isAnswerFinded = true;
    showRightAnswer();
    pauseSong();
    playCorrectAnswerSound();
  } else { // wrong answer
    setStatusForButton(birdName, answerStatuses.wrong);
    playWrongAnswerSound();
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
