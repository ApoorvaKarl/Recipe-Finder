import { LockOutlined } from '@ant-design/icons';
import { Input, Form } from 'antd';
import TextBoxStyle from '../../../styles/util/TextBoxStyle';

const PasswordTextBox = ({
  label,
  name,
  placeholder,
  autoFocus,
  rules,
  size,
}) => (
  <TextBoxStyle>
    <Form.Item
      label={label}
      name={name}
      hasFeedback={true}
      rules={rules}
      validateFirst={true}
    >
      <Input.Password
        placeholder={placeholder}
        maxLength="12"
        prefix={<LockOutlined />}
        autoFocus={autoFocus}
        size={size}
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

PasswordTextBox.defaultProps = {
  label: null,
  name: 'password',
  placeholder: 'Enter Your Password',
  autoFocus: false,
  rules: [
    {
      required: true,
      message: 'Password required',
    },
  ],
  size: 'large',
};

export default PasswordTextBox;
