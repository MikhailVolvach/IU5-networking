import React from 'react';

import styled from '@emotion/styled';

import ChatMessageInput from './ChatMessageInput';
import ChatMessageList from './ChatMessageList';
import { useWebSocket } from '../../hooks/useWebSocket';

const ChatSpace = () => {
    const { messages } = useWebSocket();


    return (
        <ChatContainer>
            {messages.length ? <ChatMessageList messages={messages} /> : <ChatMessageEmptyList />}

            <ChatMessageInput />
        </ChatContainer>
    );
};

const ChatMessageEmptyList = styled.div`
    flex-grow: 1;
`;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 1000px;
    margin: 0 auto;
`;

export default ChatSpace;
