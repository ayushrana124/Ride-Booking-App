const axios = require('axios');

module.exports.getAddressCoordinates = async (address) => { 
    const apiKey = process.env.GOOGLE_MAPS_API; // Make sure to set this in your environment variables
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const results = response.data.results;

        if (results && results.length > 0) {
            const location = results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('No results found for the given address.');
        }
    } catch (error) {
        throw new Error(`Failed to fetch coordinates: ${error.message}`);
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    
    const apiKey = process.env.GOOGLE_MAPS_API;
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'OK') {
                return {
                    distance: element.distance,
                    duration: element.duration
                };
            } else {
                throw new Error('No route found between origin and destination');
            }
        } else {
            throw new Error('Invalid response from Google Maps API');
        }
    } catch (error) {
        throw new Error('Failed to fetch distance and time');
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input || input.length < 3) {
        throw new Error('Input must be at least 3 characters long');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const encodedInput = encodeURIComponent(input);
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedInput}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions
        } else {
            throw new Error('Failed to fetch suggestions');
        }
    } catch (error) {
        throw new Error(`Failed to fetch suggestions: ${error.message}`);
    }
}