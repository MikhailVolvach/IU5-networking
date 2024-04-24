import React, { useContext } from 'react';

import styled from '@emotion/styled';

import { Message } from '../../api/generated/models/Message';
import { MessageService } from '../../api/generated/services/MessageService';
import { ActiveChatContext } from '../../context/active-chat';
import FetchWrapper from '../common/FetchWrapper';
import ChatMessageInput from './ChatMessageInput';
import ChatMessageList from './ChatMessageList';
import { useWebSocket } from '../../hooks/useWebSocket';

const ChatSpace = () => {
    const { activeChat } = useContext(ActiveChatContext);
    const { messages } = useWebSocket();


    return (
        <ChatContainer>
            <ChatMessageList messages={messages} />
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
