import { SxProps, Theme } from '@mui/material';
import { useState } from 'react';
import { defaultPaperStyle } from './defaultStyle';

// 3) interface仅仅是为了适应下面数据结构的需要
export interface CustomDialogProps {
  data?: any; // 为了外界传入数据
  _dismiss?: () => void;
  onClose?: (value?: any) => void; // 关闭时函数,带数据时有数据,不带则数据为undefined
  // 用户使用sx为入口进行配置,实质上配置的是dialog的下面的Paper
  // mui自己的dialog上的sx,与dialog上的fullWidth,maxWidth等等严重不正交
  // 因此不再使用 & DialogProps 的方式使用sx
  // 如果非要使用,可以是 & Omit<DialogProps, keyof {open: boolean}>的方式过滤掉DialogProps中不想暴露出来的open属性
  sx?: SxProps<Theme>;
}

// 2) hook是为了防止用户意识不到要使用dismiss
//    同时将其他open,onClose等逻辑封装
export function useCustomDialog(props: CustomDialogProps) {
  const { data, _dismiss: dismiss, onClose, sx } = props;
  const [isOpen, setIsOpen] = useState(true);

  const close = (data?: any) => {
    setIsOpen(false);
    onClose?.(data);
    dismiss?.();
  };

  // Paper的默认配置由外部独立文件给出
  const paperSx = { ...defaultPaperStyle, ...sx };

  return { data, isOpen, close, paperSx };
}
