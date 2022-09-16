import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

export default function InfoStrip() {
  return (
    <Flex direction={"row"} align="center" justify="space-between">
        <Text p={"2vh"}>Test Info</Text>
        <Text p={"2vh"}>Test Info</Text>
    </Flex>
  )
}
