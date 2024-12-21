import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const SignUp = () => {

    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '' 
    })

    const {signup, loading} = useSignup();

    const handleCheckboxChange = (gender) => {
        setInputs({...inputs,gender})
    }

    const handleSubmit = async(e) => {
        e.preventDefault() // Prevents the default action of the form refreshing the page
        await signup(inputs)
    }

  return (
    <div className='min-w-96 flex flex-col items-center justify-center mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>Sign Up
            <span className='text-blue-500'> Chat App</span>
            </h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2 pl-1'>
                        <span className='text-base text-white label-text'>Full Name</span>
                    </label>
                    <input type='text' placeholder='Enter fullname' className='input input-bordered w-full h-10'
                    value={inputs.fullName} onChange={(e) => {setInputs({...inputs, fullName: e.target.value})}}/>
                </div>

                <div>
                    <label className='label p-2 pl-1'>
                        <span className='text-base text-white label-text'>Username</span>
                    </label>
                    <input type='text' placeholder='Enter username' className='input input-bordered w-full h-10'
                    value={inputs.username} onChange={(e)=>{setInputs({...inputs, username: e.target.value})}} />
                </div>

                <div>
                    <label className='label'>
                        <span className='text-base text-white label-text'>Password</span>
                    </label>
                    <input type='password' placeholder='Enter password' className='input input-bordered w-full h-10'
                    value={inputs.password} onChange={(e)=>{setInputs({...inputs, password: e.target.value})}}/>
                </div>

                <div>
                    <label className='label'>
                        <span className='text-base text-white label-text'>Confirm Password</span>
                    </label>
                    <input type='password' placeholder='Confirm password' className='input input-bordered w-full h-10'
                    value={inputs.confirmPassword} onChange={(e)=>{setInputs({...inputs, confirmPassword: e.target.value})}}/>
                </div>
    
                <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                <Link to='/login' className='tex-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                    Already have an account?</Link>

                <div>
                    <button className='btn btn-block btn-sm mt-2' disabled={loading}>{loading ?
                    (<span className='loading loading-spinner'></span>) : ("Sign Up")}</button>
                </div>
            </form>
        </div>


    </div>
  )
}

export default SignUp
