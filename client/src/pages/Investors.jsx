import React from 'react';

const Investors = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-20 mt-6">
            <header className="mb-16 text-center">
                <h1 className="text-5xl font-extrabold mb-6 font-playfair text-gray-900">Investor Relations</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Driving sustainable growth and redefining the future of global travel and hospitality.
                </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
                <div className="bg-gray-900 text-white p-8 rounded-2xl text-center">
                    <h3 className="text-4xl font-bold mb-2 text-amber-400">2.5M+</h3>
                    <p className="font-medium text-gray-300">Bookings Annually</p>
                </div>
                <div className="bg-gray-900 text-white p-8 rounded-2xl text-center">
                    <h3 className="text-4xl font-bold mb-2 text-amber-400">190+</h3>
                    <p className="font-medium text-gray-300">Countries Served</p>
                </div>
                <div className="bg-gray-900 text-white p-8 rounded-2xl text-center">
                    <h3 className="text-4xl font-bold mb-2 text-amber-400">$850M</h3>
                    <p className="font-medium text-gray-300">Gross Booking Value</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Reports</h2>
                    <ul className="space-y-4">
                        {[
                            'Q4 2025 Shareholder Letter',
                            'Fiscal Year 2025 Annual Report',
                            'Q3 2025 Financial Results'
                        ].map((report, i) => (
                            <li key={i} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                <span className="font-semibold text-gray-800">{report}</span>
                                <span className="text-gray-400">PDF</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                    <ul className="space-y-4">
                        <li className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-bold text-amber-600 mb-1">MAR 15, 2026</p>
                            <h3 className="font-bold text-gray-900">Annual Shareholders Meeting</h3>
                            <p className="text-sm text-gray-500 mt-2">Virtual Webcast • 10:00 AM EST</p>
                        </li>
                        <li className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-bold text-amber-600 mb-1">MAY 02, 2026</p>
                            <h3 className="font-bold text-gray-900">Q1 2026 Earnings Call</h3>
                            <p className="text-sm text-gray-500 mt-2">Audio Webcast • 5:00 PM EST</p>
                        </li>
                    </ul>
                </section>
            </div>

            <div className="mt-16 bg-gray-100 p-8 rounded-xl text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact IR</h2>
                <p className="text-gray-600 mb-4">For investor inquiries, please contact our Investor Relations team.</p>
                <a href="mailto:investors@roomora.com" className="font-bold text-black border-b-2 border-black inline-block hover:text-amber-600 hover:border-amber-600 transition-colors">investors@roomora.com</a>
            </div>
        </div>
    );
};

export default Investors;
