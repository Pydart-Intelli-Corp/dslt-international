import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Tokenomics from '@/components/Tokenomics'
import Roadmap from '@/components/Roadmap'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg-deeper text-text-primary relative overflow-hidden">
      {/* Enhanced Global Background Effects - Footer Style Throughout */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated background grid */}
        <div className="absolute inset-0 cyber-grid opacity-3"></div>
        
        {/* Main floating particles - exactly like footer */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`particle particle-${(i % 3) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
            }}
          />
        ))}
        
        {/* Large gradient orbs - footer style background */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl opacity-30 animate-float-slow"
            style={{
              background: i % 3 === 0 
                ? 'radial-gradient(circle, rgba(87,44,124,0.4) 0%, rgba(87,44,124,0.1) 50%, transparent 100%)'
                : i % 3 === 1
                ? 'radial-gradient(circle, rgba(130,49,199,0.4) 0%, rgba(130,49,199,0.1) 50%, transparent 100%)'
                : 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, rgba(0,212,255,0.1) 50%, transparent 100%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${150 + Math.random() * 250}px`,
              height: `${150 + Math.random() * 250}px`,
              animationDelay: `${Math.random() * 20}s`,
            }}
          />
        ))}
        
        {/* Floating geometric shapes with footer styling */}
        {[...Array(25)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute rounded-lg opacity-20 animate-float"
            style={{
              background: i % 3 === 0 
                ? 'linear-gradient(45deg, rgba(87,44,124,0.3), rgba(130,49,199,0.3))'
                : i % 3 === 1
                ? 'linear-gradient(45deg, rgba(130,49,199,0.3), rgba(0,212,255,0.3))'
                : 'linear-gradient(45deg, rgba(0,212,255,0.3), rgba(87,44,124,0.3))',
              width: `${15 + Math.random() * 30}px`,
              height: `${15 + Math.random() * 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 18}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
        
        {/* Additional small twinkling effects - like footer particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`twinkle-${i}`}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              background: i % 3 === 0 ? '#572c7c' : i % 3 === 1 ? '#8231c7' : '#00d4ff',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
        
        {/* Subtle moving lines throughout */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-accent-purple/15 to-transparent opacity-30"
            style={{
              left: `${10 + i * 8}%`,
              height: `${40 + Math.random() * 60}%`,
              top: `${Math.random() * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <Header />
      <main className="relative z-10">
        <Hero />
        <Features />
        <Tokenomics />
        <Roadmap />
      </main>
      <Footer />
    </div>
  )
}