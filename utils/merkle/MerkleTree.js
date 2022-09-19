import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import {whiteList} from "./whiteList";

console.log("MerkleTree.js Called")


const leafNodes = whiteList.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
const rootHash = merkleTree.getRoot();
console.log('roothash: 0x',rootHash.toString("hex"));


export default async function getProofForAddress(addr) {

    console.log("getProofForAddress Called")

    if(whiteList){

    console.log("getProofForAddress passed if check")
    

  const userAddress = addr;

  const indexOfAddress = whiteList.indexOf(userAddress);
  console.log("index of address:",indexOfAddress)

  const leafHashOfAddress =  leafNodes[indexOfAddress];
  console.log("leaf hash of address: ", leafHashOfAddress)


 const proofForAddress = merkleTree.getHexProof(leafHashOfAddress);
  console.log("proof for provided address: ", proofForAddress)
  return proofForAddress
}
}
