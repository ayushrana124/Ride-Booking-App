import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const CaptainSignup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  
  const submitHandler = (e) => {
    e.preventDefault();
  
    setUserData({
      fullName : {firstName, lastName},
      email,
      password });
    setFirstName(""); 
    setLastName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
    <div className="">
      <h1 className="text-3xl mb-10 font-semibold text-gray-800">dropU</h1>
      <form action="" onSubmit={(e) => submitHandler(e)}>

      <h3 className="text-lg mb-2 font-medium">What's your name</h3>
      <div className="flex gap-4 mb-5">
        <input
          className="bg-gray-200 rounded w-1/2 px-4 py-2 border text-lg placeholder:text-base"
          required
          type='text'
          placeholder='First name'
          value={firstName}
          onChange = {(e) => setFirstName(e.target.value)}
         
        />
        <input
          className="bg-gray-200 rounded w-1/2 px-4 py-2 border  text-lg placeholder:text-base"
          required
            type='text'
          placeholder='Last name'
          value={lastName}
          onChange = {(e) => setLastName(e.target.value)}
         
        />
        </div>

        <h3 className="text-lg mb-2 font-medium">What's your email</h3>
        <input
          className="bg-gray-200 rounded mb-5 px-4 py-2 border w-full text-lg placeholder:text-base"
          required
          placeholder='john@email.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
         
        />

        <h3 className="text-lg font-medium mb-2">Enter password</h3>
        <input
          className="bg-gray-200 rounded mb-5 px-4 py-2 border w-full text-lg placeholder:text-base"
          required
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          
        />
        <button className="font-semibold bg-gray-800 text-white rounded-lg mb-3 px-4 py-2 border w-full text-lg placeholder:text-base">
          Register as Captain
        </button>

        <Link
          to="/captain-login"
          className="text-center block text-lg text-gray-800"
        >
          Already have an account?
          <span className="text-blue-800"> Login here</span>
        </Link>
      </form>
    </div>
    <div className="">
    
    </div>
  </div>
  )
}

export default CaptainSignup