import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useState } from 'react'
import axios from 'axios'

const CaptainProtectWrapper = ({children}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain,setCaptain } = useContext(CaptainDataContext);

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if(!token) {
      navigate("/captain-login")
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        if(response.status === 200) {
          const data = response.data;
          setCaptain(data.captain);
          setIsLoading(false);
        }
      }).catch((error) => {
          localStorage.removeItem("token");
          navigate("/captain-login")
      })
  }, [token])



if(isLoading) { 
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-yellow-200 to-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    )}

  return (
   <>
    {children}
    </>
  )
}

export default CaptainProtectWrapper