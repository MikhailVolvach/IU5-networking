// import React, { createContext, useContext, useState, useEffect } from 'react';
// import io from 'socket.io-client';
//
// export const WebSocketContext = createContext(null);
//
// // export const useWebSocket = () => useContext(WebSocketContext);
//
// // @ts-ignore
// export const WebSocketProvider = ({ username, children }) => {
//     const [socket, setSocket] = useState(null);
//     const [isConnected, setIsConnected] = useState(false);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const newSocket = io(`ws://127.0.0.1:8080/ws/send?username=${encodeURIComponent(username)}`);
//         // @ts-ignore
//         setSocket(newSocket);
//
//         newSocket.on('connect', () => {
//             setIsConnected(true);
//             console.log('Connected to server');
//         });
//
//         newSocket.on('disconnect', () => {
//             setIsConnected(false);
//             console.log('Disconnected from server');
//         });
//
//         newSocket.on('error', (err) => {
//             setError(err);
//             console.error('WebSocket error:', err);
//         });
//
//         // Обработка размонтирования компонента
//         return () => {
//             newSocket.disconnect();
//         };
//     }, [username]);
//
//     return (
//         <WebSocketContext.Provider value={socket}>
//             {children}
//         </WebSocketContext.Provider>);
// };


import React, { createContext, useContext, useState, useEffect } from 'react';
import { Message } from '../types/Message';

export const WebSocketContext = createContext({messages: [] as Message[], socket: {}, isConnected: false, error: ''});

// export const useWebSocket = () => useContext(WebSocketContext);

// @ts-ignore
export const WebSocketProvider = ({ username, children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!username) return;
        const newSocket = new WebSocket(`ws://127.0.0.1:8080/ws/send?username=${encodeURIComponent(username)}`);

        newSocket.onopen = () => {
            setIsConnected(true);
            console.log('Connected to server');
        };

        newSocket.onerror = (event) => {
            // @ts-ignore
            setError(event);
            console.error('WebSocket error:', event);
        };

        newSocket.onclose = () => {
            setIsConnected(false);
            console.log('Disconnected from server');
        };

        newSocket.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            const newMessage = {
                from: messageData.from,
                content: messageData.content,
                time: messageData.time
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
        };

        // @ts-ignore
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [username]);

    // @ts-ignore
    return (<WebSocketContext.Provider value={{ messages, socket, isConnected, error }}>
            {children}
        </WebSocketContext.Provider>
    );
};
