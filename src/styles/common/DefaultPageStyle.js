import styled from 'styled-components';

const DefaultPageStyle = styled.div`
  @media only screen and (min-width: 768px) and (max-width: 1220px) {
    width: calc(100% - 80px);
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
  }

  .pt-16 {
    padding-top: 16px;
  }
`;

export default DefaultPageStyle;
