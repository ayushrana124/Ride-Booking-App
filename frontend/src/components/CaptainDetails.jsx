import React from "react";
import { MdOutlineSpeed } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { CgNotes } from "react-icons/cg";

const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-4 justify-between">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="../../Avatar.jpeg"
            alt=""
          />
          <h4 className="text-lg font-medium">Aryan Kashyap</h4>
        </div>

        <div className="">
          <h4 className="text-2xl font-medium">₹2295</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4 p-2 mt-6 bg-gray-100 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <IoMdTime className="text-4xl font-thin mb-2" />
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-small text-gray-600">Hours Online</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <MdOutlineSpeed className="text-4xl font-thin mb-2" />
          <h5 className="text-lg font-medium">40</h5>
          <p className="text-small text-gray-600">Km/h</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <CgNotes className="text-4xl font-thin mb-2" />
          <h5 className="text-lg font-medium">38</h5>
          <p className="text-small text-gray-600">Total Km</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
