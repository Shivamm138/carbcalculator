'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'What are carbohydrates?',
    answer: 'Carbohydrates are one of the three main macronutrients found in food, alongside proteins and fats. They are the body\'s primary source of energy and are essential for proper bodily function.',
  },
  {
    question: 'Why do I need carbohydrates?',
    answer: 'Carbohydrates fuel your brain, kidneys, heart muscles, and central nervous system. They are especially important for brain function, as your brain uses about 20% of your body\'s energy requirements.',
  },
  {
    question: 'What foods are rich in carbohydrates?',
    answer: 'Common sources include grains (bread, pasta, rice), fruits, vegetables, legumes, and dairy products. The quality of carbohydrates matters - whole grains and fruits provide more nutrients than refined sugars.',
  },
  {
    question: 'How accurate is this calculator?',
    answer: 'This calculator provides an estimate based on well-established formulas. However, individual needs may vary based on factors such as medical conditions, specific training goals, or dietary restrictions.',
  },
];

export default function FAQ() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-left">
                  <span className="font-medium">{faq.question}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'transform rotate-180' : ''
                    } w-5 h-5 text-gray-500`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="px-4 pb-3 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </Disclosure.Panel>
                </Transition>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}