"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { feature } from "topojson-client"

interface GeoFeature {
  type: string
  geometry: any
  properties: any
}

interface InteractiveGlobeProps {
  targetLat: number
  targetLon: number
  autoAnimate?: boolean
  destinationName?: string
  className?: string
}

function interpolateProjection(raw0: any, raw1: any) {
  const mutate: any = d3.geoProjectionMutator((t: number) => (x: number, y: number) => {
    const [x0, y0] = raw0(x, y)
    const [x1, y1] = raw1(x, y)
    return [x0 + t * (x1 - x0), y0 + t * (y1 - y0)]
  })
  let t = 0
  return Object.assign((mutate as any)(t), {
    alpha(_: number) {
      return arguments.length ? (mutate as any)((t = +_)) : t
    },
  })
}

export function InteractiveGlobe({
  targetLat,
  targetLon,
  autoAnimate = true,
  destinationName,
  className = "",
}: InteractiveGlobeProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [worldData, setWorldData] = useState<GeoFeature[]>([])
  const [rotation, setRotation] = useState([0, 0])
  const [scale, setScale] = useState(250)
  const [animationPhase, setAnimationPhase] = useState<
    "idle" | "spinning" | "rotating" | "zooming" | "unfolding" | "complete"
  >("idle")

  const width = 600
  const height = 600

  useEffect(() => {
    const loadWorldData = async () => {
      try {
        const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        const world: any = await response.json()
        const countries = feature(world, world.objects.countries).features
        setWorldData(countries)
      } catch (error) {
        console.log("[v0] Error loading world data:", error)
        const fallbackData = [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [-180, -90],
                  [180, -90],
                  [180, 90],
                  [-180, 90],
                  [-180, -90],
                ],
              ],
            },
            properties: {},
          },
        ]
        setWorldData(fallbackData)
      }
    }

    loadWorldData()
  }, [])

  useEffect(() => {
    if (!autoAnimate || worldData.length === 0) return
    if (animationPhase !== "idle") return

    const sequence = async () => {
      setAnimationPhase("spinning")
      const spinStart = Date.now()
      const spinDuration = 5000

      const spinAnimation = () => {
        const elapsed = Date.now() - spinStart
        const t = Math.min(elapsed / spinDuration, 1)
        const spinRotation = 360 * t

        setRotation([spinRotation, 0])

        if (t < 1) {
          animationFrameRef.current = requestAnimationFrame(spinAnimation)
        } else {
          setAnimationPhase("rotating")
          const rotateStart = Date.now()
          const rotateDuration = 3000
          const startRotation = [360, 0]
          const targetRotation = [-targetLon, -targetLat]

          const rotateAnimation = () => {
            const elapsed = Date.now() - rotateStart
            const t = Math.min(elapsed / rotateDuration, 1)
            const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

            const currentRotation = [
              startRotation[0] + (targetRotation[0] - startRotation[0]) * eased,
              startRotation[1] + (targetRotation[1] - startRotation[1]) * eased,
            ]

            setRotation(currentRotation)

            if (t < 1) {
              animationFrameRef.current = requestAnimationFrame(rotateAnimation)
            } else {
              setAnimationPhase("zooming")
              const zoomStart = Date.now()
              const zoomDuration = 1500
              const startScale = 250
              const targetScale = 600

              const zoomAnimation = () => {
                const elapsed = Date.now() - zoomStart
                const t = Math.min(elapsed / zoomDuration, 1)
                const eased = 1 - Math.pow(1 - t, 3)

                const currentScale = startScale + (targetScale - startScale) * eased
                setScale(currentScale)

                if (t < 1) {
                  animationFrameRef.current = requestAnimationFrame(zoomAnimation)
                } else {
                  timeoutRef.current = window.setTimeout(() => {
                    setAnimationPhase("unfolding")
                    const unfoldStart = Date.now()
                    const unfoldDuration = 2000

                    const unfoldAnimation = () => {
                      const elapsed = Date.now() - unfoldStart
                      const t = Math.min(elapsed / unfoldDuration, 1)
                      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

                      setProgress(eased * 100)
                      const unfoldScale = 600
                      setScale(unfoldScale)

                      if (t < 1) {
                        animationFrameRef.current = requestAnimationFrame(unfoldAnimation)
                      } else {
                        setAnimationPhase("complete")
                        timeoutRef.current = window.setTimeout(() => {
                          setProgress(0)
                          setRotation([0, 0])
                          setScale(250)
                          setAnimationPhase("idle")
                        }, 2000)
                      }
                    }

                    unfoldAnimation()
                  }, 500)
                }
              }

              zoomAnimation()
            }
          }

          rotateAnimation()
        }
      }

      spinAnimation()
    }

    sequence()

    // Cleanup function to cancel animations on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [autoAnimate, worldData, targetLat, targetLon])

  useEffect(() => {
    if (!svgRef.current || worldData.length === 0) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const t = progress / 100
    const alpha = Math.pow(t, 0.5)

    const projection = interpolateProjection(d3.geoOrthographicRaw, d3.geoEquirectangularRaw)
      .scale(scale)
      .translate([width / 2, height / 2])
      .rotate(rotation)
      .precision(0.1)

    projection.alpha(alpha)

    const path = d3.geoPath(projection)

    try {
      const graticule = d3.geoGraticule()
      const graticulePath = path(graticule())
      if (graticulePath) {
        svg
          .append("path")
          .datum(graticule())
          .attr("d", graticulePath)
          .attr("fill", "none")
          .attr("stroke", "#e5e7eb")
          .attr("stroke-width", 0.5)
          .attr("opacity", 0.3)
      }
    } catch (error) {
      console.log("[v0] Error creating graticule:", error)
    }

    svg
      .selectAll(".country")
      .data(worldData)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", (d) => {
        try {
          const pathString = path(d as any)
          if (!pathString) return ""
          if (typeof pathString === "string" && (pathString.includes("NaN") || pathString.includes("Infinity"))) {
            return ""
          }
          return pathString
        } catch (error) {
          return ""
        }
      })
      .attr("fill", "hsl(var(--primary))")
      .attr("fill-opacity", 0.1)
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 1)
      .attr("opacity", 0.8)
      .style("visibility", function () {
        const pathData = d3.select(this).attr("d")
        return pathData && pathData.length > 0 && !pathData.includes("NaN") ? "visible" : "hidden"
      })

    if (
      animationPhase === "rotating" ||
      animationPhase === "zooming" ||
      animationPhase === "unfolding" ||
      animationPhase === "complete"
    ) {
      const markerProjection = projection([targetLon, targetLat])
      if (markerProjection) {
        svg
          .append("circle")
          .attr("cx", markerProjection[0])
          .attr("cy", markerProjection[1])
          .attr("r", 6)
          .attr("fill", "#ef4444")
          .attr("stroke", "#fff")
          .attr("stroke-width", 2)
          .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.3))")
      }
    }

    try {
      const sphereOutline = path({ type: "Sphere" })
      if (sphereOutline) {
        svg
          .append("path")
          .datum({ type: "Sphere" })
          .attr("d", sphereOutline)
          .attr("fill", "none")
          .attr("stroke", "hsl(var(--primary))")
          .attr("stroke-width", 2)
          .attr("opacity", 0.6)
      }
    } catch (error) {
      console.log("[v0] Error creating sphere outline:", error)
    }
  }, [worldData, progress, rotation, scale, targetLat, targetLon, animationPhase])

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      />
      {destinationName &&
        (animationPhase === "rotating" ||
          animationPhase === "zooming" ||
          animationPhase === "unfolding" ||
          animationPhase === "complete") && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border shadow-lg">
            <p className="text-sm font-semibold text-foreground">{destinationName}</p>
          </div>
        )}
    </div>
  )
}
