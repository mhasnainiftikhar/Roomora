import React from 'react';

const ReportConcern = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20 mt-6">
            <h1 className="text-4xl font-extrabold mb-8 font-playfair text-gray-900">Report a Concern</h1>

            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <p className="text-lg text-gray-600">
                            We take all reports seriously. If you have experienced or witnessed a violation of our policies,
                            please let us know immediately.
                        </p>
                    </section>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">What is your concern related to?</label>
                            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none bg-white">
                                <option>Select a topic</option>
                                <option>Safety or Security</option>
                                <option>Discrimination or Harassment</option>
                                <option>Fraud or Scam</option>
                                <option>Property Condition</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Booking Reference (if applicable)</label>
                            <input
                                type="text"
                                placeholder="E.g., #BK-123456"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Description</label>
                            <textarea
                                rows="6"
                                placeholder="Please provide as much detail as possible..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none resize-none"
                            ></textarea>
                        </div>

                        <button className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors w-full md:w-auto">
                            Submit Report
                        </button>
                    </form>
                </div>

                <div className="md:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-xl sticky top-24">
                        <h3 className="font-bold text-lg mb-4">Urgent Help</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            If you or someone else is in immediate danger, please contact local emergency services first.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <p className="font-bold text-sm text-gray-900">Emergency Services</p>
                                <p className="text-red-600 font-bold">911 (US)</p>
                            </div>
                            <hr className="border-gray-200" />
                            <div>
                                <p className="font-bold text-sm text-gray-900">RoomOra Safety Line</p>
                                <p className="text-gray-600">+1-800-123-4567</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportConcern;
