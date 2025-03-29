import { Router } from "express"
import { DriverController } from "../controllers/driver.controller"
import { validateRequest } from "../middleware/validatereq.middleware"
import { logger } from "../utils/logger"

const router = Router()
const driverController = new DriverController()

/**
 * @route POST /drivers
 * @desc Create a new driver
 * @access Private
 */
router.post(
  "/",
  validateRequest({
    body: {
      driverId: { type: "string", required: true },
      name: { type: "string", required: true },
      vehicleType: { type: "string", required: false },
      licensePlate: { type: "string", required: false },
      phoneNumber: { type: "string", required: false },
    },
  }),
  (req, res, next) => {
    logger.info("Create driver request received", {
      driverId: req.body.driverId,
      name: req.body.name,
    })
    return driverController.createDriver(req, res, next)
  },
)

/**
 * @route PUT /drivers/:driverId
 * @desc Update an existing driver
 * @access Private
 */
router.put(
  "/:driverId",
  validateRequest({
    params: ["driverId"],
    body: {
      name: { type: "string", required: false },
      vehicleType: { type: "string", required: false },
      licensePlate: { type: "string", required: false },
      phoneNumber: { type: "string", required: false },
    },
  }),
  (req, res, next) => {
    logger.info("Update driver request received", {
      driverId: req.params.driverId,
    })
    return driverController.updateDriver(req, res, next)
  },
)

/**
 * @route GET /drivers/all
 * @desc Get all drivers
 * @access Private
 */
router.get("/all", (req, res, next) => {
  logger.info("Get all drivers request received")
  return driverController.getAllDrivers(req, res, next)
})

/**
 * @route GET /drivers/nearby
 * @desc Find nearby drivers
 * @access Private
 * @headers latitude, longitude
 * @query radius (optional, in km)
 */
router.get(
  "/nearby",
  validateRequest({
    headers: ["latitude", "longitude"],
    query: {
      radius: { type: "number", required: false },
    },
  }),
  (req, res, next) => {
    logger.info("Find nearby drivers request received", {
      latitude: req.headers["latitude"],
      longitude: req.headers["longitude"],
      radius: req.query.radius,
    })
    return driverController.findNearbyDrivers(req, res, next)
  },
)

/**
 * @route PATCH /drivers/:driverId/status
 * @desc Set driver status (online/offline)
 * @access Private
 */
router.patch(
  "/:driverId/status",
  validateRequest({
    params: ["driverId"],
    body: {
      isOnline: { type: "boolean", required: true },
      latitude: { type: "number", required: false },
      longitude: { type: "number", required: false },
    },
  }),
  (req, res, next) => {
    logger.info("Set driver status request received", {
      driverId: req.params.driverId,
      isOnline: req.body.isOnline,
    })
    return driverController.setDriverStatus(req, res, next)
  },
)

/**
 * @route POST /drivers/location
 * @desc Update driver location
 * @access Private
 * @headers driver-id, latitude, longitude
 */
router.post(
  "/location",
  validateRequest({
    headers: ["driver-id", "latitude", "longitude"],
    body: {
      isOnline: { type: "boolean", required: false },
    },
  }),
  (req, res, next) => {
    logger.info("Update driver location request received", {
      driverId: req.headers["driver-id"],
      latitude: req.headers["latitude"],
      longitude: req.headers["longitude"],
    })
    return driverController.updateDriverLocation(req, res, next)
  },
)

/**
 * @route GET /drivers/:driverId/details
 * @desc Get complete driver details
 * @access Private
 */
router.get("/:driverId/details", (req, res, next) => {
  logger.info("Get driver details request received", { driverId: req.params.driverId })
  return driverController.getDriverDetails(req, res, next)
})

/**
 * @route GET /drivers/:driverId
 * @desc Get driver location
 * @access Private
 */
router.get("/:driverId", (req, res, next) => {
  logger.info("Get driver location request received", { driverId: req.params.driverId })
  return driverController.getDriverLocation(req, res, next)
})

export default router

