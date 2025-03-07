import React, { useMemo, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './store';
import GlobalStyle from './styles/GlobalStyle'; // ✅ 글로벌 스타일 불러오기
import { theme } from './styles/theme';
import Navigation from './components/Navigation';
import ProgressBar from './components/ProgressBar'; // ✅ 운동 진행률 추가
// Solana Wallet Adapter imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

// AppContext imports
import { AppProvider } from './context/AppContext';

// ErrorBoundary 추가
import ErrorBoundary from './components/ErrorBoundary';



// Lazy 로딩 적용 (코드 스플리팅)
const Home = React.lazy(() => import('./pages/Home'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const SquatChallenge = React.lazy(() => import('./pages/SquatChallenge'));
const ConnectWallet = React.lazy(() => import('./pages/ConnectWallet'));



// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

// ✅ 운동 진행률을 Redux에서 가져와 ProgressBar에 적용하는 컴포넌트
const ProgressBarWrapper = () => {
  const { todayCount, dailyGoal } = useSelector((state: RootState) => state.squats);
  const progress = Math.min((todayCount / dailyGoal) * 100, 100); // ✅ 0 ~ 100% 값으로 변환
  return <ProgressBar progress={progress} />;
};

function App() {
  // ✅ .env 파일에서 Solana 네트워크 가져오기 (Devnet, Testnet, Mainnet 설정 가능)
  const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork || WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // ✅ 여러 개의 지갑 지원 (Phantom, Solflare)
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Provider store={store}>
            <AppProvider> {/* Context API 추가 */}
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Router>
                  <Navigation />
                  <ErrorBoundary>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <h1>🏋️‍♂️ Ex2Earn 피트니스</h1>
                      <ProgressBarWrapper /> {/* ✅ 운동 진행률 UI 추가 */}
                    </div>
                    <Suspense fallback={<div>⏳ 로딩 중...</div>}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/squat-challenge" element={<SquatChallenge />} />
                        <Route path="/connect-wallet" element={<ConnectWallet />} />
                      </Routes>
                    </Suspense>
                  </ErrorBoundary>
                </Router>
              </ThemeProvider>
            </AppProvider>
          </Provider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
