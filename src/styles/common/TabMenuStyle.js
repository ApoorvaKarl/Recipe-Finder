import styled from 'styled-components';

const Colors = {
  MENU_BAR_BACKGROUND_COLOR: '#001A5B',
  MENU_BAR_ACTIVE_BACKGROUND_COLOR: '#0073BB',
}

const TabMenuStyle = styled.div`
  .ant-menu-dark {
    background: #FFFFFF;
    color: ${Colors.MENU_BAR_BACKGROUND_COLOR};
  }

  .ant-menu-dark .ant-menu-submenu-active, .ant-menu-dark .ant-menu-submenu-open : hover {
    color: ${Colors.MENU_BAR_ACTIVE_BACKGROUND_COLOR};
  }

  .ant-menu-dark .ant-menu-submenu-selected {
    color: ${Colors.MENU_BAR_BACKGROUND_COLOR};
  }

  .ant-menu-horizontal {
    line-height: 40px;
  }

  .ant-menu-item {
    min-width: 14%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin-left: 1px;
    margin-right: 1px;
    text-align: center;
    background: ${Colors.MENU_BAR_BACKGROUND_COLOR};
  }

  .ant-menu.ant-menu-dark .ant-menu-item-selected {
    background: ${Colors.MENU_BAR_ACTIVE_BACKGROUND_COLOR};
  }

  .ant-menu.ant-menu-dark .ant-menu-item:hover {
    background: ${Colors.MENU_BAR_ACTIVE_BACKGROUND_COLOR};
  }
}
`;

export default TabMenuStyle;
