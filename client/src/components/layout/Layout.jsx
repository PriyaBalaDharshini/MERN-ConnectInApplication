import React from 'react'
import NavBar from './NavBar'


const Layout = ({ children }) => {
    /*  const { data: authUser, isLoading } = useQuery({ queryKey: ["authUser"] });
     console.log("Auth user is in layout", authUser); */
    return (
        <div className='min-h-screen bg-blue-200'>
            <NavBar />
            <main className='px-4 py-6 max-w-7xl mx-auto'>{children}</main>
        </div>
    );
}

export default Layout