import { BaseEvent } from  "./ts-simpleevents-base";

export interface CancelableEvent {
    on(callback: ()=> boolean): number;
    off(handle: number): void;
    trigger(): boolean | undefined;
}

export class SimpleCancelableEvent extends BaseEvent<void, boolean> implements CancelableEvent {
    on= (callback: () => boolean): number => super.add(callback);
    off= (handle: number): void => super.remove(handle);
    trigger= (): boolean | undefined => super.getResult(undefined, false);
}