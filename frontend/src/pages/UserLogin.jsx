import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const userData = {
      email: email,
      password: password,
    }
 
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token)
      navigate("/home");
    }


    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div className="">
        <h1 className="text-3xl mb-10 font-semibold text-gray-800">dropU</h1>
        <form action="" onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg mb-2 font-medium">What's your email</h3>
          <input
            className="bg-gray-200 rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="your@mail.com"
          />

          <h3 className="text-lg font-medium mb-2">What's your password</h3>
          <input
            className="bg-gray-200 rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button className="font-semibold bg-gray-800 text-white rounded-lg mb-3 px-4 py-2 border w-full text-lg placeholder:text-base">
            Login
          </button>

          <Link
            to="/signup"
            className="text-center block text-lg text-gray-800"
          >
            Don't have an account?
            <span className="text-blue-800"> Sign up</span>
          </Link>
        </form>
      </div>
      <div className="">
        <Link to='/captain-login' className="flex justify-center items-center font-semibold bg-gradient-to-br from-blue-900 to-sky-600 text-white rounded-lg mb-4 px-4 py-2 border w-full text-lg placeholder:text-base">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
