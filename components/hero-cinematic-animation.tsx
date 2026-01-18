"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import * as d3 from "d3"
import { feature } from "topojson-client"

interface GeoFeature {
  type: string
  geometry: any
  properties: any
}

interface Landmark {
  name: string
  lat: number
  lon: number
  icon: string
}

const FAMOUS_LANDMARKS: Landmark[] = [
  // Europe
  { name: "Paris", lat: 48.8566, lon: 2.3522, icon: "eiffel" },
  { name: "London", lat: 51.5074, lon: -0.1278, icon: "london" },
  { name: "Rome", lat: 41.9028, lon: 12.4964, icon: "rome" },
  { name: "Barcelona", lat: 41.3874, lon: 2.1686, icon: "barcelona" },
  { name: "Santorini", lat: 36.3932, lon: 25.4615, icon: "santorini" },
  { name: "Amsterdam", lat: 52.3676, lon: 4.9041, icon: "amsterdam" },
  { name: "Prague", lat: 50.0755, lon: 14.4378, icon: "prague" },
  { name: "Venice", lat: 45.4408, lon: 12.3155, icon: "venice" },
  { name: "Athens", lat: 37.9838, lon: 23.7275, icon: "athens" },
  { name: "Vienna", lat: 48.2082, lon: 16.3738, icon: "vienna" },
  
  // Asia
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, icon: "tokyo" },
  { name: "Dubai", lat: 25.2048, lon: 55.2708, icon: "dubai" },
  { name: "Bali", lat: -8.3405, lon: 115.0920, icon: "bali" },
  { name: "Singapore", lat: 1.3521, lon: 103.8198, icon: "singapore" },
  { name: "Hong Kong", lat: 22.3193, lon: 114.1694, icon: "hongkong" },
  { name: "Bangkok", lat: 13.7563, lon: 100.5018, icon: "bangkok" },
  { name: "Seoul", lat: 37.5665, lon: 126.9780, icon: "seoul" },
  { name: "Maldives", lat: 3.2028, lon: 73.2207, icon: "maldives" },
  { name: "Taj Mahal", lat: 27.1751, lon: 78.0421, icon: "india" },
  { name: "Beijing", lat: 39.9042, lon: 116.4074, icon: "beijing" },
  
  // Americas
  { name: "New York", lat: 40.7128, lon: -74.0060, icon: "nyc" },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437, icon: "la" },
  { name: "Miami", lat: 25.7617, lon: -80.1918, icon: "miami" },
  { name: "Cancún", lat: 21.1619, lon: -86.8515, icon: "cancun" },
  { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729, icon: "rio" },
  { name: "Buenos Aires", lat: -34.6037, lon: -58.3816, icon: "buenosaires" },
  { name: "Machu Picchu", lat: -13.1631, lon: -72.5450, icon: "peru" },
  { name: "San Francisco", lat: 37.7749, lon: -122.4194, icon: "sf" },
  
  // Africa & Middle East
  { name: "Cairo", lat: 30.0444, lon: 31.2357, icon: "egypt" },
  { name: "Cape Town", lat: -33.9249, lon: 18.4241, icon: "capetown" },
  { name: "Marrakech", lat: 31.6295, lon: -7.9811, icon: "morocco" },
  { name: "Istanbul", lat: 41.0082, lon: 28.9784, icon: "istanbul" },
  
  // Oceania
  { name: "Sydney", lat: -33.8688, lon: 151.2093, icon: "sydney" },
  { name: "Auckland", lat: -36.8485, lon: 174.7633, icon: "nz" },
  { name: "Fiji", lat: -17.7134, lon: 178.0650, icon: "fiji" },
]

// Helper to get base path
const getBasePath = () => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH
  if (!base || base === "''" || base === '""' || base.trim() === "") return ""
  return base
}

// Helper to get device pixel ratio for high-DPI displays
const getPixelRatio = () => {
  return window.devicePixelRatio || 1
}

