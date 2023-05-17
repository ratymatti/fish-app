async function getLocation() {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude: lat, longitude: lng } = position.coords;

        return { lat, lng };
        
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    } else {
      alert('Geolocation not supported in your browser');
    }
};

export default getLocation;

