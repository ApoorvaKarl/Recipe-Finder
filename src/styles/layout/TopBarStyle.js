import styled from 'styled-components';

const Colors = {

  TOP_BAR_BACKGROUND_COLOR: '#DB7107',
  TOP_BAR_USER_NAME_COLOR: '#001A5B',
}

const TopBarStyle = styled.div`
  .topBar {
    background: ${Colors.TOP_BAR_BACKGROUND_COLOR};
    display: flex;
    align-items: center;
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0,
    rgba(60, 64, 67, 0.15) 0 1px 3px 1px;
    justify-content: space-between;
    padding: 20px;
    height: 70px;
    position: fixed;
    width: 100vw;
    z-index: 100;
  }

  .topBarRow {
    height: 64px;
  }

  .topBarRight {
    height: 64px;
  }

  .topBarRightUserName {
    color: ${Colors.TOP_BAR_USER_NAME_COLOR};
    padding-right: 10px; 
  }

  .topBarRightAvatar {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
  }

  .topBarPointer {
    cursor: pointer;
  }
}
`;

export default TopBarStyle;
