export declare function addScript(url: string): void;
export declare const buildWebsocket: (url: any, { onOpen, onMessage, onClose, onError }: {
    onOpen?: (evt: any, websocket: any) => void;
    onMessage?: (evt: any, websocket: any) => void;
    onClose?: (evt: any, websocket: any) => void;
    onError?: (evt: any, websocket: any) => void;
}) => WebSocket;
