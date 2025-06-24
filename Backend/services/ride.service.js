const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if(!pickup || !destination) {
        throw new Error('Pickup and destination are required to calculate fare');
    }

    const distanceTime = await mapsService.getDistanceTime(pickup, destination);

    if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
        throw new Error('Failed to fetch distance and time for fare calculation');
    }


    const baseFare = {
        tuktuk: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        tuktuk: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinRate = {
        tuktuk: 2,
        car: 3,
        motorcycle: 1.5
    };

    const distanceInKm = distanceTime.distance.value/1000;
    const durationInMin = distanceTime.duration.value/60; 

    const fares = {
        tuktuk: baseFare.tuktuk + (perKmRate.tuktuk * distanceInKm) + (perMinRate.tuktuk * durationInMin),
        car: baseFare.car + (perKmRate.car * distanceInKm) + (perMinRate.car * durationInMin),
        motorcycle: baseFare.motorcycle + (perKmRate.motorcycle * distanceInKm) + (perMinRate.motorcycle * durationInMin)
    };

    return fares;
}

function getOtp (num){
const max = Math.pow(10, num) - 1;
const otp = crypto.randomInt(0, max + 1).toString().padStart(num, '0');
return otp;
}

module.exports.createRide = async ({
    user,
    pickup,
    destination,
    vehicleType,
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required to create a ride');
    }

    const fare = await getFare(pickup, destination);

    const ride =  rideModel.create({
        user,
        pickup,
        destination,
        otp : getOtp(6),
        fare: fare[vehicleType],
    });

        return ride;
   
}



