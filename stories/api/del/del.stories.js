import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col, Input, Button } from 'antd';

import { wInfo } from '../../../.storybook/utils';
import mdDel from './del.md';

import { PageCreatorFactory } from '../../../src';
import { modelPropsGen } from '../../helper';

const {
  PageCreatorWithStore: PageCreatorWithStore1,
  client: client1
} = PageCreatorFactory();

const styles = {
  demoWrap: {
    display: 'flex',
    'flexDirection': 'column',
    width: '100%'
  }
};

const createNew = client => () => {
  const model = modelPropsGen();
  client.post('/model', { model: model });
};

const resetSchema = client => () => {
  client.del('/model');
}

function onClick(value) {
  console.log('当前值：', value);
}

storiesOf('API - del', module)
  .addParameters(wInfo(mdDel))
  .addWithJSX('/model 重置', () => {
    return (
      <Row style={styles.demoWrap}>

        <Row type="flex" justify="space-between" align="top">        
          <Col span={10} offset={2}>
            <Row>
              <Col span={20}>
                <Button onClick={resetSchema(client1)}>重置</Button>
                <Button onClick={createNew(client1)}>随机创建</Button>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <div id="info" />
          </Col>
        </Row>

        <Col span={24}>
          <PageCreatorWithStore1 onClick={onClick} />
        </Col>
      </Row>
    );
  });
