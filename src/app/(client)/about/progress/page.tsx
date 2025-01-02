import React from 'react'
function Progress() {
    return (
        <div className='bg-white py-10'>
            <div className='container mx-auto px-28'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4 sm:grid-cols-2'>
                    <div className='text-center py-10 rounded-md'>
                        <h2 className='text-3xl font-semibold'>80%</h2>
                        <p className='text-gray-600 leading-7'>Spend 80% less time <br />
                            on admin</p>
                    </div>
                    <div className='text-center py-10 rounded-md'>
                        <h2 className='text-3xl font-semibold'>40x</h2>
                        <p className='text-gray-600 leading-7'>Attract 40x more <br />
                            the candidate</p>
                    </div>
                    <div className='text-center py-10 rounded-md'>
                        <h2 className='text-3xl font-semibold'>83%</h2>
                        <p className='text-gray-600 leading-7'>Reduce recruitment<br />
                            agency spend</p>
                    </div>
                    <div className='text-center py-10 rounded-md'>
                        <h2 className='text-3xl font-semibold'>40%</h2>
                        <p className='text-gray-600 leading-7'>Make hires 40%<br />
                            faster</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Progress
