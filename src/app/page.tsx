import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Tokenomics from '@/components/Tokenomics'
import Roadmap from '@/components/Roadmap'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg-deeper text-text-primary relative overflow-hidden">
      {/* Enhanced Crypto Mining Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated background grid */}
        <div className="absolute inset-0 cyber-grid opacity-3"></div>
        
        {/* Crypto Mining Particles - Now visible on mobile too */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`mining-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${10 + i * 7}%`,
              top: `${15 + (i * 8) % 70}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: '3s',
            }}
          >
            {/* Mining Block Icons */}
            <div className={`w-3 h-3 rounded-sm opacity-60 ${
              i % 4 === 0 ? 'bg-accent-green' : 
              i % 4 === 1 ? 'bg-accent-blue' : 
              i % 4 === 2 ? 'bg-accent-purple' : 'bg-yellow-400'
            }`} />
          </div>
        ))}
        
        {/* Blockchain Connection Lines - Now visible on mobile too */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`chain-${i}`}
            className="absolute opacity-20 animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${25 + i * 10}%`,
              width: '2px',
              height: '60px',
              background: 'linear-gradient(to bottom, transparent, #00d4ff, transparent)',
              animationDelay: `${i * 1.2}s`,
              animationDuration: '4s',
            }}
          />
        ))}
        
        {/* Floating Hash Symbols - Now visible on mobile too */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`hash-${i}`}
            className="absolute text-xs font-mono opacity-30 animate-float"
            style={{
              left: `${15 + i * 11}%`,
              top: `${20 + (i * 12) % 60}%`,
              color: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#572c7c' : '#00ff88',
              animationDelay: `${i * 1.5}s`,
            }}
          >
            #
          </div>
        ))}
        
        {/* Mining Rig Visual Elements */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`rig-${i}`}
            className="absolute opacity-40 hidden lg:block"
            style={{
              left: `${30 + i * 12}%`,
              top: `${40 + i * 8}%`,
              animationDelay: `${i * 2}s`,
            }}
          >
            <div className="flex space-x-1">
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className={`w-1 h-4 rounded-sm animate-pulse ${
                    j === 0 ? 'bg-accent-green' : j === 1 ? 'bg-accent-blue' : 'bg-accent-purple'
                  }`}
                  style={{
                    animationDelay: `${(i * 3 + j) * 0.3}s`,
                    animationDuration: '2s',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
        
        {/* Crypto Coin Symbols - Now visible on mobile too */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`coin-${i}`}
            className="absolute text-lg opacity-20 animate-bounce"
            style={{
              left: `${25 + i * 12}%`,
              top: `${30 + (i * 15) % 50}%`,
              color: i % 4 === 0 ? '#f7931a' : i % 4 === 1 ? '#627eea' : i % 4 === 2 ? '#00d4ff' : '#00ff88',
              animationDelay: `${i * 2}s`,
              animationDuration: '3s',
            }}
          >
            {i % 4 === 0 ? '₿' : i % 4 === 1 ? 'Ξ' : i % 4 === 2 ? '⟐' : '◊'}
          </div>
        ))}
        
        {/* Data Stream Lines */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`stream-${i}`}
            className="absolute opacity-15 animate-pulse hidden lg:block"
            style={{
              left: `${40 + i * 20}%`,
              top: '10%',
              width: '1px',
              height: '80%',
              background: `linear-gradient(to bottom, 
                transparent 0%, 
                ${i % 2 === 0 ? '#00d4ff' : '#572c7c'} 30%, 
                ${i % 2 === 0 ? '#572c7c' : '#00d4ff'} 70%, 
                transparent 100%)`,
              animationDelay: `${i * 1.8}s`,
              animationDuration: '5s',
            }}
          />
        ))}
        
        {/* Original optimized floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`particle particle-${(i % 3) + 1}`}
            style={{
              left: `${20 + i * 12}%`,
              top: `${20 + (i * 15) % 60}%`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
        
        {/* Reduced gradient orbs - mobile optimized */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full blur-2xl opacity-20 animate-float-slow hidden md:block"
            style={{
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(87,44,124,0.3) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(130,49,199,0.3) 0%, transparent 70%)',
              left: `${25 + i * 20}%`,
              top: `${20 + i * 25}%`,
              width: '200px',
              height: '200px',
              animationDelay: `${i * 5}s`,
            }}
          />
        ))}
        
        {/* Minimal twinkling effects */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`twinkle-${i}`}
            className="absolute w-1 h-1 rounded-full animate-pulse hidden sm:block"
            style={{
              background: i % 3 === 0 ? '#572c7c' : i % 3 === 1 ? '#8231c7' : '#00d4ff',
              left: `${15 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: '3s',
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