import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useState } from 'react'
import axios from 'axios'

const UserProtectWrapper = ({children}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user,setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if(!token) {
      navigate("/login")
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if(response.status === 200) {
        const data = response.data;
        setUser(data.user);
        setIsLoading(false);
      }
    }).catch((error) => {
        localStorage.removeItem("token");
        navigate("/login")
    })
  }, [token])

 

  return (
   <>
    {children}
    </>
  )
}

export default UserProtectWrapper