var expect = require('chai').expect;

describe('lambda-jam', function(){
  it('is an empty function', function(){
    // to.not.throw will invoke it, so this asserts
    // that it is a function that can be called
    expect( λ ).to.not.throw(Error);
    expect( λ() ).to.not.throw(Error);
  });

  it('returns the result of the last expression of the function body', function(){
    var f = λ(var x = 2; x + 2);
    expect( f() ).to.equal(4);
  });

  it('aliases arguments with _[argument index + 1] up to the 8th index', function(){
    var f = λ(_1 + _2 + _3 + _4 + _5 + _6 + _7 + _8 + _9);
    expect( f(1, 2, 3, 4, 5, 6, 7, 8, 9) ).to.equal(45);
  });

  it('works well', function(){
    var tweets = [
      {username: 'john', msg: 'blah', viewed: true},
      {username: 'bob', msg: 'sweet', viewed: false},
      {username: 'alice', msg: 'js', viewed: false}
    ];

    var hiddenMsg = tweets.filter( λ(!_1.viewed) ).map( λ(_1.msg) ).join('.');

    expect(hiddenMsg).to.equal('sweet.js');
  });

  it('is fun to use', function(){
    var sum = [1, 2, 3].reduce(λ(_1 + _2));
    expect(sum).to.deep.equal(6);
  });

  it('can be used in interesting places', λ( expect(true).to.not.equal(false) ));
});
