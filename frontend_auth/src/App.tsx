import React, { useMemo, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
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
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';

// AppContext imports
import { AppProvider } from './context/AppContext';

// ErrorBoundary 추가
import ErrorBoundary from './components/ErrorBoundary';
import WalletConnection from './components/WalletConnection';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy 로딩 적용 (코드 스플리팅)
const Home = React.lazy(() => import('./pages/Home'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const SquatChallenge = React.lazy(() => import('./pages/SquatChallenge'));
const ConnectWallet = React.lazy(() => import('./pages/ConnectWallet'));
const Profile = React.lazy(() => import('./pages/Profile'));

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

// ✅ 운동 진행률을 Redux에서 가져와 ProgressBar에 적용하는 컴포넌트
const ProgressBarWrapper = () => {
  const { todayCount, dailyGoal } = useSelector((state: RootState) => state.squats);
  const progress = Math.min((todayCount / dailyGoal) * 100, 100); // ✅ 0 ~ 100% 값으로 변환
  return <ProgressBar progress={progress} />;
};

const MainContent = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
  font-size: 2em;
`;

function App() {
  // Solana 네트워크 설정
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => {
    if (process.env.REACT_APP_SOLANA_RPC_URL) {
      return process.env.REACT_APP_SOLANA_RPC_URL;
    }
    return clusterApiUrl(network);
  }, [network]);

  // 지갑 어댑터 설정
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>
          <Provider store={store}>
            <AppProvider>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Router>
                  <Navigation />
                  <ErrorBoundary>
                    <MainContent>
                      <PageTitle>🏋️‍♂️ Ex2Earn 피트니스</PageTitle>
                      <ProgressBarWrapper />
                      <Suspense fallback={<div>⏳ 로딩 중...</div>}>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/connect-wallet" element={<WalletConnection />} />
                          <Route
                            path="/profile"
                            element={
                              <ProtectedRoute>
                                <Profile />
                              </ProtectedRoute>
                            }
                          />
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
                                <Suspense fallback={<div>운동 페이지 로딩 중...</div>}>
                                  <SquatChallenge />
                                </Suspense>
                              </ProtectedRoute>
                            }
                          />
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </Suspense>
                    </MainContent>
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
