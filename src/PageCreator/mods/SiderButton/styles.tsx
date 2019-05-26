import styled from 'styled-components';
import { IBaseStyledProps } from 'ide-lib-base-component';
import { Button } from 'antd';
import { ISiderButtonProps } from './index';

interface IStyledProps extends ISiderButtonProps, IBaseStyledProps {}

export const StyledButtonWrap = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {} // 优先级会高一些，行内样式
})<IStyledProps>`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 60px;
  border-right: 1px solid ${(props: IStyledProps) => props.theme.main};
`;

export const StyledIconWrap = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {} // 优先级会高一些，行内样式
})<IStyledProps>`
    cursor:pointer;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 36px;
  height: 40px;
  width: 40px;
  margin: 20px 0;
`;
