import { FilmData } from '@/types/film.types';
import Image from 'next/image';
import React from 'react'

type Props = {
    data: FilmData;
}

export default function EachFilmLg({ data }: Props) {
    return (
        <div className='hover:bg-hover p-default_spacing rounded-md flex gap-default_spacing hover:shadow-md'>
            <div className='relative min-h-32 max-h-32 min-w-24 bg-background overflow-hidden'>
                <Image fill src={data.poster as string} className='rounded-md absolute' alt={data.title} />
            </div>
            <div className='flex gap-default_spacing flex-col'>
                <h3 className='text-foreground text-lg font-semibold'>{data.title}</h3>
                <p className='text-sm text-muted line-clamp-3'>{data.overview}</p>
            </div>
        </div>
    )
}