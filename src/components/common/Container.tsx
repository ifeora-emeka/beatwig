import React from 'react'

type Props = {
    children: any;
}

export default function Container({ children }: Props) {
  return (
      <div className='md:min-w-[699px] md:max-w-[699px] w-full'>
        {children}
    </div>
  )
}