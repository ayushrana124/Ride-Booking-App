import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const ConfirmRidePopup = (props) => {

  const [otp, setotp] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePopupPanel(false);
        }}
        className="text-2xl  absolute text-center top-0 w-[90%] p-3 text-gray-600"
      >
        <MdKeyboardArrowDown className="m-auto" />
      </h5>
      <h3 className="text-2xl font-semibold mb-5 px-4">Confirm your ride!</h3>

      <div className="flex items-center justify-between px-4">
        <div className="flex justify-center items-center gap-2">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="../Avatar.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">Ayush Rana</h2>
        </div>

        <div className="">
          <h5 className="text-lg font-semibold">2.2 km</h5>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center gap-2 mt-5">
        <div className="w-full">
          <div className="p-4 border-b-2 border-gray-300">
            <h3 className="text-xl font-semibold">
              <span className="font-bold">From : </span> 563/11-A
            </h3>
            <p>Kakariya talab, Shahjahanpur</p>
          </div>
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
        <div className=" w-full">
          <form onSubmit={(e) => submitHandler(e)} action="">
            <input value={otp} onChange={(e)=> setotp(e.target.value)} type="number" className="px-6 font-mono py-2 text-lg rounded-lg w-full mt-3 mb-3 border-2 border-gray-700 bg-[#eee]" placeholder="Enter OTP" />
            <div className="w-full flex gap-2">
              <Link
                to="/captain-riding"
                className="font-semibold bg-gradient-to-br flex justify-center items-center from-blue-900 to-sky-600 text-white rounded-lg px-4 py-2 border w-full text-lg mt-2"
              >
                Confirm
              </Link>
              <button
                onClick={() => {
                  props.setRidePopupPanel(false);
                  props.setConfirmRidePopupPanel(false);
                }}
                className="font-semibold bg-red-600 text-white rounded-lg px-4 py-2 border w-full text-lg mt-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
