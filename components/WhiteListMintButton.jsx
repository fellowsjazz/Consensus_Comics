import React, { useEffect, useState } from "react";
import { Button, Center, Flex, Image, Tooltip } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import ContractABI from "../artifacts/contracts/ConsensusComics.sol/ConsensusComics.json";
import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import appData from "../constants";
import getProofForAddress from "../utils/merkle/MerkleTree";
import { whiteList } from "../utils/merkle/whiteList";

export default function WhiteListMintButton(props) {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [merkleProof, setMerkleProof] = useState();
  const [userAddress, setUserAddress] = useState();

  console.log("proof found in whitelistmintbutton: ", merkleProof);

  useEffect(() => {
    if (address) {
      setUserAddress(address);
      setMerkleProof([
        getProofForAddress(address).then((proof) => {
          setMerkleProof(proof);
        }),
      ]);
      console.log("Current user address is ", userAddress);
    }
  }, []);

  useEffect(() => {
    console.log("MERKLE PROOF FOR THIS ADDRESS IS: ", merkleProof);
  }, [merkleProof]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { config, error } = usePrepareContractWrite({
    addressOrName: "0xF007Ab65C07ac1F40D63D8cF36D116526eDB7703",
    contractInterface: ContractABI.abi,
    functionName: "whiteListMint",
    args: [merkleProof, props.mintAmount],
  });

  
  console.log(`Config: ${config} error: ${error}`)

  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    console.log("mint amount in button: ", props.mintAmount);
  }, [props.mintAmount]);

  const { write, data, isLoading, isSuccess } = useContractWrite(config);

  useEffect(() => {
    if (data) {
      console.log("data from transaction: ", data);
    }
  }, [data]);

  const mintHandler = () => {
    
    if (!localStorage.getItem("wagmi.connected")) {
      openConnectModal();
    }
    if (!write) return;
    console.log("it sees write")
    onOpen();
    write();
    console.log("data from transaction: ", data);
  };

  const connectWarning = () => {
    if (!localStorage.getItem("wagmi.connected"))
      return <Text>Connect Wallet First!</Text>;
  };

  const TransactionCheck = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (isSuccess) {
      return (
        <a href={`https://etherscan.io/tx/${data.hash}`} target="_blank">
          View Transaction
        </a>
      );
    } else return "Transaction Failed";
  };

  return (
    <Flex direction="row" justify="center" width={"100%"}>
      <Button
        type="button"
        size={"xl"}
        variant="outline"
        maxW="10rem"
        height="5rem"
        bg="blue.200"
        onClick={mintHandler}
        disabled={!whiteList.includes(address)}
      >
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Center>Check Wallet to Confirm Transaction</Center>
            </ModalHeader>
            <ModalCloseButton />

            <ModalFooter>
              <Button bg="red.300" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" bg={"blue.200"}>
                <TransactionCheck />
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Image src="/WhiteListMint.png" size="lg">
          {}
        </Image>
      </Button>
    </Flex>
  );
}
