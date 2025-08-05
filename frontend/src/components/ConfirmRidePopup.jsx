import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopup = (props) => {
  const [otp, setotp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      params: { rideId: props.ride._id, otp: otp },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      props.setConfirmRidePopupPanel(false);
      props.setRidePopupPanel(false);
      navigate("/captain-riding", { state: { ride: props.ride } }); // Pass ride data here
    }
  };

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
          <h2 className="text-lg font-medium capitalize">
            {props.ride?.user.fullname.firstname}
          </h2>
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
        <div className=" w-full">
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setotp(e.target.value)}
              type="number"
              className="px-6 font-mono py-2 text-lg rounded-lg w-full mt-3 mb-3 border-2 border-gray-700 bg-[#eee]"
              placeholder="Enter OTP"
            />
            <div className="w-full flex gap-2">
              <button className="font-semibold bg-gradient-to-br flex justify-center items-center from-blue-900 to-sky-600 text-white rounded-lg px-4 py-2 border w-full text-lg mt-2">
                Confirm
              </button>
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
