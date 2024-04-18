import React from 'react'

type Props = {
    children: any;
}

export default function Container({ children }: Props) {
  return (
      <div className='min-w-[699px] max-w-[699px]'>
        {children}
    </div>
  )
}