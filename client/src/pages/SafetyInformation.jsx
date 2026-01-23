import React from 'react';

const SafetyInformation = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20 mt-6">
            <h1 className="text-4xl font-extrabold mb-8 font-playfair text-gray-900">Safety Information</h1>

            <div className="prose prose-lg text-gray-600 space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
                    <p>
                        At RoomOra, your safety is our top priority. We verify all hosts and guests to ensure a secure and trusted community.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm cursor-pointer">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            For Guests
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>Read reviews and host profiles carefully</li>
                            <li>Keep all communication on the platform</li>
                            <li>Check for safety features (smoke detectors, first aid)</li>
                            <li>Know the emergency numbers for your destination</li>
                        </ul>
                    </section>

                    <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm cursor-pointer">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            For Hosts
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>Set clear house rules and expectations</li>
                            <li>Verify guest identity before check-in</li>
                            <li>Install safety devices like smoke and CO detectors</li>
                            <li>Provide a local emergency contact card</li>
                        </ul>
                    </section>
                </div>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Resources</h2>
                    <p className="mb-4">
                        In case of an immediate emergency, always call the local emergency number (e.g., 911 in the US).
                    </p>
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                        <p className="font-bold text-orange-900">RoomOra Trust & Safety Line</p>
                        <p className="text-orange-700">For urgent safety concerns related to your booking, call our dedicated line: +1-800-123-4567</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SafetyInformation;
