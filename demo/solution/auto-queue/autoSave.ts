import AutoQueue, { QUEUE_OPERATION } from 'ss-auto-queue';
import { debugInteract } from '../../../src/lib/debug';

export interface IAutoSaveValue {
  from: string;
  action: () => void;
}

const autoSaveQueue = new AutoQueue<IAutoSaveValue>(
  ({ type, value, queue }) => {
    const from = value && value.from;
    // 出队的时候，执行任务
    if (type === QUEUE_OPERATION.DE) {
      const action = value && value.action;
      debugInteract(
        `[autosave] 来自 ${from} 的更改，触发自动保存；被忽略队列：%o`,
        queue.queue.toArray()
      );
      action && action();
    }
  }
);

export const autoSave = function(value: IAutoSaveValue) {
  autoSaveQueue.enqueue(value);
};
