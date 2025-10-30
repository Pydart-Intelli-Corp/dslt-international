'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const tokenomicsData = [
  {
    category: 'Community Allocation',
    percentage: 48,
    amount: '1.2B DSLT',
    color: 'accent-blue',
    description: 'Multi-mining, airdrops, staking rewards, liquidity mining'
  },
  {
    category: 'Company Holdings',
    percentage: 10,
    amount: '250M DSLT',
    color: 'accent-purple',
    description: 'Strategic reserve with 48-month vesting'
  },
  {
    category: 'Project Development',
    percentage: 25,
    amount: '625M DSLT',
    color: 'accent-green',
    description: 'Partnerships, integrations, ecosystem development'
  },
  {
    category: 'Development Team',
    percentage: 7,
    amount: '175M DSLT',
    color: 'accent-blue',
    description: 'Team allocation with cliff and linear vesting'
  },
  {
    category: 'Liquidity & Listings',
    percentage: 8,
    amount: '200M DSLT',
    color: 'pink-500',
    description: 'Exchange listings and market making'
  },
  {
    category: 'Others',
    percentage: 2,
    amount: '50M DSLT',
    color: 'yellow-500',
    description: 'Contingency and operational reserves'
  }
]

const miningInfo = {
  totalBlocks: 15,
  miniBlocksPerMain: 25,
  tokensPerMiniBlock: '2.72M',
  priceIncrease: '10%',
  totalMiningSupply: '1.02B DSLT'
}

export default function Tokenomics() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section id="tokenomics" className="py-20 relative overflow-hidden">
      {/* Subtle section overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary heading-with-accents mb-6">
            Tokenomics
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            DSLT features a carefully designed token distribution model with a total supply of 2.5 billion tokens,
            combining community rewards with sustainable ecosystem development.
          </p>
          
          <div className="inline-flex items-center space-x-4 glass-card rounded-xl p-4">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">2.5B</div>
              <div className="text-sm text-text-secondary">Total Supply</div>
            </div>
            <div className="w-px h-12 bg-accent-purple/30"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-green">BNB</div>
              <div className="text-sm text-text-secondary">Smart Chain</div>
            </div>
          </div>
        </motion.div>

        {/* Tokenomics Chart */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
          {/* Pie Chart Representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="w-80 h-80 mx-auto relative">
              {/* Animated Circle Chart */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
                {tokenomicsData.map((item, index) => {
                  let offset = 0
                  for (let i = 0; i < index; i++) {
                    offset += tokenomicsData[i].percentage
                  }
                  const strokeDasharray = `${item.percentage * 2.51} ${(100 - item.percentage) * 2.51}`
                  const strokeDashoffset = `-${offset * 2.51}`
                  
                  const getColorClass = (color: string) => {
                    switch (color) {
                      case 'accent-blue': return 'text-accent-blue'
                      case 'accent-purple': return 'text-accent-purple'
                      case 'accent-green': return 'text-accent-green'
                      case 'accent-blue': return 'text-accent-blue'
                      case 'pink-500': return 'text-pink-500'
                      default: return 'text-yellow-500'
                    }
                  }
                  
                  return (
                    <motion.circle
                      key={item.category}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      className={getColorClass(item.color)}
                      strokeWidth="8"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      initial={{ strokeDasharray: `0 251` }}
                      animate={inView ? { strokeDasharray: strokeDasharray } : { strokeDasharray: `0 251` }}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                    />
                  )
                })}
              </svg>
              
              {/* Center Info */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">DSLT</div>
                  <div className="text-sm text-text-secondary">Distribution</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Legend */}
          <div className="space-y-4">
            {tokenomicsData.map((item, index) => {
              const getColorClass = (color: string) => {
                switch (color) {
                  case 'accent-blue': return 'bg-accent-blue'
                  case 'accent-purple': return 'bg-accent-purple'
                  case 'accent-green': return 'bg-accent-green'
                  case 'accent-blue': return 'bg-accent-blue'
                  case 'pink-500': return 'bg-pink-500'
                  default: return 'bg-yellow-500'
                }
              }
              
              return (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                  className="flex items-center p-4 rounded-xl glass-card hover:border-accent-purple/30 transition-all duration-300"
                >
                  <div className={`w-4 h-4 rounded-full mr-4 flex-shrink-0 ${getColorClass(item.color)}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold text-text-primary">{item.category}</h4>
                      <span className="text-lg font-bold text-accent-purple-light">{item.percentage}%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-text-secondary">{item.description}</span>
                      <span className="font-medium text-text-primary">{item.amount}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Multi-Mining System */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="glass-card rounded-2xl p-8"
        >
          <h3 className="centure-heading text-2xl md:text-3xl font-bold text-center mb-8">
            <span className="gradient-text">Multi-Mining System</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-accent-purple mb-2">{miningInfo.totalBlocks}</div>
              <div className="text-text-secondary text-sm">Main Blocks</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-accent-purple-light mb-2">{miningInfo.miniBlocksPerMain}</div>
              <div className="text-text-secondary text-sm">Mini Blocks/Main</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-accent-green mb-2">{miningInfo.tokensPerMiniBlock}</div>
              <div className="text-text-secondary text-sm">Tokens/Mini Block</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-accent-blue mb-2">+{miningInfo.priceIncrease}</div>
              <div className="text-text-secondary text-sm">Price Increase</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-pink-500 mb-2">{miningInfo.totalMiningSupply}</div>
              <div className="text-text-secondary text-sm">Mining Supply</div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-purple/10 rounded-xl border border-accent-purple/30">
            <p className="text-text-secondary text-center">
              <span className="text-accent-purple-light font-semibold">Multi-Mining Mechanism:</span> Price increases by 10% with each completed Mini Block,
              creating predictable price discovery until public exchange listing.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}