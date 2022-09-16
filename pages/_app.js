import '../styles/globals.css'
import {ChakraProvider} from "@chakra-ui/react"
import Header from '../components/Header'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Consensus Comics',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }) {
  return(
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
 <ChakraProvider>
   <Component {...pageProps} />
  </ChakraProvider>
  </RainbowKitProvider>
  </WagmiConfig>
)}

export default MyApp
