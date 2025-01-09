'use client';

import CountUp from 'react-countup';

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full">
      <CountUp 
        decimals={2}
        decimal="."
        useIndianSeparators
        prefix="₹"
        end={amount}
        delay={0.25}
      />
    </div>
  )
}

export default AnimatedCounter