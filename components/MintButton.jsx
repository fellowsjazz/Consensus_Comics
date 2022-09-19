import React, { useEffect } from "react";
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
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function MintButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { config, error } = usePrepareContractWrite({
    addressOrName: "0xb524aa3e08ac2044a5ff6770642179d1c661aa3c",
    contractInterface: ContractABI.abi,
    functionName: "mint",
    args: [props.mintAmount],
  });

  const {openConnectModal} = useConnectModal()

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
    if (!localStorage.getItem("wagmi.connected")){
      openConnectModal()
    };
    if (!write) return;
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
    if (isSuccess){
    return (
      <a href={`https://etherscan.io/tx/${data.hash}`} target="_blank">View Transaction</a>
    )}
    else return "Transaction Failed";
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
        <Image src="/Mint.png" size="lg">
          {}
        </Image>
      </Button>
    </Flex>
  );
}
