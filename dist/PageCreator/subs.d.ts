import { ValueOf } from 'ide-lib-base-component';
import { IComponentConfig } from 'ide-lib-engine';
import { IHeaderBarProps } from 'ide-header-bar';
import { IComponentTreeProps } from 'ide-component-tree';
import { ISwitchPanelProps } from 'ide-switch-panel';
export interface ISubProps {
    headerBar?: IHeaderBarProps;
    componentTree?: IComponentTreeProps;
    switchPanel?: ISwitchPanelProps;
}
export declare const subComponents: Record<keyof ISubProps, IComponentConfig<ValueOf<ISubProps>, any>>;
