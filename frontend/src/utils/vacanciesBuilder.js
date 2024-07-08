import React from 'react';
import Vacancy from '../components/Vacancy';

const renderVacancyElements = (vacancies) => {
  console.log('Vacancies:', vacancies);
  return vacancies.map((vacancy, index) => (
    <Vacancy
      key={index}
      name={vacancy.name}
      company={vacancy.employer.name}
      area={vacancy.area.name}
      responsibility={vacancy.snippet.responsibility}
      requirements={vacancy.snippet.requirement}
      salary={vacancy.salary?.from || 'Не указано'}
      currency={vacancy.salary?.currency || ''}
    />
  ));
};

export default renderVacancyElements;
