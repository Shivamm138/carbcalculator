import { UserData, ActivityLevel } from '../types';

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9,
};

export function calculateCarbRequirement(userData: UserData): number {
  // BMR using Mifflin-St Jeor Equation
  const bmr = 
    10 * userData.weight +
    6.25 * userData.height -
    5 * userData.age +
    (userData.gender === 'male' ? 5 : -161);

  // TDEE (Total Daily Energy Expenditure)
  const tdee = bmr * ACTIVITY_MULTIPLIERS[userData.activityLevel];
  
  // Recommended carbs (50% of total calories, 1g carbs = 4 calories)
  return Math.round((tdee * 0.5) / 4);
}