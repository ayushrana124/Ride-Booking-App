import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();

    const captainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
    if(response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate(""); 
    setVehicleCapacity("");
    setVehicleType(""); 
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div className="">
        <h1 className="text-3xl mb-10 font-semibold text-gray-800">dropU</h1>
        <form action="" onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg mb-2 font-medium">What's your name</h3>
          <div className="flex gap-4 mb-5">
            <input
              className="bg-gray-200 rounded w-1/2 px-4 py-2 border text-lg placeholder:text-base"
              required
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-gray-200 rounded w-1/2 px-4 py-2 border  text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className="text-lg mb-2 font-medium">What's your email</h3>
          <input
            className="bg-gray-200 rounded mb-5 px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            placeholder="john@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            className="bg-gray-200 rounded mb-5 px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          <h3 className="text-lg mb-2 font-medium">Vehicle Information</h3>
          <div className="flex gap-4 mb-5">
            <input
              className="bg-gray-200 rounded w-1/2 px-4 py-2 border text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              className="bg-gray-200 rounded w-1/2 px-4 py-2 border text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>

          <div className="flex gap-4 mb-8">
            <input
              className="bg-gray-200 rounded w-1/2 px-4 py-2 border text-lg placeholder:text-base"
              required
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <select
              className="bg-gray-200 rounded w-1/2 px-4 py-2 border text-lg"
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button className="font-semibold bg-gray-800 text-white rounded-lg mb-3 px-4 py-2 border w-full text-lg placeholder:text-base">
            Register as Captain
          </button>

          <Link
            to="/captain-login"
            className="text-center block text-lg text-gray-800 mb-16"
          >
            Already have an account?
            <span className="text-blue-800"> Login here</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CaptainSignup;
