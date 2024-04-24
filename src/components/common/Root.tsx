import React, { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { useAppDispatch } from '../../hooks';
import ChatSpace from '../chat/ChatSpace';
import { useWebSocket } from '../../hooks/useWebSocket';
import Logout from '../icons/Logout';
import { setUserCurrentAction } from '../../state/current-user/slice';

const Root = () => {
    const dispatch = useAppDispatch();
    const { username, exit, isConnected } = useWebSocket(); // Используем контекст WebSocket

    const handleLogoutClick = useCallback(() => {
        exit();
        dispatch(
            setUserCurrentAction({
                id: '',
                username: '',
                avatar: ''
            })
        );
    }, [exit, dispatch]);

    return (
        <StyledRoot>
            <StyledHeader>
                <HeaderContainer>
                    {isConnected && <StyledNav>
                       <StyledUsername>
                           { username }
                       </StyledUsername>
                       <StyledLogoutIcon onClick={handleLogoutClick}/>
                    </StyledNav>}
                </HeaderContainer>
            </StyledHeader>
            <ChatSpace />
        </StyledRoot>
    )
};

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;
  background: radial-gradient(284.04% 120.57% at 11.15% 92.13%, rgb(89, 125, 237) 0%, rgb(75, 114, 236) 62.404876947402954%, rgb(31, 80, 232) 100%);
`;

const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  background: #fff;
  font-size: 20px;
`

const HeaderContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
`;

const StyledNav = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
`;

const StyledUsername = styled.span`
  margin-right: 5px;
  margin-top: -5px;
`;

const StyledLogoutIcon = styled(Logout)`
    cursor: pointer;
`;

export default Root;
