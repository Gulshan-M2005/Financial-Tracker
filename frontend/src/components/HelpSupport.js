import React, { useState } from 'react';
import './DashboardDark.css';

const faqs = [
  {
    question: 'How do I add a transaction?',
    answer:
      'Navigate to Transactions page and click the "Add Transaction" button. Fill in the details and save.',
  },
  {
    question: 'How can I set up a budget?',
    answer:
      'Go to the Budgets page and set monthly or category budgets based on your preferences.',
  },
  {
    question: 'How to export my reports?',
    answer:
      'Use the Export Reports page to download your transactions and reports as PDF or Excel files.',
  },
  {
    question: 'How to change currency settings?',
    answer:
      'Visit Multi-Currency Settings page to select your base currency and currency conversion options.',
  },
  {
    question: 'How do I secure my account?',
    answer:
      'You can enable two-factor authentication in the Settings page for added security.',
  },
];

const HelpSupport = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="main-content">
      <h1>Help & Support</h1>
      <section className="faq-section">
        {faqs.map((faq, index) => (
          <div 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="faq-question">{faq.question}</h3>
            {activeIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </section>
    </main>
  );
};

export default HelpSupport;
