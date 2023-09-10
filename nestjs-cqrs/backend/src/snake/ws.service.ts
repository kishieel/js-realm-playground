import { Observable, Subject } from 'rxjs';

export class WsService {
    private subject = new Subject<{ event: string; data: unknown }>();

    addEvent(eventName: string, eventData: unknown): void {
        this.subject.next({ event: eventName, data: eventData });
    }

    getEventSubject$(): Observable<{ event: string; data: unknown }> {
        return this.subject.asObservable();
    }
}
