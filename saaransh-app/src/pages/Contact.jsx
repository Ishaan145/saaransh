import React from 'react';

// Reusable Icon component
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

export default function Contact() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-cyan-400 tracking-wide uppercase">Contact Us</h2>
          <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Get in Touch
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-400">
            Have a question or feedback? We'd love to hear from you. Reach out to us directly or fill out the form below.
          </p>
        </div>

        <div className="mt-12 bg-gray-800 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          {/* Contact Information */}
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-12 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h3 className="text-2xl font-extrabold text-white sm:text-3xl">Contact Information</h3>
              <p className="mt-4 text-lg leading-6 text-gray-300">
                Our team is available to assist you with any inquiries.
              </p>
              <dl className="mt-8 space-y-6">
                <div className="flex">
                  <dt className="flex-shrink-0">
                     <Icon path="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" className="h-6 w-6 text-cyan-400" />
                  </dt>
                  <dd className="ml-3 text-base text-gray-300">support@civictracker.com</dd>
                </div>
                <div className="flex">
                  <dt className="flex-shrink-0">
                    <Icon path="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" className="h-6 w-6 text-cyan-400" />
                  </dt>
                  <dd className="ml-3 text-base text-gray-300">+91-123-4567890</dd>
                </div>
                 <div className="flex">
                  <dt className="flex-shrink-0">
                    <Icon path="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" className="h-6 w-6 text-cyan-400" />
                  </dt>
                  <dd className="ml-3 text-base text-gray-300">Mohali, Punjab, India</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Contact Form */}
          <div className="py-10 px-6 sm:px-10 lg:col-span-1 xl:p-12">
            <h3 className="text-2xl font-medium text-white">Send us a message</h3>
            <form action="#" method="POST" className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-300">Full Name</label>
                <div className="mt-1">
                  <input type="text" name="full-name" id="full-name" autoComplete="name" className="py-3 px-4 block w-full shadow-sm bg-gray-700 border-gray-600 rounded-md focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <div className="mt-1">
                  <input id="email" name="email" type="email" autoComplete="email" className="py-3 px-4 block w-full shadow-sm bg-gray-700 border-gray-600 rounded-md focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
                <div className="mt-1">
                  <input type="text" name="subject" id="subject" className="py-3 px-4 block w-full shadow-sm bg-gray-700 border-gray-600 rounded-md focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                <div className="mt-1">
                  <textarea id="message" name="message" rows="4" className="py-3 px-4 block w-full shadow-sm bg-gray-700 border-gray-600 rounded-md focus:ring-cyan-500 focus:border-cyan-500"></textarea>
                </div>
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
