import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaMotorcycle } from "react-icons/fa";
import { FaCaravan } from "react-icons/fa";

const WaitingForDriver = (props) => {
  return (
    <div>
      <div>
        <h5
          onClick={() => {props.setWaitingForDriver(false);}}
          className="text-2xl  absolute text-center top-0 w-[90%] p-3 text-gray-600"
        >
          <MdKeyboardArrowDown className="m-auto" />
        </h5>

        <div className="flex items-center mb-2 justify-between p-4">
          <div className="">
            <FaCar className="text-5xl" />
          </div>
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">{props.ride?.captain.fullname.firstname}</h2>
            <h4 className="text-xl font-semibold -mt-2 -mb-1 uppercase">{props.ride?.captain.vehicle.plate}</h4>
            <p className="text-sm">BMW X-7</p>
            <h1 className="text-lg font-semibold">OTP : {props.ride?.otp}</h1>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-2 mt-5">
          <div className="w-full">
            <div className="p-4 border-b-2 border-gray-300">
              <h3 className="text-xl font-semibold">
                <span className="font-bold">From : </span> 563/11-A
              </h3>
              <p>{props.ride?.pickup}</p>
            </div>
            <div className="p-4 border-b-2 border-gray-300">
              <h3 className="text-xl font-semibold">
                <span className="font-bold">To : </span>Gaur City Mall
              </h3>
              <p>{props.ride?.destination}</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold">₹{props.ride?.fare}</h3>
              <p>Mode : Cash</p>
            </div>
          </div>
          <button className="font-semibold bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-lg px-4 py-2 border w-full text-lg mt-2">
            Cancel Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
