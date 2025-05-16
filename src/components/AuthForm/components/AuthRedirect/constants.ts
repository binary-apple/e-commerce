import { Paths } from '../../../../types/paths';

export const redirectionConfig = {
  login: {
    title: "Don't have account?",
    linkLabel: 'Sign up',
    url: Paths.REGISTRATION,
  },
  registration: {
    title: 'Do you already have account?',
    linkLabel: 'Sign in',
    url: Paths.AUTH,
  },
};
