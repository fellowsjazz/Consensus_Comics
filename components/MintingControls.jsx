import { Center, Flex, Spacer, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MintAmount from "./MintAmount";
import MintButton from "./MintButton";
import WhiteListMintButton from "./WhiteListMintButton";

export default function MintingControls() {
  const [mintAmount, setMintAmount] = useState(1);

  useEffect(() => {
    console.log("Mint Amount = ", mintAmount);
  }, [mintAmount]);

  return (
    <Flex direction={"column"} bg="">
      <Flex>
        <MintButton mintAmount={mintAmount} />
        <Spacer mx="2%"/>
        <WhiteListMintButton mintAmount={mintAmount} />
      </Flex>
      <MintAmount updateFunction={setMintAmount} />
      <Center>
        <Text>{mintAmount * 0.005}Ξ</Text>
      </Center>
      <Center><Text fontSize={'xs'}>(whitelist mint is free)</Text></Center>
    </Flex>
  );
}
