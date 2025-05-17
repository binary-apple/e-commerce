import type { AuthViews } from '../../../../types/authViews';
import type { redirectOptions } from '../../../../types/redirectOptions';
import { Paths } from '../../../../types/paths';

export const redirectionConfig: Record<AuthViews, redirectOptions> = {
  LOGIN: {
    title: "Don't have account?",
    linkLabel: 'Sign up',
    url: Paths.REGISTRATION,
  },
  REGISTRATION: {
    title: 'Already have account?',
    linkLabel: 'Log in',
    url: Paths.AUTH,
  },
};
