const fetchAllVacancies = async (page = 0) => {
    try {
      const url = `http://localhost:3001/api/allVacancies?page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("Data received:", data);
      return data;
    } catch (error) {
      console.error("Error while fetching vacancies:", error);
      return [];
    }
  };
  
  export default fetchAllVacancies;
  