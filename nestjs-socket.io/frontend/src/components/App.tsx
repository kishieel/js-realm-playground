import React, { useState } from 'react';
import { Chatroom } from './Chatroom';
import { Join } from './Join';

function App() {
    const [nickname, setNickname] = useState<string>();

    return (
        <main>
            {nickname ? <Chatroom nickname={nickname} /> : <Join onJoin={(nickname) => setNickname(nickname)}/>}
        </main>
    );
}

export default App;
