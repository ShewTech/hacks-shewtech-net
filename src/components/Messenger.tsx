
import React from 'react';
import { createContext } from 'react';

export type MessengerContextType = {
    execute: (payload: string) => void;
    inject: (hackId: string) => Promise<void>;
};

const MessengerContext = createContext<MessengerContextType | undefined>(undefined);

export interface MessengerProviderProps {
    children: React.ReactNode;
    opener: Window | null;
}

export type Commands = ['EXEC'];
export type Command = Commands[number];

export const MessengerProvider: React.FC<MessengerProviderProps> = ({ children, opener }) => {

    const send = (command: Command, content: string) => {
        if (!opener) throw new Error('No opener');
    
        const url = window.location.href.split('?')[1];
        if (!url) throw new Error('No url');
    
        opener.postMessage({ name: command, content }, url);
    }
    

    return <MessengerContext.Provider value={{
        execute: (payload) => send('EXEC', payload),
        inject: async (hackId: string) => {
            return fetch(`/api/inject/${hackId}`).then(res => {
                if (res.status !== 200) {
                    throw new Error('Failed to inject');
                }
                return res.text();
            }).then(payload => {
                send('EXEC', payload);
            });
        }
    }}>
        {children}
    </MessengerContext.Provider>;
};

export const useMessenger = () => {
    const context = React.useContext(MessengerContext);
    if (!context) {
        throw new Error('useMessenger must be used within a MessengerProvider');
    }
    return context;
};