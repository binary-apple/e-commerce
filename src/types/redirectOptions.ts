import type { Paths } from './paths.ts';

export type redirectOptions = {
  title: string;
  linkLabel: string;
  url: Paths.REGISTRATION | Paths.AUTH;
};
