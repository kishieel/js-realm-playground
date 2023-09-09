import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

@Controller()
export class AppController {
    private readonly jokes = [
        'I used to play piano by ear, but now I use my hands.',
        "I'm reading a book on anti-gravity, and it's impossible to put down.",
        "Parallel lines have so much in common. It's a shame they'll never meet.",
        'I told my wife she was drawing her eyebrows too high. She looked surprised.',
        "I used to be a baker, but I couldn't make enough dough.",
    ];

    @Get()
    getHello(): string {
        return 'Hello World';
    }

    @Get('/smile')
    getSmile(): string {
        return ':3';
    }

    @Get('/joke/:id')
    getJoke(@Param('id') id: string): string {
        const joke = this.jokes[+id];
        if (!joke) {
            throw new NotFoundException('Joke Not Found');
        }
        return joke;
    }
}
