import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import {whiteList, whitelistLowerCase} from "./whiteList";


console.log("MerkleTree.js Called")

const lowerCaseWhiteList = whitelistLowerCase(whiteList);
console.log('WL lowercase array: ', whitelistLowerCase)
const leafNodes = whiteList.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
const rootHash = merkleTree.getRoot();
console.log('roothash: 0x',rootHash.toString("hex"));


export default async function getProofForAddress(addr) {

    console.log(`getProofForAddress Called for addr ${addr}`)

    if(lowerCaseWhiteList){

    console.log("getProofForAddress passed if check")

    

  const userAddress = addr;

  if(lowerCaseWhiteList.includes(userAddress)){
    console.log(`address ${userAddress} found in whitelist`)
  } else{
    console.log(`address ${userAddress} NOT found in whitelist`)
  }

  const indexOfAddress = lowerCaseWhiteList.indexOf(userAddress);
  console.log("index of address:",indexOfAddress)

  const leafHashOfAddress =  leafNodes[indexOfAddress];
  console.log("leaf hash of address: ", leafHashOfAddress)

try{const proofForAddress = merkleTree.getHexProof(leafHashOfAddress);
  console.log("proof for provided address: ", proofForAddress)
  return proofForAddress} catch {
    console.log("Invalid Leaf, no proof available")
  }
 
}
}
