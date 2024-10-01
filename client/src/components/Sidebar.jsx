import React from 'react'
import { Link } from 'react-router-dom'
import { Bell, Home, UserPlus } from 'lucide-react'

const Sidebar = ({ user }) => {
    return (
        <div className='bg-stone-50 rounded-lg shadow'>
            <div className='py-4 px-4 text-center'>
                <div
                    className='h-16 rounded-t-lg bg-cover bg-center relative'
                    style={{ backgroundImage: `url("${user.bannerImage || "/banner.png"}")` }}
                >
                    <Link to={`/profile/${user.username}`} className='absolute left-1/2 transform -translate-x-1/2 bottom-[-40px]'>
                        <img
                            src={user.profilePicture || "/avatar.png"}
                            alt={user.name}
                            className='w-20 h-20 rounded-full mx-auto border-b-4 border-blue-500'
                        />
                    </Link>
                </div>
                <div className='mt-12'>
                    <Link to={`/profile/${user.username}`}>
                        <h2 className='text-2xl font-semibold'>{user.name}</h2>
                    </Link>
                    <p className='text-blue-600 mt-2'>{user.headline}</p>
                    <p className='text-info text-xs mt-2'>{user.connections.length} connections</p>
                </div>
                <div className='border-t border-base-100 mt-4'>
                    <nav className='p-4'>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    to='/'
                                    className='flex items-center py-2 px-4 rounded-md hover:bg-green-500 hover:text-white transition-colors'
                                >
                                    <Home className='mr-2' size={20} /> Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/network'
                                    className='flex items-center py-2 px-4 rounded-md hover:bg-green-500 hover:text-white transition-colors'
                                >
                                    <UserPlus className='mr-2' size={20} /> My Network
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/notifications'
                                    className='flex items-center py-2 px-4 rounded-md hover:bg-green-500 hover:text-white transition-colors'
                                >
                                    <Bell className='mr-2' size={20} /> Notifications
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='border-t border-base-100 p-4'>
                    <Link to={`/profile/${user.username}`} className='bg-blue-400 px-2 py-2 rounded-md text-white text-sm font-semibold'>
                        Visit your profile
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
