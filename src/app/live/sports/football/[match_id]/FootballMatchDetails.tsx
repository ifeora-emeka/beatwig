import Image from 'next/image'
import React from 'react'

type Props = {}

export default function FootballMatchDetails({ }: Props) {
    return (
        <div className='bg-card p-default_spacing rounded-lg text-muted'>
            <div className='flex items-center justify-between max-w-full'>
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
    )
}