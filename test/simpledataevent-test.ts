/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />
import { SimpleDataEvent as Event } from "../dist/ts-simpleevents-dataevent";
import { expect } from "chai";

@suite("Simple Data Event") class EventTest {
    @test "Test Attaching Event"() {
        const event = new Event<string>();
        const handler = event.on(d => { });
        expect(handler).to.be.a('number');
    }

    @test "Test Invoking Event"() {
        const event = new Event<string>();
        let marker: string = undefined;
        event.on(d => { marker = d });
        event.trigger("set");
        expect(marker).to.equal("set");
    }

    @test "Test Detaching Single Event"() {
        const event = new Event<string>();
        let marker: string = undefined;
        const handle = event.on(d => { marker = d; });
        event.off(handle);
        event.trigger("set");
        expect(marker).to.equal(undefined);
    }

    @test "Test Detaching Second Event"() {
        const event = new Event<String>();
        let marker: string = undefined;
        event.on(d => { marker = d + " one"; });
        const handle = event.on(d => { marker = d + " two"; });
        event.off(handle);
        event.trigger("set");
        expect(marker).to.equal("set one");
    }
}
