import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20">
            <h1 className="text-4xl font-extrabold mb-8 font-playfair text-gray-900">Privacy Policy</h1>
            <div className="prose prose-lg text-gray-600 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us when you create an account, make a booking, or communicate with us.
                        This includes your name, email address, phone number, and payment information.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                    <p>
                        We use the information we collect to provide, maintain, and improve our services, including to process your bookings,
                        send you technical notices, and respond to your comments and questions.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Sharing and Disclosure</h2>
                    <p>
                        We do not share your personal information with third parties except as described in this policy, such as with property
                        owners to facilitate your bookings or when required by law.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Your Rights</h2>
                    <p>
                        You have the right to access, correct, or delete your personal information at any time. You can manage your
                        information through your account settings or by contacting us.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at privacy@roomora.com.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
