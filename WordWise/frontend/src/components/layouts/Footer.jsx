import React from 'react'
import { logoWhiteImg } from "../../utils"
import { Link } from 'react-router-dom'
import { footerItems } from '../../constants'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className='bg-blue-500 py-100 px-20'>
        <div className='screen-max-width flex flex-col-reverse md:flex-row justify-between items-center'>
          <div className='flex items-center mt-60 md:m-0'>
            <p className='font-bold text-3xl sm:text-4xl lg:text-5xl mr-30'>RocketCards</p>
            <img src={logoWhiteImg} alt='logo' className='w-60 sm:w-80 lg:w-100'/>
          </div>
          <div className='font-bold text-xl md:text-2xl flex flex-col'>
            {footerItems.map((element, index) => (
              <Link to={element.link} key={index}>
                <button className='cursor-pointer my-15 hover:text-shadow transition-color duration-150'>{element.text}</button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className='bg-blue-600 text-center py-10'>
        <p>&copy; {year} | WordWise.pl</p>
      </div>
    </footer>
  )
}

export default Footer