import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../library/axios'
import Sidebar from '../components/Sidebar';
import PostCreation from '../components/PostCreation';

const HomePage = () => {

    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    // For Suggested user for current user
    const { data: recommendedUsers } = useQuery({
        queryKey: ["recommendedUsers"],
        queryFn: async () => {
            const res = await axiosInstance.get("/user/suggestion")
            console.log(res.data);
            return res.data;
        }
    })

    const { data: feedsOnHome } = useQuery({
        queryKey: ["feedsOnHome"],
        queryFn: async () => {
            const res = await axiosInstance.get("/post/feedPosts")
            console.log(res.data);
            return res.data;
        }
    })

    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
            {/* User Profile */}
            <div className='hidden lg:block lg:col-span-1'>
                <Sidebar user={authUser} />
            </div>

            {/* Posts */}
            <div className='col-span-1 lg:col-span-2 order-first lg:order-none '>
                <PostCreation user={authUser} />
            </div>
            {/* Recomended users */}

        </div>
    )
}

export default HomePage