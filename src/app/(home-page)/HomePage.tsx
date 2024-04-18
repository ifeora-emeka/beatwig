import Container from '@/components/common/Container'
import EachLineupContainer from '@/components/common/EachLineupContainer'
import HomeHeader from '@/components/common/nav/HomeHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import React from 'react'

export default function HomePage() {

    

    return (
        <div className='flex justify-center'>
            <Container>
                <div className="flex flex-col gap-5 py-10">
                    <HomeHeader />
                    <EachLineupContainer />
                    <EachLineupContainer />
                    <EachLineupContainer />
                </div>
            </Container>
        </div>
    )
}


