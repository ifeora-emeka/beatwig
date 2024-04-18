import Container from '@/components/common/Container'
import EachLineupContainer from '@/components/common/EachLineupContainer'
import HomeHeader from '@/components/common/nav/HomeHeader'
import { Calendar, RadioTower } from 'lucide-react'
import React from 'react'

export default function HomePage() {



    return (
        <div className='flex justify-center'>
            <Container>
                <div className="flex flex-col gap-5 md:py-5 md:mb-0 mb-5">
                    <HomeHeader />
                    <hr />
                    <div className="flex flex-col gap-3">
                        <h1 className='text-muted text-lg flex gap-3'>
                            <RadioTower />Live Now
                        </h1>
                        <EachLineupContainer />
                    </div>
                    <hr />
                    <div className="flex flex-col gap-3">
                        <h1 className='text-muted text-lg gap-3 flex'>
                            <Calendar />
                            {`Today's lineups`}
                        </h1>
                        <EachLineupContainer />
                        <EachLineupContainer />
                        <EachLineupContainer />
                    </div>
                </div>
            </Container>
        </div>
    )
}


