import styled from 'styled-components';

const Colors = {
  PRIMARY_COLOR: '#001A5B',
}

const TabBarStyle = styled.div`
  .ant-tabs-tab-btn {
    color: ${Colors.PRIMARY_COLOR} !important;
    border-color: ${Colors.PRIMARY_COLOR} !important;
  }
`;

export default TabBarStyle;
