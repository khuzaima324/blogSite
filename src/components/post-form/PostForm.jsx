import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../index.css";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
      if (file) appwriteService.deleteFile(post.featuredImage);

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="bg-[var(--color-darker)] text-white p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-8 max-w-6xl mx-auto mt-10 border border-[var(--color-darkPurple)] transition-all duration-300"
    >
      {/* Left Section */}
      <div className="md:w-2/3 w-full space-y-6">
        <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 border-b border-[var(--color-secondary)] pb-2">
          {post ? "Edit Post" : "Create New Post"}
        </h2>

        <div className="space-y-2">
          <label className="block text-[var(--color-secondary)] font-medium">Title</label>
          <Input
            placeholder="Enter your post title"
            {...register("title", { required: true })}
            className="w-full bg-transparent border border-[var(--color-secondary)] text-white rounded-md p-3 focus:outline-none focus:border-[var(--color-primary)] transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[var(--color-secondary)] font-medium">Slug</label>
          <Input
            placeholder="Auto-generated or edit manually"
            {...register("slug", { required: true })}
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
            }
            className="w-full bg-transparent border border-[var(--color-secondary)] text-white rounded-md p-3 focus:outline-none focus:border-[var(--color-primary)] transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[var(--color-secondary)] font-medium">Content</label>
          <RTE
            name="content"
            control={control}
            defaultValue={getValues("content")}
            className="text-black"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/3 w-full bg-[var(--color-darkPurple)] rounded-xl p-6 shadow-md border border-[var(--color-secondary)] space-y-6">
        <h3 className="text-xl font-semibold text-[var(--color-primary)] border-b border-[var(--color-secondary)] pb-2">
          Post Settings
        </h3>

        {/* Upload Image */}
        <div className="space-y-2">
          <label className="block text-[var(--color-secondary)] font-medium">Featured Image</label>
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            className="w-full text-sm text-gray-300 border border-[var(--color-secondary)] rounded-lg p-2 cursor-pointer bg-[var(--color-darker)] hover:bg-[var(--color-darkPurple)] transition-all duration-200 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-white file:bg-[var(--color-primary)] file:hover:bg-[var(--color-secondary)]"
            {...register("image", { required: !post })}
          />
        </div>

        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg border border-[var(--color-secondary)] shadow-md"
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-[var(--color-secondary)] font-medium">Status</label>
          <Select
            options={["active", "inactive"]}
            {...register("status", { required: true })}
            className="w-full bg-[var(--color-darker)] border border-[var(--color-secondary)] rounded-md p-2 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(242,89,18,0.4)]"
        >
          {post ? "Update Post" : "Publish Post"}
        </Button>
      </div>
    </form>
  );
}
