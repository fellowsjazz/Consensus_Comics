import React, { useEffect, useState } from "react";
import {
  Button,
  Center,
  Flex,
  Image,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
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
  Text
} from "@chakra-ui/react";
import ContractABI from "./ConsensusComics.json";
import { useContractWrite, usePrepareContractWrite, useAccount , useEnsAddress} from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import appData from "../constants";
import getProofForAddress from "../utils/merkle/MerkleTree";
import { whiteList, whitelistLowerCase } from "../utils/merkle/whiteList";


export default function WhiteListMintButton(props) {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [merkleProof, setMerkleProof] = useState();
  const [userAddress, setUserAddress] = useState();
  const [showToast, setShowToast] = useState(false);
  const [lowerCaseAddress, setLowerCaseAddress] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { openConnectModal } = useConnectModal();

  //setting address to lowercase format
  useEffect(()=>{
    if(address){
    setLowerCaseAddress(address.toLowerCase())}
  },[address])

  useEffect(()=>{
    console.log(`LC ADDRESS: ${lowerCaseAddress}`) // once we have lc address defined, we can call and set merkleProof
    const resolvedProof = getProofForAddress(lowerCaseAddress).then((v)=>{setMerkleProof(v)})
    
  },[lowerCaseAddress])

  //Getting merkle proof for this address

  useEffect(()=>{
    console.log(`Merkle Proof for ${lowerCaseAddress} received: ${merkleProof}`)
  },[merkleProof])


  //---

  
 const {config, error} = usePrepareContractWrite({
  addressOrName: '0xF1C63EABe30386Ea35fE021cF918bdB7f8B6764B',
  contractInterface: ContractABI.abi,
  functionName: 'whiteListMint',
  args: [merkleProof, props.mintAmount]
 })

 const { write, data, isLoading, isSuccess } = useContractWrite(config);
 console.log(`Whitelist Button:Config: ${config} error ${error}`)


 
  


  


  const mintHandler = () => {
    if (!localStorage.getItem("wagmi.connected")) {
      openConnectModal();
    }
    if (!write) {
      setShowToast(true);
      onOpen()
      return
    };
    console.log("it sees write");
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
        <a href={`https://etherscan.io/tx/${data.hash}`} target="_blank" rel="noreferrer">
          View Transaction
        </a>
      );
    } else return "Transaction Failed";
  };

  const Toast = () => {
    const toast = useToast();
    const id = 'error-toast'
    if (error && !toast.isActive(id)) {
      return toast({
        id,
        title: "Warning",
        description: `${error.reason.replace('execution reverted:','')}`,
        status:'warning',
        isClosable: true,
      });
    }
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
        disabled={!whitelistLowerCase(whiteList).includes(`${lowerCaseAddress}`)}
      >
        
        <Modal isOpen={isOpen} onClose={onClose}>\
        <Toast/>
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
        </Image>
      </Button>
    </Flex>
  );
}
