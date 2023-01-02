import { SxProps, Theme } from "@mui/material";
import { cloneElement, ReactElement } from "react";
import { createRoot, Root } from "react-dom/client";
import { lighterBackdrop } from "./defaultStyle";
import { SimpleDialog, SimpleDialogProps } from "./SimpleDialog";
import { CustomDialogProps } from "./useCustomDialog";

// 先建一个dialog相关的容器
const dialogContainerDiv = document.createElement("div");
document.body.appendChild(dialogContainerDiv);

function createPlace(): { place: Root; dismiss: () => void } {
  const div = document.createElement("div");
  dialogContainerDiv.appendChild(div);

  const place = createRoot(div);
  const dismiss = () => dialogContainerDiv.removeChild(div);

  return { place, dismiss };
}

function confirm(option: SimpleDialogProps) {
  // 每个函数的功能是,新建一个div,然后在这个新div中渲染组件
  // (因为组件默认打开,若在旧的div上渲染,会发现上一个渲染好的被复用,状态是关闭)
  const { place, dismiss } = createPlace();
  place.render(<SimpleDialog type="confirm" dismiss={dismiss} {...option} />);
}

// 共用同样的参数类型
function alert(option: SimpleDialogProps) {
  const { place, dismiss } = createPlace();
  place.render(<SimpleDialog type="alert" dismiss={dismiss} {...option} />);
}

function custom(rendered: ReactElement<CustomDialogProps>, config?: any) {
  const { place, dismiss } = createPlace();
  const newSx = rendered.props.sx
    ? ({ ...rendered.props.sx, ...lighterBackdrop } as SxProps<Theme>)
    : lighterBackdrop;

  // 1) clone是为了提供用户无法提供的dismiss函数
  place.render(cloneElement(rendered, { _dismiss: dismiss, sx: newSx }));
}

export const DialogService = {
  confirm,
  alert,
  custom,
};

export * from "./useCustomDialog";
