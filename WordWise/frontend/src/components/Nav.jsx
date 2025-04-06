import React from 'react'
import { logoImg } from '../utils'

const Nav = () => {
  return (
    <nav className='p-20 bg-white'>
        <div className='flex justify-between screen-max-width items-center'>
            <a href="/" className='flex items-center'>
                <span className='text-xl text-green-500 tracking-wider font-bold'>RocketCards</span>
                <img src={logoImg} alt='logo' width={30} className='mx-10'/>
            </a>
            <div>
              <a href="/login" className='tracking-wider font-bold mx-20'>
                <button className='button-class hover:button-class_hover'>zaloguj się</button>
              </a>
              <a href="/register" className='tracking-wider font-bold'>
                <button className='button-class second-button hover:second-button_hover'>stwórz konto</button>
              </a>
            </div>
        </div>
    </nav>
  )
}


export default Nav