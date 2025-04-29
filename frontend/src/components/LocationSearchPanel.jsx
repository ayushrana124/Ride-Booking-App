import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({setPannelOpen, setVehiclePanelOpen}) => {
  const locations = [
    "House-258, Green Park, Chipyana Bujurg, Ghaziabad",
    "Near R.R public school, Shiv Mandi Bijnor",
    "Saitaan chawk, Gali-21, Dr. bengali, Noorpur",
    "House-25A, Sai Chawk, Shahjahanpur",
  ];

  return (
    <div>
      {locations.map(function (location, index) {
        return (
          <div key={index} onClick={()=> {
            setVehiclePanelOpen(true)
            setPannelOpen(false)}} className="flex gap-4 items-center justify-around mb-2  active:border-black active:border-2 p-3 rounded-xl ">
            <h4 className="text-lg">
              <FaLocationDot />
            </h4>
            <h4 className="text-lg font-medium">
              {location}
            </h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
