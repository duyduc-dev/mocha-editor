// src/types/preload.d.ts
import { IMochaApi } from '@shared/types/mochaApi';

export {};

declare global {
  interface Window {
    mochaApi: IMochaApi;
  }
}
