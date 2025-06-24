const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().notEmpty().withMessage('Pickup location is required'),
    body('destination').isString().notEmpty().withMessage('Destination location is required'),
    body('vehicleType').isIn(['tuktuk', 'car', 'motorcycle']).withMessage('Vehicle type must be one of: tuktuk, car, motorcycle'),
    rideController.createRide
 )


module.exports = router;