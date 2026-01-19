import React from 'react';

const TermsConditions = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20">
            <h1 className="text-4xl font-extrabold mb-8 font-playfair text-gray-900">Terms & Conditions</h1>
            <div className="prose prose-lg text-gray-600 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using RoomOra, you agree to be bound by these Terms and Conditions.
                        If you do not agree to these terms, please do not use our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Booking and Payments</h2>
                    <p>
                        All bookings are subject to availability and confirmation. Payment must be made in full
                        at the time of booking unless otherwise stated.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cancellation Policy</h2>
                    <p>
                        Cancellations are subject to the specific policy of the property owner. Please review
                        the cancellation terms carefully before making a booking.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Conduct</h2>
                    <p>
                        Users agree to use the site for lawful purposes only and are prohibited from posting
                        any misleading, defamatory, or offensive content.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
                    <p>
                        RoomOra is a platform that connects travelers with property owners. We are not responsible
                        for any personal injury, property damage, or other loss resulting from your stay.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsConditions;
