import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message || "Something went wrong." };
  }

  componentDidCatch(error, info) {
    console.error("UI ErrorBoundary:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="section container">
          <div className="error-screen glass-card">
            <h1>Website failed to load</h1>
            <p>{this.state.errorMessage}</p>
            <button className="btn btn-primary" onClick={this.handleReload} type="button">
              Reload Website
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
