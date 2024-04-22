import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { useAppDispatch } from '../../hooks';
import ChatSpace from '../chat/ChatSpace';
import { useWebSocket } from '../../hooks/useWebSocket';

const Root = () => {
    const dispatch = useAppDispatch();
    // const socket = useWebSocket(); // Используем контекст WebSocket

    return (
        <StyledRoot>
            <ChatSpace />
        </StyledRoot>
    )
};

const StyledRoot = styled.div`
    display: flex;
    text-align: center;
    height: 100%;
    background: radial-gradient(284.04% 120.57% at 11.15% 92.13%, rgb(89, 125, 237) 0%, rgb(75, 114, 236) 62.404876947402954%, rgb(31, 80, 232) 100%);
`;

export default Root;
