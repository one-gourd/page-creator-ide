import * as React from 'react';
import { render } from 'react-dom';
import { PageCreator, IPageCreatorProps } from '../src/';

function onClick(value) {
  console.log('当前点击：', value);
}

const props: IPageCreatorProps = {
  visible: true
}

render(<PageCreator {...props} onClick={onClick} />, document.getElementById(
  'example'
) as HTMLElement);