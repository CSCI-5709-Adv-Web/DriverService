import type { DriverLocation } from "../../types"

export class Driver implements DriverLocation {
  driverId: string
  latitude: number
  longitude: number
  timestamp: number
  isAvailable: boolean

  constructor(data: DriverLocation) {
    this.driverId = data.driverId
    this.latitude = data.latitude
    this.longitude = data.longitude
    this.timestamp = data.timestamp || Date.now()
    this.isAvailable = data.isAvailable !== undefined ? data.isAvailable : true
  }

  toJSON(): DriverLocation {
    return {
      driverId: this.driverId,
      latitude: this.latitude,
      longitude: this.longitude,
      timestamp: this.timestamp,
      isAvailable: this.isAvailable,
    }
  }
}

