import React, { use, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";


const CaptainHome = () => {

  const [ridePopupPanel, setridePopupPanel] = useState(true);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelref = useRef(null);
  const confirmRidePopupPanelref = useRef(null)

// Confifm Ride popup
   useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelref.current, {
          translateY: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(confirmRidePopupPanelref.current, {
          translateY: "100%",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    },
    [confirmRidePopupPanel ]
  );
//Ride popup
   useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelref.current, {
          translateY: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(ridePopupPanelref.current, {
          translateY: "100%",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    },
    [ridePopupPanel ]
  );


  return (
    <div className="h-screen ">
      <Link
        to="/home"
        className="fixed flex items-center justify-center top-2 right-2 h-12 w-12 rounded-full bg-white drop-shadow-lg"
      >
        <LuLogOut className="text-xl text-black" />
      </Link>
      <div className="h-3/5">
        <img
          className="w-full h-full object-cover"
          src="../HomeMap.jpeg"
          alt=""
        />
      </div>

      <div className="h-2/5 p-4">
      <CaptainDetails />
      </div>

      {/* POP UPS */}
      <div ref={ridePopupPanelref} className="fixed z-10 bottom-0 translate-y-full bg-white p-3 w-full py-10 ">
       <RidePopup setRidePopupPanel ={setridePopupPanel} setConfirmRidePopupPanel ={setConfirmRidePopupPanel} />
      </div>

      <div ref={confirmRidePopupPanelref} className="fixed z-10 bottom-0 translate-y-full bg-white p-3 h-full w-full py-10 ">
       <ConfirmRidePopup setConfirmRidePopupPanel ={setConfirmRidePopupPanel} setRidePopupPanel ={setridePopupPanel} />
      </div>

    </div>
  );
};

export default CaptainHome;
