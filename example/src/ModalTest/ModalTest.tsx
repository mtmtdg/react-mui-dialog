import { Button } from '@mui/material';
import { DialogService } from 'react-mui-dialog';
import XEditPanel from './XEditPanel';

interface ModalTestProps {}

export default function ModalTest(props: ModalTestProps) {
  // 使用confirm,需先定义好confirm后如何做
  const confirmed = () => {
    console.log('confirmed');
  };

  // 然后开始定义弹出confirm窗口前的操作
  const openConfirm = () => {
    // ...其他操作(若有)
    // 最后弹出窗口
    DialogService.confirm({ title: 'A Confirm', onOk: confirmed });
  };

  // 使用alert,目前比较简单,只要想好title或description是什么就行
  const openAlert = () => {
    DialogService.alert({ title: 'An Alert' });
  };

  // 打开自定义界面前,也需要先想好要用关闭后得到的数据做什么
  // 但为了可维护性(减少起名冲突),建议使用匿名函数
  const openCustom = () => {
    DialogService.custom(<XEditPanel data={{ x: 'Data here' }} onClose={value => console.log('result is:', value)} />);
  };

  return (
    <>
      <Button onClick={openConfirm}>confirm</Button>

      <Button onClick={openAlert}>alert</Button>

      <Button onClick={openCustom}>custom</Button>

      <Button
        onClick={() => {
          // 这个不带数据,注意观察
          DialogService.custom(<XEditPanel onClose={data => console.log(data)} />);
          openConfirm();
          openAlert();
        }}
      >
        multi
      </Button>
    </>
  );
}
