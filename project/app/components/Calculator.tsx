'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserData, Gender, ActivityLevel, CalculationResult } from '../types';
import { calculateCarbRequirement } from '../utils/calculator';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ShareIcon, DocumentArrowDownIcon, MicrophoneIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';

ChartJS.register(ArcElement, Tooltip, Legend);

const activityOptions: { value: ActivityLevel; label: string }[] = [
  { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
  { value: 'light', label: 'Light (exercise 1-3 times/week)' },
  { value: 'moderate', label: 'Moderate (exercise 3-5 times/week)' },
  { value: 'active', label: 'Active (exercise 6-7 times/week)' },
  { value: 'very-active', label: 'Very Active (intense exercise daily)' },
];

export default function Calculator() {
  const [userData, setUserData] = useState<UserData>({
    age: 30,
    gender: 'male',
    height: 170,
    weight: 70,
    activityLevel: 'moderate',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isListening, setIsListening] = useState(false);

  const handleCalculate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50); // Haptic feedback
    }
    
    const dailyCarbs = calculateCarbRequirement(userData);
    setResult({
      dailyCarbs,
      totalCalories: dailyCarbs * 4,
      carbPercentage: 50,
    });
  };

  const chartData = {
    labels: ['Carbs', 'Protein', 'Fat'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#60A5FA', '#34D399', '#F87171'],
        borderColor: ['#3B82F6', '#10B981', '#EF4444'],
        borderWidth: 1,
      },
    ],
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      setIsListening(true);
      // Voice recognition implementation would go here
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Carb Calculator Results',
          text: `My daily carb requirement is ${result?.dailyCarbs}g`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add content to PDF
    doc.setFontSize(20);
    doc.text('Your Carb Calculator Results', 20, 20);
    
    doc.setFontSize(14);
    doc.text(`Daily Carbohydrate Intake: ${result?.dailyCarbs}g`, 20, 40);
    doc.text(`Total Calories: ${result?.totalCalories} kcal`, 20, 50);
    doc.text(`Carb Ratio: ${result?.carbPercentage}%`, 20, 60);
    
    // Save the PDF
    doc.save('carb-calculator-results.pdf');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <motion.div 
        className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-6 mb-8 transition-all hover:shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Calculate Your Daily Carbs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm font-medium mb-2">Age</label>
              <input
                type="number"
                value={userData.age}
                onChange={(e) => setUserData({ ...userData, age: Number(e.target.value) })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 backdrop-blur-sm transition-all focus:ring-2 focus:ring-blue-500 shadow-neumorph dark:shadow-neumorph-dark"
                min="1"
                max="120"
              />
            </motion.div>

            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <div className="flex gap-4">
                {['male', 'female'].map((gender) => (
                  <motion.label 
                    key={gender} 
                    className="flex items-center cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <input
                      type="radio"
                      value={gender}
                      checked={userData.gender === gender}
                      onChange={(e) => setUserData({ ...userData, gender: e.target.value as Gender })}
                      className="mr-2"
                    />
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </motion.label>
                ))}
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-2">Height (cm)</label>
              <input
                type="number"
                value={userData.height}
                onChange={(e) => setUserData({ ...userData, height: Number(e.target.value) })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 backdrop-blur-sm transition-all focus:ring-2 focus:ring-blue-500 shadow-neumorph dark:shadow-neumorph-dark"
                min="100"
                max="250"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-2">Weight (kg)</label>
              <input
                type="number"
                value={userData.weight}
                onChange={(e) => setUserData({ ...userData, weight: Number(e.target.value) })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 backdrop-blur-sm transition-all focus:ring-2 focus:ring-blue-500 shadow-neumorph dark:shadow-neumorph-dark"
                min="30"
                max="300"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-2">Activity Level</label>
              <select
                value={userData.activityLevel}
                onChange={(e) => setUserData({ ...userData, activityLevel: e.target.value as ActivityLevel })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 backdrop-blur-sm transition-all focus:ring-2 focus:ring-blue-500 shadow-neumorph dark:shadow-neumorph-dark"
              >
                {activityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </motion.div>

            <div className="flex gap-2">
              <motion.button
                onClick={handleVoiceInput}
                className="flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-neumorph dark:shadow-neumorph-dark"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Voice Input"
              >
                <MicrophoneIcon className="h-5 w-5" />
              </motion.button>

              <motion.button
                onClick={handleCalculate}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg transition-all shadow-neumorph dark:shadow-neumorph-dark"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Calculate
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="backdrop-blur-lg bg-gray-50/50 dark:bg-gray-700/50 p-6 rounded-lg shadow-neumorph dark:shadow-neumorph-dark"
              >
                <h3 className="text-xl font-semibold mb-4">Your Results</h3>
                <div className="space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-300">Daily Carbohydrate Intake</p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {result.dailyCarbs}g
                    </p>
                  </motion.div>
                  
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '50%' }}
                      transition={{ delay: 0.4 }}
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                    />
                  </div>

                  <motion.div 
                    className="h-48"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Pie data={chartData} options={{ responsive: true }} />
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-300">Total Calories</p>
                      <p className="text-xl font-semibold">{result.totalCalories} kcal</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-300">Carb Ratio</p>
                      <p className="text-xl font-semibold">{result.carbPercentage}%</p>
                    </motion.div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <motion.button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-colors shadow-neumorph dark:shadow-neumorph-dark"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ShareIcon className="h-5 w-5" />
                      Share
                    </motion.button>
                    <motion.button
                      onClick={handleDownloadPDF}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg transition-colors shadow-neumorph dark:shadow-neumorph-dark"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <DocumentArrowDownIcon className="h-5 w-5" />
                      Download PDF
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}