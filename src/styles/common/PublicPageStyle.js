import styled from 'styled-components';
import Cooking from '../../assets/rec1.jpg'

const PublicPageStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10000000000;
  top: 0;
  right: 0;
  background: linear-gradient(
    134.6deg,
    rgba(0, 36, 130, 1) 0%,
    rgba(0, 208, 236, 1) 100%
  );
  background-image: url(${Cooking});
  background-repeat: no-repeat;
  background-size: inherit;

  @media only screen and (min-width: 768px) and (max-width: 1220px) {
    width: calc(100% - 80px);
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
  }

  .form {
    padding-top: 12px;
  }

  .ant-form-item {
    margin-bottom: 12px;
  }

  .ant-form-item-explain {
    text-align: left;
  }

  .pt-12 {
    padding-top: 12px;
  }
`;

export default PublicPageStyle;
