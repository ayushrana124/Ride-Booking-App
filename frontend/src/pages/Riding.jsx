import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { FaCar } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", ()=> {
    navigate("/home");
  })

  return (
    <div className="h-screen ">
        <Link to="/home" className="fixed flex items-center justify-center top-2 right-2 h-12 w-12 rounded-full bg-white">
            <IoHome className="text-xl text-black" />
        </Link>
        <div className="">
         <LiveTracking />
        </div>

        <div className="h-1/2 p-4">
           <div className="flex items-center mb-4 justify-between ">
                    <div className="">
                      <FaCar className="text-4xl" />
                    </div>
                    <div className="text-right">
                      <h2 className="text-lg font-medium">{ride?.captain?.fullname?.firstname}</h2>
                      <h4 className="text-xl font-semibold -mt-2 -mb-1">{ride?.captain?.vehicle?.plate || "Plate"}</h4>
                      <p className="text-sm">{ride?.captain?.vehicle?.vehicleType || "Vehicle"}</p>
                    </div>
                  </div>
          
                  <div className="flex flex-col justify-between items-center gap-2">
                    <div className="w-full">
                      <div className="border-b-2 border-gray-300 mb-4">
                        <h3 className="text-xl font-semibold">
                          <span className="font-bold">To : 53/A </span>
                        </h3>
                        <p>{ride?.destination || "Destination"}</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="text-xl font-bold">₹{ride?.fare || "Fare"}</h3>
                        <p>Mode : Cash</p>
                      </div>
                    </div>
                    <div className="w-full">
                    <button className="font-semibold bg-gradient-to-br from-green-700 to-green-400 text-white rounded-lg px-4 py-2 border w-full text-lg">
                      Make a Payment
                    </button>
                    </div>
                  </div>
        </div>
     
      </div>
  )
}

export default Riding