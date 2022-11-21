import { htmlToElement } from '../../utils/htmlToElement';
import { getTwoDigitsNumber } from '../../utils/text';
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

// constants
const currSong = document.createElement('audio');

// state variables
let updateTimer;
let isPlaying = false;

const setElements = () => {
  seekSliderElement = document.querySelector('.seek-slider__slider');
  currentTimeElement = document.querySelector('.seek-slider__current-time');
  totalTimeElement = document.querySelector('.seek-slider__total-time');

  playPauseElement = document.querySelector('.playpause');
  playPauseImageElement = document.querySelector('.playpause__image');
  soundSliderElement = document.querySelector('.sound-slider__slider');
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

export const initPlayer = () => {
  setElements();
  addEventListeners();
  resetTheBird();
  loadSong('https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC501190-190801_06.50h_zilvermeeuw_duinen%20van%20goeree_roep_2ex_overvliegend_gezien_.mp3');
};
