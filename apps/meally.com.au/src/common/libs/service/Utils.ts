class Utils {
  calculateTime(time: string) {
    return '';
  }

  calculateTotalTime(prep: string, cook: string) {
    const matchRegex = /^(\d+d)?\s?(\d+h)?\s?(\d+m)?\s?(\d+s)?$/i;

    const parseTime = (timeString: string) => {
      const matches = timeString.match(matchRegex);
      if (!matches) {
        throw new Error('Invalid time string format');
      }
      const days = matches[1] ? parseInt(matches[1]) : 0;
      const hours = matches[2] ? parseInt(matches[2]) : 0;
      const minutes = matches[3] ? parseInt(matches[3]) : 0;
      const seconds = matches[4] ? parseInt(matches[4]) : 0;
      return { days, hours, minutes, seconds };
    };

    const prepTime = parseTime(prep);
    const cookTime = parseTime(cook);

    const totalSeconds =
      prepTime.days * 24 * 60 * 60 +
      prepTime.hours * 60 * 60 +
      prepTime.minutes * 60 +
      prepTime.seconds +
      cookTime.days * 24 * 60 * 60 +
      cookTime.hours * 60 * 60 +
      cookTime.minutes * 60 +
      cookTime.seconds;

    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    const timeUnits = [];
    if (days > 0) {
      timeUnits.push(`${days}d`);
    }
    if (hours > 0) {
      timeUnits.push(`${hours}h`);
    }
    if (minutes > 0) {
      timeUnits.push(`${minutes}m`);
    }
    if (seconds > 0) {
      timeUnits.push(`${seconds}s`);
    }

    return timeUnits.join(' ');
  }
}

export default new Utils();
