import React from 'react';


const Navbar = () => {
  return (
    <div className='flex bg-indigo-700 gap-5 justify-between h-14 items-center text-white font-bold px-5'>
      <div>
        <img
          src="/todo-icon.png"
          alt="Todo Icon"
          className="h-10 w-10 rounded-full bg-white p-1"
        />
      </div>
      <div>
        <ul className='flex gap-5 mr-4'>
          <li className='cursor-pointer hover:text-indigo-300'>Home</li>
          <li className="cursor-pointer hover:text-indigo-300">About</li>
          <li className="cursor-pointer hover:text-indigo-300">Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
