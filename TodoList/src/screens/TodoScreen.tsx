//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import React, {Component, useState} from 'react';
import View from '@components/View';
import {TouchableOpacity} from 'react-native';
import {logoutAction} from '@redux/authentication/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {MaxSize} from '@assets/constants';
import Text from '@components/Text';
import TextInputField from '@components/TextInputField';
import {addTodo, todoSelector} from '@redux/todo/reducer';
import {collection, query} from 'firebase/firestore';
import {database} from '@config/firebase';

// create a component
const TodoScreen = () => {
  const dispatch = useDispatch();
  const todoList = useSelector(todoSelector);
  const [todoItem, setTodoItem] = useState<string>('');
  // const todoListStore = database.collection('todos')
  // const todoListStore = query(collection(database, 'todos'));

  return (
    <Container>
      <ViewContentStyled>
        <TitleStyled>
          <BoldTextNormal>Add a Todo item</BoldTextNormal>
        </TitleStyled>
        <View>
          <TextInputField value={todoItem} onChangeText={setTodoItem} />
          <TouchableOpacity onPress={() => dispatch(addTodo(todoItem))}>
            <AddContentStyled>
              <TextNormal>Add</TextNormal>
            </AddContentStyled>
          </TouchableOpacity>
        </View>
      </ViewContentStyled>
      <TouchOutStyled onPress={() => dispatch(logoutAction())}>
        <LogoutStyled style={{alignItems: 'center'}}>
          <BoldTextNormal>Logout</BoldTextNormal>
        </LogoutStyled>
      </TouchOutStyled>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
`;
const ViewContentStyled = styled(View)`
  padding: 8px 16px;
`;
const TitleStyled = styled(View)`
  align-items: center;
`;
const AddContentStyled = styled(TitleStyled)`
  border: 1px;
  height: 36px;
  border-radius: 4px;
  justify-content: center;
`;
const LogoutStyled = styled(View)`
  height: 40px;
  width: ${MaxSize.WIDTH}px;
  border-width: 1px;
  padding: 8px 8px;
  background-color: ${props => props.theme.colors.primaryColor};
`;
const TouchOutStyled = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
`;
const BoldTextNormal = styled(Text[700].Bold)`
  font-size: 18px;
  line-height: 20px;
`;
const TextNormal = styled(Text[500].Medium)`
  font-size: 14px;
  line-height: 16px;
`;

//make this component available to the app
export default TodoScreen;
