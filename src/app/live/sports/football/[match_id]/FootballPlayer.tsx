import { Button } from '@/components/ui/button'
import { Share } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

export default function FootballPlayer({ }: Props) {
  return (
    <div className='bg-card p-default_spacing rounded-lg gap-default_spacing flex flex-col text-muted'>
      <header className='flex gap-default_spacing items-center justify-between'>
        <div className="flex gap-default_spacing items-center">
          <div className="relative h-7 w-7">
            <Image fill alt='' className='absolute' src="https://streamsgate.net/images/tournaments/679.png" />
          </div>
          <h1 className='text-sm md:text-md'>UEFA Europa League</h1>
        </div>
        <button className='text-muted'>
          <Share className="h-4 w-4" />
        </button>
      </header>
      <div className='md:h-[480px] h-[200px] bg-black rounded-lg'>
        {/* <iframe width="100%" height="100%" src="https://d.daddylivehd.sx/embed/stream-3.php" allowFullScreen allowTransparency className='rounded-lg' /> */}
      </div>
    </div>
  )
}