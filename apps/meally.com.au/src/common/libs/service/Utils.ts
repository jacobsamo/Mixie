import { Ingredient, Measurement } from 'libs/types';
// import { fraction } from 'mathjs';
import Fraction from 'fraction.js';

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
    const fr = measurement.split('/');

    if (fr.length <= 1) {
      return {
        quantity: quantity,
        measurement: measurement,
      };
    }

    const value = (Number(fr[0]) / Number(fr[1])) * batchAmount;
    const fraction = new Fraction(value).toFraction(true);
    const split = fraction.split(' ');
    const newQuantity = split.length > 1 ? parseInt(split[0]) : undefined;
    const newMeasurement =
      split.length > 1 ? (split[1] as Measurement) : (split[0] as Measurement);

    return {
      quantity: newQuantity,
      measurement: newMeasurement,
    };
  };

  calculateIngredient = (
    ingredient: Ingredient,
    batchAmount: number
  ): Ingredient => {
    const q = ingredient.quantity || 0;
    switch (ingredient.unit) {
      case 'grams':
        const gramQuantity = q * batchAmount;
        return {
          ...ingredient,
          quantity: gramQuantity >= 1000 ? gramQuantity / 1000 : gramQuantity,
          unit: gramQuantity >= 1000 ? 'kg' : 'grams',
        };
      case 'kg':
        return {
          ...ingredient,
          quantity: q * batchAmount,
        };
      case 'cup':
      case 'tsp':
      case 'tbsp':
        const multipliedQuantity = q * batchAmount;
        const { quantity, measurement } = this.calculateCupUnits(
          multipliedQuantity,
          ingredient.measurement || '',
          batchAmount
        );
        return {
          ...ingredient,
          quantity: quantity,
          measurement: measurement,
        };
      case 'ml':
        const mlQuantity = q * batchAmount;
        return {
          ...ingredient,
          quantity: mlQuantity >= 1000 ? mlQuantity / 1000 : mlQuantity,
          unit: mlQuantity >= 1000 ? 'litre' : 'ml',
        };
      case 'litre':
        return {
          ...ingredient,
          quantity: q * batchAmount,
        };
      case 'pinch':
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
