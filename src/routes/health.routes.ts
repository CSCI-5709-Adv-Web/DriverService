import { Router } from "express"
import { redisClient } from "../db/redis"
import { createApiResponse } from "../utils/response"
import { logger } from "../utils/logger"
import { STATUS_CODES } from "../utils/error"

const router = Router()

router.get("/", (req, res) => {
  try {
    logger.info("Health check initiated")

    // Check Redis connection
    const redisStatus = redisClient.isReady ? "connected" : "disconnected"

    logger.info(`Redis status: ${redisStatus}`)

    createApiResponse(res, "Health check successful", STATUS_CODES.OK, {
      service: "driver-service",
      status: "healthy",
      redis: redisStatus,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logger.error("Health check failed", error)
    createApiResponse(res, "Health check failed", STATUS_CODES.INTERNAL_ERROR)
  }
})

export default router

