import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('❌ 애플리케이션 오류 발생:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>⚠️ 오류가 발생했습니다. 페이지를 새로고침하세요.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
