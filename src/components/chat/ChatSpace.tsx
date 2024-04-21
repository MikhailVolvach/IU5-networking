import React, { useContext } from 'react';

import styled from '@emotion/styled';

import { Message } from '../../api/generated/models/Message';
import { MessageService } from '../../api/generated/services/MessageService';
import { ActiveChatContext } from '../../context/active-chat';
import FetchWrapper from '../common/FetchWrapper';
import ChatMessageInput from './ChatMessageInput';
import ChatMessageList from './ChatMessageList';

const ChatSpace = () => {
    const { activeChat } = useContext(ActiveChatContext);
    console.log(activeChat);
    return (
        <ChatContainer>
            {activeChat && (
                <>
                    <FetchWrapper<Message[]>
                        queryKey={activeChat.id.toString()}
                        fetchFn={async () =>
                            await MessageService.getMessagesByChat(
                                activeChat.id
                            )
                        }
                        queryOptions={{ refetchInterval: 3000 }}
                        emptyEl={<ChatMessageEmptyList />}
                        render={({ data }) => {
                            return <ChatMessageList messages={data} />;
                        }}
                    />
                    <ChatMessageInput />
                </>
            )}
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
