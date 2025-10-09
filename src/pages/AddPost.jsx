import React from 'react'
import { PostForm, Container } from '../components'

function AddPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-darker)] via-[var(--color-darkPurple)] to-[var(--color-dark)] flex items-center justify-center py-24 px-6 relative overflow-hidden">

      {/* Floating Glow Orbs */}
      <div className="absolute top-10 left-10 w-56 h-56 bg-[var(--color-primary)] opacity-20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[var(--color-secondary)] opacity-20 blur-3xl rounded-full animate-pulse"></div>

      <Container>
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-[var(--color-primary)] tracking-wide drop-shadow-[0_0_12px_rgba(242,89,18,0.7)]">
            Create a New Post
          </h1>
          <p className="text-[var(--color-secondary)] mt-4 text-lg opacity-90 font-light">
            Share your thoughts, stories, or ideas with the community
          </p>
        </div>

        {/* Form Card */}
        <div className="relative bg-[var(--color-darker)]/70 backdrop-blur-2xl border border-[var(--color-primary)]/30 p-10 rounded-3xl
          shadow-[0_0_35px_rgba(242,89,18,0.4)] hover:shadow-[0_0_50px_rgba(242,89,18,0.6)]
          transition-all duration-700 max-w-5xl mx-auto group">

          {/* Neon Border Glow Animation */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[var(--color-primary)] group-hover:shadow-[0_0_25px_rgba(242,89,18,0.5)] transition-all duration-700"></div>

          <div className="relative z-10 space-y-6">
            <PostForm />
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-[var(--color-secondary)] mt-8 opacity-80">
          💡 Make sure your post stands out — creativity inspires the community!
        </p>
      </Container>
    </div>
  )
}

export default AddPost
