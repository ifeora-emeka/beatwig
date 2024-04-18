import Image from 'next/image'
import React from 'react'

type Props = {}

export default function BrandLogo({ }: Props) {
  return (
    <div className='flex items-center gap-5'>
      <div className="h-10 w-10 relative">
        <Image src={'/brand_prev_ui.png'} alt='brand' fill className='absolute' />
      </div>

    </div>
  )
}