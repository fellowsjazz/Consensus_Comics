import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";

import { FaGithub, FaTwitter, FaFileContract  } from "react-icons/fa";

export default function InfoButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button type="button" size={"xl"} variant="link" onClick={onOpen}>
        Info
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Consensus Comics</DrawerHeader>

          <DrawerBody>
            <Flex>
              <Image src="/favicon.ico" boxSize={"10%"} />
              <Text>
                This generative NFT collection draws inspiration from the public
                domain comic books of the early 1950s, and was released in the
                week after Ethereum switched consensus mechanisms from PoW to
                PoS!
                <br />
                <br />
                Each Consensus Comic is 0.005 Ξ to mint. Whitelisted minters can
                claim up to 5 Consensus comics for free, and can mint more for
                0.005 Ξ.
                <br />
                <br />
                Check if you are on the whitelist {" "}
                
                <a
                  href="https://docs.google.com/spreadsheets/d/1AG7-H3F9RlWWCIq9KX8BnC3rHXjYrZuGLM-DTM-ZdjA/edit?usp=sharing"
                  target={"_blank"}
                  rel="noreferrer"
                  
                >
                  here.
                </a>
              </Text>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <a
              href="https://github.com/fellowsjazz/Consensus_Comics"
              target={"_blank"}
              rel="noreferrer"
            >
              <IconButton
                icon={<FaGithub />}
                bg={"blue.200"}
                mr="1%"
                pr={"1%"}
              />
            </a>
            <a
              href="https://twitter.com/russmatthews_"
              target={"_blank"}
              rel="noreferrer"
            >
              {" "}
              <IconButton icon={<FaTwitter />} bg={"blue.200"} mr="1%" />
            </a>
            <a href="https://etherscan.io/address/0xf1c63eabe30386ea35fe021cf918bdb7f8b6764b"
              target={"_blank"}
              rel="noreferrer"><IconButton bg={"blue.200"} icon={<FaFileContract/>}/></a>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
