import React from 'react'
import accenture from '../../assets/assets/accenture_logo.svg'
import microsoft from '../../assets/assets/microsoft_logo.svg'
import walmart from '../../assets/assets/walmart_logo.svg'
import adobe from '../../assets/assets/adobe_logo.svg'
import paypal from '../../assets/assets/paypal_logo.svg'
const Companies = () => {
  return (
    <div className='flex flex-col justify-center items-center px-2 sm:px-4'>
      <p className='mt-10 mb-0 text-center text-base sm:text-xl text-gray-500'>Trusted by Learners from</p>
      <div className='flex flex-wrap text-base gap-6 sm:gap-10 justify-center items-center w-full max-w-4xl'>
        <img src={microsoft} alt="microsoft" className='w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 object-contain' />
        <img src={walmart} alt="walmart" className='w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 object-contain' />
        <img src={accenture} alt="accenture" className='w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 object-contain' />
        <img src={adobe} alt="adobe" className='w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 object-contain' />
        <img src={paypal} alt="paypal" className='w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 object-contain' />
      </div>
    </div>
  )
}

export default Companies
