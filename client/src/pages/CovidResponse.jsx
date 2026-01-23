import React from 'react';

const CovidResponse = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20 mt-6">
            <h1 className="text-4xl font-extrabold mb-8 font-playfair text-gray-900">Our COVID-19 Response</h1>

            <div className="prose prose-lg text-gray-600 space-y-10">
                <section>
                    <p className="text-lg">
                        The health and safety of our community is our top priority. We are closely monitoring the situation
                        and strictly following the guidelines provided by the World Health Organization (WHO) and local authorities.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Enhanced Cleaning Protocol</h2>
                    <p className="mb-4">
                        We have implemented a rigorous 5-step enhanced cleaning process for all hosts:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                        <li><strong>Prepare:</strong> Ventilate the space before cleaning.</li>
                        <li><strong>Clean:</strong> Remove dust and dirt from surfaces.</li>
                        <li><strong>Sanitize:</strong> Use approved disinfectants on high-touch areas.</li>
                        <li><strong>Check:</strong> Review the room checklist to ensure nothing is missed.</li>
                        <li><strong>Reset:</strong> Wash hands and replace cleaning supplies before the next guest.</li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Flexible Cancellations</h2>
                    <p>
                        We understand travel plans can change unexpectedly. Many of our hosts have updated their cancellation
                        policies to offer more flexibility during these times. Please check the specific policy for your booking
                        before confirming.
                    </p>
                </section>

                <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h2 className="text-xl font-bold text-blue-900 mb-2">Travel Requirements</h2>
                    <p className="text-blue-800 text-sm">
                        Travel restrictions may vary by location. We strongly recommend checking local government guidelines
                        for your destination before booking and traveling.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default CovidResponse;
