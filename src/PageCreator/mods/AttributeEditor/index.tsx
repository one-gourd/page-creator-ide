import React, { useCallback, useReducer, useState, useEffect } from 'react';

import { PropsEditor, IPropsEditorProps, schemaType } from 'ide-props-editor';
import { observer } from 'mobx-react-lite';

/**
 * 根据属性自定义使用的编辑器
 * @param propSchema
 * @param editors
 * @returns {any}
 */
function useEditor(propSchema: any, editors: any): any {
  const { type } = propSchema;
  let Editor;
  return null;
}

const editorProps: any = {
  visible: true,
  // schema: schema,
  // formData: formData,
  useEditor: useEditor,
  editorExtraParam: {
    key: 'key',
    //用于 id 是否唯一的判断
    keys: ['$Button_123'],
    // $store: $store,
    fnNameRule: '__$comId_$fnName'
  }
};

function reducer(state: any, action: any) {
  return Object.assign({}, action.formData);
}

export interface IAttributeEditorProps {
  clientFnSets?: any;
  pageStore?: any;
  formData?: any;
  schema?: any;
  onChange?: any;
}

export const AttributeEditor: React.FunctionComponent<
  IAttributeEditorProps
> = observer(props => {
  const { onChange, formData } = props;
  const [state, dispatch] = useReducer(reducer, formData);
  const handleChange = useCallback(
    (ev: any) => {
      dispatch({ type: 'change', formData: ev.formData });
      onChange && onChange(state);
    },
    [onChange]
  );
  editorProps.editorExtraParam.clientFnSets = props.clientFnSets;
  editorProps.editorExtraParam.$store = props.pageStore;
  editorProps.formData = formData;
  editorProps.schema = props.schema;

  return <PropsEditor {...editorProps} onChange={handleChange} />;
});
