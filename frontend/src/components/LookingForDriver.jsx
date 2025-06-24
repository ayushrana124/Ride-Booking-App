import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { FaCar } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaMotorcycle } from "react-icons/fa";
import { FaCaravan } from "react-icons/fa";

const LookingForDriver = (props) => {
  return (
    <div>
        <div>
               <h5 onClick={()=>{
                      props.setVehicleFound(false)
                      props.setconfirmRidePanel(true);
                    }} className="text-2xl  absolute text-center top-0 w-[90%] p-3 text-gray-600">
                          <MdKeyboardArrowDown className="m-auto" />
                        </h5>
                <h3 className="text-2xl font-semibold mb-5">Looking for a Captain...</h3>
        
                <div className="flex flex-col justify-between items-center gap-2 mt-5">
                   <FaCar className="text-6xl"  />{" "}
        
                   <div className="w-full">
                    <div className="p-4 border-b-2 border-gray-300">
                      <h3 className='text-xl font-semibold'><span className='font-bold'>From : </span> 563/11-A</h3>
                      <p>Kakariya talab, Shahjahanpur</p>
                    </div>
                    <div className="p-4 border-b-2 border-gray-300">
                      <h3 className='text-xl font-semibold'><span className='font-bold'>To : </span>Gaur City Mall</h3>
                      <p>Surajpur road, Greater Noida</p>
                    </div>
                    <div className="p-4">
                      <h3 className='text-xl font-bold'>₹199.20</h3>
                      <p>Mode : Cash</p>
                   
                    </div>
                   
                  
                  </div>
                  <button className="font-semibold bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-lg px-4 py-2 border w-full text-lg mt-2">
                    Cancel Ride
                </button>
                </div>
               
                   
            </div>
    </div>
  )
}

export default LookingForDriver