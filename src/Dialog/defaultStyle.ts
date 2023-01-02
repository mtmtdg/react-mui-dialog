import { SxProps, Theme } from '@mui/material';
export const defaultPaperStyle: SxProps<Theme> = {
  minWidth: '400px',
  // minHeight: '200px',
};

export const lighterBackdrop: SxProps<Theme> = { '& .MuiBackdrop-root': { backgroundColor: 'rgba(0,0,0, 0.32)' } };
