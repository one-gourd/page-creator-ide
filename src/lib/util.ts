export function addScript(url:string) {
    var $script = document.createElement('script');
    $script.setAttribute('src', 'url');
    document.head.appendChild($script);
}