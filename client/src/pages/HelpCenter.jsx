import React from 'react';

const HelpCenter = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20 mt-6">
            <h1 className="text-4xl font-extrabold mb-8 font-playfair text-gray-900">Professional Help Center</h1>

            <div className="space-y-12">
                {/* Search Section */}
                <section className="bg-gray-50 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">How can we help?</h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for articles..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        />
                        <button className="absolute right-3 top-3 text-gray-400 hover:text-black">
                            Search
                        </button>
                    </div>
                </section>

                {/* FAQ Section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 cursor-pointer">
                            <h3 className="font-bold text-lg mb-2">How do I cancel my booking?</h3>
                            <p className="text-gray-600">Go to My Bookings, select the reservation, and click Cancel. Please review the cancellation policy first.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 cursor-pointer">
                            <h3 className="font-bold text-lg mb-2">When will I get my refund?</h3>
                            <p className="text-gray-600">Refuncs are typically processed within 5-10 business days, depending on your bank's processing times.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 cursor-pointer">
                            <h3 className="font-bold text-lg mb-2">Is my payment secure?</h3>
                            <p className="text-gray-600">Yes, we use industry-standard encryption and trusted payment gateways to ensure your data is safe.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 cursor-pointer">
                            <h3 className="font-bold text-lg mb-2">How can I contact a host?</h3>
                            <p className="text-gray-600">Once your booking is confirmed, you will find options to message the host directly from your dashboard.</p>
                        </div>
                    </div>
                </section>

                {/* Contact Support */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Still need help?</h2>
                    <div className="bg-black text-white p-8 rounded-xl text-center">
                        <h3 className="text-xl font-bold mb-4">Contact our Support Team</h3>
                        <p className="mb-6 text-gray-300">Our team is available 24/7 to assist you with any issues.</p>
                        <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors cursor-pointer">
                            Contact Us
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HelpCenter;
