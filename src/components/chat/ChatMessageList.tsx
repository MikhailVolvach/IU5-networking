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
            {
                const date = new Date(message.time);
                const messageTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                if (message.error) {
                    return <ErrorMessage >
                        <LeftMessageContent>
                            <LeftMessageAuthor>
                                {message.from}
                            </LeftMessageAuthor>
                            <MessageText>{message.content}</MessageText>
                        </LeftMessageContent>
                        <MessageTime>{messageTime}</MessageTime>
                    </ErrorMessage>
                }
                return isCurrentUserMessage(currentUser, message) ? (
                    <RightMessage key={v4()}>
                        <MessageText>{message.content}</MessageText>
                        <MessageTime>{messageTime}</MessageTime>
                    </RightMessage>
                ) : (<LeftMessage key={v4()}>
                            <LeftMessageContent>
                                <LeftMessageAuthor>
                                    {message.from}
                                </LeftMessageAuthor>
                                <MessageText>{message.content}</MessageText>
                            </LeftMessageContent>
                            <MessageTime>{messageTime}</MessageTime>
                        </LeftMessage>)
            })}
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
    max-width: 480px;
    width: fit-content;
    text-align: left;
  word-break: break-word;
  margin-top: -5px;
`;

const MessageTime = styled.span`
  color: #7C7C7C;
  font-size: 14px;
  line-height: 14px;
`;

const LeftMessage = styled.div`
  display: flex;
  align-self: start;
  background: #fff;
  border-radius: 20px 20px 20px 10px;
  padding: 8px 10px 5px 10px;
  align-items: center;
  gap: 21px;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  align-self: end;
  background: #fff;
  border-radius: 20px 20px 10px 20px;
  padding: 11px 10px 11px 10px;
  gap: 21px;
  
  border: 2px solid #BE3A31;
  color: #BE3A31 !important;
`;

const LeftMessageAuthor = styled.div`
  color: #4B72EC;
  font-size: 14px;
  line-height: 14px;
`;

const LeftMessageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`

const RightMessage = styled.div`
    display: flex;
    align-items: center;
    align-self: end;
    background: #fff;
    border-radius: 20px 20px 10px 20px;
    padding: 11px 10px 11px 10px;
    gap: 21px;
`;

export default ChatMessageList;
