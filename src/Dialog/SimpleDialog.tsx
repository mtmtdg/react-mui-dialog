import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { defaultPaperStyle, lighterBackdrop } from './defaultStyle';

export interface SimpleDialogProps {
  title: string;
  onOk?: () => void;
  description?: string;
  okColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  okText?: string;
}

export function SimpleDialog({
  type,
  dismiss,
  title,
  onOk,
  description,
  okColor = 'warning',
  okText = 'ok',
}: SimpleDialogProps & { type: 'confirm' | 'alert'; dismiss: () => void }) {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} sx={lighterBackdrop} PaperProps={{ sx: defaultPaperStyle }}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>

      <DialogActions>
        {type === 'confirm' && (
          <Button
            color="inherit"
            onClick={() => {
              setOpen(false);
              dismiss();
            }}
          >
            cancel
          </Button>
        )}

        <Button
          color={okColor}
          onClick={() => {
            setOpen(false);
            onOk && onOk();
            dismiss();
          }}
        >
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
