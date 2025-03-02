// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Redux 상태에서 인증 여부 확인
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/connect-wallet" replace />;
  }

  // 인증된 경우 자식 컴포넌트를 렌더링
  return <>{children}</>;
};

export default ProtectedRoute;
