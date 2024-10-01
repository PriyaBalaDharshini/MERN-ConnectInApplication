import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../../library/axios'
import { Link } from 'react-router-dom'
import { Bell, CircleUser, Home, LogOutIcon, Users } from 'lucide-react'

const NavBar = () => {
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const queryClient = useQueryClient();

    // Fetch notifications
    const { data: notification } = useQuery({
        queryKey: ["notification"],
        queryFn: async () => await axiosInstance.get("/notification/userNotifications"),
        enabled: !!authUser,
    });

    // Fetch connection requests
    const { data: connectionRequest } = useQuery({
        queryKey: ["connectionRequest"],
        queryFn: async () => await axiosInstance.get("/connection/requests"),
        enabled: !!authUser,
    });

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: async () => await axiosInstance.post("/auth/logout"),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
        }
    });

    // Count unread notifications and connection requests
    const unReadNotificationCount = notification?.data?.filter(n => !n.read).length
    const unReadConnectionRequestCount = connectionRequest?.data?.filter(c => !c.read).length

    return (
        <nav className='bg-white shadow-md sticky top-0 z-0 px-6'>
            <div className='max-w-7xl mx-auto py-4'>
                <div className='flex justify-between items-center space-x-4'>
                    <div className='flex items-center space-x-4'>
                        <Link to={"/"}>
                            <img className='h-10 rounded' src="/connectin.png" alt="Logo" />
                        </Link>
                    </div>
                    <div className='flex items-center gap-2 md:gap-6'>
                        {authUser ? (
                            <>
                                <Link to={"/"} className='flex flex-col items-center space-y-1'>
                                    <Home size={20} />
                                    <span className='text-xs font-bold hidden md:block'>Home</span>
                                </Link>

                                <Link className='flex flex-col items-center space-y-1 relative'>
                                    <Users size={20} />
                                    <span className='text-xs font-bold hidden md:block'>Network</span>
                                    {unReadConnectionRequestCount > 0 && (
                                        <span className='absolute -top-4 -right-0  bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                                            {unReadConnectionRequestCount}
                                        </span>
                                    )}
                                </Link>

                                <Link className='flex flex-col items-center space-y-1 relative'>
                                    <Bell size={20} />
                                    <span className='text-xs font-bold hidden md:block'>Notice</span>
                                    {unReadNotificationCount > 0 && (
                                        <span className='absolute -top-4 -right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                                            {unReadNotificationCount}
                                        </span>
                                    )}
                                </Link>

                                <Link to={`/profile/${authUser.username}`} className='flex flex-col items-center space-y-1'>
                                    <CircleUser size={20} />
                                    <span className='text-xs font-bold hidden md:block'>Profile</span>
                                </Link>

                                <button
                                    className='flex flex-col items-center space-y-1'
                                    onClick={() => logoutMutation.mutate()}
                                >
                                    <LogOutIcon size={20} />
                                    <span className='text-xs font-bold hidden md:block'>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to={"/login"} className='px-5 py-3 rounded-md text-white font-semibold bg-green-500 hover:bg-green-700'>
                                    Login
                                </Link>
                                <Link to={"/signup"} className='px-5 py-3 rounded-md text-white font-semibold bg-violet-500 hover:bg-violet-700'>
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
