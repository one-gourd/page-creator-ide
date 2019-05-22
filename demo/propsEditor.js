export const propsSchema = {
  //   group: [
  //     {
  //       name: 'base',
  //       defaultOpen: true,
  //       title: '基础属性2',
  //       properties: [
  //         'key',
  //         'children',
  //         'size',
  //         'loading',
  //         'shap',
  //         'width',
  //         'dataSource',
  //         'labelProp'
  //       ]
  //     },
  //     {
  //       name: 'event',
  //       defaultOpen: true,
  //       title: '事件',
  //       properties: ['onChange']
  //     }
  //   ],
//   properties: {
//     key: {
//       type: 'id',
//       title: '唯一 id'
//     },
//     cell: {
//       type: 'any',
//       comment: 'jsx | any | function',
//       title: 'cell'
//     },
//     lock: {
//       type: 'any',
//       comment: 'boolean | string',
//       title: 'lock'
//     },
//     align: {
//       enum: ['left', 'center', 'right'],
//       type: 'enum',
//       title: 'align'
//     },
//     title: {
//       type: 'any',
//       comment: 'jsx | any | function',
//       title: 'title'
//     },
//     width: {
//       type: 'any',
//       comment: 'number | string',
//       title: 'width'
//     },
//     filters: {
//       type: 'array',
//       comment: {
//         type: 'any'
//       },
//       title: 'filters'
//     },
//     sortable: {
//       type: 'boolean',
//       title: 'sortable'
//     },
//     dataIndex: {
//       type: 'string',
//       title: 'dataIndex'
//     },
//     resizable: {
//       type: 'boolean',
//       title: 'resizable'
//     },
//     filterMode: {
//       enum: ['single', 'multiple'],
//       type: 'enum',
//       title: 'filterMode'
//     },
//     alignHeader: {
//       enum: ['left', 'center', 'right'],
//       type: 'enum',
//       title: 'alignHeader'
//     }
//   }
    properties: {
      key: {
        type: 'id',
        title: '唯一 id',
      },
      children: {
        type: 'string',
        title: '文案'
      },
      size: {
        type: 'enum',
        title: '大小',
        enum: ['small', 'medium', 'large']
      },
      shap: {
        type: 'enum',
        title: '形状',
        enum: ['small', 'large']
      },
      loading: {
        type: 'boolean',
        title: '载入状态'
      },
      width: {
        type: 'number',
        title: '宽度'
      },
      dataSource: {
        type: 'array',
        title: '数据源',
        items: {
          type: 'object',
          properties: {
            label: {
              title: '文本',
              type: 'string'
            },
            value: {
              title: '值',
              type: 'string'
            }
          }
        }
      },
      labelProp: {
        type: 'object',
        title: '对象属性',
        properties: {
          children: {
            type: 'string',
            title: '文案'
          },
          size: {
            type: 'enum',
            title: '大小',
            enum: ['small', 'medium', 'large']
          }
        }
      },
      onChange: {
        type: 'function',
        title: '值改变后'
      }
    }
};

export const formData = {
  key: '$TableColumn_rklGf',
  uuid: '$TableColumn_rklGf',
  dataIndex: 'ruleId',
  title: '规则 id',
  width: 140,
  cell: '__$TableColumn_rklGf_cell'
};

//mbox 的 store ，用于变量输入框的自动提示
export const pageStore = {
  $Button_999: {
    children: '按钮测试',
    loading: true,
    size: 'medium',
    key: '$Button_999'
  },
  a: {
    loading: false
  }
};
