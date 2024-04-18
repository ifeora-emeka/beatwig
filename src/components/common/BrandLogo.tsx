import { CalendarSearch, Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

export default function BrandLogo({ }: Props) {
  return (
    <div className='flex items-center gap-5'>
      <Image src={'/brand_prev_ui.png'} alt='brand' width={40} height={40} />
      <div className="flex flex-1">
        <Search /> <input />
      </div>
      <button>
        <CalendarSearch />
      </button>
    </div>
  )
}