import React, { useRef, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { MdKeyboardArrowUp } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP( function () {
   if(finishRidePanel){
    gsap.to(finishRidePanelRef.current, {
      transform : "translateY(0)",})
   }else{
    gsap.to(finishRidePanelRef.current, {
      transform: "translateY(100%)",
    })}
  },[finishRidePanel]);

  return (
    <div className="h-screen ">
      <Link
        to="/home"
        className="fixed flex items-center justify-center top-2 right-2 h-12 w-12 rounded-full bg-white drop-shadow-lg"
      >
        <LuLogOut className="text-xl text-black" />
      </Link>
      <div className="h-4/5">
        <img
          className="w-full h-full object-cover"
          src="../HomeMap.jpeg"
          alt=""
        />
      </div>

      <div className="h-1/5 p-4 relative flex justify-between items-center gap-2"
          onClick={() => {setFinishRidePanel(true)}}
      >
        <h5
          className="text-2xl  absolute text-center top-0 w-[90%] p-3 text-gray-600"
        >
          <MdKeyboardArrowUp className="m-auto" />
        </h5>
        <div className="flex justify-center items-center gap-2 w-[40%]">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="../Avatar.jpg"
            alt=""
          />
          <h2 className="text-base/4 font-medium">Ayush Rana</h2>
        </div>
        <div className="w-[20%]">
          <h5 className="text-base/4 font-bold ">289m away</h5>
        </div>
        <button onClick={()=>{
          }} className="font-medium bg-gradient-to-br from-blue-900 to-sky-600 text-white rounded-lg px-4 py-2 border w-[30%] text-base/4 mt-2">
            Complete Ride 
        </button>
      </div>

      <div ref={finishRidePanelRef} className="fixed w-full z-10 bottom-0 px-3 py-10 pt-12 translate-y-full bg-white">
        <FinishRide setFinishRidePanel={setFinishRidePanel}/>
      </div>
       
    </div>
  );
};

export default CaptainRiding;
