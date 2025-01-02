import React from 'react';
import Image from 'next/image';
import Founder from './founder/page';
import Progress from './progress/page';
import Services from './services/page';

function Page() {
    return (
        <section>
            <div className="container mx-auto px-3 mt-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className='mt-24'>
                        <h1 className="sm:text-5xl text-4xl font-semibold text-gray-800">
                            Give Your Team The <br />Design Mindset & Tools
                        </h1>
                        <p className='mt-4 text-gray-600'>
                            Create a best strategic tool, share it with your team and ensure it’s on track with intuitive dashboards. Simple enough with the flexibility Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                    </div>
                    <div className="bg-gray-400 relative">
                        <Image
                            src="/assets/about.jpg"
                            alt="Design Mindset"
                            layout="responsive"
                            width={600}
                            height={400}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-green-500 bg-opacity-20 py-14 mt-24">
                <div>
                    <div className='container'>
                        <p className='text-center text-2xl text-gray-600'>
                            We’re changing how product managers, developers, and data scientists plan, track, and govern analytics across organizations. Before Avo, teams were forced to choose between product delivery speed and reliable insights.
                        </p>
                        <div className='flex justify-center mt-6'>
                            <Founder />
                        </div>
                    </div>

                    <div className="container mx-auto my-24 px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white p-6 shadow-md rounded-lg">
                                <h2 className='text-2xl font-bold'>Who we are?</h2>
                                <p className='text-gray-600 my-4'>
                                    We started in 2018 because we believe we can change the way organizations use data to make better decisions for their customers. We’ve been blown away by the impact BI has had on data quality and developer productivity for our customers.
                                </p>
                                <p className='text-gray-600 my-4'>
                                    From startups to consumer it’s been incredible to see our product fundamentally change the way PMs, devs and data scientists collaborate to track and govern their analytics.
                                </p>
                            </div>
                            <div className="bg-white p-6 shadow-md rounded-lg">
                                <h2 className='text-2xl font-bold'>Our mission</h2>
                                <p className='text-gray-600 my-4'>
                                    Companies have never had to understand their customers better or faster. Consumers choose the product with the best experience and companies can’t afford to stall product decisions while waiting days or weeks for answers from a centralized BI team.
                                </p>
                                <p className='text-gray-600 my-4'>
                                    The industry gold standard has become to decentralize business intelligence, so that every team is autonomous in making data-driven decisions quickly.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <Progress />
                <Services />
            </div>

        </section>
    );
}

export default Page;
