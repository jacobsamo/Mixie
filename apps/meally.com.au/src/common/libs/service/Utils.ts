import { Ingredient } from 'libs/types';
import math from 'mathjs';
interface CalculateBatchUnitsReturn {
  newUnit: string;
  newQuantity: number | undefined;
  newMeasurement?: string;
}

interface CalculateCupUnits {
  newQuantity: number | undefined;
  newMeasurement?: string;
}

class Utils {
  toId(string: string) {
    return string.replace(/\s+/g, '-').toLowerCase();
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

  private calculateCupType(
    quantity: number | undefined,
    batches: number,
    measurement?: string
  ): CalculateCupUnits {
    let newQuantity = 0;
    let newMeasurement = '';

    if (quantity !== undefined && measurement !== undefined) {
      // Convert quantity to cups
      const cups = math.unit(quantity, measurement).to('cup');
      newQuantity = cups.toNumber();

      // Calculate total cups considering the number of batches
      const totalCups = newQuantity * batches;

      // Simplify the total cups using the best unit
      const simplified = math.unit(totalCups, 'cup');

      newQuantity = simplified.value;
      newMeasurement = simplified.units.toString();
    }

    return { newQuantity, newMeasurement };
  }

  calculateBatchUnits = (
    ingredient: Ingredient,
    batches: number
  ): CalculateBatchUnitsReturn => {
    const { unit, quantity, measurement } = ingredient;
    switch (unit) {
      case 'cup':
        return {
          newUnit: unit,
          newQuantity: quantity,
          newMeasurement: measurement,
        };
      case 'tbsp':
        return {
          newUnit: unit,
          newQuantity: quantity,
          newMeasurement: measurement,
        };
      case 'tsp':
        return {
          newUnit: unit,
          newQuantity: quantity,
          newMeasurement: measurement,
        };
      case 'gram':
        return {
          newUnit: unit,
          newQuantity: quantity,
          newMeasurement: measurement,
        };
      case 'kg':
        return {
          newUnit: unit,
          newQuantity: quantity,
          newMeasurement: measurement,
        };
      case 'ml':
        return {
          newUnit: unit,
          newQuantity: quantity,
          newMeasurement: measurement,
        };
      case 'litre':
        return {
          newUnit: unit,
          newQuantity: quantity,
          newMeasurement: measurement,
        };
      case 'item':
        return {
          newUnit: unit,
          newQuantity: quantity,
          newMeasurement: measurement,
        };
      case 'pinch':
        return {
          newUnit: unit,
          newQuantity: quantity,
          newMeasurement: measurement,
        };
      default:
        return {
          newUnit: unit,
          newQuantity: quantity,
          newMeasurement: measurement,
        };
    }
  };
}

export default new Utils();
