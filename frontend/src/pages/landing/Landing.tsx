import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import React from 'react'

const Landing = () => {
  return (
    <div>
      <Navbar/>
      <section>
        <div className="relative h-screen flex items-center justify-center">
          <img 
            src="/hero.png" 
            alt="Hero" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-bold text-white mb-6">
              Your Power to Save Energy, Our Impact to Save Earth
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Track your energy consumption, optimize efficiency, and make a meaningful difference for the planet
            </p>
            <Button asChild>
              <a href="/signup">Get Started</a>
            </Button>
          </div>
        </div>
      </section>
      <section></section>
      <section></section>
      <section></section>
    </div>
  )
}

export default Landing
