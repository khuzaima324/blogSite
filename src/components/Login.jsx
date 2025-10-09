import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import '../../src/index.css'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const login = async (data) => {
    if (loading) return
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
          Sign In to Your Account
        </h2>
        <p className="mt-3 text-center text-[var(--color-secondary)] opacity-90">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-[var(--color-primary)] hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-center mt-6 bg-red-950/30 border border-red-500/40 rounded-lg py-2">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
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
            {...register("password", { required: true })}
          />

          {/* Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-semibold py-3 rounded-xl shadow-[0_0_20px_rgba(242,89,18,0.5)] hover:shadow-[0_0_25px_rgba(242,89,18,0.7)] transition-all duration-300"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
