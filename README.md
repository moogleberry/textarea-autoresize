# textarea-autoresize
Angular 1.x directive to automatically vertically resize a textarea to fit its contents.

In Action: https://plnkr.co/edit/HlBamg?p=preview

## Install
* Include the `textarea-autoresize.js` script in your app.

> angular.module('myApp', [
'textareaAutoresize'
]);

## Usage
`<textarea textarea-autoresize ng-model="myModel"></textarea>`

## Requirements
* Angular 1.x
* jQuery

## How does it work?
It watches the three most common things that could change the vertical height of a textarea:
* Model changes
* Window resize events
* Visibility changes (This means that initializing your textarea while hidden is A-OK!)