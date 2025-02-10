import Calculator from './components/Calculator';
import FAQ from './components/FAQ';

export default function Home() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Daily Carbohydrate Calculator</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Calculate your recommended daily carbohydrate intake based on your personal metrics
          </p>
        </div>

        <section id="calculator">
          <Calculator />
        </section>
        
        <section id="faq">
          <FAQ />
        </section>
      </div>
    </main>
  );
}