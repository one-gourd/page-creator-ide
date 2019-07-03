import React, { PureComponent } from 'react';
import { message } from 'antd';

import { buildWebsocket } from '../../../lib/util';
import { debugInteract } from '../../../lib/debug';

// const protocol = !!~location.protocol.indexOf('https') ? 'wss' : 'ws';
// const WS_URL = `${protocol}://${location.host}/ws/`;

const ACTIONS = {
  REQUEST_CONTROL: 'REQUEST_CONTROL', // 请求控制权
  REQUEST_RELEASE: 'REQUEST_RELEASE', // 请求释放控制权
  CONTROL: 'CONTROL', // 拥有控制权
  RELEASE: 'RELEASE' // 释放控制权
};
const MESSAGE_TYPE = {
  EDITOR_LOCK: 'EDITOR_LOCK',
  HEART: 'HEART'
};

export interface IPageLockerProps {
  onReceiveMessage?: ({ data, state }) => void;
  url?: string;
  currentUsername?: string;
  appId?: string;
  pageId?: string;
}

export default class LockPage extends PureComponent<IPageLockerProps> {
  connected: boolean;
  ws: WebSocket;
  state = {
    shouldLock: false,
    username: '',
    clientTime: ''
  };
  constructor(props) {
    super(props);
  }

  sendUserIn = (appId, pageId) => {
    const { currentUsername } = this.props;
    if (!this.connected) {
      return;
    }
    this.ws.send(
      JSON.stringify({
        type: MESSAGE_TYPE.EDITOR_LOCK,
        action: ACTIONS.REQUEST_CONTROL,
        username: currentUsername,
        appId,
        pageId,
        clientTime: new Date().getTime()
      })
    );
  };

  sendUserOut = (appId, pageId) => {
    const { currentUsername } = this.props;
    if (!this.connected) {
      return;
    }
    this.ws.send(
      JSON.stringify({
        type: MESSAGE_TYPE.EDITOR_LOCK,
        action: ACTIONS.REQUEST_RELEASE,
        username: currentUsername,
        appId,
        pageId,
        clientTime: new Date().getTime()
      })
    );
  };

  sendHeartBeat = () => {
    const { currentUsername } = this.props;
    if (!this.connected) {
      return;
    }
    const { appId, pageId } = this.props;
    this.ws.send(
      JSON.stringify({
        type: MESSAGE_TYPE.HEART,
        action: ACTIONS.REQUEST_CONTROL,
        username: currentUsername,
        appId,
        pageId,
        clientTime: new Date().getTime()
      })
    );
  };

  handleWindowClose = () => {
    const { appId, pageId } = this.props;
    this.sendUserOut(appId, pageId);
  };

  isLocked = () => {
    // return this.state.shouldLock === true;
    return true;
  };

  showLockMessage = () => {
    const { username } = this.state;
    message.info(`无法操作，当前页面正在被 ${username} 编辑`);
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleWindowClose);

    this.connected = false; // 标志位
    this.connectServer();

    // 监视链接情况，每隔半分钟
    this.watchConnect();
  }

  watchConnect = () => {
    const { url } = this.props;
    if (!url) return;

    setTimeout(() => {
      this.watchConnect();
      if (!this.connected) {
        debugInteract('[lock page] 当前页面 websocket 未链接，正在尝试重连...');
        this.connectServer({ isReconnect: true });
      }
    }, 30 * 1000);
  };

  connectServer = ({ isReconnect } = { isReconnect: false }) => {
    const { currentUsername, url, onReceiveMessage } = this.props;
    let { shouldLock: shouldLockState } = this.state;
    if (!url) return;

    this.ws = buildWebsocket(url, {
      onOpen: (evt, ws) => {
        console.log('WS CONNECTED:', isReconnect);
        this.connected = true;
        if (isReconnect) {
          debugInteract('[lock page] websocket 重连成功');
          this.sendUserIn(this.props.appId, this.props.pageId);
          debugInteract(`[lock page] 已发送 Websocket 消息`);
        }
      },
      onMessage: (evt, ws) => {
        const data = JSON.parse(evt.data);
        const { action, username, clientTime, type, appId, pageId } = data;
        if (type !== MESSAGE_TYPE.EDITOR_LOCK) {
          return;
        }
        if (action === ACTIONS.RELEASE || action === ACTIONS.CONTROL) {
          shouldLockState =
            username !== currentUsername &&
            action === ACTIONS.CONTROL &&
            appId == this.props.appId &&
            pageId == this.props.pageId;
          this.setState({
            shouldLock: shouldLockState,
            username,
            clientTime
          });
        }
        onReceiveMessage &&
          onReceiveMessage({
            data,
            state: {
              shouldLock: shouldLockState
            }
          });
        console.log('ws response:', data);
      },
      onError: () => {
        this.connected = false;
      },
      onClose: () => {
        this.connected = false;
      }
    });
  };
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleWindowClose);
  }

  // 用户更换界面的时候
  componentWillReceiveProps = nextProps => {
    debugInteract(
      `[lock page] 用户切换 page, 从 id: ${this.props.pageId} 切换到 id: ${
        nextProps.pageId
      }`
    );
    // 两者界面不一样的时候，发送请求
    if (this.props.pageId !== nextProps.pageId) {
      this.props.pageId &&
        this.sendUserOut(this.props.appId, this.props.pageId);
      nextProps.pageId && this.sendUserIn(this.props.appId, nextProps.pageId);
      debugInteract(`[lock page] 已发送 Websocket 消息`);
    }
  };

  render() {
    const { shouldLock, username, clientTime } = this.state;
    return shouldLock ? (
      <div
        style={{
          position: 'absolute',
          left: '0',
          right: '0',
          top: '65px',
          bottom: '0',
          backgroundColor: 'rgba(0,0,0, 0.7)',
          zIndex: 11,
          textAlign: 'center'
        }}
      >
        <p
          style={{
            fontSize: '20px',
            color: 'white',
            position: 'absolute',
            left: '45%',
            top: '50%'
          }}
        >
          当前页面正在被 <span style={{ color: '#04bfff' }}>{username}</span>{' '}
          编辑（编辑时间
          <span style={{ color: '#04bfff' }}>
            {' '}
            {new Date(parseInt(clientTime)).toLocaleString('zh-cn')}
          </span>
          ）
        </p>
      </div>
    ) : null;
  }
}
