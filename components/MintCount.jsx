import React, { useEffect, useState } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useContractRead } from "wagmi";
import ContractABI from "./ConsensusComics.json";

export default function MintCount() {
  const [mintCount, setMintCount] = useState();

  const { data, isError, isLoading } = useContractRead({
    addressOrName: "0xF1C63EABe30386Ea35fE021cF918bdB7f8B6764B",
    contractInterface: ContractABI.abi,
    functionName: "totalSupply",
    onSuccess(data) {
      console.log(data.toNumber());
      setMintCount(data.toNumber())
    },
    onError(error) {
      console.log("error: ", error);
    },
  });

  return <Text>{mintCount}/1000 minted</Text>;
}
