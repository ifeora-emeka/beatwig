import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import { RadioTower } from 'lucide-react';

export default function EachLineupContainer() {
    const { setTheme } = useTheme();
    return (
        <>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='flex gap-3 items-center'>
                        <img className="rounded-full" src="https://cdn.sportfeeds.io/sdl/images/competition/badge/small/4c1nfi2j1m731hcay25fcgndq.png" alt="Europa League" loading="lazy" decoding="async" />
                        International - Europa League
                    </CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>
                <CardContent className='flex flex-col gap-1 overflow-x-auto'>
                    <EachLineup isLive />
                    <EachLineup />
                    <EachLineup />

                    {/* <br />
                    <div className="flex">
                        <Button className='bg-primary' onClick={() => setTheme('light')}>Light</Button>
                        <Button className='bg-primary' onClick={() => setTheme('dark')}>Dark</Button>
                    </div> */}
                </CardContent>
            </Card>
        </>
    )
}

const EachLineup = ({ isLive }: { isLive?: boolean }) => {
    return <div className='w-full flex items-center border-t md:gap-0 gap-3 cursor-pointer hover:bg-hover rounded-lg hover:shadow-sm'>
        <div className='h-20 w-32 flex justify-center items-center'>
            <small>22:00</small>
        </div>
        <div className='flex-1 flex items-center gap-4 justify-center'>
            <div className="flex items-center gap-2">
                <small className='truncate'>Manchester City</small>
                <img className="crest team-crest_crest__Jp9_k" src="https://cdn.sportfeeds.io/sdl/images/team/crest/medium/a3nyxabgsqlnqfkeg41m6tnpp.png" alt="Manchester City" loading="lazy" decoding="async" height="32" width="32" />
            </div>
            <div className="flex gap-2">
                <span>0</span>
                <span>-</span>
                <span>3</span>
            </div>
            <div className="flex items-center gap-2">
                <img className="crest team-crest_crest__Jp9_k" src="https://cdn.sportfeeds.io/sdl/images/team/crest/medium/a3nyxabgsqlnqfkeg41m6tnpp.png" alt="Manchester City" loading="lazy" decoding="async" height="32" width="32" />
                <small className='truncate'>Manchester City</small>
            </div>
        </div>
        <div className='h-20 w-32 flex justify-center items-center'>
            {isLive && <small className='text-red-600 flex items-center gap-2'>
                <RadioTower className='text-red-600' />
                Live
            </small>}
        </div>
    </div>
}
