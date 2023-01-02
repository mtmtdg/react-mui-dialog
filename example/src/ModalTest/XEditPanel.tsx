import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { CustomDialogProps, useCustomDialog } from 'react-mui-dialog';

export default function XEditPanel(props: CustomDialogProps) {
  // 使用时必须要导出 data数据,close方法
  // isOpen没有办法,mui的可读性问题很大,但依然不得不使用
  // paperSx则是为了继承最小宽度等默认样式
  // backdrop的色彩,是在克隆时设置sx搞定的
  const { data, isOpen, close, paperSx } = useCustomDialog(props);
  const [rValue, setRValue] = useState<string | undefined>('zero');

  return (
    <Dialog open={isOpen} PaperProps={{ sx: paperSx }}>
      <DialogTitle>my dialog</DialogTitle>

      <DialogContent>
        <DialogContentText>description: {data?.x}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="inherit" onClick={_event => close()}>
          cancel
        </Button>

        <Button color="warning" onClick={_event => close(rValue)}>
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
