import './styles.css';
import { BirdPlayer, initPlayer, loadSong } from '../BirdPlayer';

const addPlayer = () => {
  const birdInfoElement = document.querySelector('.bird-info');

  const birdPlayer = BirdPlayer();
  const birdImage = birdPlayer.querySelector('.bird-image');
  const playButton = birdPlayer.querySelector('.playpause');
  const seekSlider = birdPlayer.querySelector('.seek-slider');

  birdPlayer.classList.add('bird-player_vertical');
  birdImage.classList.add('bird-image_vertical');
  playButton.classList.add('playpause_vertical');
  seekSlider.classList.add('seek-slider_vertical');

  birdInfoElement.append(birdPlayer);
  birdPlayer.style.display = 'none';

  initPlayer();
};

const addTextBlock = () => {
  const birdInfoElement = document.querySelector('.bird-info');

  const birdDescriptionElement = document.createElement('div');
  birdDescriptionElement.classList.add('bird-info__description');
  birdDescriptionElement.style.display = 'none';
  birdInfoElement.append(birdDescriptionElement);
};

const toggleTextStub = (show = true) => {
  const birdInfoElement = document.querySelector('.bird-info');
  const playerElement = birdInfoElement.querySelector('.bird-player');
  const stubElement = document.querySelector('.bird-info__stub');
  const descriptionElement = document.querySelector('.bird-info__description');

  playerElement.style.display = show ? 'none' : 'flex';
  stubElement.style.display = show ? 'flex' : 'none';
  descriptionElement.style.display = show ? 'none' : 'flex';
};

export const initBirdInfo = () => {
  addPlayer();
  addTextBlock();
  toggleTextStub(true);
};

const changeDescription = (text) => {
  const descriptionElement = document.querySelector('.bird-info__description');
  descriptionElement.innerText = text;
  descriptionElement.scrollTop = 0;
};

const changePlayerInfo = (birdInfo) => {
  const {
    name,
    species,
    image,
    audio,
  } = birdInfo;

};

export const changeBird = (birdInfo) => {
  toggleTextStub(false);
  const { description } = birdInfo;

  changeDescription(description);
  changePlayerInfo(birdInfo);
};
