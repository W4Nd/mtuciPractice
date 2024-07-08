const fetch = require('node-fetch');

const buildURL = (params) => {
  const baseURL = 'https://api.hh.ru/vacancies';
  const queryParams = new URLSearchParams(params);
  return `${baseURL}?${queryParams.toString()}`;
};

const addTimestamp = (items) => {
  return items.map((item) => ({ ...item, created_at: new Date() }));
};

const extractInfo = (data) => {
  return {
    page: data.page,
    totalPages: data.pages - 1,
    totalVacancies: data.found,
  };
};

async function getVacancies(
  text,
  perPage = 50,
  page = 0,
  salary = null,
  currency = null,
  area = null,
  employment = null,
  experience = null,
  schedule = null
) {
  const params = {
    text,
    per_page: perPage,
    page,
    ...(salary && { salary }),
    ...(currency && { currency }),
    ...(area && { area }),
    ...(employment && { employment }),
    ...(experience && { experience }),
    ...(schedule && { schedule }),
  };

  const url = buildURL(params);
  const response = await fetch(url);
  const data = await response.json();

  const itemsWithTimestamp = addTimestamp(data.items);
  const info = extractInfo(data);

  return { info, vacancies: itemsWithTimestamp };
}

module.exports = {
  getVacancies,
};
