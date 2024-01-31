
/**
 * Takes in a time string matching `/^(\d{1,2}[hms]\s?)+$/i` and returns the total time in seconds
 * @param {RegExpMatchArray} timeString - time string matching `/^(\d{1,2}[hms]\s?)+$/i`
 * @returns {number} total time in seconds
 */
const parseTimeToSeconds = (timeString: RegExpMatchArray) => {
  const time = timeString[0].split(" ");

  const timeMap = time.map((time): number | undefined => {
    if (time.includes("h")) {
      return parseInt(time) * 60 * 60;
    } else if (time.includes("m")) {
      return parseInt(time) * 60;
    } else if (time.includes("s")) {
      return parseInt(time);
    }
  });
  // return the sum of total seconds
  return timeMap.reduce((acc, curr) => acc! + curr!, 0);
};

/**
 * Takes in seconds to parse and return a time string matching `/^(\d{1,2}[hms]\s?)+$/i`
 * @param {number} seconds - seconds to be parsed
 * @returns {string} - return a string matching `/^(\d{1,2}[hms]\s?)+$/i` as a time string
 */
export const parseSecondsToTime = (seconds: number): string => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const min = Math.floor((seconds % (60 * 60)) / 60);
  const sec = seconds % 60;

  const timeUnits: string[] = [];
  if (days > 0) {
    timeUnits.push(`${days}d`);
  }
  if (hours > 0) {
    timeUnits.push(`${hours}h`);
  }
  if (min > 0) {
    timeUnits.push(`${min}m`);
  }
  if (sec > 0) {
    timeUnits.push(`${sec}s`);
  }

  return timeUnits.join(" ");
};

/**
 * Takes in a prep and cook time string and returns the total time in the same format
 * @param {string} prep - prep time string matching `/^(\d{1,2}[hms]\s?)+$/i`
 * @param {string} cook - cook time string matching `/^(\d{1,2}[hms]\s?)+$/i`
 * @returns {string} total time in the same format
 */
export async function calculateTotalTime(prep: string, cook: string) {
  const matchRegex = /^(\d{1,2}[hms]\s?)+$/i;

  const prepT = prep.match(matchRegex);
  const cookT = cook.match(matchRegex);

  if (!prepT || !cookT) {
    throw new Error("Invalid time string format");
  }

  const prepTime = parseTimeToSeconds(prepT);
  const cookTime = parseTimeToSeconds(cookT);

  const totalTime = prepTime! + cookTime!;

  return parseSecondsToTime(totalTime);
}
