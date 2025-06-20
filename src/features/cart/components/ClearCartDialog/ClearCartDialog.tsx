import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

type ClearCartDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export default function ClearCartDialog({
  open,
  onClose,
  onConfirm,
  isLoading = false,
}: ClearCartDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      slotProps={{ paper: { sx: { p: 3 } } }}
      aria-labelledby="confirm-clear-dialog-title"
      aria-describedby="confirm-clear-dialog-description"
    >
      <DialogTitle id="confirm-clear-dialog-title">Clear Your Cart?</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-clear-dialog-description">
          Are you sure you want to delete all stickers from your cart? <br /> This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
        }}
      >
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={isLoading}>
          {isLoading ? 'Clearing...' : 'Clear Cart'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
