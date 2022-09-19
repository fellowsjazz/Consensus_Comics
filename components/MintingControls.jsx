import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import MintAmount from './MintAmount'
import MintButton from './MintButton'
import WhiteListMintButton from './WhiteListMintButton'

export default function MintingControls() {
    const [mintAmount, setMintAmount] = useState(1)

    useEffect(()=>{
        console.log("Mint Amount = ", mintAmount)
    },[mintAmount])

  return (
    <Flex direction={'column'} bg="">
        <Flex>
        <MintButton mintAmount={mintAmount}/>
        <WhiteListMintButton mintAmount={mintAmount}/>
        </Flex>
        <MintAmount updateFunction={setMintAmount}/>
    </Flex>
  )
}
