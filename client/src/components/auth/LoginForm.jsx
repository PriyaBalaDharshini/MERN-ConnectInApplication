import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../../library/axios'
import toast from 'react-hot-toast'
import { Loader } from "lucide-react"

const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const queryClient = useQueryClient();

    const { mutate: loginMutation, isLoading } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post("/auth/login", data)
            return res.data
        },
        onSuccess: (data) => {
            toast.success(data?.message || "Login Successfull")
            queryClient.invalidateQueries({ queryKey: ['authUser'] })
        },
        onError: (error) => {
            /* const errorMessage = error.response?.data?.message || "Something went wrong"; */
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    })

    const handleLogin = (e) => {
        e.preventDefault()
        loginMutation({ email, password })
        setPassword("")
        setEmail("")
    }

    return (
        <div>
            <form onSubmit={handleLogin} className='flex flex-col gap-5' >

                <div>
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='input input-bordered w-full border-2 border-blue-400 focus:outline-none focus:border-green-400'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='input input-bordered w-full border-2 border-blue-400 focus:outline-none focus:border-green-400'
                    />
                </div>
                <div>
                    <button type='submit' disabled={isLoading} className='w-full flex justify-center py-3 px-4 border rounded-xl bg-blue-500 font-semibold text-white text-black-600 hover:bg-blue-700 '>
                        {isLoading ? <Loader className='size-5 animate-spin' /> : "Login"}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default LoginForm
