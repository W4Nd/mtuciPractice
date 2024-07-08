async function fetchAreas() {
    try {
      const response = await fetch('https://api.hh.ru/areas');
      const data = await response.json();
      const areas = [];
  
      const recursiveTraversal = (areasData) => {
        areasData.forEach((area) => {
          areas.push({
            value: area.id,
            label: area.name,
          });
          if (area.areas && area.areas.length > 0) {
            recursiveTraversal(area.areas);
          }
        });
      };
  
      recursiveTraversal(data);
      return areas;
    } catch (error) {
      console.error('Error while fetching areas:', error);
      return [];
    }
  }
  
  export default fetchAreas;
  