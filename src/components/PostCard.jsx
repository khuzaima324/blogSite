// import React from 'react'
// import appwriteService from '../appwrite/config'
// import { Link } from 'react-router-dom'

// function PostCard({ $id, title, featuredImage }) {

//   // console.log("Featured image:", featuredImage);
//   console.log("Featured Image:", featuredImage);
//   console.log("Preview URL:", appwriteService.getFilePreview(featuredImage));


//   return (
//     <Link to={`/post/${$id}`}>
//       <div className='w-full bg-gray-100 rounded-xl p-4 '>
//         <div className='w-full justify-center mb-4'>
//           {/* <img src={appwriteService.getFilePreview(featuredImage)}  alt={title} /> */}
//           {featuredImage && featuredImage !== "undefined" ? (
//             <img
//               src={appwriteService.getFilePreview(featuredImage)}
//               alt={title}
//               className="w-full rounded-lg"
//               onError={(e) => (e.target.style.display = "none")}
//             />
//           ) : (
//             <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-lg text-gray-600">
//               No Image
//             </div>
//           )}


//         </div>
//         <h2 className='text-xl font-bold'>
//           {title}
//         </h2>
//       </div>
//     </Link>
//   )
// }

// export default PostCard


// import React from 'react'
// import appwriteService from '../appwrite/config'
// import { Link } from 'react-router-dom'

// function PostCard({ $id, title, featuredImage }) {
//   console.log("Featured Image:", featuredImage)

//   // Safe preview URL (only generate if fileId exists)
//   let imageUrl = null
//   if (featuredImage && typeof featuredImage === "string" && featuredImage.trim() !== "") {
//     try {
//       imageUrl = appwriteService.getFileView(featuredImage)
//     } catch (err) {
//       console.error("Invalid image ID:", err)
//     }
//   }

//   return (
//     <Link to={`/post/${$id}`}>
//       <div className="w-full bg-gray-100 rounded-xl p-4">
//         <div className="w-full justify-center mb-4">
//           {imageUrl ? (
//             <img
//               src={imageUrl}
//               alt={title}
//               className="w-full h-48 object-cover rounded-lg"
//               onError={(e) => (e.target.style.display = "none")}
//             />
//           ) : (
//             <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-lg text-gray-600">
//               No Image
//             </div>
//           )}
//         </div>
//         <h2 className="text-xl font-bold">{title}</h2>
//       </div>
//     </Link>
//   )
// }

// export default PostCard
import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import "../../src/index.css";

function PostCard({ $id, title, featuredImage }) {
  let imageUrl = null;

  if (featuredImage && typeof featuredImage === "string" && featuredImage.trim() !== "") {
    try {
      imageUrl = appwriteService.getFileView(featuredImage);
    } catch (err) {
      console.error("Invalid image ID:", err);
    }
  }

  return (
    <Link
      to={`/post/${$id}`}
      className="group block transform transition-all duration-300 hover:scale-[1.03]"
    >
      <div className="bg-[var(--color-darker)] border border-[var(--color-darkPurple)] rounded-2xl overflow-hidden shadow-md hover:shadow-[0_0_25px_rgba(242,89,18,0.4)] transition-all duration-300">

        {/* Image Section */}
        <div className="relative w-full h-56 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--color-darkPurple)] text-gray-300 text-sm">
              No Image
            </div>
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h2 className="text-xl font-bold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-secondary)] transition-colors duration-300 truncate">
            {title}
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Dive into this post and explore more interesting ideas.
          </p>
        </div>

        {/* Bottom Glow Line */}
        <div className="h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"></div>
      </div>
    </Link>
  );
}

export default PostCard;
