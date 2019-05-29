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
        packageId: 189,
        name: 'Iterator'
      },
      id: 'Iterator1',
      props: {
        dataSource: [
          { text: '1' },
          { text: '222' },
          { text: '3' },
          { text: '4' }
        ]
      },
      children: [
        {
          component: {
            packageId: 134,
            name: 'Button'
          },
          id: '$button1',
          props: {
            children: '{{$scope.text}}',
            onClick: '{{$button1_onClick}}'
          }
        }
      ]
    }
  ],
  functions:
    "window%5B'%24button1_onClick'%5D%20%3D%20function%20handle(ev)%7B%0A%20%20%20%20%20%20%20%20alert('I%20%E6%8C%89%E6%91%A9%20click')%0A%20%20%20%20%20%20%7D"
};
