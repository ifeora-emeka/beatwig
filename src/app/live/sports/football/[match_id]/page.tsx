import { ContainerLg } from '@/components/common/Container'
import React from 'react'
import FootballComments from './FootballComments'
import FootballPlayer from './FootballPlayer'
import FootballMatchDetails from './FootballMatchDetails'

export default function page() {
  return (
    <div className="flex justify-center lg:py-default_spacing min-h-[100vh] max-h-[100vh]">
      <ContainerLg>
        <div className="flex lg:gap-default_spacing lg:flex-row flex-col">
          <div className="flex-1 flex flex-col gap-default_spacing">
            <FootballPlayer />
            <FootballMatchDetails />
          </div>
          <div className="lg:w-[400px] lg:h-[calc(100vh-12px-12px)] h-[calc(100vh-200px-2.5rem)] flex flex-col gap-default_spacing">
            <FootballComments />
          </div>
        </div>
      </ContainerLg>
    </div>
  )
}
