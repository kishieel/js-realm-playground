import { Engine } from './engines/engine';

const bootstrap = () => {
    const ws = new WebSocket('wss://app.localhost/api');
    const en = new Engine(ws);

    ws.onopen = () => {
        console.log('Connected');
        en.init();
    }

    ws.onclose = () => {
        console.log('Disconnected');
    }

    ws.onerror = (ev) => {
        console.error(ev);
    }

    ws.onmessage = (ev: MessageEvent) => {
        en.process(JSON.parse(ev.data));
    }

    document.addEventListener('keydown', (ev) => en.changeDirection(ev.key))
    setInterval(() => en.update(), 20);
};

window.onload = bootstrap;
