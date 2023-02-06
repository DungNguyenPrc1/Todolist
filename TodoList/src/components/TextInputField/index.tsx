//import liraries
import React, {Component, Ref} from 'react';
import View from '@components/View';
import styled from 'styled-components/native';
import Text from '@components/Text';
import {IStyle} from 'Type';
import {TextInputProps} from 'react-native';

interface ComponentPropsInterface {
  label?: string;
  value?: any;
  onChange?: any;
  onBlur?: any;
  error?: any;
}
const TextInputStyled = styled.TextInput<IStyle>`
  background-color: ${({backgroundColor}) => backgroundColor || '#e0e0e0'};
  border-width: ${({borderWidth}) => borderWidth || 1}px;
  border-color: ${({borderColor}) => borderColor || '#fff'};
  height: ${({height}) => height || 48}px;
  border-radius: ${({borderRadius}) => borderRadius ?? 12}px;
  padding-left: ${({paddingLeft}) => paddingLeft || 17.5}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 8}px;
`;

const TextInputField = (
  props: ComponentPropsInterface & TextInputProps & IStyle,
) => {
  const {label, value, onChange, onBlur, error} = props;

  return (
    <>
      <LabelStyled>{label}</LabelStyled>
      <TextInputStyled
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        {...props}
      />
      {error && <ErrorText>{error?.message}</ErrorText>}
    </>
  );
};

const LabelStyled = styled(Text[700].Bold)`
  font-size: 16px;
  line-height: 18px;
`;

const ErrorText = styled(Text[400].Normal)`
  color: red;
  padding: 4px 0 8px 0;
  font-size: 14px;
  line-height: 16px;
`;

export default TextInputField;
