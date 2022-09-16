import React from "react";
import { Button, Center, Flex, Image } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'



export default function MintButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex direction="row" justify="center" width={"100%"} >

    <Button type="button" size={"xl"} variant="outline" maxW="10rem" height='5rem' bg="blue.200"
    onClick={onOpen}>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><Center>Check Wallet to Confirm Transaction</Center></ModalHeader>
          <ModalCloseButton />
          

          <ModalFooter>
            <Button bg='red.300' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' bg={'blue.200'}>View Transaction</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Image src="/Mint.png" size="lg" />
    </Button>
    </Flex>
  );
}
