import Head from "next/head";
import styles from "../styles/Home.module.css";
import Logo from "../public/ConsensusComics.png";
import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  HStack,
  Image,
  Img,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import MintButton from "../components/MintButton";
import InfoStrip from "../components/InfoStrip";
import MintAmount from "../components/MintAmount";
import ImageCarousel from "../components/ImageCarousel";
import { useEffect } from "react";
import MintCount from "../components/MintCount";
import MintingControls from "../components/MintingControls";
import InfoButton from "../components/InfoButton";

export default function Home() {

  const {colorMode, toggleColorMode} = useColorMode()

  useEffect(()=>{
    if(colorMode==="light") return;
    toggleColorMode()
  },[colorMode])

  return (
    <Grid
      templateColumns={"repeat(5, 1fr)"}
      templateRows="repeat(6, 1fr)"
      h="100vh"
      bg=""
      pb='1%'
    >
      <GridItem rowSpan={1} colSpan={5}>
        <Header />
      </GridItem>

      <GridItem rowStart={2} colStart={1} colSpan={5} h="full">
        <Center>
          <Img
            src="/preview.gif"
            borderRadius={"10px"}
            border=".25vh solid black"
            minBlockSize={"250px"}
          />
        </Center>
      </GridItem>
      <GridItem rowStart={4} rowSpan={1} colStart={2} colSpan={3} bg="">
        {/* <MintButton /> */}
        <MintingControls/>
        <Grid templateColumns={"repeat(5, 1fr)"}>
          <GridItem colStart={2} colSpan={3} py="5%">
            {/* <MintAmount /> */}
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem rowStart={6} colSpan={1} bg="">
        <Center h={"full"}><MintCount/></Center>
      </GridItem>
      <GridItem rowStart={6} colStart={5} bg="">
        <Center h={"full"}><InfoButton/></Center>
      </GridItem>
    </Grid>
  );
}

