import React, { useEffect, useState } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useContractRead } from "wagmi";
import ContractABI from "../artifacts/contracts/ConsensusComics.sol/ConsensusComics.json";

export default function MintCount() {
  const [mintCount, setMintCount] = useState();

  const { data, isError, isLoading } = useContractRead({
    addressOrName: "0xf007ab65c07ac1f40d63d8cf36d116526edb7703",
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
