async function fetchVacancies(
    name,
    page = 0,
    filters = {
      salary: null,
      area: null,
      selectedArea: null,
      selectedCurrency: null,
      selectedExperience: null,
      selectedEmployment: null,
      selectedSchedule: null,
    }
  ) {
    try {
      const queryParams = new URLSearchParams({
        name,
        page,
        ...filters,
      });
  
      for (const [key, value] of queryParams.entries()) {
        if (value === null) {
          queryParams.delete(key);
        }
      }
  
      const url = `http://localhost:3001/api/vacancies?${queryParams.toString()}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching vacancies:", error);
      return [];
    }
  }
  
  export default fetchVacancies;
  