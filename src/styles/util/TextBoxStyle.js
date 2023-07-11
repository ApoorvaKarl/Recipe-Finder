import styled from 'styled-components';

const Colors ={
INPUT_TEXT_COLOR:'#260A01'
}

const TextBoxStyle = styled.div`
  .ant-input-affix-wrapper {
    border-radius: 2px;
  }

  .ant-picker-input > input {
    color: ${Colors.INPUT_TEXT_COLOR};
  }

  .ant-input {
    color: ${Colors.INPUT_TEXT_COLOR};
  }

  .ant-form-item-label > label {
    color: ${Colors.INPUT_TEXT_COLOR};
    font-weight: 500;
    white-space: normal;
  }

  .ant-input-number-input {
    color: ${Colors.INPUT_TEXT_COLOR};
  }

  .ant-select-selection-item {
    color: ${Colors.INPUT_TEXT_COLOR};
  }

  .ant-form-item-label {
    white-space: normal;
  }
`;

export default TextBoxStyle;
