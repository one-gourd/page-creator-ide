import { IBaseTheme, IBaseComponentProps } from 'ide-lib-base-component';
import { TComponentCurrying } from 'ide-lib-engine';
import { ISubProps } from './subs';
import { IAttributeEditorProps } from './mods/AttributeEditor';
import { IHistoryListProps } from './mods/HistoryList/index';
import { IPageLockerProps } from './mods/PageLocker';
export interface IPageCreatorEvent {
}
export interface IPageCreatorTheme extends IBaseTheme {
    main: string;
    bgColor: string;
}
export interface IPageCreatorProps extends IPageCreatorEvent, ISubProps, IBaseComponentProps {
    /**
     * 属性编辑器（可 model）
     */
    propsEditor?: IAttributeEditorProps;
    /**
     * 属性编辑器（非 Model）
     */
    propsEditorExtra?: IAttributeEditorProps;
    /**
     * 历史列表 modal
     */
    historyList?: IHistoryListProps;
    /**
     * 是否开启页面保护
     */
    pageLocker?: IPageLockerProps;
}
export declare const DEFAULT_PROPS: IPageCreatorProps;
export declare const PageCreatorCurrying: TComponentCurrying<IPageCreatorProps, ISubProps>;
