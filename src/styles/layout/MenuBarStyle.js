import styled from 'styled-components';

const Colors = {

  TOP_BAR_BACKGROUND_COLOR: '#FFFFFF',

  MENU_BAR_BACKGROUND_COLOR: '#001A5B',
  MENU_BAR_ACTIVE_BACKGROUND_COLOR: '#0073BB',
}

const MenuBarStyle = styled.div`
  .menuBar {
    background: ${Colors.MENU_BAR_BACKGROUND_COLOR};
    padding: 0 5px;
  }

  .ant-menu-dark {
    background: ${Colors.MENU_BAR_BACKGROUND_COLOR};
  }

  .ant-menu.ant-menu-dark .ant-menu-item-selected {
    background: ${Colors.MENU_BAR_ACTIVE_BACKGROUND_COLOR};
  }

  .ant-menu.ant-menu-dark .ant-menu-item:hover {
    background: ${Colors.MENU_BAR_ACTIVE_BACKGROUND_COLOR};
  }

  .ant-menu-title-content {
    font-size: 14px;
    font-weight: 400; 
  }

  .ant-menu-item {
    min-width: 12%;
  }

  .ant-menu-dark .ant-menu-item >span >a{
    color: ${Colors.TOP_BAR_BACKGROUND_COLOR};
  } 
}
`;

export default MenuBarStyle;
