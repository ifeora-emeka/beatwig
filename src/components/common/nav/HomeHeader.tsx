import { Card } from '@/components/ui/card'
import React from 'react'
import BrandLogo from '../BrandLogo'

type Props = {}

export default function HomeHeader({}: Props) {
  return (
    <Card className='px-5 py-3'>
        <BrandLogo />
    </Card>
  )
}