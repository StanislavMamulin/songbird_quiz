import {
  getTitleFromAnswerButton,
  getAnswersForCategory,
  getRandomBirdFromCategory,
  getInfoAboutBird,
} from './getdata';
import { quizCategories } from '../../data/birds';
import { answerStatuses } from '../../data/statuses';
import { generateAnswersList, setStatusForButton } from '../../components/Answers/index';
import { setActiveCategory } from './ui/ui';
import { playCorrectAnswerSound, playWrongAnswerSound } from './sounds';
import { changeBird } from '../../components/BirdInfo';
import { Button } from '../../components/Button';

let currentCategoryIndex = 0;
let currentBird;
let isAnswerFinded = false;
let currentPlayer;
const nextButton = new Button();

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
    currentPlayer.showRightAnswer();
    currentPlayer.pauseSong();
    playCorrectAnswerSound();
    nextButton.makeActive();
  } else { // wrong answer
    setStatusForButton(birdName, answerStatuses.wrong);
    playWrongAnswerSound();
  }
};

export const getAnswersForCurrentCategory = () => getAnswersForCategory(currentCategoryIndex);

export const switchToNextCategory = () => {
  if (!nextButton.isActive) {
    return;
  }

  if (currentCategoryIndex >= quizCategories.length - 1) {
    currentCategoryIndex = 0;
    // finish game
  } else {
    currentCategoryIndex += 1;
    currentBird = getRandomBirdFromCategory(currentCategoryIndex);
    currentPlayer.changeTheBird(currentBird);
    setActiveCategory(currentCategoryIndex);
    const answers = getAnswersForCurrentCategory();
    generateAnswersList(answers, answerClickHandler);
    isAnswerFinded = false;
    nextButton.disableButton();
  }
};

const initNextButton = () => {
  nextButton.setElement('.next-question');
  nextButton.disableButton();
  nextButton.setOnclickHandler(switchToNextCategory);
};

export const startTheGame = (player) => {
  currentBird = getRandomBirdFromCategory(currentCategoryIndex);
  currentPlayer = player;
  player.changeTheBird(currentBird);
  setActiveCategory(currentCategoryIndex);

  initNextButton();
};
