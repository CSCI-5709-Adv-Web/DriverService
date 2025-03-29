import { Router } from "express"
import driverRoutes from "./driver.routes"
import healthRoutes from "./health.routes"

const router = Router()

// Health check route
router.use("/health", healthRoutes)

// API routes
router.use("/drivers", driverRoutes)

export default router

