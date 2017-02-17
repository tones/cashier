Cashier
=====================

**Written by Tim Jones for David X at Benetech, February 2017**

## Howto

 * To use the app quickly, here it is running on Heroku
 * To run the app locally, clone this repository, then run `npm install` and `npm start`
 * To run tests....

## Key Files

 * The core transaction logic lives in the `/models` directory.
  * The `CashRegister` object runs the show
  * The `CashBundle` object is a helper to `CashRegister`
 * The primary client-side logic lives in `/public/cashier.js`
 * The control logic lives in `router.js`
 * The `test` directory contains tests for the core models. (The web server and related components are not tested.)

## Room to Grow

There's plenty of room for improvement here, but I cut myself off before I got carried away. Things I would probably work on next if I wanted to spend more time:

 * The front-end JQuery code is a lot sloppier than the back-end Node code. If this was a serious web application, a lot more documentation and structure would be necessary here.
 * bar

## Tooling

 * Node.js is our server-side framework
 * Express.js is our Node web-server
 * Pug handles server-side views
 * JSDoc for server-side code documentation
 * Chai is our unit-testing framework
 * Mocha is used for running Chai tests from the CLI
 * Bower manages client-side javascript packages
 * JQuery is our client-side javascript framework
 * Mustache.js provides client-side javascript templating

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
