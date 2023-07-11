import styled from 'styled-components';

const Colors = {
  SHADOW_COLOR: '#ECEFF1',
  CONTENT_BODY_BACKGROUND_COLOR: '#F7ECE6',
}
const Constants = {
  CARD_BORDER_RADIUS: '25px',
}

const CustomCardStyle = styled.div`
  .boxShadow {
    box-shadow: 2px 2px 0px 0px ${Colors.SHADOW_COLOR};
    border-radius: ${Constants.CARD_BORDER_RADIUS};
    
  background: ${Colors.CONTENT_BODY_BACKGROUND_COLOR}; 
  }
`;

export default CustomCardStyle;
