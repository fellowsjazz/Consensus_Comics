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
} from "@chakra-ui/react";

import { FaGithub, FaTwitter } from "react-icons/fa";

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
            This generative NFT collection draws inspiration from the public
            domain comic books of the early 1950s, and was released in the week
            after Ethereum switched consensus mechanisms from PoW to PoS!
            <br />
            <br />
            Each Consensus Comic is 0.005 ether to mint. Whitelisted minters can
            claim up to 5 Consensus comics for free, and can mint more for 0.002
            ether.
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
            <a href="https://twitter.com/russmatthews_" target={"_blank"} rel="noreferrer">
              {" "}
              <IconButton icon={<FaTwitter />} bg={"blue.200"} mr="1%" />
            </a>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
