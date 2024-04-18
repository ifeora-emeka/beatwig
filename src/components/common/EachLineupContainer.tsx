import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import Link from 'next/link';
import Image from 'next/image';

export default function EachLineupContainer({ data }: any) {
    const { setTheme } = useTheme();
    return (
        <>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='flex gap-3 items-center z-0'>
                        <div className="h-10 w-10 relative">
                            <Image fill className="rounded-full absolute" src={data?.league?.img} alt="Europa League" />
                        </div>
                        {data?.league?.name}
                    </CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>
                <CardContent className='flex flex-col overflow-x-auto'>
                    {
                        data?.competitions.map((competition:any) => {
                            return <EachLineup key={crypto.randomUUID()} data={competition} />
                        })
                    }

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

const EachLineup = ({data}:{data:any}) => {
    const competitionId = data.url.split('/').pop();
    return <Link href={`/live/sports/football/${competitionId}`}>
        <div className='w-full flex items-center border-t md:gap-0 gap-3 cursor-pointer hover:bg-hover rounded-lg hover:shadow-sm'>
            {/* <div className='h-20 w-32 flex justify-center items-center'>
                <small>22:00</small>
            </div> */}
            <div className='flex-1 flex items-center gap-4 justify-center h-20'>
                <div className="flex items-center gap-2">
                    <small className='truncate'>{data?.team1?.name}</small>
                    <Image className="rounded-full" src={data?.team1?.img} alt={data?.team1?.name} height="32" width="32" />
                </div>
                <div className="flex gap-2">
                    <span>0</span>
                    <span>-</span>
                    <span>3</span>
                </div>
                <div className="flex items-center gap-2">
                    <Image className="rounded-full" src={data?.team2?.img} alt={data?.team2?.name} height="32" width="32" />
                    <small className='truncate'>{data?.team2?.name}</small>
                </div>
            </div>
            {/* <div className='h-20 w-32 flex justify-center items-center'>
                {isLive &&
                    <small className='text-red-600 flex items-center gap-2'>
                        <RadioTower className='text-red-600' />
                        Live
                    </small>
                }
            </div> */}
        </div>
    </Link>
}
