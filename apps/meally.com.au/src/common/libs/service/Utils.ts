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
    quantity: number | undefined,
    measurement: Measurement,
    batchAmount: number
  ): { quantity: number | undefined; measurement?: Measurement } => {
    const value = math.multiply(math.fraction(measurement), batchAmount);
    const split = value.toString().split('.');
    const q =
      split.length > 1 && quantity ? quantity + parseInt(split[0]) : quantity;
    const m =
      split.length > 1
        ? math.fraction(`0.${split[1]}`)
        : math.fraction(value.toString());
    const me = m.n > m.d ? '' : (`${m.n}/${m.d}` as Measurement);
    return {
      quantity: q,
      measurement: me,
    };
  };

  calculateIngredient = (
    ingredient: Ingredient,
    batchAmount: number
  ): Ingredient => {
    const q = ingredient.quantity || 1;
    const { quantity, measurement } = this.calculateCupUnits(
      q * batchAmount,
      ingredient.measurement || '',
      batchAmount
    );
    switch (ingredient.unit) {
      case 'gram':
        return {
          ...ingredient,
          quantity: q * batchAmount,
          unit: q * batchAmount > 1000 ? 'kg' : 'gram',
        };
      case 'kg':
        return {
          ...ingredient,
          quantity: q * batchAmount,
        };
      case 'cup':
        return {
          ...ingredient,
          quantity: quantity,
          measurement: measurement,
        };
      case 'ml':
        return {
          ...ingredient,
          quantity: q * batchAmount,
          unit: q * batchAmount > 1000 ? 'litre' : 'ml',
        };
      case 'litre':
        return {
          ...ingredient,
          quantity: q * batchAmount,
        };
      case 'tsp':
        return {
          ...ingredient,
          quantity: quantity,
          measurement: measurement,
        };
      case 'tbsp':
        return {
          ...ingredient,
          quantity: quantity,
          measurement: measurement,
        };
      case 'pinch':
        return {
          ...ingredient,
          quantity: q * batchAmount,
        };
      case 'item':
        return {
          ...ingredient,
          quantity: q * batchAmount,
        };
      default:
        return ingredient;
    }
  };
}

export default new Utils();
