/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />
import { SimpleCancelableEvent as Event } from "../dist/ts-simpleevents-cancelableevent";
import { expect } from "chai";

@suite("Simple Cancelable Event") class EventTest {
    @test "Test Attaching Event"() {
        const event = new Event();
        const handler = event.on(() => true);
        expect(handler).to.be.a('number');
    }

    @test "Test Invoking True Event"() {
        const event = new Event();
        event.on(() => true);
        expect(
            event.trigger()
        ).to.equal(true);
    }
    
    @test "Test Invoking False Event"() {
        const event = new Event();
        event.on(() => false);
        expect(
            event.trigger()
        ).to.equal(false);
    }

    @test "Test Invoking Event With no Handlers"() {
        const event = new Event();
        expect(
            event.trigger()
        ).to.equal(undefined);
    }

    @test "Test Detaching Single Event"() {
        const event = new Event();
        let marker: string = undefined;
        const handle = event.on(() => true);
        event.off(handle);
        expect(
            event.trigger()
        ).to.equal(undefined);
    }

    // @test "Test Detaching Second Event"() {
    //     const event = new Event();
    //     let marker: string = undefined;
    //     event.on(() => { marker = "one"; });
    //     const handle = event.on(() => { marker = "two"; });
    //     event.off(handle);
    //     event.trigger();
    //     expect(marker).to.equal("one");
    // }
}
