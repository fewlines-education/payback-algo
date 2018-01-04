# Payback-algo

Payback-algo is an algorithm designed to help groups of friends share and settle expenses.

## How to use it

Let's create a simple scenario involving a group of friends:

Alice, Bob, Charlie, Damian are friends.

Here is a list of activities:
- Alice paid the cinema for Bob, Charlie, Damian
- Bob paid food to Charlie and Damian
- Charlie paid the taxi to Alice
- Damian paid some drinks to Alice and Bob
- Charlie and Damian paid for renting a car for everybody

Now, let's imagine a few amounts for each activities:

Alice cinema = 4 x 110    = 440

Bob restaurant = 3 x 150  = 450

Charlie taxi (2)          = 100

Damian drinks = 3 x 50    = 150

Damian and Charlie = 200 + 400 = 600

Let's recap with the following table:

```
XXXXXXX   |  Alice   |   Bob   | Charlie | Damian  | Debitor
Cinema    |    110   |   110   |    110  |    110  | Alice
Food      |          |   150   |    150  |    150  | Bob
Taxi      |    50    |         |    50   |         | Charlie
Drinks    |    50    |    50   |         |    50   | Damian
Renting D |    50    |    50   |    50   |    50   | Damian
Renting C |    100   |    100  |    100  |    100  | Charlie
```

We can now calculate the balance for everybody:

```
Alice    -440 + 110       + 50 + 50 + 50 + 100 = -80
Bob      -450 + 110 + 150      + 50 + 50 + 100 = 10
Charlie  -500 + 110 + 150 + 50      + 50 + 100 = -40
Damian   -350 + 110 + 150      + 50 + 50 + 100 = 110
```

And process the following sequence of events:

Damian refunds 80 to Alice
```
Alice    0
Bob      -40
Charlie  10
Damian   30
```
Damian refunds 30 to Bob
```
Alice    0
Bob      -10
Charlie  10
Damian   0
```
Charlie refunds 10 to Bob

:tada: DONE :tada:

Now, let's use our scenario with the library:

```javascript
const { createTransaction, payback } = require('./payback');

const cinema = createTransaction('alice', 440, ['alice', 'bob', 'charlie', 'damian']);
const food = createTransaction('bob', 450, ['bob', 'charlie', 'damian']);
const taxi = createTransaction('charlie', 100, ['charlie', 'alice']);
const drinks = createTransaction('damian', 150, ['damian', 'alice', 'bob']);
const rentDamian = createTransaction('damian', 200, ['alice', 'bob', 'charlie', 'damian']);
const rentCharlie = createTransaction('charlie', 400, ['alice', 'bob', 'charlie', 'damian']);

const transactions = [cinema, food, taxi, drinks, rentDamian, rentCharlie];
```

We created the transactions for each activities by specifying the owner, the amount and the participants.

```javascript
console.log(payback(transactions, ['alice', 'bob', 'charlie', 'damian']));
[ { from: 'damian', to: 'alice', value: 80 },
  { from: 'damian', to: 'charlie', value: 30 },
  { from: 'bob', to: 'charlie', value: 10 } ]
```

For a given activity and its embedded expenses (or transactions), we are now able to compute and display the refunds.

See [View an activity](https://fewlines-education.github.io/models/sharepay/index.html) on the mockup, click on the
`Do the accounts` button, and you have an example of what we've just computed with the algorithm.
