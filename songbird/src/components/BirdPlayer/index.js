import { htmlToElement } from '../../utils/htmlToElement';
import './styles.css';
import birdPlayer from './index.html';

import pauseIcon from '../../assets/vectors/circle-pause.svg';
import playIcon from '../../assets/vectors/circle-play.svg';

export const BirdPlayer = htmlToElement(birdPlayer);

let seekSliderElement;
let currentTimeElement;
let totalTimeElement;

let playPauseElement;
let playPauseImageElement;
let soundSliderElement;

const setElements = () => {
  seekSliderElement = document.querySelector('.seek-slider__slider');
  currentTimeElement = document.querySelector('.seek-slider__current-time');
  totalTimeElement = document.querySelector('.seek-slider__total-time');

  playPauseElement = document.querySelector('.playpause');
  playPauseImageElement = document.querySelector('.playpause__image');
  soundSliderElement = document.querySelector('.sound-slider__slider');
};

let updateTimer;
let isPlaying = false;
let currSong = document.createElement('audio');

const resetValues = () => {
  currentTimeElement.textContent = '00:00';
  totalTimeElement.textContent = '00:00';
  seekSliderElement.value = 0;
};

export const loadSong = (audioPath) => {
  clearInterval(updateTimer);
  resetValues();

  currSong.src = audioPath;
  currSong.load();
  updateTimer = setInterval(seekUpdate, 1000);
};

const playSong = () => {
  currSong.play();
  isPlaying = true;

  playPauseImageElement.src = pauseIcon;
};

const pauseSong = () => {
  currSong.pause();
  isPlaying = false;

  playPauseImageElement.src = playIcon;
};

const playpauseSong = () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
};

const addEventListeners = () => {
  playPauseElement.addEventListener('click', () => {
    playpauseSong();
  });
};

export const initPlayer = () => {
  setElements();
  addEventListeners();
};