export function HeroCinematicAnimation({ className = "" }: { className?: string }) {
  const basePath = getBasePath()
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [worldData, setWorldData] = useState<GeoFeature[]>([])
  const [phase, setPhase] = useState<"plane" | "plane-exit" | "globe-enter" | "globe-spin" | "landmarks" | "globe-exit" | "plane-enter">("plane")
  const [planeScale, setPlaneScale] = useState(1)
  const [planeOpacity, setPlaneOpacity] = useState(1)
  const [globeScale, setGlobeScale] = useState(0.3)
  const [globeOpacity, setGlobeOpacity] = useState(0)
  const [rotation, setRotation] = useState([0, -20])
  const [activeLandmark, setActiveLandmark] = useState<number | null>(null)
  const animationRef = useRef<number | null>(null)
  const isMountedRef = useRef(true)

  const width = 500
  const height = 500

  // Setup canvas with high DPI support
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const ratio = getPixelRatio()
    canvas.width = width * ratio
    canvas.height = height * ratio
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(ratio, ratio)
  }, [])

  // Load world data
  useEffect(() => {
    const loadWorldData = async () => {
      try {
        const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        const world: any = await response.json()
        const countries = feature(world, world.objects.countries).features
        setWorldData(countries)
      } catch (error) {
        setWorldData([])
      }
    }
    loadWorldData()
  }, [])

  // Animation sequence - 12-15 second loop
  const runAnimation = useCallback(() => {
    if (!isMountedRef.current) return

    let startTime = Date.now()

    const animate = () => {
      if (!isMountedRef.current) return

      const elapsed = Date.now() - startTime
      const loopDuration = 14000 // 14 second loop

      // Phase timing (in ms):
      // 0-2000: Plane visible, slight hover
      // 2000-4000: Plane scales down and fades out
      // 4000-6000: Globe scales up and fades in
      // 6000-9000: Globe rotates slowly, highlights landmarks
      // 9000-11000: Globe scales down and fades out
      // 11000-14000: Plane scales up and fades in

      const t = elapsed % loopDuration
      
      // Constant smooth rotation speed: 30 degrees per second
      const ROTATION_SPEED = 30 // degrees per second
      const timeInSeconds = t / 1000

      if (t < 2000) {
        // Phase 1: Plane visible with subtle hover
        setPhase("plane")
        const hover = 1 + Math.sin(t / 300) * 0.02
        setPlaneScale(hover)
        setPlaneOpacity(1)
        setGlobeOpacity(0)
        setGlobeScale(0.3)
      } else if (t < 4000) {
        // Phase 2: Plane exits
        setPhase("plane-exit")
        const progress = (t - 2000) / 2000
        const eased = 1 - Math.pow(1 - progress, 3)
        setPlaneScale(1 - eased * 0.7)
        setPlaneOpacity(1 - eased)
        setGlobeOpacity(0)
      } else if (t < 6000) {
        // Phase 3: Globe enters with smooth constant rotation
        setPhase("globe-enter")
        const progress = (t - 4000) / 2000
        const eased = 1 - Math.pow(1 - progress, 3)
        setPlaneOpacity(0)
        setGlobeScale(0.3 + eased * 0.7)
        setGlobeOpacity(eased)
        
        // Start rotation at constant speed from the beginning
        const rotationAngle = (timeInSeconds - 4) * ROTATION_SPEED
        setRotation([rotationAngle, -20])
      } else if (t < 9000) {
        // Phase 4: Globe continues rotating at same constant speed, highlights landmarks
        setPhase("landmarks")
        const progress = (t - 6000) / 3000
        setGlobeScale(1)
        setGlobeOpacity(1)
        
        // Continue constant speed rotation (no acceleration)
        const rotationAngle = (timeInSeconds - 4) * ROTATION_SPEED
        const tiltVariation = -20 + Math.sin(progress * Math.PI) * 10
        setRotation([rotationAngle, tiltVariation])
        
        // Cycle through landmarks smoothly
        const landmarkIndex = Math.floor(progress * FAMOUS_LANDMARKS.length) % FAMOUS_LANDMARKS.length
        setActiveLandmark(landmarkIndex)
      } else if (t < 11000) {
        // Phase 5: Globe exits (keep rotating at same speed)
        setPhase("globe-exit")
        const progress = (t - 9000) / 2000
        const eased = progress * progress
        setGlobeScale(1 - eased * 0.7)
        setGlobeOpacity(1 - eased)
        setActiveLandmark(null)
        
        // Maintain constant rotation speed during exit
        const rotationAngle = (timeInSeconds - 4) * ROTATION_SPEED
        setRotation([rotationAngle, -20])
      } else {
        // Phase 6: Plane enters
        setPhase("plane-enter")
        const progress = (t - 11000) / 3000
        const eased = 1 - Math.pow(1 - progress, 3)
        setGlobeOpacity(0)
        setPlaneScale(0.3 + eased * 0.7)
        setPlaneOpacity(eased)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
  }, [])

  useEffect(() => {
    isMountedRef.current = true
    runAnimation()

    return () => {
      isMountedRef.current = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [runAnimation])

  // Render globe with Canvas (much faster than SVG)
  useEffect(() => {
    if (!canvasRef.current || worldData.length === 0 || globeOpacity === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)
    ctx.save()
    ctx.globalAlpha = globeOpacity

    // Setup projection
    const projection = d3.geoOrthographic()
      .scale(180 * globeScale)
      .translate([width / 2, height / 2])
      .rotate(rotation)
      .clipAngle(90) // Only render visible hemisphere
      .precision(0.1)

    const path = d3.geoPath(projection, ctx)

    // Draw graticule (grid lines)
    try {
      const graticule = d3.geoGraticule()
      ctx.beginPath()
      path(graticule() as any)
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'
      ctx.lineWidth = 0.5
      ctx.stroke()
    } catch (e) {}

    // Draw countries
    ctx.beginPath()
    worldData.forEach((d: GeoFeature) => {
      try {
        path(d as any)
      } catch (e) {}
    })
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'
    ctx.lineWidth = 0.5
    ctx.stroke()

    // Draw sphere outline
    ctx.beginPath()
    path({ type: "Sphere" } as any)
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw landmarks with glow effect
    if (phase === "landmarks" || phase === "globe-enter") {
      FAMOUS_LANDMARKS.forEach((landmark, index) => {
        const coords = projection([landmark.lon, landmark.lat])
        if (!coords) return

        // Check if point is on visible side of globe
        const center = projection.rotate()
        const lonDiff = Math.abs(((landmark.lon + center[0] + 180) % 360) - 180)
        if (lonDiff > 90) return

        const isActive = index === activeLandmark

        // Glow effect for active landmark
        if (isActive) {
          // Outer glow
          ctx.beginPath()
          ctx.arc(coords[0], coords[1], 20, 0, 2 * Math.PI)
          const gradient1 = ctx.createRadialGradient(coords[0], coords[1], 0, coords[0], coords[1], 20)
          gradient1.addColorStop(0, 'rgba(255,255,255,0.3)')
          gradient1.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = gradient1
          ctx.fill()

          // Inner glow
          ctx.beginPath()
          ctx.arc(coords[0], coords[1], 12, 0, 2 * Math.PI)
          const gradient2 = ctx.createRadialGradient(coords[0], coords[1], 0, coords[0], coords[1], 12)
          gradient2.addColorStop(0, 'rgba(255,255,255,0.5)')
          gradient2.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = gradient2
          ctx.fill()
        }

        // Marker dot
        ctx.beginPath()
        ctx.arc(coords[0], coords[1], isActive ? 6 : 4, 0, 2 * Math.PI)
        ctx.fillStyle = isActive ? '#ffffff' : 'rgba(255,255,255,0.7)'
        ctx.fill()
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = isActive ? 2 : 1
        ctx.stroke()

        // Label for active landmark
        if (isActive) {
          ctx.font = '600 12px system-ui, -apple-system, sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'bottom'
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = 'rgba(0,0,0,0.5)'
          ctx.shadowBlur = 4
          ctx.shadowOffsetY = 2
          ctx.fillText(landmark.name, coords[0], coords[1] - 15)
          ctx.shadowBlur = 0
          ctx.shadowOffsetY = 0
        }
      })
    }

    ctx.restore()
  }, [worldData, globeOpacity, globeScale, rotation, phase, activeLandmark])

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ willChange: 'transform' }}>
      {/* Airplane */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `scale(${planeScale}) translateZ(0)`,
          opacity: planeOpacity,
          pointerEvents: "none",
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          transition: 'none',
        }}
      >
        <img
          src={`${basePath}/images/AirplaneFinal.png`}
          alt="Fluturo Airplane"
          className="w-full max-w-4xl h-auto object-contain drop-shadow-2xl"
          style={{ 
            imageRendering: 'high-quality',
            transform: 'translateZ(0)',
          }}
        />
      </div>

      {/* Globe - Canvas for smooth 60-120fps performance */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          pointerEvents: "none",
          willChange: 'opacity',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full max-w-md h-auto"
          style={{
            transform: 'translateZ(0)',
            imageRendering: 'crisp-edges',
          }}
        />
      </div>
    </div>
  )
}
