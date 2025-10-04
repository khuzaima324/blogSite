// import conf from "../conf/conf";
// import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

// export class Service{
//     Client = new Client();
//     Databases;
//     bucket;

//     constructor(){
//         this.Client
//             .setEndpoint(conf.appWriteUrl)
//             .setProject(conf.appWriteProjectId);
//         this.account = new Account(this.Client);

//         this.Databases = new Databases(this.Client);
//         this.bucket = new Storage(this.Client);
//     }

//     async createPost({tittle, slug, content, featuredImage, status, userId}){
//         try {
//             return await this.Databases.create(
//                 conf.appWriteDatabaseId,
//                 conf.appWriteCollectionId,
//                 slug,
//                 {
//                     tittle,
//                     content,
//                     featuredImage,
//                     status,
//                     userId,
//                 }
//             )
//         } catch (error) {
//             console.log("Appwrite serive :: create POst :: Error", error);
//         }
//     }

//     async updatePost(slug, {tittle, content, featuredImage, status}){
//         try {
//             return await this.Databases.updateDocument(
//                 conf.appWriteDatabaseId,
//                 conf.appWriteCollectionId,
//                 slug,
//                 {
//                     tittle,
//                     content,
//                     featuredImage,
//                     status,
//                 }
//             )
//         } catch (error) {
//             console.log("error updatePost", error);
//         }
//     }

//     async deletePost(slug){
//         try {
//             await this.Databases.deleteDocument(
//                 conf.appWriteDatabaseId,
//                 conf.appWriteCollectionId,
//                 slug
//             )
//             return true
//         } catch (error) {
//             console.log("error delete post", error);
//             return false
//         }
//     }

//     async getPost(slug){
//         try {
//             return await this.databases.getDocument(
//                 conf.appWriteDatabaseId,
//                 conf.appWriteCollectionId,
//                 slug,
//             ) 
//         } catch (error) {
//             console.log("error getPost", error);
            
//         }
//     }

//     async getPosts(queries = [Query.equal("status", "active")]){
//         try {
//             return await this.databases.listDocuments(
//                 conf.appWriteDatabaseId,
//                 conf.appWriteCollectionId,
//                 queries,

//             )
//         } catch (error) {
//             console.log("error Get POsts", error);
            
//         }
//     }

//     // file upload

//     async uploadFile(file){
//         try {
//             return await this.bucket.createFile(
//                 conf.appWriteBucketId,
//                 ID.unique(),
//                 file,
//             )
//         } catch (error) {
//             console.log("error file upload", error);
//             return false
//         }
//     }

//     async deleteFile(fileId){
//         try {
//             await this.bucket.deleteFile(
//                 conf.appWriteBucketId,
//                 fileId,
//             )
//             return true
//         } catch (error) {
//             console.log("error deletre file", error);
//             return false
//         }
//     }

//     getFilePreview(fileId){
//         return this.bucket.getFilePreview(
//             conf.appWriteBucketId,
//             fileId
//         )
//     }
// }


// const service = new Service()
// export default service

import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // ✅ Create Post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: Error", error);
    }
  }

  // ✅ Update Post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: Error", error);
    }
  }

  // ✅ Delete Post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: Error", error);
      return false;
    }
  }

  // ✅ Get a single Post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: Error", error);
    }
  }

  // ✅ Get all Posts
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: Error", error);
    }
  }

  // ✅ Upload File
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: Error", error);
      return false;
    }
  }

  // ✅ Delete File
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: Error", error);
      return false;
    }
  }

  // ✅ Get File Preview
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appWriteBucketId, fileId);
  }
}

// ✅ Export single instance
const service = new Service();
export default service;
