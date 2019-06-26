import * as React from 'react';
import { render } from 'react-dom';

import { PageCreatorFactory } from '../src/';

import { initComponentTreeProps } from './solution/ComponentTree/';

import { initSwitchPanelProps } from './solution/SwitchPanel';
import { initPropsEditorProps } from './solution/PropsEditor';
import { initHeaderBarProps } from './solution/HeaderBar';
import { initHistoryList } from './solution/HistoryList';
import { initPageCreator } from './solution';

const {
  ComponentWithStore: PageCreatorWithStore,
  client,
  innerApps
} = PageCreatorFactory();

// const propsEditor = {
//   formData: formData,
//   schema: propsSchema,
//   pageStore: pageStore
// };

render(
  <PageCreatorWithStore
    // propsEditor={propsEditor}
    headerBar={initHeaderBarProps(client)}
    propsEditorExtra={initPropsEditorProps(client, innerApps)}
    componentTree={initComponentTreeProps(client)}
    switchPanel={initSwitchPanelProps(client)}
    historyList={initHistoryList(client)}
  />,
  document.getElementById('example') as HTMLElement
);

initPageCreator(client, innerApps);
