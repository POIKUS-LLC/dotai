"use client"

import { useEffect, useState } from "react"
import type { Container, Engine } from "@tsparticles/engine"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

import { cn } from "@/lib/utils"

interface ParticlesComponentProps {
  className?: string
  density?: number
  amount?: number
  size?: number
}

export default function ParticlesComponent({
  className = "",
  density = 256,
  amount = 80,
  size = 1.5,
}: ParticlesComponentProps) {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = async (container?: Container) => {
    console.log("Particles loaded", container)
  }

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      className={cn("absolute inset-0", className)}
      particlesLoaded={particlesLoaded}
      options={{
        fpsLimit: 120,
        particles: {
          color: {
            value: "#ffffff",
          },
          number: {
            density: {
              enable: true,
              width: density,
              height: density,
            },
            value: amount,
          },
          opacity: {
            value: { min: 0.1, max: 0.5 },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: size / 2, max: size },
          },
          move: {
            enable: true,
            direction: "none",
            speed: { min: 0.2, max: 0.5 },
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
          },
          modes: {
            bubble: {
              distance: 200,
              size: size * 1.5,
              duration: 2,
              opacity: 0.8,
            },
          },
        },
        detectRetina: true,
        background: {
          color: "transparent",
        },
      }}
    />
  )
}
