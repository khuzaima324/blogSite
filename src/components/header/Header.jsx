// import React from 'react'
// import {Container, LogoutBtn} from '../index'
// import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import {useNavigate } from 'react-router-dom'

// function header() {
//   const authStatus = useSelector((state)=> state.auth.status);
//   const navigate = useNavigate();
//   const navItems = [
//     {
//       name: 'Home',
//       slug: '/',
//       active: true
//     },
//     {
//       name: 'Login',
//       slug: '/login',
//       active: !authStatus
//     },
//     {
//       name: 'SignUp',
//       slug: '/signup',
//       active: !authStatus
//     },
//     {
//       name: 'All Posts',
//       slug: '/all-post',
//       active: authStatus
//     },
//     {
//       name: 'Add Post',
//       slug: '/add-post',
//       active: authStatus
//     }
//   ]
//   return (
//     <header className='py-3 shadow bg-gray-500'>
//       <nav className='flex'>
//         <div className='mr-4'>
//           <Link to='/'>
//               Logo
//           </Link>
//         </div>
//         <ul className='flex ml-auto'>
//           {navItems.map((items)=>
//             items.active ? (
//               <li key={items.name}>
//                 <button 
//                 onClick={()=> navigate(items.slug)}
//                 className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//                 >{items.name}</button>
//               </li>
//             ) : null
//           )}
//           {authStatus && (
//             <li>
//               <LogoutBtn />
//             </li>
//           )}
//         </ul>
//       </nav>
//     </header>
//   )
// }
// import { formatProdErrorMessage } from '@reduxjs/toolkit'

// export default header


import React from 'react'
import { Container, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'SignUp', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-post', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ]

  return (
    <header
      className="bg-[var(--color-darker)] text-white shadow-md sticky top-0 z-50"
    >
      <nav className="flex flex-wrap items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-all"
        >
          Logo
        </Link>

        {/* Nav Items */}
        <ul className="flex flex-wrap items-center gap-3 md:gap-5 ml-auto">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="header-btn px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      color: 'var(--color-primary)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}

          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
