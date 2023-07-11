import styled from 'styled-components';

const Colors = {
  CONTENT_BODY_BACKGROUND_COLOR: '#F7ECE6',
}

const ContentBodyStyle = styled.div`
  padding: 5px;
  background: ${Colors.CONTENT_BODY_BACKGROUND_COLOR};
  min-height: calc(100vh - 180px);  
}
`;

export default ContentBodyStyle;
