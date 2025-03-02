import React, { useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from './store';
import { GlobalStyle } from './styles/globalStyles';
import { theme } from './styles/theme';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SquatChallenge from './pages/SquatChallenge';
import ConnectWallet from './pages/ConnectWallet'; // 지갑 연결 페이지 추가
import ProtectedRoute from './components/ProtectedRoute'; // 보호된 경로 컴포넌트 추가

// Solana wallet adapter imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

function App() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <Router>
                <Navigation />
                <Routes>
                  {/* 공개 경로 */}
                  <Route path="/" element={<Home />} />
                  <Route path="/connect-wallet" element={<ConnectWallet />} />

                  {/* 보호된 경로 */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/squat-challenge"
                    element={
                      <ProtectedRoute>
                        <SquatChallenge />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 페이지 */}
                  <Route path="*" element={<div>404: 페이지를 찾을 수 없습니다.</div>} />
                </Routes>
              </Router>
            </ThemeProvider>
          </Provider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
