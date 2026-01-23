import React from 'react';

const Careers = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20 mt-6">
            <h1 className="text-4xl font-extrabold mb-8 font-playfair text-gray-900">Join Our Team</h1>

            <div className="space-y-12">
                <section>
                    <p className="text-lg text-gray-600">
                        At RoomOra, we're reimagining the future of hospitality. We are a team of dreamers, builders, and
                        explorers, united by a common goal: to help people experience the world in the most authentic way possible.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>
                    <div className="space-y-4">
                        {[
                            { title: 'Senior Frontend Engineer', team: 'Engineering', location: 'Remote' },
                            { title: 'Product Designer', team: 'Design', location: 'New York, NY' },
                            { title: 'Customer Experience Specialist', team: 'Operations', location: 'London, UK' },
                            { title: 'Backend Developer', team: 'Engineering', location: 'Remote' }
                        ].map((job, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-black transition-colors cursor-pointer group">
                                <div>
                                    <h3 className="font-bold text-lg group-hover:text-amber-600 transition-colors">{job.title}</h3>
                                    <p className="text-gray-500">{job.team} • {job.location}</p>
                                </div>
                                <button className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 cursor-pointer">
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-amber-50 p-8 rounded-xl text-center">
                    <h2 className="text-2xl font-bold text-amber-900 mb-4">Don't see the right fit?</h2>
                    <p className="text-amber-800 mb-6">
                        We are always looking for talented individuals to join our growing team. Send us your resume and tell us why you'd be a great addition to RoomOra.
                    </p>
                    <button className="bg-white text-amber-900 px-8 py-3 rounded-full font-bold hover:bg-amber-100 transition-colors cursor-pointer">
                        Send General Application
                    </button>
                </section>
            </div>
        </div>
    );
};

export default Careers;
