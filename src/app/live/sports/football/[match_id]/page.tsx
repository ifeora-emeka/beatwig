import { ContainerLg } from '@/components/common/Container'
import React from 'react'
import FootballComments from './FootballComments'
import FootballPlayer from './FootballPlayer'
import FootballMatchDetails from './FootballMatchDetails'

export default function page() {
  return (
    <div className="flex justify-center md:py-default_spacing">
      <ContainerLg>
        <div className="flex gap-default_spacing lg:flex-row flex-col">
          <div className="flex-1 flex flex-col gap-default_spacing">
            <FootballPlayer />
            <FootballMatchDetails />
          </div>
          <div className="lg:w-[400px] lg:h-[calc(100vh-12px-12px)] flex flex-col gap-default_spacing">
            <FootballComments />
          </div>
        </div>
      </ContainerLg>
    </div>
  )
}
