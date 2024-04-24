import React, { createContext, useContext, useState, useEffect } from 'react';
import { Message } from '../types/Message';

export const WebSocketContext = createContext({
    messages: [] as Message[],
    socket: {} as WebSocket,
    isConnected: false,
    error: '',
    sendMsg: (message: string) => {return;},
    username: '',
    exit: () => {return;}
});

// @ts-ignore
export const WebSocketProvider = ({ usrname, children }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        if (!usrname) return;
        const newSocket = new WebSocket(`ws://127.0.0.1:8080/ws/send?username=${encodeURIComponent(usrname)}`);

        newSocket.onopen = () => {
            setIsConnected(true);
            setUsername(usrname);
            console.log('Connected to server');
        };

        newSocket.onerror = (event) => {
            // @ts-ignore
            setError(event);
            setUsername('');
            console.error('WebSocket error:', event);
        };

        newSocket.onclose = () => {
            setIsConnected(false);
            setUsername('');
            console.log('Disconnected from server');
        };

        newSocket.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            const newMessage = {
                from: messageData.username,
                content: messageData.content,
                time: messageData.time
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
        };

        setSocket(newSocket);

        return () => {
            setIsConnected(false);
            setUsername('');
            setMessages([]);
            newSocket.close();
        };
    }, [usrname]);

    const sendMsg = (content: string) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(content);
        }
    };

    const exit = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            setIsConnected(false);
            setUsername('');
            setMessages([]);
            socket.close();
        }
    }

    // @ts-ignore
    return (<WebSocketContext.Provider value={{ username, messages, socket, isConnected, error, sendMsg, exit }}>
            {children}
        </WebSocketContext.Provider>
    );
};
