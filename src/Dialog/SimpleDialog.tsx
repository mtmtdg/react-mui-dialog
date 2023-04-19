import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useCallback, useState } from 'react';
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

  // 为防止双击按钮时多次执行,或快速先点cancel再点action时多次执行
  // 不要改为自定义hook,useOnce(() => {...}), [useOnce内部管理函数执行状态]的方式
  // 因为两个按钮需要共享open状态
  const cancel = useCallback(() => {
    if (!open) return;
    setOpen(false);

    dismiss();
  }, [open]);
  const accept = useCallback(() => {
    if (!open) return;
    setOpen(false);

    onOk && onOk();
    dismiss();
  });

  return (
    <Dialog open={open} sx={lighterBackdrop} PaperProps={{ sx: defaultPaperStyle }}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>

      <DialogActions>
        {type === 'confirm' && (
          <Button color="inherit" onClick={cancel}>
            cancel
          </Button>
        )}

        <Button color={okColor} onClick={accept}>
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
