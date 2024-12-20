import React from 'react'
import GenderCheckBox from './GenderCheckBox'

const SignUp = () => {
  return (
    <div className='min-w-96 flex flex-col items-center justify-center mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>Sign Up
            <span className='text-blue-500'> Chat App</span>
            </h1>

            <form>
                <div>
                    <label className='label p-2 pl-1'>
                        <span className='text-base text-white label-text'>Full Name</span>
                    </label>
                    <input type='text' placeholder='Enter fullname' className='input input-bordered w-full h-10'/>
                </div>

                <div>
                    <label className='label p-2 pl-1'>
                        <span className='text-base text-white label-text'>Username</span>
                    </label>
                    <input type='text' placeholder='Enter username' className='input input-bordered w-full h-10'/>
                </div>

                <div>
                    <label className='label'>
                        <span className='text-base text-white label-text'>Password</span>
                    </label>
                    <input type='password' placeholder='Enter password' className='input input-bordered w-full h-10'/>
                </div>

                <div>
                    <label className='label'>
                        <span className='text-base text-white label-text'>Confirm Password</span>
                    </label>
                    <input type='password' placeholder='Confirm password' className='input input-bordered w-full h-10'/>
                </div>
    
                <GenderCheckBox/>

                <a href='#' className='tex-sm hover:underline hover: text-blue-600 mt-2 inline-block'>
                    Already have an account?</a>

                <div>
                    <button className='btn btn-block btn-sm mt-2'>Sign Up</button>
                </div>
            </form>
        </div>


    </div>
  )
}

export default SignUp
