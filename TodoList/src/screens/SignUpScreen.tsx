//import liraries
import React, {Component} from 'react';
import styled from 'styled-components/native';
import View from '@components/View';
import Text from '@components/Text';
import AntDesgin from 'react-native-vector-icons/AntDesign';
import Spacer from '@components/Spacer';
import i18n from '@locales/index';
import TextInputField from '@components/TextInputField';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {TouchableOpacity} from 'react-native';
import {emailRegex, regexPassword} from '../helper/index';
import {navigate} from '@navigations/index';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '@config/firebase';
import Toast from '@components/Toast';

// create a component
const SignUpScreen = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: {isValid},
  } = useForm({mode: 'onChange'});

  const password = useWatch({control, name: 'password'});

  function checkStrongPassword(value: number | string) {
    if (!value) {
      return;
    }
    if (value) {
      switch (true) {
        case value <= 2:
          return <WeekPassword>{(value = 'Week password')}</WeekPassword>;

        case value > 2 && value < 5:
          return <MediumPassword>{(value = 'Medium password')}</MediumPassword>;

        case value >= 5:
          return <StrongPassword>{(value = 'Strong password')}</StrongPassword>;
      }
    }
  }

  const passwordTracker = {
    uppercase: password?.match(regexPassword.atLeastOneUppercase),
    lowercase: password?.match(regexPassword.atLeastOneLowercase),
    number: password?.match(regexPassword.atLeastOneNumeric),
    specialChar: password?.match(regexPassword.atLeastOneSpecialChar),
    sixCharsOrGreater: password?.match(regexPassword.atLeast6character),
  };
  const passwordStrength = Object.values(passwordTracker).filter(
    value => value,
  ).length;

  const handleSignUp = ({email, password}: any) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        Toast.success('SignUp Successfully');
        setTimeout(() => navigate('SignIn'), 2000);
        reset();
      })
      .catch(err => {
        Toast.error(`${err.message}`);
      });
  };

  return (
    <ContainerStyled>
      <ContentStyled>
        <LogoStyled name="instagram" size={70} />
        <LoginTextStyled>{i18n.t('common.signup')}</LoginTextStyled>
      </ContentStyled>

      <InputFieldStyled>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Fill Your Email,Please',
            pattern: {value: emailRegex, message: 'Invalid Email'},
          }}
          render={({
            field: {value, onChange, onBlur, ref},
            fieldState: {error},
          }) => {
            return (
              <TextInputField
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                error={error}
                label="Email"
              />
            );
          }}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Fill Your Password,Please',
            minLength: {value: 6, message: 'At Least 6 character'},
          }}
          render={({
            field: {value, onChange, onBlur, ref},
            fieldState: {error},
          }) => {
            return (
              <>
                <TextInputField
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  label="Password"
                  error={error}
                />
                {!error ? checkStrongPassword(passwordStrength) : null}
              </>
            );
          }}
        />
        <TouchSubmit isValid={isValid} onPress={handleSubmit(handleSignUp)}>
          <NormalTextStyled>{i18n.t('common.submit')}</NormalTextStyled>
        </TouchSubmit>
        <FooterStyled>
          <SmallTextStyled>I already have an account,plz </SmallTextStyled>
          <TouchableOpacity onPress={() => navigate('SignIn')}>
            <TextStyled>Sign In</TextStyled>
          </TouchableOpacity>
        </FooterStyled>
      </InputFieldStyled>
    </ContainerStyled>
  );
};

const ContainerStyled = styled(View)`
  flex: 1;
`;
const SmallTextStyled = styled(Text[400].Normal)`
  font-size: 14px;
  line-height: 16px;
`;
const NormalTextStyled = styled(Text[400].Normal)`
  font-size: 18px;
  line-height: 20px;
`;

const WeekPassword = styled(NormalTextStyled)`
  color: red;
`;
const MediumPassword = styled(NormalTextStyled)`
  color: #feb466;
`;
const StrongPassword = styled(NormalTextStyled)`
  color: green;
`;

const FooterStyled = styled(View)`
  flex-direction: row;
  margin-top: 8px;
`;
const ContentStyled = styled(View)`
  flex-direction: row;
  justify-content: center;
  margin-top: 32px;
`;
const InputFieldStyled = styled(View)`
  padding: 24px 12px;
`;
const LogoStyled = styled(AntDesgin)`
  flex-direction: row;
  justify-content: center;
`;
const TouchSubmit = styled.TouchableOpacity<{isValid: boolean}>`
  margin-top: 8px;
  border-width: 1px;
  height: 42px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-color: ${props => props.theme.colors.gray3};
  background-color: ${props =>
    props.isValid ? props.theme.colors.primaryColor : props.theme.colors.gray3};
`;

const LoginTextStyled = styled(Text[600].SemiBold)`
  font-size: 36px;
  line-height: 38px;
  padding-top: 17px;
`;
const TextStyled = styled(Text[600].SemiBold)`
  font-size: 14px;
  line-height: 16px;
`;
export default SignUpScreen;
