/**
 * Function getCurrentTime
 * @description Returns the current time in the format HH:MM
 * @returns string
 */
 

export default function getCurrentTime(): string {
    const now = new Date();
    const minutes = now.getMinutes();
    const hours = now.getHours();
  
    // Ensure that the minutes and hours are displayed with leading zeros if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
  
    const currentTimeString = `${formattedHours}:${formattedMinutes}`;

    return currentTimeString;
}


