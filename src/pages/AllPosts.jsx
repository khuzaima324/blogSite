import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appWriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appWriteService
      .getPosts([])
      .then((response) => {
        if (response && response.documents) {
          setPosts(response.documents);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[--color-darker] via-[--color-darkPurple] to-[--color-secondary]">
        <p className="text-[--color-primary] text-lg animate-pulse">
          Loading posts...
        </p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[--color-darker] via-[--color-darkPurple] to-[--color-secondary] text-center">
        <h2 className="text-[--color-primary] text-2xl font-semibold mb-2">
          No Posts Available Yet
        </h2>
        <p className="text-gray-300 text-sm">
          Create your first post and share your story with the world!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[--color-darker] via-[--color-darkPurple] to-[--color-secondary] py-16">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[--color-primary] drop-shadow-[0_0_10px_rgba(242,89,18,0.6)]">
            All Posts
          </h1>
          <p className="text-gray-300 mt-3 text-base opacity-90">
            Discover stories, ideas, and thoughts shared by the community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="transform transition-all duration-500 hover:scale-[1.02]"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
