/* Adapted from index.html calcAccum at source commit recorded in README.
   Same month-end deposits, nominal annual / 12, yearly inflation increase.
   No initial deposit or tax reinvestment. Horizon follows selected retirement age. */
(function(root){
  function project(age, retirement, monthly){
    if(!Number.isInteger(age)||!Number.isInteger(retirement)||age<20||age>65||retirement<=age||retirement>80||!Number.isFinite(monthly)||monthly<0||monthly>20000) throw new RangeError('Escenario fuera de límites');
    const annual=0.10, inflation=0.04, frequency=12;
    let balance=0, contributed=0, payment=monthly;
    const points=[{age,balance,contributed}];
    for(let year=1;year<=retirement-age;year++){
      if(year>1) payment*=1+inflation;
      for(let month=0;month<frequency;month++){
        balance*=1+annual/frequency;
        balance+=payment;
        contributed+=payment;
      }
      points.push({age:age+year,balance,contributed});
    }
    return {balance,contributed,points};
  }
  root.GarbaProjection=project;
  if(typeof module!=='undefined') module.exports=project;
})(typeof window==='undefined'?globalThis:window);
