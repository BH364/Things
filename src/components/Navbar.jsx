import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-700 text-white py-2 '>
      <div className='logo'>
        <spam className="font-bold text-xl mx-8">Things</spam>
      </div>
      <ul className='flex gap-8'>
        <li className='cursor-pointer hover:font-bold transition-all duration-500'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-500'>Your tasks</li>
      </ul>

    </nav>
  )
}

export default Navbar
