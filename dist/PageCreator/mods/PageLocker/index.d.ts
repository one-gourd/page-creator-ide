import { PureComponent } from 'react';
export interface IPageLockerProps {
    onReceiveMessage?: ({ data, state }: {
        data: any;
        state: any;
    }) => void;
    url?: string;
    currentUsername?: string;
    appId?: string;
    pageId?: string;
}
export default class LockPage extends PureComponent<IPageLockerProps> {
    connected: boolean;
    ws: WebSocket;
    state: {
        shouldLock: boolean;
        username: string;
        clientTime: string;
    };
    constructor(props: any);
    sendUserIn: (appId: any, pageId: any) => void;
    sendUserOut: (appId: any, pageId: any) => void;
    sendHeartBeat: () => void;
    handleWindowClose: () => void;
    isLocked: () => boolean;
    showLockMessage: () => void;
    componentDidMount(): void;
    watchConnect: () => void;
    connectServer: ({ isReconnect }?: {
        isReconnect: boolean;
    }) => void;
    componentWillUnmount(): void;
    componentWillReceiveProps: (nextProps: any) => void;
    render(): JSX.Element;
}
