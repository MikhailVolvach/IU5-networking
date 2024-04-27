import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import Root from './components/common/Root';
import ActiveChatProvider from './context/active-chat';
import store from './state/store';
import { WebSocketProvider } from './context/WebSocketContext';
import {useWebSocket} from './hooks/useWebSocket';
import { setUserCurrentAction, useCurrentUser } from './state/current-user/slice';
import { useAppDispatch } from './hooks';
import { v4 as uuidv4 } from 'uuid';
import AuthModal from './components/AuthModal/AuthModal';

const queryClient = new QueryClient();

function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <UserProxy />
            </QueryClientProvider>
        </Provider>
    );
}

const UserProxy = () => {
    const dispatch = useAppDispatch();
    const currentUser = useCurrentUser();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true); // Состояние для отображения модального окна
    const [username, setUsername] = useState<string>(''); // Состояние для хранения имени пользователя
    const { isConnected } = useWebSocket();

    const handleLogin = (value: string) => {
        setUsername(value);
        setIsModalOpen(false); // Закрываем модальное окно после авторизации
    };

    useEffect(() => {
        if (!username) return;
        dispatch(
            setUserCurrentAction({
                id: uuidv4(),
                username: username,
            })
        );

    }, [username, dispatch]);

    useEffect(() => {
        if (!currentUser.username) {
            setUsername('');
            setIsModalOpen(true);
        }
    }, [currentUser.username]);

    return (
        <WebSocketProvider usrname={username}>
            <ActiveChatProvider>
                <Root />
                {!isConnected && <AuthModal open={isModalOpen} authCallback={handleLogin}/>}
            </ActiveChatProvider>
        </WebSocketProvider>
    )
}

export default App;
