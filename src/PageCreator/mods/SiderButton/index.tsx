import React, { useCallback } from 'react';
import { Button, Icon } from 'antd';
import { observer } from 'mobx-react-lite';
import { IBaseComponentProps } from 'ide-lib-base-component';

import { StyledButtonWrap, StyledIconWrap } from './styles';

const ButtonGroup = Button.Group;

export interface ISiderButtonProps extends IBaseComponentProps {
    
}

export const SiderButton: React.FunctionComponent<ISiderButtonProps> = observer(
  props => {
    return (
      <StyledButtonWrap>
        <StyledIconWrap>
          <Icon type="layout" />
        </StyledIconWrap>
        <StyledIconWrap>
          <Icon type="cloud" />
        </StyledIconWrap>
      </StyledButtonWrap>
    );
  }
);
