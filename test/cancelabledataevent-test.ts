/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />
import { SimpleCancelableDataEvent as Event } from "../dist/ts-simpleevents-cancelabledataevent";
import { expect } from "chai";

interface EventArgs {
    param1?: string,
    param2?: number;
    param3?: boolean;
}

@suite("Simple Cancelable Data Event") class EventTest {
    @test "Test Attaching Event"() {
        const event = new Event<EventArgs>();
        const handler = event.on(() => true);
        expect(handler).to.be.a('number');
    }

    @test "Test Invoking True Event"() {
        const event = new Event<EventArgs>();
        event.on(x => true);
        expect(
            event.trigger({})
        ).to.equal(true);
    }
    
    @test "Test Invoking False Event"() {
        const event = new Event<EventArgs>();
        event.on(x => x.param3);
        expect(
            event.trigger({ param3: false })
        ).to.equal(false);
    }

    @test "Test Invoking Event With no Handlers"() {
        const event = new Event<EventArgs>();
        expect(
            event.trigger({})
        ).to.equal(undefined);
    }

    @test "Test Detaching Single Event"() {
        const event = new Event<EventArgs>();
        let marker: string = undefined;
        const handle = event.on(x => x.param3);
        event.off(handle);
        expect(
            event.trigger({ param3 : true })
        ).to.equal(undefined);
    }
}
