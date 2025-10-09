import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import '../../src/index.css'

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const create = async (data) => {
    if (loading) return
    setLoading(true)
    setError("")

    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const currentUser = await authService.getCurrentUser()
        if (currentUser) {
          dispatch(authLogin(currentUser))
          navigate('/')
        }
      }
    } catch (err) {
      console.log("Signup error:", err)
      if (err.code === 409) {
        setError("This email is already registered. Please sign in instead.")
      } else {
        setError("Something went wrong. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-darker)] via-[var(--color-darkPurple)] to-[var(--color-secondary)] px-6 py-12">
      <div className="w-full max-w-lg bg-[var(--color-darker)] bg-opacity-80 backdrop-blur-lg border border-[var(--color-primary)]/40 rounded-3xl p-10 shadow-[0_0_25px_rgba(242,89,18,0.4)] hover:shadow-[0_0_35px_rgba(242,89,18,0.6)] transition-all duration-500">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl font-bold text-[var(--color-primary)] drop-shadow-[0_0_10px_rgba(242,89,18,0.5)]">
          Sign Up to Your Account
        </h2>
        <p className="mt-3 text-center text-[var(--color-secondary)] opacity-90">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[var(--color-primary)] hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-center mt-6 bg-red-950/30 border border-red-500/40 rounded-lg py-2">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-6">
          <Input
            label="Full Name"
            placeholder="Enter your name"
            {...register('name', { required: true })}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: true })}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-semibold py-3 rounded-xl shadow-[0_0_20px_rgba(242,89,18,0.5)] hover:shadow-[0_0_25px_rgba(242,89,18,0.7)] transition-all duration-300"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Signup
