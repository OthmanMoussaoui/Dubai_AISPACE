import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Fix for React.ReactNode
declare module 'react' {
  interface ReactNode {
    children?: ReactNode;
  }
} 