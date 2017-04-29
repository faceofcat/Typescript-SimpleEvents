import { BaseEvent } from  "./ts-simpleevents-base";

export interface CancelableDataEvent<D> {
    on(callback: (data: D) => boolean): number;
    off(handle: number): void;
    trigger(data: D): boolean | undefined;
}

export class SimpleCancelableDataEvent<D> extends BaseEvent<D, boolean> implements CancelableDataEvent<D> {
    on= (callback: (data: D) => boolean): number => super.add(callback);
    off= (handle: number): void => super.remove(handle);
    trigger= (data: D): boolean | undefined => super.getResult(data, false);
}