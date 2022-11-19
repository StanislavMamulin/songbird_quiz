import { htmlToElement } from '../../utils/htmlToElement';
import './styles.css';
import categoryItem from './index.html';

export const CategoryItem = ({ title }) => {
  const itemElement = htmlToElement(categoryItem);
  const titleElement = itemElement.querySelector('.question-categories__item__title');
  titleElement.innerHTML = title;

  return itemElement;
};
