var Q = require('q');
function calcPrimes( num ){
  var i, n=1, primes = 1;
  var results = [];
  primeLoop: while ( primes < num ){
    n += 1;
//    console.log(n + " checking if prime");
    for ( i = 2; i <= Math.sqrt( n ); i += 1 ){
      if (n % i === 0 ) {
        continue primeLoop;
      }
    }
    results.push( n ); 
    primes += 1;
   
  }
  return results;

}

var primeCalculator = function(num){ 
  return Q.fcall(function(){
    var res, noError=true;
    console.log(num + " calc " + new Date().getTime());
    res = calcPrimes(num)  
    if (noError){
      return res;
    } 
    throw("whoa");
  });
};

console.log("fcall start " + new Date().getTime() );
primeCalculator(3000).then( function( resArr ){
  console.log("result " + new Date().getTime());
  console.log(resArr.length);
}, function(reason){
  console.log("error " + reason );
});
console.log("fcall Done " + new Date().getTime());

var primeCalcCB = function(num, cb){
    primeCalculator(num).then( function( resArr ){
      cb( resArr );
    });
  };


var primeHelper = function(num){
  var deferred = Q.defer();
  primeCalcCB(num, function( resArr ){
    deferred.resolve( resArr );
  });
  return deferred.promise;
};

console.log("deferred start " + new Date().getTime() );
primeHelper(300000).then(function(resArr){
  console.log(resArr.length);
}); 
console.log("deferred Done " + new Date().getTime());
