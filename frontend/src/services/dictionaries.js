async function fetchOptions() {
    try {
      const response = await fetch('https://api.hh.ru/dictionaries');
      const data = await response.json();
      const options = {
        currencies: getMappedOptions(data.currency, 'code', 'name'),
        experience: getMappedOptions(data.experience, 'id', 'name'),
        employment: getMappedOptions(data.employment, 'id', 'name'),
        schedule: getMappedOptions(data.schedule, 'id', 'name'),
      };
      return options;
    } catch (error) {
      console.error('Error while fetching options:', error);
      return {};
    }
  }
  
  function getMappedOptions(optionsData, valueKey, labelKey) {
    return optionsData.map((option) => ({
      value: option[valueKey],
      label: option[labelKey],
    }));
  }
  
  export default fetchOptions;
  