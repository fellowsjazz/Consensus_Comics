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
  Text
} from "@chakra-ui/react";
import ContractABI from "./ConsensusComics.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { BigNumber, ethers, utils } from "ethers";

export default function MintButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isFailed, setIsFailed] = useState(false);

  const mintValue = `${props.mintAmount * ethers.utils.parseEther("0.005")}`;
  const mintValueArg = BigNumber.from(mintValue);

  console.log("mintValue: ", mintValue, "mintvalue arg: ", mintValueArg);

  const { config, error } = usePrepareContractWrite({
    addressOrName: "0xF1C63EABe30386Ea35fE021cF918bdB7f8B6764B",
    contractInterface: ContractABI.abi,
    functionName: "mint",
    args: [props.mintAmount],
    overrides: {
      value: mintValueArg,
    },
    onError(error){console.log(`Error with transaction: ${error}`)}
  });

  console.log(`MintButton Config: ${config} Error: ${error}`);

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
    } else {
      console.log('failed: ', data)
      setIsFailed(true)
      return "Transaction Failed";}
  };

  const FailedMessage = () => {
    if(isFailed){return <Text fontSize={'xs'}>If the transaction failed on non-whitelist mint and you are using a ledger, try turning debug data on in your ledger settings</Text>}
  }

  
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
              <Flex direction={"column"}>
              <Flex direction={"row"}>
              <Button bg="red.300" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" bg={"blue.200"}>
                <TransactionCheck />
              </Button>
              </Flex>
              <FailedMessage/>
              </Flex>
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

///Your next step is fixing the mint button and mint count for the new contract
