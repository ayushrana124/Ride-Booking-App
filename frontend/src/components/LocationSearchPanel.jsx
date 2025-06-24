import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({
  suggestions = [],
  loading = false,
  onSuggestionClick = () => {},
  setPannelOpen,
  setVehiclePanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  return (
    <div>
      {loading && (
        <div className="text-center py-2 text-gray-500">Loading...</div>
      )}
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => {
              onSuggestionClick(suggestion);
            }}
            className="flex gap-4 items-center justify-around mb-2 active:border-black active:border-2 p-3 rounded-xl cursor-pointer"
          >
            <h4 className="text-lg">
              <FaLocationDot />
            </h4>
            <h4 className="text-lg font-medium">
              {suggestion.description}
            </h4>
          </div>
        ))
      ) : !loading ? (
        <div className="text-center py-2 text-gray-400">No suggestions</div>
      ) : null}
    </div>
  );
};

export default LocationSearchPanel;
