import { UserOutlined } from '@ant-design/icons';
import { Input, Form } from 'antd';
import TextBoxStyle from '../../../styles/util/TextBoxStyle';

const UserNameTextBox = ({ label, autoFocus, size }) => (
  <TextBoxStyle>
    <Form.Item
      label={label}
      name="username"
      hasFeedback={true}
      validateFirst={true}
      rules={[
        {
          required: true,
          message: 'Username required',
        },
      ]}
    >
      <Input
        placeholder="Enter Your Username"
        maxLength="45"
        size={size}
        prefix={<UserOutlined />}
        autoFocus={autoFocus}
        autoComplete="off"
        onCopy={e => {
          e.preventDefault();
          return false;
        }}
        onPaste={e => {
          e.preventDefault();
          return false;
        }}
      />
    </Form.Item>
  </TextBoxStyle>
);

UserNameTextBox.defaultProps = {
  label: null,
  autoFocus: true,
  size: 'large',
};

export default UserNameTextBox;
