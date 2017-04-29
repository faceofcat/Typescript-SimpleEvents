/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />
import { SimpleEvent as Event } from "../dist/ts-simpleevents-event";
import { expect } from "chai";

@suite("Simple Event") class EventTest {
    @test "Test Attaching Event"() {
        const event = new Event();
        const handler = event.on(() => { });
        expect(handler).to.be.a('number');
    }

    @test "Test Invoking Event"() {
        const event = new Event();
        let marker: string = undefined;
        event.on(() => { marker = "set"; });
        event.trigger();
        expect(marker).to.equal("set");
    }

    @test "Test Detaching Single Event"() {
        const event = new Event();
        let marker: string = undefined;
        const handle = event.on(() => { marker = "set"; });
        event.off(handle);
        event.trigger();
        expect(marker).to.equal(undefined);
    }

    @test "Test Detaching Second Event"() {
        const event = new Event();
        let marker: string = undefined;
        event.on(() => { marker = "one"; });
        const handle = event.on(() => { marker = "two"; });
        event.off(handle);
        event.trigger();
        expect(marker).to.equal("one");
    }
}
