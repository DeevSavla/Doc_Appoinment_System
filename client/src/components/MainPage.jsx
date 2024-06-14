import React from 'react'
import hero1 from '../photos/hero-img01.png'
import hero2 from '../photos/hero-img02.png'
import hero3 from '../photos/hero-img03.png'

function MainPage() {
  return (
    <div className='flex justify-center py-8 px-4 ml-14'>
      <div className='flex flex-col lg:flex-row items-center gap-8 max-w-screen-xl w-full'>
        <div className='flex-1 text-center lg:text-left'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>We help patients live a healthy, longer life.</h1>
          <p className='text-gray-600 mb-8'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus quaerat cumque fugit, perspiciatis cum nemo aperiam, aut quia earum amet architecto, modi odio. Soluta unde ducimus perferendis?
          </p>
          <div className='mt-8 flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-8'>
            <div className='text-center'>
              <h1 className='text-4xl font-bold text-blue-600'>30+</h1>
              <p className='text-gray-600'>Years of Experience</p>
            </div>
            <div className='text-center'>
              <h1 className='text-4xl font-bold text-purple-600'>15+</h1>
              <p className='text-gray-600'>Clinic Location</p>
            </div>
            <div className='text-center'>
              <h1 className='text-4xl font-bold text-green-600'>100%</h1>
              <p className='text-gray-600'>Patient Satisfaction</p>
            </div>
          </div>
        </div>

        <div className='flex-1 flex flex-col lg:flex-row items-center gap-4'>
          <img src={hero1} className='w-72 h-96 rounded-lg shadow-lg object-cover' alt='Doctor' />
          <div className='flex flex-col gap-4'>
            <img src={hero2} className='w-36 h-48 rounded-lg shadow-lg object-cover' alt='Doctor' />
            <img src={hero3} className='w-36 h-48 rounded-lg shadow-lg object-cover' alt='Doctor' />
          </div>
        </div>
      </div>
    </div>

  )
}

export default MainPage