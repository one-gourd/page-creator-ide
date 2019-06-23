import { IIconButtons } from 'ide-header-bar';
import { savePageByClient } from '../../util';
export const initHeaderBarProps = client => {
  return {
    // 点击保存按钮后，保存当前页面
    onClickButton: (button: IIconButtons) => {
      console.log('[headerBar] button click: ', button);
      savePageByClient(client);
    },
    iconTexts: []
  };
};
