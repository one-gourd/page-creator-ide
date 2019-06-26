import { IIconButtons, IIconText } from 'ide-header-bar';
import { savePageByClient } from '../../util';
import { PAGE_DATA, URL_HISTORY } from '../../constant';
export const initHeaderBarProps = client => {
  return {
    // 点击保存按钮后，保存当前页面
    onClickButton: (button: IIconButtons) => {
      console.log('[headerBar] button click: ', button);
      savePageByClient(client);
    },
    onClickIconText: async (iconText: IIconText) => {
      console.log('[headerBar] icon click: ', iconText);
      const { id } = iconText;

      // 点击渲染历史列表
      if (id === 'history') {
        client.put('/model', {
          name: 'historyList',
          value: {
            visible: true,
            url: URL_HISTORY,
            params: {
              pageSize: 5,
              _tb_token_: PAGE_DATA.token
            }
          }
        });
      }
    },
    iconTexts: [
      {
        title: '选取元素',
        icon: 'select',
        id: 'selection'
      },
      {
        title: '返回应用',
        icon: 'arrow-left',
        id: 'back-to-app'
      },
      {
        title: '全屏',
        icon: 'scan',
        id: 'fullscreen'
      },
      {
        title: '预览页面',
        icon: 'eye',
        id: 'preview'
      },
      {
        title: '历史记录',
        icon: 'clock-circle',
        id: 'history'
      }
    ]
  };
};
