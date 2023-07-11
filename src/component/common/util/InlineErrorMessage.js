import { Alert } from 'antd';

const InlineErrorMessage = ({ message }) => (
  <>
    {message ? <Alert message={message} type="error" showIcon={true} /> : null}
  </>
);

export default InlineErrorMessage;
