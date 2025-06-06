import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useUpdateMutation } from '../../../../api/userApi';
import { useSnackbar } from 'notistack';
import type { RootState } from '../../../../store/store';

type Props = {
  userVersion: number;
  addressId: string;
  open: boolean;
  handleClose: () => void;
  refetchUser: (token: string) => void;
};

export default function DeleteAddressModal({
  userVersion,
  addressId,
  open,
  handleClose,
  refetchUser,
}: Props) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [update] = useUpdateMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleCancel = () => {
    handleClose();
  };

  const handleDelete = async () => {
    if (!accessToken) {
      enqueueSnackbar('Missing access token', { variant: 'error' });
      return;
    }

    try {
      await update({
        version: userVersion,
        actions: [
          {
            action: 'removeAddress',
            addressId,
          },
        ],
        accessToken,
      }).unwrap();

      enqueueSnackbar('Address deleted successfully!', { variant: 'success' });
      handleClose();
      refetchUser(accessToken);
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof error.data === 'string'
      ) {
        enqueueSnackbar(`${error.data}`, {
          variant: 'error',
        });
      } else {
        enqueueSnackbar('Address delete failed!', {
          variant: 'error',
        });
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth slotProps={{ paper: { sx: { p: 3 } } }}>
      <DialogTitle>Delete address</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr' },
            mt: 1,
          }}
        >
          <Typography component="h4" variant="body1">
            Are you sure you want to remove this address? This action cannot be undone.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
