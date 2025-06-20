import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useChangePasswordMutation } from '../../../../api/userApi';
import { useSnackbar } from 'notistack';
import { TextInput } from '../../../../components/TextInput/TextInput';
import { useEffect } from 'react';
import { passwordUpdateSchema } from '../../../../utils/validationSchema';
import type { RootState } from '../../../../store/store';
import type { CustomerFromApi } from '../../../../types/auth';
import { useLazyGetMeQuery, useLoginMutation } from '../../../../api/authApi';
import { saveAuthTokenToLS } from '../../../../hooks/useAuth';
import { setAuth } from '../../../../store/slices/authSlice';

type Props = {
  open: boolean;
  user: CustomerFromApi;
  handleClose: () => void;
  refetchUser: (token: string) => void;
};

export default function PasswordEditModal({ open, user, handleClose, refetchUser }: Props) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [login] = useLoginMutation();
  const [getMe] = useLazyGetMeQuery();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    validationSchema: passwordUpdateSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!accessToken) {
        enqueueSnackbar('Missing access token', { variant: 'error' });
        return;
      }

      try {
        await changePassword({ ...values, accessToken, version: user.version }).unwrap();

        const loginResult = await login({
          email: user.email,
          password: values.newPassword,
        }).unwrap();

        saveAuthTokenToLS(loginResult.access_token);

        const meResp = await getMe(loginResult.access_token).unwrap();

        dispatch(
          setAuth({
            accessToken: loginResult.access_token,
            email: meResp.email,
          }),
        );

        enqueueSnackbar('Password updated successfully', { variant: 'success' });
        resetForm();
        handleClose(); // Закрываем модалку
        refetchUser(loginResult.access_token);
      } catch (error) {
        const message =
          typeof error === 'object' &&
          error !== null &&
          'data' in error &&
          typeof error.data === 'string'
            ? error.data
            : 'Submit failed!';
        enqueueSnackbar(message, { variant: 'error' });
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    handleClose();
  };

  useEffect(() => {
    if (open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth slotProps={{ paper: { sx: { p: 3 } } }}>
      <DialogTitle>Change password</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: { xs: '1fr' },
              mt: 1,
            }}
          >
            <TextInput
              id="currentPassword"
              label="Current Password"
              type="password"
              error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
              helperText={formik.touched.currentPassword && formik.errors.currentPassword}
              value={formik.values.currentPassword}
              onInput={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <TextInput
              id="newPassword"
              label="New Password"
              type="password"
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              value={formik.values.newPassword}
              onInput={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          onClick={formik.submitForm}
          variant="contained"
          disabled={!formik.isValid || !formik.dirty || formik.isSubmitting || isLoading}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
