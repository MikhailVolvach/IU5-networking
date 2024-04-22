import React from 'react';
import styled from '@emotion/styled';

// import { Message } from '../../api/generated/models/Message';
import { User } from '../../api/generated/models/User';
import { useCurrentUser } from '../../state/current-user/slice';
import { Message } from '../../types/Message';
import { v4 } from 'uuid';

type Props = {
    messages: Message[];
};

const ChatMessageList = ({ messages }: Props) => {
    const currentUser = useCurrentUser();

    const nowTime = new Date();

    return (
        <StyledChatMessageList>
            {messages.map((message) =>
                isCurrentUserMessage(currentUser, message) ? (
                    <RightMessage key={v4()}>
                        <MessageText>{message.content}</MessageText>
                        <MessageTime>{nowTime.getHours()}:{nowTime.getMinutes()}</MessageTime>
                    </RightMessage>
                ) : (
                    <LeftMessage key={v4()}>
                        <MessageText>{message.content}</MessageText>
                        <MessageTime>{nowTime.getHours()}:{nowTime.getMinutes()}</MessageTime>
                    </LeftMessage>
                )
            )}
        </StyledChatMessageList>
    );
};

const isCurrentUserMessage = (currentUser: User, message: Message) => {
    return message.from === currentUser.username;
};

const StyledChatMessageList = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin-bottom: 30px;
    justify-content: flex-end;
    font-size: 20px;
    gap: 20px;
`;

const MessageText = styled.span`
    color: #000;
`;

const MessageTime = styled.span`
    color: #7C7C7C;
    font-size: 14px;
    line-height: 14px;
`;

const LeftMessage = styled.div`
    align-self: start;
    background: #fff;
    border-radius: 20px 20px 20px 10px;
    padding: 11px 10px 11px 20px;
    display: flex;
    align-items: center;
    gap: 21px;
`;

const RightMessage = styled.div`
    display: flex;
    align-items: center;
    align-self: end;
    background: #fff;
    border-radius: 20px 20px 10px 20px;
    padding: 11px 10px 11px 20px;
    gap: 21px;
`;

export default ChatMessageList;
