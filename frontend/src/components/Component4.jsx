import React, { forwardRef } from 'react';

const Component4 = forwardRef(({ component5Ref }, ref) => {
  const handleScroll = () => {
    if (component5Ref?.current) {
      component5Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={ref}
      className="h-screen flex flex-col justify-center items-start w-screen  pl-[50px] pt-[30px]  relative overflow-hidden"
    >
      <div className=' pb-16'>

        <h1 className='text-[67px] '>Controllers used</h1>
        <ol className='pl-12 list-disc flex gap-x-24'>
        <li>Events' Controller</li>
          <li>Users' Controller</li>
          <li>Key's Controller</li>
        </ol>
        <br />


        <h1 className='text-[67px] '>Models</h1>
        <ol className='pl-12 list-disc flex gap-x-[200px] '>
        <li>Events' model</li>
          <li>Users' model</li>
        </ol>
        <br />
        <div className='flex gap-x-12 pl-12 '>
        <img src="/group2.png" className='h-[300px] ' />
        <img src="/group3.png" className='h-[300px] ' />
        </div>


      </div>
      
      <button onClick={handleScroll} className="absolute right-[700px] bottom-0">
        <img src="/down.png" alt="Scroll Down" />
      </button>
    </div>
  );
});

export default Component4;
