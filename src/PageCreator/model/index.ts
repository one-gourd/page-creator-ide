import { IAnyModelType } from 'mobx-state-tree';
import { capitalize } from 'ide-lib-utils';
export * from './propsEditor';

import { CONTROLLED_KEYS_PROPSEDITOR, PropsEditorModel } from './propsEditor';
export const otherControlledKeyMap = {
  propsEditor: CONTROLLED_KEYS_PROPSEDITOR,
  historyList: ['visible', 'url', 'params'],
  pageLocker: ['url', 'appId', 'pageId', 'currentUsername']
};

export const modelExtends = (model: IAnyModelType) => {
  return model.actions(self => {
    return {
      setPropsEditor: (obj: any) => {
        self.propsEditor = PropsEditorModel.create({});
        for (const propName in obj) {
          if (obj.hasOwnProperty(propName)) {
            const fnName = `set${capitalize(propName)}`;
            if (self.propsEditor[fnName]) {
              self.propsEditor[fnName](obj[propName]);
            }
          }
        }
        // console.log(444, self.propsEditor.formData, self.propsEditor.schema);
      }
    };
  });
};

export const mergeRule = {
  propsEditor: { level: 1 },
  historyList: { level: 1 },
  pageLocker: { level: 1 }
};
