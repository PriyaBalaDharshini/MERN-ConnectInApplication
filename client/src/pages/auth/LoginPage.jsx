import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../../components/auth/LoginForm'

const LoginPage = () => {
    return (
        // wrapper
        <div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 rounded-3xl '>

            {/* logo and quote */}
            <div className='sm:mx-auto sm:w-full sm:max-w-md p-2 rounded-sm' >
                <img className='mx-auto h-auto w-auto rounded-2xl ' src='/connectin.jpeg' alt="ConnectIn" />
                <h3 className='text-center text-3xl font-extrabold text-gray-950  mt-6 '>Accelerate Your Professional Growth</h3>
            </div>
            {/* Form wrapper */}
            <div className=' mt-8 sm:mx-auto sm:w-full  rounded-sm sm:max-w-md shadow-md bg-red-100 ' >
                <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 rounded-sm '>
                    <LoginForm />

                    {/* Footer content */}
                    <div className="mt-6">
                        <div className='relative'>
                            <div className='absolute inset-0 flex items-center '>
                                <div className='w-full border-t border-gray-300'></div>
                            </div>
                            <div className='relative flex justify-center text-sm'>
                                <span className='px-2 bg-white text-gray-800 font-semibold '>New to ConnectIn?</span>
                            </div>
                        </div>
                        <div className='mt-6'>
                            <Link
                                to='/signup'
                                className='w-full flex justify-center py-2 px-4 border rounded-xl bg-green-500 font-seminbold text-white  hover:bg-green-700 '
                            >
                                Signup
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage