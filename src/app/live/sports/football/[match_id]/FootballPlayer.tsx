'use client'
import { Share } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}

export default function FootballPlayer({ }: Props) {
  const {match_id} = useParams();
  return (
    <div className='flex flex-col lg:gap-default_spacing'>
      <div className='bg-card lg:p-default_spacing lg:rounded-lg gap-default_spacing flex flex-col text-muted'>
        <header className='hidden lg:flex gap-default_spacing items-center justify-between'>
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
        <div className='md:h-[416px] h-[202px] bg-black lg:rounded-lg'>
          <iframe width="100%" height="100%" src={`https://embedstreamgate.com/embed?key=${match_id}`} allowFullScreen allowTransparency className='lg:rounded-lg' />
        </div>
      </div>


      <div className='bg-card lg:py-default_spacing px-default_spacing md:rounded-lg text-muted h-[2.5rem] lg:h-auto items-center flex justify-center'>
        <div className='flex items-center justify-between max-w-full w-full'>
          <div className="flex items-center gap-default_spacing">
            <div className='relative w-6 h-6 md:w-10 md:h-10 rounded-full bg-hover'>
              <Image fill alt="" data-default-src="https://streamsgate.net/images/teams/56021.png" src="https://streamsgate.net/images/teams/56021.png" className='absolute' />
            </div>
            <h4 className='truncate max-w-[90px] md:max-w-full'>Al-Taawoun</h4>
          </div>
          <div className='flex items-center md:gap-default_spacing_lg lg:text-4xl font-bold gap-default_spacing'>
            <span>4</span>
            <span>-</span>
            <span>1</span>
          </div>
          <div className="flex items-center gap-default_spacing">
            <h4 className='truncate max-w-[90px] md:max-w-full'>Al-Taawoun</h4>
            <div className='relative w-6 h-6 md:w-10 md:h-10 rounded-full bg-hover'>
              <Image fill alt="" data-default-src="https://streamsgate.net/images/teams/56021.png" src="https://streamsgate.net/images/teams/56021.png" className='absolute' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}