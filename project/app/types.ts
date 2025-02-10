export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';

export interface UserData {
  age: number;
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg
  activityLevel: ActivityLevel;
}

export interface CalculationResult {
  dailyCarbs: number;
  totalCalories: number;
  carbPercentage: number;
}