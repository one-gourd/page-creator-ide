import { Modal, message } from 'antd';

import { WS_URL, appId, pageId, PAGE_DATA } from '../../constant';
const CURRENT_USERNAME = PAGE_DATA.user && PAGE_DATA.user.nick;

export const initPageLocker = client => {
  return {
    url: WS_URL,
    appId,
    pageId,
    currentUsername: CURRENT_USERNAME,
    onReceiveMessage: ({ state }) => {
      const { shouldLock } = state;
      // 存储状态值
      client.put('/model/cstate', {
        name: 'pageIsLocked',
        value: shouldLock
      });
    }
  };
};
