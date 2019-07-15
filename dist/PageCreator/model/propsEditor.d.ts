import { Instance, IAnyModelType, SnapshotOrInstance } from 'mobx-state-tree';
/**
 * 属性编辑器 model
 */
export declare const PropsEditorModel: IAnyModelType;
export interface IPropsEditorModel extends Instance<typeof PropsEditorModel> {
}
export interface IPropsEditorModelSnapshot extends SnapshotOrInstance<typeof PropsEditorModel> {
}
export declare const CONTROLLED_KEYS_PROPSEDITOR: string[];
