import React from 'react'
import accenture from '../../assets/assets/accenture_logo.svg'
import microsoft from '../../assets/assets/microsoft_logo.svg'
import walmart from '../../assets/assets/walmart_logo.svg'
import adobe from '../../assets/assets/adobe_logo.svg'
import paypal from '../../assets/assets/paypal_logo.svg'
const Companies = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='mt-18! mb-0! text-center text-xl text-gray-500'>Trusted by Learners from</p>
      <div className='flex flex-wrap text-base gap-10 justify-center items-center'>
        <img src={microsoft} alt="microsoft" className='w-40 h-40' />
        <img src={walmart} alt="walmart" className='w-40 h-40' />
        <img src={accenture} alt="accenture" className='w-40 h-40' />
        <img src={adobe} alt="adobe" className='w-40 h-40' />
        <img src={paypal} alt="paypal" className='w-40 h-40' />
      </div>
    </div>
  )
}

export default Companies
