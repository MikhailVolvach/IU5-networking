import React, {
    ChangeEvent,
    KeyboardEventHandler,
    useContext,
    useState,
} from 'react';

import { fadeInRight } from 'react-animations';
import { useQueryClient } from 'react-query';

import styled from '@emotion/styled';
import ArrowActive from '../icons/ArrowActive';
import ArrowInactive from '../icons/ArrowInactive';

import { ActiveChatContext } from '../../context/active-chat';
import { useCurrentUser } from '../../state/current-user/slice';
import { useWebSocket } from '../../hooks/useWebSocket';

const ChatMessageInput = () => {
    const { activeChat } = useContext(ActiveChatContext);
    const currentUser = useCurrentUser();
    const [messageValue, setMessageValue] = useState('');
    const qc = useQueryClient();
    const { sendMsg } = useWebSocket();

    const changeMessageValue = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;

        setMessageValue(target.value);
    };

    const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key !== 'Enter') return;

        sendMessage();
    };

    const sendMessage = async () => {
        if (!messageValue || !activeChat) return;

        try {
            // await MessageService.addMessageInChat(activeChat.id, {
            //     content: messageValue,
            //     fromId: currentUser.id,
            //     toId: activeChat.id,
            // });
            sendMsg(messageValue);


            qc.invalidateQueries(activeChat.id.toString());

            setMessageValue('');
        } catch (err) {

            // toast.error(`${err}`);
        }
    };

    return (
        <Container>
            <MessageInput
                placeholder="Write a message..."
                value={messageValue}
                onChange={changeMessageValue}
                onKeyUp={handleKeyPress}
                disabled={!currentUser.username}
            />
            { messageValue ? <ArrowActive onClick={sendMessage} viewBox={"0 0 36 36"} width={"36"} height={"36"} style={{fontSize: "2rem"}} /> : <ArrowInactive viewBox={"0 0 36 36"} width={"36"} height={"36"} style={{fontSize: "2rem"}} /> }
        </Container>
    );
};

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    
    background: white;
    overflow: hidden;

    border: 2px solid #4b72ec;
    border-radius: 10px;
    width: 1000px;
    height: 66px;
    padding-right: 20px;
    margin-bottom: 30px;
`;

const MessageInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    padding: 15px 0 15px 20px;
    font-size: 20px;
`;

// const ActiveSendIcon = styled(ArrowActive)`
//     cursor: pointer;
//     color: #4B72EC;
//     width: 36px;
//     height: 36px;
// `;

// const InActiveSendIcon = styled(ArrowInactive)`
//     color: #7C7C7C;
//     width: 36px;
// `;

export default ChatMessageInput;
