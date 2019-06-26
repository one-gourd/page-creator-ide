import styled from 'styled-components';
import { IBaseStyledProps } from 'ide-lib-base-component';
import { IHistoryListProps } from './index';

interface IStyledProps extends IBaseStyledProps {}

export const StyledHeader = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {} // 优先级会高一些，行内样式
})<IStyledProps>`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const StyledBody = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {} // 优先级会高一些，行内样式
})<IStyledProps>`
  max-height: 540px;
  overflow-y: scroll;
`;
