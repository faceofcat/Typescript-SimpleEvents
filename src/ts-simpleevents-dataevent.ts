import { BaseEvent } from  "./ts-simpleevents-base";

export interface DataEvent<D> {
    on(callback: (data: D) => void): number;
    off(handle: number): void;
    trigger(data: D): void;
}

export class SimpleDataEvent<D> extends BaseEvent<D, void> implements DataEvent<D> {
    on= (callback: (data: D) => void): number => super.add(callback);
    off= (handle: number): void => super.remove(handle);
    trigger= (data: D): void => super.getResult(data);
}