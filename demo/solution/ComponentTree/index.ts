export * from './contextMenu';
export * from './schemaTree';
export * from './comList';

import { onSelectNode, schemaModelChange } from './schemaTree';
import { onClickMenuItem } from './contextMenu';
import { onSelectListItem } from './comList';

export const initComponentTreeProps = client => {
  return {
    schemaTree: {
      onSelectNode: onSelectNode(client),
      onModelChange: schemaModelChange(client)
    },
    contextMenu: { cWidth: 200,onClickItem: onClickMenuItem(client) },
    comList: {
      onSelectItem: onSelectListItem(client)
    }
  };
};
