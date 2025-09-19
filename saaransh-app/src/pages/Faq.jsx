import React, { useState } from 'react';

// Single FAQ Item Component
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-2 border-gray-700 py-6">
      <dt>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-start text-left text-gray-300"
        >
          <span className="text-lg font-medium text-white">{question}</span>
          <span className="ml-6 h-7 flex items-center">
            <svg
              className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </dt>
      <dd className={`mt-2 pr-12 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <p className="text-base text-gray-400">{answer}</p>
      </dd>
    </div>
  );
};

export default function Faq() {
  const faqData = [
    {
      question: 'What is CivicTrack?',
      answer: 'CivicTrack is a community-driven platform that empowers citizens to report, track, and resolve local civic issues like potholes, garbage, and water leaks. Our goal is to make our neighborhoods better, together.',
    },
    {
      question: 'How do I report an issue?',
      answer: 'Simply click the "Report an Issue" button, fill out the form with details like the title, description, category, and location. You can also upload photos to provide more context.',
    },
    {
      question: 'Can I report an issue anonymously?',
      answer: 'Yes, our platform supports anonymous reporting to ensure everyone feels comfortable sharing issues. However, creating an account allows you to track all your reported issues in one place.',
    },
    {
      question: 'How is my location used?',
      answer: 'We use your location, either from your device’s GPS or a manually entered address, to show you relevant issues within a 3-5 km radius. This keeps the feed focused on your local community.',
    },
    {
      question: 'What happens after I report an issue?',
      answer: 'Once an issue is reported, it becomes visible to other users in the community and is flagged for the relevant local authorities. The status changes from "Reported" to "In Progress" and finally to "Resolved" as it gets addressed.',
    },
     {
      question: 'How can I track the status of my report?',
      answer: 'If you create an account, you can see the status of all your submitted issues in your personal dashboard. You will also receive notifications when the status of an issue you reported is updated.',
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-3xl font-extrabold text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-center mt-4 text-lg text-gray-400">
            Find answers to the most common questions about CivicTrack.
          </p>
          <dl className="mt-12 space-y-6">
            {faqData.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
