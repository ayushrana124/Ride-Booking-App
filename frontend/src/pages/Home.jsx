import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdKeyboardArrowDown } from "react-icons/md";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios"; // <-- Add axios import

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pannelOpen, setPannelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null);

  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null); // "pickup" or "destination"
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const fetchSuggestions = async (input) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoadingSuggestions(true);
    try {
      const res = await axios.get(
        "http://localhost:4000/maps/get-suggestions",
        {
          params: { input },
          headers : { Authorization: `Bearer ${localStorage.getItem("token")}` }
          
        }
      );
      setSuggestions(res.data);
    } catch (err) {
      setSuggestions([]);
    }
    setLoadingSuggestions(false);
  };

  const handlePickupChange = (e) => {
    setPickup(e.target.value);
    setActiveField("pickup");
    setPannelOpen(true);
    fetchSuggestions(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    setActiveField("destination");
    setPannelOpen(true);
    fetchSuggestions(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description);
    } else if (activeField === "destination") {
      setDestination(suggestion.description);
    }
    setSuggestions([]);
    setActiveField(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      gsap.to(panelRef.current, {
        height: pannelOpen ? "70%" : "0%",
        padding: pannelOpen ? "2rem" : 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
      gsap.to(panelCloseRef.current, {
        opacity: pannelOpen ? 1 : 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    },
    [pannelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          translateY: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          translateY: "100%",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          translateY: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          translateY: "100%",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          translateY: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          translateY: "100%",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    },
    [vehicleFound ]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          translateY: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          translateY: "100%",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    },
    [vehicleFound ]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <h1 className="text-3xl ml-9 mt-5 font-semibold absolute text-gray-800">
        dropU
      </h1>
      <div className="h-screen w-screen ">
        <img
          className="h-full w-full object-cover"
          src="../HomeMap.jpeg"
          alt=""
        />
      </div>

      <div className="absolute h-screen top-0 w-full flex flex-col justify-end">
        <div className="h-[30%] bg-white p-5 relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPannelOpen(false);
              setSuggestions([]);
              setActiveField(null);
            }}
            className="absolute top-6 opacity-0 right-4 text-2xl"
          >
            <MdKeyboardArrowDown />
          </h5>
          <h4 className="text-[1.35rem] font-bold mb-5">Book. Ride. Arrive.</h4>
          <form
            action=""
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[50%] left-10 bg-gray-800 rounded-full"></div>
            <input
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mb-5"
              type="text"
              value={pickup}
              onClick={() => {
                setPannelOpen(true);
                setActiveField("pickup");
                fetchSuggestions(pickup);
              }}
              onChange={handlePickupChange}
              placeholder="Add a pickup location"
            />
            <input
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full"
              type="text"
              value={destination}
              onClick={() => {
                setPannelOpen(true);
                setActiveField("destination");
                fetchSuggestions(destination);
              }}
              onChange={handleDestinationChange}
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            suggestions={suggestions}
            loading={loadingSuggestions}
            onSuggestionClick={handleSuggestionClick}
            setPannelOpen={setPannelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

{/* vehiclePanel  */}
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0 bg-white p-3 w-full py-10 translate-y-full"
      >
        <VehiclePanel setconfirmRidePanel={setconfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>

      {/* Confirm vehicle Panel  */}
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10 bottom-0 bg-white p-3 w-full py-10 translate-y-full"
      >
        <ConfirmRide setVehiclePanelOpen={setVehiclePanelOpen} setconfirmRidePanel={setconfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      {/* Looking For captain Panel  */}
      <div
      ref={vehicleFoundRef}
        className="fixed z-10 bottom-0 bg-white p-3 w-full py-10 translate-y-full"
      >
        <LookingForDriver setVehicleFound={setVehicleFound} setconfirmRidePanel={setconfirmRidePanel}/>
      </div>

      {/* Waiting for Captain Panel  */}
      <div
      ref={waitingForDriverRef}
        className="fixed z-10 bottom-0 bg-white p-3 w-full py-10 "
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} setVehicleFound={setVehicleFound} />
      </div>
    </div>
  );
};

export default Home;
