import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(err: Error): State {
    return { hasError: true, error: err.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return <h1>Что-то поло не так. Дройдики скоро починят :)</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
