const { createTransaction, payback } = require("../payback.js");

test("4 people, 6 transactions", () => {
  const cinema = createTransaction("alice", 440, [
    "alice",
    "bob",
    "charlie",
    "damian"
  ]);
  const food = createTransaction("bob", 450, ["bob", "charlie", "damian"]);
  const taxi = createTransaction("charlie", 100, ["charlie", "alice"]);
  const drinks = createTransaction("damian", 150, ["damian", "alice", "bob"]);
  const rentDamian = createTransaction("damian", 200, [
    "alice",
    "bob",
    "charlie",
    "damian"
  ]);
  const rentCharlie = createTransaction("charlie", 400, [
    "alice",
    "bob",
    "charlie",
    "damian"
  ]);

  const transactions = [cinema, food, taxi, drinks, rentDamian, rentCharlie];


  const result = payback(transactions, ["alice", "bob", "charlie", "damian"]);
  expect(result).toEqual([
    { from: "damian", to: "alice", value: 80 },
    { from: "damian", to: "charlie", value: 30 },
    { from: "bob", to: "charlie", value: 10 }
  ]);
});

test("3 people, 4 transactions", () => {
  const cinema = createTransaction("alice", 330, ["alice", "bob", "charlie"]);
  const food = createTransaction("bob", 300, ["bob", "charlie"]);
  const taxi = createTransaction("charlie", 100, ["charlie", "alice"]);
  const rentCharlie = createTransaction("charlie", 300, [
    "alice",
    "bob",
    "charlie"
  ]);

  const transactions = [cinema, food, taxi, rentCharlie];

  const result = payback(transactions, ["alice", "bob", "charlie"]);
  expect(result).toEqual([
    { from: "bob", to: "alice", value: 60 },
    { from: "charlie", to: "alice", value: 10 }
  ]);
});
