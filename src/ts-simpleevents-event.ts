import { BaseEvent } from  "./ts-simpleevents-base";

export interface Event {
    on(callback: () => void): number;
    off(handle: number): void;
    trigger(): void;
}

export class SimpleEvent extends BaseEvent<void, void> implements Event {
    on= (callback: () => void): number => super.add(callback);
    off= (handler: number): void => super.remove(handler);
    trigger= (): void => super.getResult(undefined);
}