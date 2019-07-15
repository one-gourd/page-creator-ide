/// <reference types="react" />
import { IBaseStyledProps } from 'ide-lib-base-component';
import { IPageCreatorProps } from './index';
interface IStyledProps extends IPageCreatorProps, IBaseStyledProps {
    style?: React.CSSProperties;
    className?: string;
    [prop: string]: any;
}
export declare const StyledContainer: import("styled-components").StyledComponent<"div", any, {
    style: import("react").CSSProperties;
} & IStyledProps, "style">;
export declare const StyledSiderContentWrap: import("styled-components").StyledComponent<"div", any, {
    style: import("react").CSSProperties;
} & IStyledProps, "style">;
export declare const StyledSwitchPanelWrap: import("styled-components").StyledComponent<"div", any, {
    style: import("react").CSSProperties;
} & IStyledProps, "style">;
export {};
