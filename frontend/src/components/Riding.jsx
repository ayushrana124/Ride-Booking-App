import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { FaCar } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { FaMotorcycle } from "react-icons/fa";
import { FaCaravan } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Riding = () => {
  return (
    <div className="h-screen ">
        <Link to="/home" className="fixed flex items-center justify-center top-2 right-2 h-12 w-12 rounded-full bg-white">
            <IoHome className="text-xl text-black" />
        </Link>
        <div className="h-1/2">
        <img
          className="w-full h-full object-cover"
          src="../HomeMap.jpeg"
          alt=""
        />
        </div>

        <div className="h-1/2">
           <div className="flex items-center mb-2 justify-between p-4">
                    <div className="">
                      <FaCar className="text-4xl" />
                    </div>
                    <div className="text-right">
                      <h2 className="text-lg font-medium">Ayush Rana</h2>
                      <h4 className="text-xl font-semibold -mt-2 -mb-1">UP16 GB 0069</h4>
                      <p className="text-sm">BMW X-7</p>
                    </div>
                  </div>
          
                  <div className="flex flex-col justify-between items-center gap-2 ">
                    <div className="w-full">
                      <div className="p-4 border-b-2 border-gray-300">
                        <h3 className="text-xl font-semibold">
                          <span className="font-bold">To : </span>Gaur City Mall
                        </h3>
                        <p>Surajpur road, Greater Noida</p>
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold">₹199.20</h3>
                        <p>Mode : Cash</p>
                      </div>
                    </div>
                    <div className="w-full px-4 mt-2">
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