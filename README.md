# lambda-jam

lambda-jam is a [sweet.js](http://sweetjs.org/) macro, `λ`, which is used to create shorthand, anonymous functions with special argument identifiers. Its functionality is inspired by clojure's shorthand function macro, `#()`.

`npm install lambda-jam`

## Examples

lambda-jam's real power is derived from its special argument identifiers and the fact that it returns the last expression for you. `_1` references the first argument, `_2` references the second argument and so on up until `_9`. Though, the hope is that you're not passing 9 arguments to a function.

```javascript
var square = λ(_1 * _1);
console.log(square(4)); // 16

var sum = [1, 2, 3].reduce( λ(_1 + _2) );
console.log(sum); // 6

var tweets = [
  {viewed: true, msg: "kjadf"},
  {viewed: false, msg: "sweet"},
  {viewed: false, msg: "js"}
];

var joinedMsg = tweets.filter( λ(!_1.viewed && _1.msg) ).map( λ(_1.msg) ).join('.');
console.log(joinedMsg); // sweet.js
```

Check the test suite for a few more examples.

## Tests

`make test`

## License

[MIT](https://github.com/benjreinhart/lambda-jam/blob/master/LICENSE.txt)
