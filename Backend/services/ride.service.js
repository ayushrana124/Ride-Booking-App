const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
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
        tuktuk: +(baseFare.tuktuk + (perKmRate.tuktuk * distanceInKm) + (perMinRate.tuktuk * durationInMin)).toFixed(2),
        car: +(baseFare.car + (perKmRate.car * distanceInKm) + (perMinRate.car * durationInMin)).toFixed(2),
        motorcycle: +(baseFare.motorcycle + (perKmRate.motorcycle * distanceInKm) + (perMinRate.motorcycle * durationInMin)).toFixed(2)
    };

    return fares;
}

module.exports.getFare = getFare;

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

module.exports.confirmRide = async ({ rideId, captain }) => {
    if (!rideId || !captain) {
        throw new Error('Ride ID and Captain ID are required to confirm a ride');
    }

    await rideModel.findOneAndUpdate({ _id : rideId}, { status : 'accepted', captain: captain._id });

    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp || !captain) {
        throw new Error('Ride ID, OTP and Captain ID are required to start a ride');
    }

    const ride = await rideModel.findOne({ _id: rideId}).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Invalid ride ID or OTP');
    }

    if(ride.status !== 'accepted') {
        throw new Error('Ride is not in accepted state');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'ongoing' });
  
    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data : ride
    });
 
    return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId || !captain) {
        throw new Error('Ride ID and Captain ID are required to end a ride');
    }

    const ride = await rideModel.findOne({ _id: rideId, captain : captain._id}).populate('user').populate('captain');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride is not in ongoing state');
    }

    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'completed' });

    // sendMessageToSocketId(ride.user.socketId, {
    //     event: 'ride-completed',
    //     data: ride
    // });

    return ride;
};


