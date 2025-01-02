import React from 'react'

function Services() {
    return (
        <div className='container mx-auto mt-24'>
            <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 gap-4'>
                <div className='bg-white p-10 text-center'>
                    <h2 className='text-xl font-semibold'>We care about <br />
                        your customers</h2>
                    <p className='text-gray-600 my-4'>Curabitur aliquet quam id dui posuere blandit. Donec sollicitudin molestie malesuada praesent.</p>
                </div>
                <div className='bg-white p-10 text-center'>
                    <h2 className='text-xl font-semibold'>Your design patner now <br />
                        and in the fiture</h2>
                    <p className='text-gray-600 my-4'>Curabitur aliquet quam id dui posuere blandit. Donec sollicitudin molestie malesuada praesent.</p>
                </div>
                <div className='bg-white p-10 text-center'>
                    <h2 className='text-xl font-semibold'>Around the clock <br />
                        support from day one</h2>
                    <p className='text-gray-600 my-4'>Curabitur aliquet quam id dui posuere blandit. Donec sollicitudin molestie malesuada praesent.</p>
                </div>
            </div>
        </div>
    )
}

export default Services
