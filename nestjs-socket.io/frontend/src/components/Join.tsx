import React, { useState } from 'react';

export type JoinProps = {
    onJoin: (nickname: string) => void
}

export const Join = (props: JoinProps) => {
    const [nickname, setNickname] = useState('');

    return (
        <div className='join-wrapper'>
            <input className='join-input' placeholder='Nickname' value={nickname}
                   onChange={(e) => setNickname(e.target.value)} />
            <button className='join-button' onClick={() => props.onJoin(nickname || 'Anonymous')}>Join</button>
        </div>
    );
};
