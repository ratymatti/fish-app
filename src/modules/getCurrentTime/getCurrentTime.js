function getCurrentTime() {
    const now = new Date();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const day = now.getDate().toString().padStart(2, '0'); // Ensure two digits with leading zero
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();
  
    // Ensure that the minutes and hours are displayed with leading zeros if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
  
    const currentTimeString = `${formattedHours}:${formattedMinutes} ${day}/${month}/${year}`;

    return currentTimeString;
}

export default getCurrentTime;


