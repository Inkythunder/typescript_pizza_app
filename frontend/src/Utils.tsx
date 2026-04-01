export interface Time {
  hours: number;
  minutes: number;
}

export function timeToMinutes(time: Time): number{
  return Math.floor(time.hours * 60) + time.minutes;
}

export function minutesToTime(minutes: number): Time {
  const hours = Math.floor(minutes / 60);
  const timeMinutes = minutes % 60;

  return {hours, minutes: timeMinutes};
}

export function calculateTimeSlots(startTime: Time, endTime: Time) {
  let timeSlots = 0;
  for (let i: number = 0; i < timeToMinutes(endTime) - timeToMinutes(startTime); i += 10) {
    timeSlots++;
  }
  return timeSlots;
}



export function generateOpeningHours(day: string, startTime: Time, endTime: Time): string[] {
  const timeSlots: string[] = [];

  for (let minutes = timeToMinutes(startTime); minutes < timeToMinutes(endTime); minutes += 10) {
    const hours = Math.floor(minutes / 60);
    const timeMinutes = minutes % 60;

    //HH:MM format
    const timeString = `${hours.toString().padStart(2, '0')}:${timeMinutes.toString().padStart(2, '0')}`;

    timeSlots.push(`${day} - ${timeString}`);
  }

  return timeSlots;
}