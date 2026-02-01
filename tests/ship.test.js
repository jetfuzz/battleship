import { describe, test, expect } from "@jest/globals";
import Ship from "../src/ship.js";

describe("Ship", () => {
  test("has a length", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
  });

  test("starts with zero hits", () => {
    const ship = new Ship(3);
    expect(ship.hitCount).toBe(0);
  });

  test("hit method increases hitCount", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hitCount).toBeGreaterThan(0);
  });

  test("sinks when hitCount is equal to length", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
