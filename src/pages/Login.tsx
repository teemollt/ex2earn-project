import React, { useState } from 'react';
import { apiService } from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await apiService.login(email, password);
      // 로그인 성공 처리
      console.log('Login successful', data);
      // 여기에 로그인 성공 후 처리 로직을 추가합니다.
      // 예: 상태 업데이트, 리다이렉트 등
    } catch (error) {
      // 에러 처리
      console.error('Login failed', error);
      // 여기에 로그인 실패 시 처리 로직을 추가합니다.
      // 예: 에러 메시지 표시 등
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
