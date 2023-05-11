import { Ingredient, Measurement } from 'libs/types';
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

  private calculateCupUnits = (
    quantity: string | undefined,
    measurement: Measurement,
    batchAmount: number
  ): { quantity: string; measurement?: Measurement } => {
    const cupValues = {
      '': 0,
      '1/2': 120,
      '1/3': 80,
      '2/3': 160,
      '1/4': 50,
      '2/4': 100,
      '3/4': 150,
    };
    let newQuantity = '0';
    let newMeasurement = '';

    const newValues = () => {
      const calc = cupValues[measurement] * batchAmount;
      if (calc >= 240) {
        const remainder = calc % batchAmount;
        const roundedRemainder = Math.round(remainder);
        quantity = (
          parseInt(quantity || '0') * batchAmount +
          math.round(calc / 240)
        ).toString();
        newMeasurement = roundedNumber.toString();
      } else {
        newQuantity = (parseInt(quantity || '0') * batchAmount).toString();
        newMeasurement = math.round(calc).toString();
      }
    };

    // calculate the closest cup value that return `"" | "1/2" | "1/3" | "2/3" | "1/4" | "3/4"` and return the new measurement
    const closestValue = Object.keys(cupValues).reduce((prev, curr) => {
      return Math.abs(cupValues[curr] * batchAmount - 240) <
        Math.abs(cupValues[prev] * batchAmount - 240)
        ? curr
        : prev;
    });

    return {
      quantity: newQuantity,
      measurement: closestValue.toString(),
    };
  };

  calculateIngredient = (
    ingredient: Ingredient,
    batchAmount: number
  ): Ingredient => {
    const quantity = ingredient.quantity || 1;
    switch (ingredient.unit) {
      case 'gram':
        return {
          ...ingredient,
          quantity: quantity * batchAmount,
          unit: quantity * batchAmount > 1000 ? 'kg' : 'gram',
        };
      case 'kg':
        return {
          ...ingredient,
          quantity: quantity * batchAmount,
        };
      case 'cup':
        return {
          ...ingredient,
          quantity: quantity * batchAmount,
          measurement: ingredient.measurement,
        };
      case 'ml':
        return {
          ...ingredient,
          quantity: quantity * batchAmount,
          unit: quantity * batchAmount > 1000 ? 'litre' : 'ml',
        };
      case 'litre':
        return {
          ...ingredient,
          quantity: quantity * batchAmount,
        };
      case 'tsp':
        return {
          ...ingredient,
          quantity: quantity * batchAmount,
          measurement: ingredient.measurement,
        };
      case 'tbsp':
        return {
          ...ingredient,
          quantity: quantity * batchAmount,
          measurement: ingredient.measurement,
        };
      case 'pinch':
        return {
          ...ingredient,
          quantity: quantity * batchAmount,
        };
      case 'item':
        return {
          ...ingredient,
          quantity: quantity * batchAmount,
        };
      default:
        return ingredient;
    }
  };
}

export default new Utils();
