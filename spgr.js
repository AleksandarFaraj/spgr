function spgr(synergyLevel, innerRing, outerRing) {

  var inner=[];
  var synergy=synergyLevel;
  var outer=[];
  return {addInner:addInner,addOuter:addOuter,refresh:refresh}
  function addInner(sphere,label){

    inner.push(Sphere(synergy,sphere,1,2))
  }
  function addOuter(sphere,label){
    outer.push(Sphere(synergy,sphere,0.5,8))
  }
  function refresh(r){
    inner.forEach(function(sphere,i,arr){
      sphere.draw(r,i,arr.length);
    })
    outer.forEach(function(sphere,i,arr){
      sphere.draw(r,i,arr.length);
    })
    innerRing.position.y = synergy;
    innerRing.position.z = synergy*0.6;
    outerRing.position.y = synergy;
    outerRing.position.z = synergy*0.6;
  }
}
function moveTo(from,to,speed){
  speed = speed || 0.01;
  var c = to-from;
  if (c > speed){
    speed=speed*-1;
  }
  return from-(speed);
}
function Sphere(synergy,sphere,speed,distance){
  return {draw:draw}
  function draw(r,index,length) {
    var rc = r*speed+calcPlusR(index,length)
    var s = moveTo(sphere.position.y,synergy);
    sphere.position.y = synergy
    sphere.position.x = Math.cos(rc)*distance;
    sphere.position.z = Math.sin(rc)*distance+synergy*0.6;
  }
}

function calcPlusR(index,length){
  var r360 = Math.PI*2/360;
  var piece = 360/(length)*(index);
  return r360 * piece;
}
spgrf=spgr;
