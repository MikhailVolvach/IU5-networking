import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import { Chat } from '../api/generated';

export type IActiveChatContext = {
    activeChat: Chat | null;
    setActiveChat: Dispatch<SetStateAction<Chat | null>>;
};

export const ActiveChatContext = React.createContext<IActiveChatContext>({
    activeChat: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setActiveChat: () => {},
});

const ActiveChatProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [activeChat, setActiveChat] = useState<Chat | null>({id: 1,
        name: 'Bob',
        avatar: '/sass-avatar.svg',});

    return (
        <ActiveChatContext.Provider value={{ activeChat, setActiveChat }}>
            {children}
        </ActiveChatContext.Provider>
    );
};

export default ActiveChatProvider;
