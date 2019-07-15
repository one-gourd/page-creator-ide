/// <reference types="react" />
import { IBaseStyledProps } from 'ide-lib-base-component';
import { ISiderButtonProps } from './index';
interface IStyledProps extends ISiderButtonProps, IBaseStyledProps {
}
export declare const StyledButtonWrap: import("styled-components").StyledComponent<"div", any, {
    style: import("react").CSSProperties;
} & IStyledProps, "style">;
export declare const StyledIconWrap: import("styled-components").StyledComponent<"div", any, {
    style: import("react").CSSProperties;
} & IStyledProps, "style">;
export {};
