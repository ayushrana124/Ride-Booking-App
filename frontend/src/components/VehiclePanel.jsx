import React from 'react'
import { FaCar } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaMotorcycle } from "react-icons/fa";
import { FaCaravan } from "react-icons/fa";
import { MdKeyboardArrowDown } from 'react-icons/md';

const VehiclePanel = (props) => {
  return (
    <div className="">
      <h5 onClick={()=>{
        props.setVehiclePanelOpen(false);
      }} className="text-2xl  absolute text-center top-0 w-[90%] p-3 text-gray-600">
            <MdKeyboardArrowDown className="m-auto" />
          </h5>
        <h3 className="text-2xl font-semibold mb-5">Select your Vaahan</h3>
        <div onClick={() => {
            props.setconfirmRidePanel(true)
            props.setVehiclePanelOpen(false)
        }} className="flex p-2 bg-gray-100 justify-between items-center w-full border-2 active:border-black rounded-xl mb-2">
          <div className="p-4 bg-slate-100 rounded-full">
            <FaCar className="text-4xl" />{" "}
          </div>
          <div className="flex flex-col w-1/2">
            <div className="flex items-center ">
              <h4 className="font-medium text-lg ">Sawaari</h4>
              <FaUser className="text-sm ml-4" />
              <h4 className="text-sm ml-0.5 font-medium">4</h4>
            </div>
            <h5 className="font-medium text-sm">2 mins away</h5>
          </div>
          <h2 className="text-xl font-semibold">₹199.20</h2>
        </div>

        <div onClick={() => {
            props.setconfirmRidePanel(true)
            props.setVehiclePanelOpen(false)
        }} className="flex p-2 bg-gray-100  justify-between items-center w-full border-2 active:border-black rounded-xl mb-2">
          <div className="p-4 bg-slate-100 rounded-full">
            <FaMotorcycle className="text-4xl" />{" "}
          </div>
          <div className="flex flex-col w-1/2">
            <div className="flex items-center ">
              <h4 className="font-medium text-lg ">MotorCycle</h4>
              <FaUser className="text-sm ml-4" />
              <h4 className="text-sm ml-0.5 font-medium">1</h4>
            </div>
            <h5 className="font-medium text-sm">2 mins away</h5>
          </div>
          <h2 className="text-xl font-semibold">₹89.20</h2>
        </div>

        <div onClick={() => {
            props.setconfirmRidePanel(true)
            props.setVehiclePanelOpen(false)
        }} className="flex p-2 bg-gray-100  justify-between items-center w-full border-2 active:border-black rounded-xl mb-2">
          <div className="p-4 bg-slate-100 rounded-full">
            <FaCaravan className="text-4xl" />{" "}
          </div>
          <div className="flex flex-col w-1/2">
            <div className="flex items-center ">
              <h4 className="font-medium text-lg ">TukTuk</h4>
              <FaUser className="text-sm ml-4" />
              <h4 className="text-sm ml-0.5 font-medium">3</h4>
            </div>
            <h5 className="font-medium text-sm">2 mins away</h5>
          </div>
          <h2 className="text-xl font-semibold">₹120.90</h2>
        </div>
      </div>
  )
}

export default VehiclePanel