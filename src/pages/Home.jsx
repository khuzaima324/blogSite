import React, { useEffect, useState } from 'react'
import appWriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appWriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-darkPurple)] py-12 text-gray-100">
      <Container>
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] drop-shadow-lg">
            Welcome to <span className="text-[var(--color-secondary)]">MyBlog</span>
          </h1>
          <p className="mt-3 text-gray-400 text-lg max-w-2xl mx-auto">
            Dive into a world of ideas, stories, and tutorials crafted for curious minds.
          </p>
        </div>

        {/* If no posts */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-2">
              No Posts Yet
            </h2>
            <p className="text-gray-400 mb-6">
              Login or create an account to start exploring amazing content.
            </p>
            <a
              href="/login"
              className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Login Now
            </a>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="transform transition-all duration-300 hover:scale-[1.02]"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default Home
