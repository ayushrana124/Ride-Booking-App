import React, { use, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { useEffect } from "react";
import { SocketContext } from "../context/socketContext";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelref = useRef(null);
  const confirmRidePopupPanelref = useRef(null);
  const [ride, setRide] = useState(null)

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit("join", {
      userId: captain?._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(captain._id, position.coords.latitude, position.coords.longitude);
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    updateLocation();
    const locationInterval = setInterval(updateLocation, 10000); // Update location every 10 seconds
    return () => clearInterval(locationInterval);
  }, [socket, captain?._id]);

  socket.on("new-ride", (data) => {
    setRide(data);
    setridePopupPanel(true);
  });

  const confirmRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`, {
      rideId : ride._id,
      captainId: captain._id},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
    );
 
    setConfirmRidePopupPanel(true);
  }

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
    [confirmRidePopupPanel]
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
    [ridePopupPanel]
  );

  return (
    <div className="h-screen ">
      <Link
        to="/home"
        className="fixed flex items-center justify-center top-2 right-2 h-12 w-12 rounded-full bg-white drop-shadow-lg"
      >
        <LuLogOut className="text-xl text-black" />
      </Link>
      <div className="">
         <LiveTracking />
      </div>

      <div className="">
        <CaptainDetails />
      </div>

      {/* POP UPS */}
      <div
        ref={ridePopupPanelref}
        className="fixed z-10 bottom-0 translate-y-full bg-white p-3 w-full py-10 "
      >
        <RidePopup
          ride={ride}
          setRidePopupPanel={setridePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={confirmRidePopupPanelref}
        className="fixed z-10 bottom-0 translate-y-full bg-white p-3 h-full w-full py-10 "
      >
        <ConfirmRidePopup
        ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setridePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
