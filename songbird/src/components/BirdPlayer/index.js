import { htmlToElement } from '../../utils/htmlToElement';
import { getTwoDigitsNumber } from '../../utils/text';
import './styles.css';
import birdPlayer from './index.html';

import pauseIcon from '../../assets/vectors/circle-pause.svg';
import playIcon from '../../assets/vectors/circle-play.svg';
import secretBird from '../../assets/images/bird-silhouettes.png';

export const BirdPlayer = htmlToElement(birdPlayer);

let seekSliderElement;
let currentTimeElement;
let totalTimeElement;

let playPauseElement;
let playPauseImageElement;
let soundSliderElement;
let birdImageElement;
let birdNameElement;
let birdLatinNameElement;

// constants
const currSong = document.createElement('audio');
const SECRET_BIRD_NAME = '* * * * * * * *';
const DEFAULT_LATIN_NAME = '';

// state variables
let updateTimer;
let isPlaying = false;
let curBirdName = '';
let curBirdLatinName = '';
let curBirdImagePath;

const setElements = () => {
  seekSliderElement = document.querySelector('.seek-slider__slider');
  currentTimeElement = document.querySelector('.seek-slider__current-time');
  totalTimeElement = document.querySelector('.seek-slider__total-time');

  playPauseElement = document.querySelector('.playpause');
  playPauseImageElement = document.querySelector('.playpause__image');
  soundSliderElement = document.querySelector('.sound-slider__slider');

  birdImageElement = document.querySelector('.bird-image');
  birdNameElement = document.querySelector('.bird-name');
  birdLatinNameElement = document.querySelector('.bird-lat-name');
};

const resetValues = () => {
  currentTimeElement.textContent = '00:00';
  totalTimeElement.textContent = '00:00';
  seekSliderElement.value = 0;
};

const seekUpdate = () => {
  if (!Number.isNaN(currSong.duration)) {
    const seekPosition = currSong.currentTime * (100 / currSong.duration);
    seekSliderElement.value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(currSong.currentTime / 60);
    let currentSeconds = Math.floor(currSong.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currSong.duration / 60);
    let durationSeconds = Math.floor(currSong.duration - durationMinutes * 60);

    currentMinutes = getTwoDigitsNumber(currentMinutes);
    currentSeconds = getTwoDigitsNumber(currentSeconds);
    durationMinutes = getTwoDigitsNumber(durationMinutes);
    durationSeconds = getTwoDigitsNumber(durationSeconds);

    // Display the updated duration
    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
    totalTimeElement.textContent = `${durationMinutes}:${durationSeconds}`;
  }
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

export const pauseSong = () => {
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

const seekTo = () => {
  const seekPostition = currSong.duration * (seekSliderElement.value / 100);
  currSong.currentTime = seekPostition;
};

const setVolume = () => {
  currSong.volume = soundSliderElement.value / 100;
};

const addEventListeners = () => {
  playPauseElement.addEventListener('click', playpauseSong);
  soundSliderElement.addEventListener('change', setVolume);
  seekSliderElement.addEventListener('change', seekTo);
};

const showBirdInfo = (birdInfo) => {
  const {
    imagePath = '',
    birdName = '',
    birdLatinName = '',
  } = birdInfo;

  birdImageElement.src = imagePath;
  birdNameElement.textContent = birdName;
  birdLatinNameElement.textContent = birdLatinName;
};

export const showRightAnswer = () => {
  showBirdInfo({
    imagePath: curBirdImagePath,
    birdName: curBirdName,
  });
};

export const showFullInfo = () => {
  showBirdInfo({
    imagePath: curBirdImagePath,
    birdName: curBirdName,
    birdLatinName: curBirdLatinName,
  });
};

const hideTheBird = () => {
  showBirdInfo({
    imagePath: secretBird,
    birdName: SECRET_BIRD_NAME,
    birdLatinName: DEFAULT_LATIN_NAME,
  });
};

export const changeTheBird = (birdInfo) => {
  const {
    name,
    species,
    image,
    audio,
  } = birdInfo;

  hideTheBird();

  curBirdName = name;
  curBirdImagePath = image;
  curBirdLatinName = species;
  loadSong(audio);
};

export const initPlayer = () => {
  setElements();
  addEventListeners();
  hideTheBird();
};
