import AutoQueue, { QUEUE_OPERATION } from 'ss-auto-queue';
import { debugInteract } from '../../../lib/debug';

import LockPage from './index';

export interface IAutoSaveValue {
  from: string;
  pageLocker?: React.RefObject<LockPage>;
}

const autoHeartBeatQueue = new AutoQueue<IAutoSaveValue>(
  ({ type, value }) => {
    const from = value && value.from;
    const pageLocker = value && value.pageLocker;
    // 出队的时候，执行任务
        if (type === QUEUE_OPERATION.DE && pageLocker &&
            !pageLocker.current.isLocked()) {
            debugInteract(`[autoheartbeat] 来自 ${from} 的更改，自动发送心跳；`);
            pageLocker.current.sendHeartBeat(); // 触发心跳发送
    }
  }
);

export const autoHeartBeat = function(value: IAutoSaveValue) {
  autoHeartBeatQueue.enqueue(value);
};
