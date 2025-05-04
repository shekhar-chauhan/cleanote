"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useUser } from "../context/user-context"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"

// Enhanced typing animation with characters and scribbles
const EnhancedTypingAnimation = () => {
  // Sample words and phrases for the typing effect
  const sampleTexts = [
    "notes",
    "ideas",
    "thoughts",
    "reminders",
    "todo list",
    "meeting notes",
    "inspiration",
    "remember this",
    "important",
    "follow up",
    "project plan",
    "draft",
    "concept",
    "outline",
    "brainstorm",
    "journal",
    "daily log",
    "checklist",
    "goals",
    "highlights",
    "research",
    "personal notes",
    "work notes",
    "shopping list",
    "creative ideas",
    "snippets",
    "reflections",
    "recipes",
    "plans",
    "observations",
  ]

  const isMobile = useMobile()

  // Generate random scribbles and text typing animations
  const generateElements = () => {
    const elements = []
    // Reduce number of elements on mobile
    const textCount = isMobile ? 10 : 25
    const scribbleCount = isMobile ? 7 : 18
    const typingCount = isMobile ? 5 : 12

    // Generate text typing animations - adjusted for mobile
    for (let i = 0; i < textCount; i++) {
      const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
      const top = Math.random() * 100 // 0-100% top position
      const left = Math.random() * 70 // 0-70% left position
      const delay = Math.random() * 12 // Reduced delay time from 15s to 12s
      const duration = Math.random() * 2 + 3 // 3-5s duration
      const fontSize = Math.random() * 0.5 + 0.7 // 0.7-1.2rem font size
      const opacity = Math.random() * 0.35 + 0.25 // Balanced opacity range

      elements.push({
        type: "text",
        text,
        top,
        left,
        delay,
        duration,
        fontSize,
        opacity,
      })
    }

    // Generate scribble animations - adjusted for mobile
    for (let i = 0; i < scribbleCount; i++) {
      const scribbleType = Math.floor(Math.random() * 5) // 5 different scribble types
      const top = Math.random() * 100 // 0-100% top position
      const left = Math.random() * 70 // 0-70% left position
      const delay = Math.random() * 12 // Reduced delay time
      const duration = Math.random() * 3 + 2 // 2-5s duration
      const scale = Math.random() * 0.5 + 0.5 // 0.5-1.0 scale
      const opacity = Math.random() * 0.35 + 0.25 // Balanced opacity
      const rotate = Math.random() * 60 - 30 // -30 to 30 degrees rotation

      elements.push({
        type: "scribble",
        scribbleType,
        top,
        left,
        delay,
        duration,
        scale,
        opacity,
        rotate,
      })
    }

    // Generate character-by-character typing - adjusted for mobile
    for (let i = 0; i < typingCount; i++) {
      const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
      const top = Math.random() * 100 // 0-100% top position
      const left = Math.random() * 70 // 0-70% left position
      const delay = Math.random() * 12 // Reduced delay time
      const charDelay = 0.1 // Delay between characters
      const fontSize = Math.random() * 0.4 + 0.6 // 0.6-1.0rem font size
      const opacity = Math.random() * 0.35 + 0.25 // Balanced opacity

      elements.push({
        type: "typing",
        text,
        top,
        left,
        delay,
        charDelay,
        fontSize,
        opacity,
      })
    }

    return elements
  }

  const [elements, setElements] = useState([])

  useEffect(() => {
    setElements(generateElements())
  }, [isMobile])

  // Get SVG path for different scribble types
  const getScribblePath = (type) => {
    switch (type) {
      case 0:
        return "M10,30 Q20,5 30,30 T50,30 T70,30 T90,30"
      case 1:
        return "M10,20 Q30,60 50,20 T90,20"
      case 2:
        return "M10,30 C20,10 40,50 50,30 S80,10 90,30"
      case 3:
        return "M10,20 S30,60 50,20 S70,60 90,20"
      case 4:
        return "M10,50 Q30,30 50,50 T90,50"
      default:
        return "M10,30 Q50,10 90,30"
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, i) => {
        if (element.type === "text") {
          // Full text that appears gradually
          return (
            <motion.div
              key={`text-${i}`}
              className="absolute text-purple-400/50 font-light tracking-wider lowercase"
              style={{
                top: `${element.top}%`,
                left: `${element.left}%`,
                fontSize: `${element.fontSize}rem`,
                opacity: 0,
                fontFamily: "monospace",
              }}
              animate={{
                opacity: [0, element.opacity, element.opacity, 0],
                left: [`${element.left}%`, `${element.left + 5}%`, `${element.left + 10}%`, `${element.left + 15}%`],
              }}
              transition={{
                duration: element.duration,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                delay: element.delay,
                times: [0, 0.2, 0.8, 1],
              }}
            >
              {element.text}
            </motion.div>
          )
        } else if (element.type === "scribble") {
          // SVG scribbles that draw themselves
          return (
            <motion.div
              key={`scribble-${i}`}
              className="absolute"
              style={{
                top: `${element.top}%`,
                left: `${element.left}%`,
                opacity: 0,
                transform: `rotate(${element.rotate}deg) scale(${element.scale})`,
              }}
              animate={{
                opacity: [0, element.opacity, element.opacity, 0],
              }}
              transition={{
                duration: element.duration,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                delay: element.delay,
                times: [0, 0.2, 0.8, 1],
              }}
            >
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
                <motion.path
                  d={getScribblePath(element.scribbleType)}
                  stroke="rgba(192, 132, 252, 0.5)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0] }}
                  transition={{
                    duration: element.duration,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    times: [0, 0.3, 0.7, 1],
                  }}
                />
              </svg>
            </motion.div>
          )
        } else if (element.type === "typing") {
          // Character-by-character typing effect
          return (
            <div
              key={`typing-${i}`}
              className="absolute"
              style={{
                top: `${element.top}%`,
                left: `${element.left}%`,
                fontSize: `${element.fontSize}rem`,
                fontFamily: "monospace",
              }}
            >
              {element.text.split("").map((char, charIndex) => (
                <motion.span
                  key={`char-${i}-${charIndex}`}
                  className="inline-block text-purple-400/50"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, element.opacity, element.opacity, 0],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: element.delay + charIndex * element.charDelay,
                    times: [0, 0.1, 0.9, 1],
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          )
        }
      })}

      {/* Handwriting scribbles - reduced for mobile */}
      {[...Array(useMobile() ? 5 : 10)].map((_, i) => {
        const handwritingPaths = [
          "M10,20 C20,10 30,30 40,20 S60,10 70,30 S90,20 100,30",
          "M10,30 Q30,10 50,30 T70,10 T90,30",
          "M10,20 Q20,40 30,20 T50,40 T70,20 T90,40",
          "M10,25 C30,5 50,45 70,25 S90,5 110,25",
          "M10,30 S30,10 50,30 S70,10 90,30 S110,10 130,30",
        ]

        const path = handwritingPaths[i % handwritingPaths.length]
        const top = Math.random() * 100
        const left = Math.random() * 50
        const delay = Math.random() * 12

        return (
          <motion.div
            key={`handwriting-${i}`}
            className="absolute"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.45, 0.45, 0], // Balanced opacity
              left: [`${left}%`, `${left + 5}%`, `${left + 10}%`, `${left + 15}%`],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: delay,
              times: [0, 0.2, 0.8, 1],
            }}
          >
            <svg width="140" height="50" viewBox="0 0 140 50" fill="none">
              <motion.path
                d={path}
                stroke="rgba(192, 132, 252, 0.45)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 0.2,
                  times: [0, 0.4, 0.6, 1],
                }}
              />
            </svg>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function LoginScreen() {
  const { login, isLoading } = useUser()
  const [loginError, setLoginError] = useState<string | null>(null)
  const isMobile = useMobile()

  const handleGoogleLogin = async () => {
    try {
      setLoginError(null)
      await login()
    } catch (error) {
      console.error("Login error:", error)
      setLoginError("Failed to sign in with Google. Please try again.")
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black p-4 relative">
      {/* Enhanced typing animation in background */}
      <EnhancedTypingAnimation />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 to-transparent opacity-30" />

      <div className="w-full max-w-md mx-auto flex flex-col items-center relative z-10">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.6,
          }}
          className="mb-8"
        >
          <div className="relative">
            <h1 className={`${isMobile ? "text-5xl" : "text-6xl"} font-bold text-white`}>
              Clea
              <span className="text-purple-500 relative inline-block">
                <span>Note</span>
                {/* Animated border around "Note" that disappears completely */}
                <motion.span
                  className="absolute inset-0 border-2 border-purple-500/50 rounded-lg"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0, 0.5], // Made sure it goes to 0
                  }}
                  transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    times: [0, 0.4, 0.5, 1], // Controls timing of opacity changes
                  }}
                />
              </span>
            </h1>

            {/* Bouncing purple box animation */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              className="absolute -inset-8 bg-purple-500/20 blur-xl rounded-full -z-10"
            />
          </div>

          {/* Tagline with staggered animation */}
          <div className="text-center mt-2 overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
              <div className="flex justify-center space-x-3">
                {["Minimal", "Beautiful", "Focused"].map((word, index) => (
                  <motion.span
                    key={word}
                    className="text-purple-300 inline-block"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.7 + index * 0.2,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  >
                    {word}
                    <span className="text-purple-500">.</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Neon-style login card without a box */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full"
        >
          <div className="relative p-8">
            {/* Glowing neon effect instead of a box */}
            <motion.div
              className="absolute inset-0 bg-purple-500/5 rounded-3xl backdrop-blur-sm -z-10"
              animate={{
                boxShadow: [
                  "0 0 5px rgba(168, 85, 247, 0.3), 0 0 20px rgba(168, 85, 247, 0.2), inset 0 0 15px rgba(168, 85, 247, 0.1)",
                  "0 0 10px rgba(168, 85, 247, 0.4), 0 0 30px rgba(168, 85, 247, 0.3), inset 0 0 25px rgba(168, 85, 247, 0.2)",
                  "0 0 5px rgba(168, 85, 247, 0.3), 0 0 20px rgba(168, 85, 247, 0.2), inset 0 0 15px rgba(168, 85, 247, 0.1)",
                ],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            {/* Animated neon lines */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {/* Top neon line */}
              <motion.div
                className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                animate={{
                  width: ["0%", "100%", "100%", "0%"],
                  left: ["0%", "0%", "0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  times: [0, 0.4, 0.6, 1],
                }}
              />

              {/* Bottom neon line */}
              <motion.div
                className="absolute bottom-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                animate={{
                  width: ["0%", "100%", "100%", "0%"],
                  right: ["0%", "0%", "0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 2,
                  times: [0, 0.4, 0.6, 1],
                }}
              />

              {/* Left neon line */}
              <motion.div
                className="absolute left-0 top-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500 to-transparent"
                animate={{
                  height: ["0%", "100%", "100%", "0%"],
                  top: ["0%", "0%", "0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 1,
                  times: [0, 0.4, 0.6, 1],
                }}
              />

              {/* Right neon line */}
              <motion.div
                className="absolute right-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500 to-transparent"
                animate={{
                  height: ["0%", "100%", "100%", "0%"],
                  bottom: ["0%", "0%", "0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 3,
                  times: [0, 0.4, 0.6, 1],
                }}
              />
            </div>

            <motion.h2
              className="text-2xl font-bold text-white mb-6 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Welcome Back
            </motion.h2>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Button
                variant="outline"
                size={isMobile ? "default" : "lg"}
                className="w-full relative overflow-hidden group border-purple-500/30 hover:border-purple-500 bg-zinc-900/30 text-white hover:text-white hover:bg-zinc-800/50"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google
                  </div>
                )}
              </Button>
            </motion.div>

            {loginError && <div className="mt-4 text-red-400 text-sm text-center">{loginError}</div>}

            {/* Moved from bottom to here */}
            <motion.div
              className="mt-8 text-center text-xs text-purple-300/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              The simplest way to capture your thoughts.
              <br />
              <span className="text-xs mt-2 block text-purple-300/40">Your notes are saved to Google Drive</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Moved from login card to bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-8 text-zinc-400 text-xs text-center"
        >
          By continuing, you agree to CleaNote's
          <br />
          <Link href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
            Privacy Policy
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
