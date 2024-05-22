import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { User } from '../../types/User';
import { useCurrentUser } from '../../state/current-user/slice';
import { Message } from '../../types/Message';
import { v4 } from 'uuid';
import Error from '../icons/Error';

type Props = {
    messages: Message[];
};

const ChatMessageList = ({ messages }: Props) => {
    const currentUser = useCurrentUser();

    return (
        <StyledChatMessageList>
            {messages.map((message) =>
            {
                const date = new Date(message.time);
                const messageTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                if (message.error && message.from === currentUser.username) {
                    return <ErrorMessageContainer>
                        <Error height={28} width={28} viewBox={"0 0 28 28"} />
                        <ErrorMessage >
                            <MessageTextError>Ошибка отправки</MessageTextError>
                            <MessageTimeError>{messageTime}</MessageTimeError>
                        </ErrorMessage>
                    </ErrorMessageContainer>
                }
                if (message.error) return <div></div>;
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

const MessageTextBase = css`
  max-width: 480px;
  width: fit-content;
  text-align: left;
  word-break: break-word;
  margin-top: -5px;
`;

const MessageTimeBase = css`
  font-size: 14px;
  line-height: 14px;
`;

const RightMessageBase = css`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 20px 20px 10px 20px;
  padding: 11px 10px 11px 10px;
  gap: 21px;
`;

const MessageText = styled.span`
  color: #000;
  ${MessageTextBase};
`;

const MessageTextError = styled.span`
  color: #BE3A31;
  ${MessageTextBase};
`;

const MessageTime = styled.span`
  color: #7C7C7C;
  ${MessageTimeBase};
`;

const MessageTimeError = styled.span`
  color: #BE3A31;
  ${MessageTimeBase};
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

const ErrorMessageContainer = styled.div`
  display: flex;
  gap: 5px;
  align-self: end;
  align-items: center;
`;

const ErrorMessage = styled.div`  
  border: 2px solid #BE3A31;
  color: #BE3A31 !important;
  align-self: end;
  ${RightMessageBase};
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
  align-self: end;
    ${RightMessageBase};
`;

export default ChatMessageList;
