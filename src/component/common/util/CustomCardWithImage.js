import { Card } from 'antd';
import Image from '../../../assets/logo.png';
import CustomCardStyle from '../../../styles/util/CustomCardStyle';

const Constants = {
  APP_NAME: 'Flavour Mate'
}

const CustomCardWithImage = ({ children }) => (
  <CustomCardStyle>
    <Card
      title={<img alt="#" src={Image} title={Constants.APP_NAME} />}
      className="boxShadow"
    >
      {children}
    </Card>
  </CustomCardStyle>
);

export default CustomCardWithImage;
