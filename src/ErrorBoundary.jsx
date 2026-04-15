import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: '#ff4444', backgroundColor: '#111', height: '100vh', fontFamily: 'monospace', overflow: 'auto' }}>
          <h2>React Runtime Crash Captured:</h2>
          <br/>
          <strong>Error:</strong>
          <pre>{this.state.error && this.state.error.toString()}</pre>
          <br/>
          <strong>Component Stack:</strong>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
