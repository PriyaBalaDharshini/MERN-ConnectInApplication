import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { axiosInstance } from '../library/axios'
import toast from 'react-hot-toast'
import { Image, Loader } from "lucide-react"

const PostCreation = ({ user }) => {
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const queryClient = useQueryClient();

    const { mutate: createPostMutation, isPending } = useMutation({
        mutationFn: async (postData) => {
            const res = await axiosInstance.post("/post/createPost", postData, {
                headers: { "Content-Type": "application/json" }
            });
            console.log(res.data);
            return res.data
        },
        onSuccess: async (data) => {
            resetForm()
            toast.success(data?.message || "Post Created")
        },
        onError: async (error) => {
            toast.error(error.response?.data?.message || "Failed to create post. Please try again")
        },

    })

    const handlePostCreation = async () => {
        try {
            const postData = { content }
            if (image) {
                return postData.image = image;
            }
            createPostMutation(postData)
        } catch (error) {
            console.error("Error in Post Creation", error);
        }
    }


    const resetForm = () => {
        setImage(null)
        setImagePreview(null)
        setContent("")
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            readFileAsDataURL(file).then(setImagePreview)
        } else {
            setImagePreview(null);
        }
    }

    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };




    return (
        <div className='bg-stone-50 rounded-lg shadow mb-4 p-4'>
            <div className='flex space-x-3'>
                <img src={user.profileImage || "/avatar.png"} alt={user.name} className='w-12 h-12 rounded-full' />
                <textarea
                    placeholder="What's on your mind?"
                    value={content}
                    className='w-full rounded-md p-3 hover:bg-base-200 focus:outline-none resize-none min-h-[100px]'
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            {/* Image preview and Button on the next line */}
            {imagePreview && (
                <div className='mt-4'>
                    <img src={imagePreview} alt="Selected Image" className='w-full h-auto rounded-lg' />
                </div>
            )}

            <div className='flex items-center justify-between mt-4'>
                <div className='flex space-x-4'>
                    <label className='flex items-center text-success hover:text-info-dark transition-colors duration-200 cursor-pointer'>
                        <Image size={20} className='mr-2' />
                        <span>Photo</span>
                        <input
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>

                <button
                    onClick={handlePostCreation}
                    className='bg-info text-white rounded-lg px-5 py-2 '
                    disabled={isPending}
                >
                    {isPending ? <Loader className='size-5 animate-spin' /> : "Share"}
                </button>
            </div>
        </div>
    )
}

export default PostCreation