import { CategoryItem } from '../../../components/CategoryItem/index';
import { quizCategories } from '../../../data/birds';

const fillInTheCategoriesList = () => {
  const categoriesListElement = document.querySelector('.question-categories');

  quizCategories.forEach((category) => {
    categoriesListElement.append(CategoryItem({ title: category }));
  });
};

export const makeQuizUI = () => {
  fillInTheCategoriesList();
};
