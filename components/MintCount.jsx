import React, { useEffect, useState } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useContractRead } from "wagmi";
import ContractABI from "../artifacts/contracts/ConsensusComics.sol/ConsensusComics.json";

export default function MintCount() {
  const [mintCount, setMintCount] = useState();

  const { data, isError, isLoading } = useContractRead({
    addressOrName: "0xb524aa3e08ac2044a5ff6770642179d1c661aa3c",
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
