import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col, Input, Button, Select } from 'antd';
import { wInfo } from '../../../.storybook/utils';
import mdPut from './put.md';

import { PageCreatorFactory } from '../../../src';
import { modelPropsGen } from '../../helper';

const { PageCreatorWithStore, client } = PageCreatorFactory();

const { Option } = Select;
const styles = {
  demoWrap: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }
};

let selectedAttrName = '';

const createNew = client => () => {
  const model = modelPropsGen();
  client.post('/model', { model: model });
};

function onClick(value) {
  console.log('当前点击值：', value);
}

function handleChange(value) {
  console.log(`selected ${value}`);
  selectedAttrName = value;
}


function updateAttr() {
  if (!selectedAttrName) {
    document.getElementById('info').innerText = '请选择要更改的属性';
    return;
  }

  const value = document.getElementById('targeValue').value;

  // 更新节点属性，返回更新后的数值
  client
    .put(`/model`, { name: selectedAttrName, value: value })
    .then(res => {
      const { status, body } = res;
      if (status === 200) {
        client.get(`/model`).then(res => {
          const { status, body } = res;
          if (status === 200) {
            const attributes = body.attributes || {};
            document.getElementById('info').innerText =
              `更新操作：; \n` + JSON.stringify(attributes, null, 4);
          }
        });
      }
    })
    .catch(err => {
      document.getElementById('info').innerText =
        `更新失败： \n` + JSON.stringify(err, null, 4);
    });
}

storiesOf('API - put', module)
  .addParameters(wInfo(mdPut))
  .addWithJSX('/model 更改属性', () => {
    return (
      <Row style={styles.demoWrap}>
        <Row type="flex" justify="space-between" align="top"> 
          <Col span={10} offset={2}>
            <Row>
              <Col span={6}>
                <Select
                  style={{ width: 200 }}
                  onChange={handleChange}
                  placeholder="要更改的属性"
                >
                  <Option value="visible">visible</Option>
                  <Option value="text">text</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Input placeholder="新属性值" id="targeValue" />
              </Col>
              <Col span={10}>
                <Button onClick={updateAttr}>更改信息</Button>
                <Button onClick={createNew(client)}>随机创建</Button>
              </Col>
            </Row>

          </Col>
          <Col span={12}>
            <div id="info" />
          </Col>
        
        </Row>

        <Col span={24}>
          <PageCreatorWithStore onClick={onClick} />
        </Col>
      </Row>
    );
  });