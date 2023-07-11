import { Button, Tooltip } from 'antd';
import CustomSubmitButtonStyle from '../../../styles/util/CustomSubmitButtonStyle';

const CustomSubmitButton = ({
  title,
  tooltip,
  type,
  danger,
  loading,
  size,
}) => (
  <CustomSubmitButtonStyle>
    <Tooltip title={tooltip}>
      <Button
        htmlType="submit"
        type={type}
        danger={danger}
        size={size}
        loading={loading}
      >
        {title}
      </Button>
    </Tooltip>
  </CustomSubmitButtonStyle>
);

CustomSubmitButton.defaultProps = {
  title: 'Submit',
  tooltip: 'Click here to submit',
  type: 'primary',
  danger: false,
  loading: false,
  size: 'medium',
};

export default CustomSubmitButton;
