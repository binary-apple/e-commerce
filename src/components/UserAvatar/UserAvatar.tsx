import { useEffect } from 'react';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useLazyGetMeQuery } from '../../api/authApi';
import { getUserInitials } from '../../utils/getUserInitials';
import classes from './UserAvatar.module.scss';

export const UserAvatar = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [trigger, { data: user }] = useLazyGetMeQuery();

  useEffect(() => {
    if (accessToken) {
      trigger(accessToken);
    }
  }, [accessToken, trigger]);

  if (!user) return null;

  return (
    <Avatar
      className={classes['user-avatar']}
      sx={{
        width: 62,
        height: 62,
        bgcolor: 'background.default',
        color: 'text.primary',
        '&:hover': {
          filter: 'brightness(90%)',
          color: 'text.secondary',
        },
      }}
    >
      {getUserInitials(user.firstName, user.lastName)}
    </Avatar>
  );
};
