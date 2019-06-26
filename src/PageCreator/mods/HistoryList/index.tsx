import React, { useEffect, useCallback, useRef, useState } from 'react';
import { Timeline, Button, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { IBaseComponentProps } from 'ide-lib-base-component';

import { StyledHeader, StyledBody } from './styles';

import { useDataApi } from '../../../lib/useDataFetch';

interface IListItem {
  name: string;
  id: string;
  draftUrl: string;
  created_at: string;
  modifier: string;
}

export interface IHistoryListEvents {
  /**
   * 点击弹层关闭按钮
   */
  onCancelModal?: () => void;

  /**
   * formatter
   */
  formatter?: (data: any) => any;

  /**
   * formatter
   */
  onRollback?: (id: string, time: string) => void;
}
export interface IHistoryListProps
  extends IBaseComponentProps,
    IHistoryListEvents {
  /**
   * 是否展现
   */
  visible?: boolean;

  /**
   * history Url 接口
   */
  url?: string;

  /**
   * history Url 接口 params
   */
  params?: object;
}

export const HistoryList: React.FunctionComponent<IHistoryListProps> = observer(
  props => {
    const {
      visible,
      url = '',
      params = {},
      onCancelModal,
      formatter,
      onRollback
    } = props;

    const { doFetch, updateParams, data } = useDataApi(
      url,
      params,
      {},
      { formatter: formatter }
    );

    // const listRef = useRef([]);
    const pageRef = useRef(1);
    const [list, setList] = useState([]);

    const { rows = [], count = -1 } = data;

    const hasMore = count < 0 || count > list.length;

    // 按钮：加载更多
    const onClickMore = () => {
      if (hasMore) {
        updateParams({ page: pageRef.current++ });
        setList(list.concat(rows));
      }
    };

    // 按钮：回滚
    const onClickRollback = useCallback(
      (id, time) => () => {
        onRollback && onRollback(id, time);
      },
      []
    );

    useEffect(() => {
      doFetch(url);
    }, [url]);

    // 因为 list 的内容是延迟一步的，所以需要手动 concat 一下
    const resultList = list.concat(rows);

    const loadMore = hasMore ? (
      <div
        key="load-more"
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px'
        }}
      >
        <Button onClick={onClickMore}>加载更多...</Button>
      </div>
    ) : null;

    return (
      <Modal
        visible={visible}
        title={'请选择要回滚的历史页面'}
        width={700}
        footer={null}
        onCancel={onCancelModal}
      >
        <StyledHeader>
          本页有 <span style={{ color: '#f04134' }}>{count}</span> 条历史记录：
        </StyledHeader>

        <StyledBody>
          <Timeline>
            {resultList.map((item: IListItem, idx) => {
              const { name, id, created_at, modifier, draftUrl } = item;
              const time = new Date(created_at).toLocaleString('zh-Hans');
              return (
                <Timeline.Item key={id}>
                  <span style={{ fontWeight: 'bold' }}>{idx + 1}. </span>
                  {time} - by {modifier}
                  （页面名: {name}）
                  <div style={{ float: 'right', marginRight: '16px' }}>
                    {idx !== 0 ? (
                      [
                        <a href={draftUrl} target="_blank">
                          预览
                        </a>,
                        <span> | </span>,
                        <a href="javascript:void(0);" onClick={onClickRollback(id, time)}>
                          回滚至此
                        </a>
                      ]
                    ) : (
                      <span>[最新状态]</span>
                    )}
                  </div>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </StyledBody>
        {loadMore}
      </Modal>
    );
  }
);
