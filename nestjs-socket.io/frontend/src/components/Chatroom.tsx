import { Message } from './Message';
import { Tooltip } from 'react-tooltip';
import React, { useEffect, useState } from 'react';
import { IMessage } from '../types/message.type';
import { IParticipant } from '../types/participant.type';
import { socket } from '../sockets/socket';
import {
    ExceptionDto,
    InitDto,
    MessageUpsertedDto,
    ParticipantJoinedDto,
    ParticipantLeftDto,
} from '../sockets/server-to-client.types';

export type ChatroomProps = {
    nickname: string;
}

export const Chatroom = (props: ChatroomProps) => {
    const { nickname } = props;
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [participants, setParticipants] = useState<IParticipant[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [myId, setMyId] = useState(socket.id);

    useEffect(() => {
        socket.io.opts.query = { ...socket.io.opts.query, nickname };
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, [nickname]);

    useEffect(() => {
        function onConnect() {
            setMyId(socket.id);
            console.log('connected')
        }

        function onDisconnect() {
            console.log('disconnect')
        }

        function onException(data: ExceptionDto) {
            console.error(data);
        }

        function onInit(data: InitDto) {
            setMessages(data.messages);
            setParticipants(data.participants);
        }

        function onMessageUpserted(data: MessageUpsertedDto) {
            const message: IMessage = data ;
            setMessages((prev) => [...prev, message]);
        }

        function onParticipantJoined(data: ParticipantJoinedDto) {
            const participant: IParticipant = data;
            setParticipants((prev) => [...prev, participant])
        }

        function onParticipantLeft(data: ParticipantLeftDto) {
            console.log(data);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('exception', onException);
        socket.on('init', onInit);
        socket.on('messageUpserted', onMessageUpserted);
        socket.on('participantJoined', onParticipantJoined);
        socket.on('participantLeft', onParticipantLeft);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('exception', onException);
            socket.on('init', onInit);
            socket.off('messageUpserted', onMessageUpserted);
            socket.off('participantJoined', onParticipantJoined);
            socket.off('participantLeft', onParticipantLeft);
        };
    }, []);

    const submitNewMessage = () => {
        socket.emit('messageSent', {
            content: newMessage,
            replyToId: undefined,
        });
        setNewMessage('');
    };

    return (<>
        <div className='chatroom'>
            {messages.map((message, i) => message.sentById === myId
                ? <Message key={i} {...message} align='right' />
                : <Message key={i} {...message} align='left' />)}
        </div>
        <div className='message-input-wrapper'>
            <input className='message-input' type='text' placeholder='Write a new message here...' value={newMessage}
                   onChange={(e) => setNewMessage(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && submitNewMessage()} />
        </div>
        {participants.map((participant) => (
            <Tooltip
                id={`participant-${participant.id}`}
                content={participant.nickname}
                place={myId === participant.id ? 'right' : 'left'}
            />
        ))}
    </>);
};
