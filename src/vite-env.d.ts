/// <reference types="vite/client" />

interface Window {
  gtag: (...args: unknown[]) => void;
}

declare function gtag(...args: unknown[]): void;
