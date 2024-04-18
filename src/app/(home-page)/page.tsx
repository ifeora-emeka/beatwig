import React from 'react';

import HomePage from './HomePage';

export default async function page() {

  const res = await fetch("http://localhost:3000/api/public/sports/football")
  const data = await res.json();

  return (
    <>
      <HomePage football={data} />
    </>
  )
}
