export function addScript(url: string) {
  var $script = document.createElement('script');
  $script.setAttribute('src', 'url');
  document.head.appendChild($script);
}

const emptyFunction = function(evt, websocket) {};
export const buildWebsocket = (
  url,
  {
    onOpen = emptyFunction,
    onMessage = emptyFunction,
    onClose = emptyFunction,
    onError = emptyFunction
  }
) => {
  const websocket = new WebSocket(url);
  websocket.onopen = function(evt) {
    onOpen(evt, websocket);
  };
  websocket.onclose = function(evt) {
    onClose(evt, websocket);
  };
  websocket.onmessage = function(evt) {
    onMessage(evt, websocket);
  };
  websocket.onerror = function(evt) {
    onError(evt, websocket);
  };

  return websocket;
};
