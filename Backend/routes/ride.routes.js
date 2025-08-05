const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().notEmpty().withMessage('Pickup location is required'),
    body('destination').isString().notEmpty().withMessage('Destination location is required'),
    body('vehicleType').isIn(['tuktuk', 'car', 'motorcycle']).withMessage('Vehicle type must be one of: tuktuk, car, motorcycle'),
    rideController.createRide
 )

 router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().notEmpty().withMessage('Pickup location is required'),
    query('destination').isString().notEmpty().withMessage('Destination location is required'),
    rideController.getFare
 )

 router.post('/confirm-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Valid ride ID is required'),
    rideController.confirmRide
 )

 router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Valid ride ID is required'),
    query('otp').isString().isLength({min : 6, max : 6}).withMessage('Invalid OTP'),
    rideController.startRide
 )

 router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Valid ride ID is required'),
    rideController.endRide
 )


module.exports = router;