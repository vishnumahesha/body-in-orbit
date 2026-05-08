"use client";

import React from "react";

interface State {
  failed: boolean;
}

export class SafeMount extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  State
> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch() {
    // swallow — this is a dev/headless WebGL failure or similar non-critical mount error
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
