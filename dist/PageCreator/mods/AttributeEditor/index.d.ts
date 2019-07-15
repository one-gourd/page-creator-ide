import React from 'react';
import { IPropsEditorProps } from 'ide-props-editor';
export interface IAttributeEditorProps {
    clientFnSets?: IPropsEditorProps['editorExtraParam']['clientFnSets'];
    pageStore?: IPropsEditorProps['editorExtraParam']['$store'];
    formData?: any;
    schema?: Partial<IPropsEditorProps['schema']>;
    onChange?: any;
    onCallFnEditor?: IPropsEditorProps['editorExtraParam']['onCallFnEditor'];
    varNameWrapper?: IPropsEditorProps['editorExtraParam']['varNameWrapper'];
}
export declare const AttributeEditor: React.FunctionComponent<IAttributeEditorProps>;
