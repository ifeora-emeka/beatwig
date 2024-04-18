'use client'
import Container from '@/components/common/Container'
import EachLineupContainer from '@/components/common/EachLineupContainer'
import HomeHeader from '@/components/common/nav/HomeHeader'
import { Calendar, RadioTower } from 'lucide-react'
import React from 'react'

export default function HomePage({ football }: { football: any[] }) {
    return (
        <div className='flex justify-center'>
            <Container>
                <div className="flex flex-col gap-default_spacing_lg md:py-5 md:mb-0 mb-5">
                    <HomeHeader />
                    <hr />
                    <div className="flex flex-col gap-default_spacing">
                        <h1 className='text-muted text-lg flex gap-3'>
                            <RadioTower />Live Now
                        </h1>
                        {/* <EachLineupContainer /> */}
                    </div>
                    <hr />
                    <div className="flex flex-col gap-default_spacing" key={crypto.randomUUID()}>
                        <h1 className='text-muted text-lg gap-3 flex'>
                            <Calendar />
                            {`Today's lineup`}
                        </h1>
                        {
                            football.map(league => {
                                return <EachLineupContainer
                                    key={crypto.randomUUID()}
                                    data={league}
                                />
                            })
                        }
                    </div>
                </div>
            </Container>
        </div>
    )
}


