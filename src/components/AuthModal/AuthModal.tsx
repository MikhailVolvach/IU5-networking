import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { Modal, Typography, TextField, Button } from '@mui/material';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: 500px;
  height: 400px;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px 43px;
`;

const Title = styled(Typography)`
  font-size: 40px !important;
  font-family: "MTSText-Medium", sans-serif !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;
  text-align: center;
`;

const Subtitle = styled.div`
  color: #1f50e8;
  margin-bottom: 40px;
  text-align: center;
`;

const Input = styled(TextField)`
  width: 414px;
  height: 70px;
  margin-bottom: 40px !important;

  & .MuiInputBase-root {
    border-radius: 10px;
  }

  & .MuiInputBase-input::placeholder {
    color: #7c7c7c;
  }
`;

const StyledButton = styled(Button)`
  width: 414px;
  height: 70px;
  border-radius: 10px !important;
  background-color: #4b72ec !important;
`;

// @ts-ignore
// const ModalWindow = ({ open, onClose, authCallback }) => {
const ModalWindow = ({ open, authCallback }) => {
    const [username, setUsername] = useState('');

    const btnClickHandler = useCallback(() => {
        authCallback(username);
        setUsername("");
    }, [username, authCallback]);
    return (
        // <StyledModal open={open} onClose={onClose}>
        <StyledModal open={open}>
            <ModalContainer>
                <Title variant="h2" color="textPrimary">
                    Авторизация
                </Title>
                <Subtitle>
                    Для доступа к системе необходимо <br /> ввести имя пользователя
                </Subtitle>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <Input placeholder="Имя пользователя" value={username} onChange={(e) => {setUsername(e.target.value)}}/>

                    <StyledButton variant="contained" color="primary" onClick={btnClickHandler}>
                        Войти
                    </StyledButton>
                </div>
            </ModalContainer>
        </StyledModal>
    );
};

export default ModalWindow;
