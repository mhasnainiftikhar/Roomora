import React from 'react';

const CancellationPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20 mt-6">
            <h1 className="text-4xl font-extrabold mb-8 font-playfair text-gray-900">Cancellation Policy</h1>

            <div className="space-y-10">
                <section>
                    <p className="text-lg text-gray-600">
                        We understand that plans can change. Review our cancellation policies below to understand your refund eligibility.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Policy Tiers</h2>
                    <div className="grid gap-6">
                        <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                            <h3 className="text-xl font-bold text-green-700 mb-2">Flexible</h3>
                            <p className="text-gray-600 mb-2">Free cancellation until 24 hours before check-in.</p>
                            <p className="text-sm text-gray-500">If cancelled within 24 hours of check-in, the first night is non-refundable.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-yellow-100 shadow-sm">
                            <h3 className="text-xl font-bold text-yellow-700 mb-2">Moderate</h3>
                            <p className="text-gray-600 mb-2">Free cancellation until 5 days before check-in.</p>
                            <p className="text-sm text-gray-500">If cancelled within 5 days, 50% of the reservation is non-refundable.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm">
                            <h3 className="text-xl font-bold text-red-700 mb-2">Strict</h3>
                            <p className="text-gray-600 mb-2">Free cancellation for 48 hours after booking, if the check-in date is at least 14 days away.</p>
                            <p className="text-sm text-gray-500">Otherwise, the reservation is non-refundable.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 p-6 rounded-xl">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Extenuating Circumstances</h2>
                    <p className="text-gray-600 mb-4">
                        In rare cases, you may be eligible for a full refund outside of standard policies due to unexpected events, such as:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>Government-declared emergencies or epidemics</li>
                        <li>Military deployment</li>
                        <li>Natural disasters affecting the destination</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Cancel</h2>
                    <p className="text-gray-600">
                        To cancel your reservation, go to <span className="font-semibold text-black">My Bookings</span>,
                        select the trip you wish to cancel, and follow the cancellation instructions. The refund amount
                        will be automatically calculated based on the policy applied to your booking.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default CancellationPolicy;
