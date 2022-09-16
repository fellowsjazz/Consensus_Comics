import React from 'react'
import {Box, Image, Spacer} from "@chakra-ui/react"
import {Flex, HStack} from "@chakra-ui/react"
import {ConnectButton} from "@rainbow-me/rainbowkit"
import CustomConnect from './CustomConnect'

export default function Header() {
  return (
    <Flex direction='row'h={"8rem"} align="center">
        <Box>
      <Image src={"/ConsensusComics.png"} max alt="alt" layout="responsive" maxBlockSize={"10rem"} />
      </Box>
      
      <Spacer/>
      
      <Box p={"1.5rem"}>
      <CustomConnect/>
      </Box>
    </Flex>
    
  )
}
