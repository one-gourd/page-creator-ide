// http://gcs.dockerlab.alipay.net/api/packages/134/components
export const URL_COMPONENT_LIST =
  'http://gcs.dockerlab.alipay.net/api/packages/134/components';

export const schema = {
  modules: [
    {
      id: '134',
      name: 'Next',
      repository: 'git@gitlab.alibaba-inc.com:gourd2/next.git',
      created_at: '2019-05-09T08:31:18.000Z',
      updated_at: '2019-05-09T08:31:18.000Z',
      versions: [
        {
          id: '8',
          packageId: '134',
          published: 0,
          created_at: '2019-05-09T09:07:49.000Z',
          updated_at: '2019-05-09T09:07:49.000Z'
        },
        {
          id: '7',
          packageId: '134',
          published: 1,
          created_at: '2019-05-09T08:31:18.000Z',
          updated_at: '2019-05-09T09:07:28.000Z'
        }
      ],
      dist: '/assets/134/8/index.js',
      url: 'http://gcs.dockerlab.alipay.net/assets/134/8/index.js'
    },
    {
      id: '189',
      name: '葫芦',
      repository: 'git@gitlab.alibaba-inc.com:gourd2/gourd-components.git',
      created_at: '2019-05-16T17:31:43.000Z',
      updated_at: '2019-05-16T17:31:43.000Z',
      versions: [
        {
          id: '12',
          packageId: '189',
          published: 0,
          created_at: '2019-05-16T17:31:43.000Z',
          updated_at: '2019-05-16T17:31:43.000Z'
        }
      ],
      dist: '/assets/189/12/index.js',
      url: 'http://gcs.dockerlab.alipay.net/assets/189/12/index.js'
    }
  ],
  layout: [
    {
      component: {
        packageId: '189',
        name: 'Slot'
      },
      id: 'layout-slot'
    }
  ],
  components: [
    {
      component: {
        packageId: 134,
        name: 'Grid.Row'
      },
      id: '$Row_B1wLZ',
      uuid: '$uu_Row_BJeaC',
      children: [
        {
          component: {
            packageId: 134,
            name: 'Grid.Col'
          },
          id: '$Col_HJlwL',
          props: {
            style: {
              marginBottom: ' 20px'
            }
          },
          uuid: '$uu_Col_ByP6C',
          children: [
            {
              component: {
                packageId: 134,
                name: 'Breadcrumb'
              },
              id: '$Breadcrumb_HymdZ',
              uuid: '$uu_Breadcrumb_B1apC',
              children: [
                {
                  component: {
                    packageId: 134,
                    name: 'Breadcrumb.Item'
                  },
                  id: '$BreadcrumbItem_B1qdb',
                  props: {
                    link: '',
                    data_text: '选品平台'
                  },
                  uuid: '$uu_BreadcrumbItem_BJLgT',
                  children: []
                },
                {
                  component: {
                    packageId: 134,
                    name: 'Breadcrumb.Item'
                  },
                  id: '$BreadcrumbItem_SJVgf',
                  props: {
                    data_text: '选商品',
                    link: ''
                  },
                  uuid: '$uu_BreadcrumbItem_Syve6',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  functions:
    "window%5B'__%24Pagination_HybSq_onChange'%5D%20%3D%20function%20handle(ev)%7B%0A%20%20%20%20%24store.%24Table_rule.fetch()%3B%0A%7D%0Awindow%5B'__%24Dialog_Skw6Z_onOk'%5D%20%3D%20function%20handle(ev)%7B%0A%20%20%20%20%24store.%24Io_save.fetch().then((data)%3D%3E%7B%0A%20%20%20%20%20%20%20%20%20const%20%7Bresult%2Csuccess%7D%20%3D%20data%3B%0A%20%20%20%20%20%20%20%20%20if(result%20%26%26%20success)%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%24store.%24Dialog_Skw6Z.visible%20%3D%20false%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20toast.success('%E8%A7%84%E5%88%99%E5%88%9B%E5%BB%BA%E6%88%90%E5%8A%9F')%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%E9%87%8D%E6%96%B0%E5%88%B7%E6%96%B0%E8%A1%A8%E6%A0%BC%E6%95%B0%E6%8D%AE%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%24store.%24Table_rule.fetch(%7Bpage%3A%201%2CruleId%3A%200%2CruleName%3A%20''%2CindustryId%3A%200%7D)%3B%0A%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D)%3B%20%0A%7D%0Awindow%5B'__%24Dialog_Skw6Z_onCancel'%5D%20%3D%20function%20()%20%7B%0A%0A%20%20%20%20%24store.%24Dialog_Skw6Z.visible%20%3D%20false%0A%7D%0Awindow%5B'__%24Dialog_Skw6Z_onClose'%5D%20%3D%20function%20()%20%7B%0A%0A%20%20%20%20%24store.%24Dialog_Skw6Z.visible%20%3D%20false%0A%7D%0Awindow%5B'__%24Io_B1ucl_fetch_success'%5D%20%3D%20function%20callback(ev)%7B%0A%20%20%20%20%20%20%20%20const%20list%20%3D%20ev.data.result.model.data%3B%0A%20%20%20%20%20%20%20%20const%20realList%20%3D%20%5B%7B%20label%3A%20'%E5%85%A8%E9%83%A8'%2C%20value%3A%200%20%7D%5D.concat(list.map((item)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20label%3A%20item.name%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%3A%20item.id%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D))%0A%20%20%20%20%20%20%20%20%24store.%24Select_industryId.dataSource%20%3D%20realList%0A%20%20%20%20%20%20%20%20%24store.%24Select_newIndustryId.dataSource%20%3D%20realList.slice(1)%0A%20%20%20%20%20%20%20%20return%20ev.data%3B%0A%7D%0Awindow%5B'__%24Button_new_onClick'%5D%20%3D%20function%20handle(ev)%7B%0A%20%20%20%20%24store.%24Input_newRuleName.value%20%3D%20''%3B%0A%20%20%20%20%24store.%24Input_newRuleDesc.value%20%3D%20%20''%3B%0A%20%20%20%20%24store.%24Hidden_ruleId.value%20%3D%20%200%3B%0A%0A%20%20%20%20%24store.%24Dialog_Skw6Z.visible%20%3D%20true%3B%0A%7D%0Awindow%5B'__%24TableColumn_rklGf_cell'%5D%20%3D%20function%20handle(value%20%2Cindex%20%2Crecord)%7B%0A%20%20%20%20return%20%3Cdiv%3E%7Bvalue%7D%3C%2Fdiv%3E%3B%0A%7D%0Awindow%5B'__%24TableColumn_ByWGG_cell'%5D%20%3D%20function%20handle(value%20%2Cindex%20%2Crecord)%7B%0A%0A%20%20function%20edit()%7B%0A%20%20%20%20%24store.%24Input_newRuleName.value%20%3D%20record.ruleName%3B%0A%20%20%20%20%24store.%24Input_newRuleDesc.value%20%3D%20%20record.ruleDesc%3B%0A%20%20%20%20%24store.%24Hidden_ruleId.value%20%3D%20%20%20record.ruleId%3B%0A%20%20%20%20%24store.%24Select_newIndustryId.value%20%3D%20%20record.industryId%3B%0A%20%20%20%20%24store.%24Dialog_Skw6Z.visible%20%3D%20true%3B%0A%20%20%7D%0A%0A%20%20return%20%3Cdiv%3E%0A%20%20%3CNext.Link%20href%3D%7B%60%2Fconsole%2Fgoods-preview%3Fid%3D%24%7Brecord.ruleId%7D%60%7D%20target%3D%22_blank%22%3E%7Bvalue%7D%3C%2FNext.Link%3E%0A%20%20%3CNext.Icon%20type%3D%22edit%22%20style%3D%7B%7BmarginLeft%3A%2010%7D%7D%20size%3D%22xs%22%20onClick%3D%7Bedit%7D%20%2F%3E%0A%20%20%3C%2Fdiv%3E%3B%20%0A%7D%0Awindow%5B'__%24TableColumn_rJLzz_cell'%5D%20%3D%20function%20handle(value%20%2Cindex%20%2Crecord)%7B%0A%0A%20%20function%20delRule()%7B%0A%20%20%20%20%24store.%24Io_del.fetch(%7BruleId%3A%20record.ruleId%7D).then((data)%3D%3E%7B%0A%20%20%20%20%20%20if(data.result%20%26%26%20data.success)%7B%0A%20%20%20%20%20%20%20%20toast.success('%E8%A7%84%E5%88%99%E5%88%A0%E9%99%A4%E6%88%90%E5%8A%9F')%3B%0A%20%20%20%20%20%20%20%20%24store.%24Table_rule.fetch()%3B%0A%20%20%20%20%20%20%7Delse%7B%0A%20%20%20%20%20%20%20%20toast.error(data.result.msg)%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D)%3B%0A%0A%20%20%7D%0A%0A%20%20function%20copyRule()%7B%0A%20%20%20%20%24store.%24Io_copy.fetch(%7BruleId%3A%20record.ruleId%7D).then((data)%3D%3E%7B%0A%20%20%20%20%20%20if(data.result%20%26%26%20data.success)%7B%0A%20%20%20%20%20%20%20%20toast.success('%E8%A7%84%E5%88%99%E5%A4%8D%E5%88%B6%E6%88%90%E5%8A%9F')%3B%0A%20%20%20%20%20%20%20%20%24store.%24Table_rule.fetch(%7Bpage%3A%201%7D)%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D)%3B%0A%20%20%7D%0A%0A%0A%20%20return%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%3CNext.Button%20size%3D%22small%22%20onClick%3D%7BcopyRule%7D%20style%3D%7B%7BmarginRight%3A%2010%7D%7D%3E%E5%A4%8D%E5%88%B6%3C%2FNext.Button%3E%0A%20%20%20%20%20%20%20%20%3CNext.Button%20size%3D%22small%22%20component%3D%22a%22%20href%3D%7B%24gourd.getLink(%60%2Fconsole%2Fselection%3Fid%3D%24%7Brecord.ruleId%7D%60)%7D%20type%3D%22primary%22%20%20style%3D%7B%7BmarginRight%3A%2010%7D%7D%3E%E7%BC%96%E8%BE%91%3C%2FNext.Button%3E%0A%20%20%20%20%20%20%20%20%7Brecord.optNick%20%3D%3D%3D%20%24store.global.user.nick%20%3F%3CNext.BalloonConfirm%0A%20%20%20%20%20%20%20%20%20%20onConfirm%3D%7BdelRule%7D%0A%20%20%20%20%20%20%20%20%20%20title%3D%22%E7%9C%9F%E7%9A%84%E8%A6%81%E5%88%A0%E9%99%A4%E5%90%97%E4%BA%B2%22%0A%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20%3CNext.Button%20size%3D%22small%22%20shape%3D%22warning%22%3E%E5%88%A0%E9%99%A4%3C%2FNext.Button%3E%0A%20%20%20%20%20%20%20%20%3C%2FNext.BalloonConfirm%3E%20%20%3A%20null%7D%0A%20%20%3C%2Fdiv%3E%3B%0A%7D%0Awindow%5B'__%24Button_query_onClick'%5D%20%3D%20function%20handle(ev)%7B%0A%20%20%20%20%24store.%24Table_rule.fetch(%7Bpage%3A%201%7D)%3B%0A%7D%0A"
};
