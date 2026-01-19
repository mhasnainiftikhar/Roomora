import React from 'react';

const CookieSettings = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20">
            <h1 className="text-4xl font-extrabold mb-8 font-playfair text-gray-900">Cookie Settings</h1>
            <div className="prose prose-lg text-gray-600 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
                    <p>
                        Cookies are small text files that are stored on your device when you visit our website.
                        They help us provide a better experience and understand how you interact with our site.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Necessary Cookies</h3>
                            <p className="text-sm">These cookies are essential for the website to function and cannot be switched off.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Performance Cookies</h3>
                            <p className="text-sm">These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Marketing Cookies</h3>
                            <p className="text-sm">These cookies may be set through our site by our advertising partners to build a profile of your interests.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Preferences</h2>
                    <p>
                        You can manage your cookie preferences through your browser settings. Please note that
                        disabling some cookies may affect the functionality of our website.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default CookieSettings;
