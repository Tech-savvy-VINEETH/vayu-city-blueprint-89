
import { indianCitiesData } from './constants';

export const findNearestIndianCity = (lat: number, lng: number) => {
  return indianCitiesData.reduce((nearest, city) => {
    const distance = Math.abs(lat - city.lat) + Math.abs(lng - city.lng);
    const nearestDistance = Math.abs(lat - nearest.lat) + Math.abs(lng - nearest.lng);
    return distance < nearestDistance ? city : nearest;
  });
};
