import React from 'react'
import { loginItems } from '../constants'
import { logoImg } from '../utils'

const Nav = () => {
  return (
    <nav className='p-20 bg-gray-300'>
        <div className='flex justify-between screen-max-width items-center'>
            <a href="/" className='flex items-center'>
                <span className='text-xl text-red-500 tracking-wider font-bold'>WordWise</span>
                <img src={logoImg} alt='logo' width={30} className='mx-10'/>
            </a>
            <div>
              {loginItems.map((element, i) => (
                <a key={i} href={element.link} className='tracking-wider font-bold'>
                  <button className='button-class hover:button-class_hover'>{element.text}</button>
                </a>
              ))}
            </div>
        </div>
    </nav>
  )
}

export default Nav