Cashier
=====================

**Written by Tim Jones for David Murphy at Benetech, February 2017**

## Howto

 * For a quick look, check out the app on [Heroku](https://benetech-cashier.herokuapp.com/)
 * To install the app locally , clone this repository and run `npm install` from its directory
 * To run the server locally, run `npm start` and point your browser at `http://localhost:5000/`
 * To run the tests, install the app and run `npm test`

## Key Files

 * The core transaction logic lives in model called CashRegister, in the `/models/cashregister.js` file.
 * The `test` directory contains tests for the CashRegister. (The web app is not tested.)
 * The client-side logic lives in `/public/cashier.js`
 * The server control logic lives in `router.js`

## Room to Grow

There's plenty of room for improvement here, but I cut myself off before I got carried away. Things I would probably work on next if I wanted to spend more time:

 * The `/transaction` API spec is a little simplistic. I'd like to add nicer status codes and error messages.
 * The front-end code is notably sloppier than the back-end code. For a serious web application, I'd use something more robust than raw JQuery.

## Tooling

 * [Node.js](https://nodejs.org/en/) is our server-side framework
 * [Express.js](http://expressjs.com/) is our Node web-server
 * Documentation of the `CashRegister` object uses [JSDoc](http://usejsdoc.org/) formatting
 * [Chai](http://chaijs.com/) and [Mocha](https://mochajs.org/) handle unit-tests
 * And our client-side javascript uses good ol' [JQuery](https://jquery.com/)

## Assumptions

This app assumes:

 * We're using a modern browser. No polyfills or legacy support.
 * We're using a desktop browser. No responsive design or other mobile support.
 * No malicious or mischievous actors. Input validation and sanitization is minimal.
 * We're connected to the web. Client-side libraries are loaded from a CDN.

## Goal

*Copied from David's email*

Write a JavaScript server side application to simulate a cash register that operates with the user to provide change for transactions.

Its one function should be to take a purchase price and a payment amount and return the change using all of the US dollar denominations $20 and less including pennies, nickels, dimes, quarters, and fifty cent pieces.  Assume that there is a limited supply (possibly zero) of each denomination to draw from in your register and that the change will include the minimum amount of each denomination needed.  For example, a payment of $1.00 for a purchase of $0.89 will return change of a dime and a penny, or if there are no dimes, then two nickels and a penny. Replenish the available currency stock from the payments and simulate a series of transactions to show multiple scenarios.

You should include a user friendly, web based JavaScript client UI for accessing the application. The client should make requests for all cash register calculations to the server and retrieve the corresponding results from the server. You should package your application so that our engineers can run the application easily with a minimal and straightforward setup.

Document any assumptions you make that are not in the requirements, and provide unit tests sufficient to prove your program works.
