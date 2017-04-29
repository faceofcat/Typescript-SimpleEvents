/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />
import { SimpleEvent as Event } from "../dist/ts-simpleevents-event";
import { SimpleDataEvent as DataEvent } from "../dist/ts-simpleevents-dataevent";
import { SimpleCancelableEvent as CancelableEvent } from "../dist/ts-simpleevents-cancelableevent";
import { SimpleCancelableDataEvent as CancelableDataEvent } from "../dist/ts-simpleevents-cancelabledataevent";
import { expect } from "chai";

class TestClass {
    public readonly somethingAboutToHappen = new CancelableEvent();
    public readonly somethingHappening = new Event();
    public readonly isValidHappenedData = new CancelableDataEvent<string>();
    public readonly somethingHappened = new DataEvent<string>();

    public doSomething(): void {
        const data = "something";
        if (!this.somethingAboutToHappen.trigger()) {
            this.somethingHappening.trigger();
            if (!this.isValidHappenedData.trigger(data)) {
                this.somethingHappened.trigger(data);
            }
        }
    }
}

@suite("Real Life Testing") class EventTest {
    @test "First Test"() {
        const test = new TestClass();
        let happened: boolean = false;
        let data: string = undefined;
        test.somethingHappened.on(x => { data = x; });
        test.somethingHappening.on(() => { happened = true; });
        test.doSomething();

        expect(happened).be.true;
        expect(data).be.equal("something");
    }

    @test "Second Test - Cancel Event"() {
        const test = new TestClass();
        let happened: boolean = false;
        let data: string = undefined;
        test.somethingHappened.on(x => { data = x; });
        test.somethingHappening.on(() => { happened = true; });
        test.somethingAboutToHappen.on(() => true);
        test.doSomething();

        expect(happened).be.false;
        expect(data).be.undefined;
    }

    @test "Third Test - Cancel Data"() {
        const test = new TestClass();
        let happened: boolean = false;
        let data: string = undefined;
        test.somethingHappened.on(x => { data = x; });
        test.somethingHappening.on(() => { happened = true; });
        test.isValidHappenedData.on(x => true);
        test.doSomething();

        expect(happened).be.true;
        expect(data).be.undefined;
    }
}
