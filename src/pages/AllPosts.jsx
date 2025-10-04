import React, {use, useEffect, useState} from 'react'
import {Container, PostCard} from '../components'
import appWriteService from '../appwrite/config';
import { AppwriteException } from 'appwrite';

function AllPosts() {

    const [posts, setPosts] = useState([])
    useEffect(()=>{

    },[])

    appWriteService.getPosts([]).then((posts)=> setPosts(posts.documents))
  return (
    <div className='w-full py-8'>
      <Container>
        {posts.map((post)=>(
            <PostCard key={post.$id} post={post}/>
        ))}
      </Container>
    </div>
  )
}

export default AllPosts
