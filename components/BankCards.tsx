import { formatAmount } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BankCards = ({ account, userName, showBalance = true }: CreditCardProps) => {
  return (
    <div>
      <Link href="/" className='bank-card'>
        <div className='bank-card_content'>
          <div>
            <h1 className='text-16 font-semibold text-white '>
              {account.name || userName}
            </h1>
            <p className='font-ibm-plex-serif font-black text-white'>
              {formatAmount(account.currentBalance)}
            </p>
          </div>
          <article className="flex flex-col gap-3">
            <div className="flex justify-between">
              <h1 className="text-12 font-semibold text-white">
                {userName}
              </h1>
              <h2 className="text-12 font-semibold text-white">
              ●● / ●●
              </h2>
            </div>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● <span className="text-16">1234</span>
            </p>
          </article>
        </div>
        <div className="bank-card_icon w-6">
          <Image 
            src="/icons/Paypass.svg"
            width={20}
            height={24}
            alt='pay'
            className='ml-5 font-bold mix-blend-screen'
          />
          <Image 
            src="/icons/mastercard.svg"
            height={45}
            width={32}
            alt='mastercard'
          />
          <Image 
            src="/icons/lines.png"
            height={190}
            width={316}
            alt='lines'
            className='absolute top-1 left-0'
          />
        </div>
      </Link>
    </div>
  )
}

export default BankCards
