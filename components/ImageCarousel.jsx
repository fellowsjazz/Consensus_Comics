import React from 'react'
import Carousel from 'react-elastic-carousel'
import { useState } from 'react'
import { Image } from '@chakra-ui/react'

export default function ImageCarousel() {

   

  return (
    <Carousel itemsToShow={1}>
        <Image src='/30.png' boxSize={'300px'}/>
        <Image src='/31.png' boxSize={'300px'}/>
        <Image src='/32.png' boxSize={'300px'}/>
        <Image src='/33.png' boxSize={'300px'}/>
        <Image src='/34.png' boxSize={'300px'}/>
        <Image src='/35.png' boxSize={'300px'}/>
        <Image src='/36.png' boxSize={'300px'}/>
        <Image src='/37.png' boxSize={'300px'}/>
        <Image src='/38.png' boxSize={'300px'}/>
        <Image src='/39.png' boxSize={'300px'}/>
        <Image src='/40.png' boxSize={'300px'}/>
    </Carousel>
  )
}
