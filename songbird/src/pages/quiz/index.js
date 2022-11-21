import { makeQuizUI } from '../../scripts/quiz/ui/ui';
import { answerClickHandler, getAnswersForCurrentCategory, startTheGame } from '../../scripts/quiz/gamelogic';
import 'normalize.css';
import './style.css';
import '../../styles/quiz/top-panel.css';
import '../../styles/colors.css';
import '../../styles/commonlayout.css';

const answers = getAnswersForCurrentCategory();
makeQuizUI(answers, answerClickHandler);
startTheGame();
