macro λ {
  case {$lambda ($body ... $last:expr) } => {
    var ctx = #{$lambda};

    var stx = resolvePlaceholders(#{
      $body ...
      return $last
    }, ctx);

    return [
      makeKeyword('function', ctx),
      makeDelim('()', stx.args, ctx),
      makeDelim('{}', stx.body, ctx)
    ];

    function resolvePlaceholders(stx, ctx){
      var argsReferenced = [];

      var body = createIdentifiers(stx);
      var amountOfArgs = argsReferenced.sort(function(x, y){return +x > +y})[argsReferenced.length - 1];
      var args = buildArgumentIdentifiers(amountOfArgs, ctx);

      return {args: args, body: body}

      function createIdentifiers(stx) {
        return stx.reduce(function(stxList, s){
          if (s.token.type === parser.Token.Identifier && /^_[1-9]{1}$/.test(s.token.value)) {
            var idx = s.token.value.charAt(1);
            var ident = makeIdent('_' + idx, ctx);
            argsReferenced.push(idx);
            return stxList.concat(ident);
          }
          if (s.token.type === parser.Token.Delimiter) {
            s.expose();
            s.token.inner = createIdentifiers(s.token.inner);
          }
          return stxList.concat(s);
        }, []);
      }

      function buildArgumentIdentifiers(amount, ctx){
        var stx = [], i;

        for(i = 0; i < amount; i++) {
          stx.push(makeIdent("_" + (i + 1), ctx));
          if (!(i + 1 >= amount)) {
            stx.push(makePunc(",", ctx));
          }
        }
        return stx;
      }
    }
  }
  case {_ ()} => {return #{function(){}}}
  case {_} => {return #{function(){}}}
}

export λ;
