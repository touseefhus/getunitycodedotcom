// import React from 'react';
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import Image from 'next/image';

// const Founder = () => {
//   return (
//     <div className="about-section">
//       <div className="team-member flex items-center space-x-4">
//         <Avatar className="w-32 h-32 relative overflow-hidden">

//           <Image
//             src="/assets/avatar.jpg"
//             alt="Charles Dickens"
//             layout="fill"
//             objectFit="cover"
//             className="rounded-full"
//           />
//           <AvatarFallback>CD</AvatarFallback>
//         </Avatar>
//       </div>
//       <h2 className='mt-5 font-bold text-2xl'>Charles Dickens</h2>
//       <p className='text-gray-600'>The Founder, Bigspring LLC</p>
//     </div>
//   );
// };

// export default Founder;



import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from 'next/image';

const Founder = () => {
    return (
        <div className="about-section flex flex-col items-center justify-center">
            <div className="team-member flex flex-col items-center space-y-4">
                <Avatar className="w-28 h-28 relative overflow-hidden">
                    {/* Use Image directly and ensure src is correct */}
                    <Image
                        src="/assets/avatar.jpg"
                        alt="Charles Dickens"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                    />
                    <AvatarFallback>CD</AvatarFallback>
                </Avatar>
                <h2 className="mt-5 font-bold text-2xl text-center">Charles Dickens</h2>
                <p className="text-gray-600 text-center">The Founder, Bigspring LLC</p>
            </div>
        </div>
    );
};

export default Founder;
