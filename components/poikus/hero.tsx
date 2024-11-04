import { ArrowRight } from "lucide-react"

import { Button } from "../ui/button"

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center" id="hero">
      <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
        Elevate Your Coding with Tailored AI Integration
      </h1>
      <p className="text-xl md:text-2xl text-center mb-12 text-gray-300">
        Customize your IDE's .ai folder for unparalleled productivity.
      </p>
      <p className="text-lg md:text-xl mb-6">
        Optimize AI tools within your IDE, completely free.
      </p>
      <Button size="lg">
        Get Started Now
        <ArrowRight className="h-5 w-5" />
      </Button>
    </section>
  )
}

export default Hero
