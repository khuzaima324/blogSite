// import React, { useState } from 'react'
// import { data, Link, useNavigate } from 'react-router-dom'
// import { login as authLogin } from '../store/authSlice'
// import { Button, Input, Logo } from './index'
// import { useDispatch } from 'react-redux'
// import authService from '../appwrite/auth'
// import { useForm } from 'react-hook-form'

// function Login() {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const { register, handleSubmit } = useForm()
//     const [error, setError] = useState("")

//     const login = async (data) => {
//         setError("")
//         try {
//             const session = await authService.login(data)
//             if (session) {
//                 const userData = await authService.getCurrentUser()
//                 if (session) {
//                     dispatch(authLogin(userData))
//                     navigate('/')
//                 }
//             }
//         } catch (error) {
//             setError(error.message)
//         }
//     }

//     return (
//         <div
//             className='flex items-center justify-center w-full'
//         >
//             <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 `}>
//                 <div className='mb-2 flex justify-center'>
//                     <span className='inline-block w-full max-w-[100px]'>
//                         <Logo width='100%' />
//                     </span>
//                 </div>
//                 <h2 className='text-center text-2xl font-bold leading-tight'>Sign In To Your Account!</h2>
//                 <p className='mt-2 text-center text-base text-black/60'>
//                     Don&apos;t Have any account?&nbsp;
//                     <Link
//                         to='/signup'
//                         className='font-medium text-primary transition-all duration-200 hover:underline'
//                     >
//                         Sign Up
//                     </Link>
//                 </p>
//                 {error && <p className='text-red-500 text-center mt-8'>{error}</p>}
//                 {/* form */}
//                 <form onSubmit={handleSubmit(login)} className='mt-8'>
//                     <div className='space-y-5'>
//                         <Input
//                             label='Email'
//                             placeholder='Enter your email'
//                             type='email'
//                             {...register("email", {
//                                 required: true,
//                                 validate: {
//                                     matchPatern: (value) =>
//                                         /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                                         "Email address must be a valid address",
//                                 }

//                             })}
//                         />
//                         <Input
//                             label="Password"
//                             type="password"
//                             placeholder="Enter Your Password!"
//                             {...register('password', {
//                                 required: true,
//                             })}
//                         />

//                         <Button
//                             type='submit'
//                             className='w-full'
//                         >
//                             Sign in
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Login

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const login = async (data) => {
    if (loading) return // prevent double clicks
    setLoading(true)
    setError("")

    try {
      const session = await authService.login(data)

      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(authLogin(userData))
          navigate('/')
        }
      }
    } catch (err) {
      console.log("Login error:", err)
      if (err.code === 401) {
        setError("Invalid email or password. Please try again.")
      } else if (err.code === 409) {
        setError("This account already exists. Please sign in instead.")
      } else if (err.code === 429) {
        setError("Too many attempts. Please wait a few seconds and try again.")
      } else {
        setError("Something went wrong. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign In To Your Account!</h2>
        <p className='mt-2 text-center text-base text-black/60'>
          Don&apos;t Have an account?&nbsp;
          <Link
            to='/signup'
            className='font-medium text-primary transition-all duration-200 hover:underline'
          >
            Sign Up
          </Link>
        </p>

        {error && <p className='text-red-500 text-center mt-8'>{error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Input
              label='Email'
              placeholder='Enter your email'
              type='email'
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                }
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter Your Password!"
              {...register('password', { required: true })}
            />
            <Button
              type='submit'
              className='w-full'
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
