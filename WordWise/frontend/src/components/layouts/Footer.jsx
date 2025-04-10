import React from 'react'
import { logoWhiteImg } from "../../utils"
import { Link } from 'react-router-dom'
import { footerItems } from '../../constants'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className='bg-blue-500 py-100'>
        <div className='screen-max-width flex justify-between items-center'>
          <div className='flex items-center'>
            <p className='font-bold text-5xl mr-30'>RocketCards</p>
            <img src={logoWhiteImg} alt='logo' width={100}/>
          </div>
          <div className='font-bold text-2xl flex flex-col'>
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