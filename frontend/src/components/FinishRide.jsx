import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FinishRide = (props) => {

  const navigate = useNavigate();

  const endRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
          rideId: props.ride._id
    },
      {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }}
    )
  
    if (response.status === 200) {
      navigate("/captain-home"); // Redirect to home after ending the ride
    }
  };
      

  return (
      <div>
      <h5
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
        className="text-2xl  absolute text-center top-0 w-[90%] p-3 text-gray-600"
      >
        <MdKeyboardArrowDown className="m-auto" />
      </h5>
      <h3 className="text-2xl font-semibold mb-5 px-4">Finish this Ride!</h3>

      <div className="flex items-center justify-between px-4">
        <div className="flex justify-center items-center gap-2">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="../Avatar.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
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
              <button
              onClick={endRide}
                className="font-semibold bg-gradient-to-br flex justify-center items-center from-blue-900 to-sky-600 text-white rounded-lg px-4 py-2 border w-full text-lg mt-2"
              >
                Complete Ride
              </button>
        </div>
      </div>
    </div>
  )
}

export default FinishRide;