// Get the canvas element from our HTML below
var canvas = document.querySelector("#renderCanvas");
// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);
// -------------------------------------------------------------
// Here begins a function that we will 'call' just after it's built
var createScene = function () {
   // Now create a basic Babylon Scene object
   var scene = new BABYLON.Scene(engine);
   // Change the scene background color to green.
   scene.clearColor = new BABYLON.Color3(1, 1, 1);
   // This creates and positions a free camera
   var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(30, 20, -20), scene);
   // This targets the camera to scene origin
   camera.setTarget(BABYLON.Vector3.Zero());
   // This attaches the camera to the canvas
   camera.attachControl(canvas, false);
   // This creates a light, aiming 0,1,0 - to the sky.
   var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
   // Dim the light a small amount
   light.intensity = .9;
   // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    var materialSphere = new BABYLON.StandardMaterial("texture2", scene);
    materialSphere.diffuseColor = new BABYLON.Color3(0.1, 0.5, 0.75); //Red
    var materialSphere2 = new BABYLON.StandardMaterial("texture2", scene);
    materialSphere2.diffuseColor = new BABYLON.Color3(0.5, 1, 0); //Red
    var materialSphere3 = new BABYLON.StandardMaterial("texture2", scene);
    materialSphere3.diffuseColor = new BABYLON.Color3(1, 0, 0.5); //Red
    var materialSphere4 = new BABYLON.StandardMaterial("texture2", scene);
     materialSphere4.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1); //Red
   var sphere = BABYLON.Mesh.CreateSphere("control", 36, 1, scene);
   sphere.material = materialSphere;
   var sphere2 = BABYLON.Mesh.CreateSphere("dependance", 36, 0.5, scene);
 sphere2.material = materialSphere2;
   var sphere3 = BABYLON.Mesh.CreateSphere("nurture", 36, 1, scene);
 sphere3.material = materialSphere3;
   var sphere4 = BABYLON.Mesh.CreateSphere("opposition", 36, 1, scene);
 sphere4.material = materialSphere4;
   var spgr;
   var inner = BABYLON.Mesh.CreateTorus("inner", 4, 0.1, 36, scene, false);
   var outer = BABYLON.Mesh.CreateTorus("outer", 16, 0.1, 36, scene, false);
   var reservation = spgrf(-3,inner,outer);
   reservation.addOuter(sphere);
   reservation.addOuter(sphere2);
   reservation.addInner(sphere3);
   reservation.addOuter(sphere4);
   var teamSpirit = spgrf(0,inner,outer);
   teamSpirit.addOuter(sphere);
   teamSpirit.addInner(sphere2);
   teamSpirit.addInner(sphere3);
   teamSpirit.addOuter(sphere4);
   var production = spgrf(3,inner,outer);
   production.addInner(sphere);
   production.addInner(sphere2);
   production.addInner(sphere3);
   production.addOuter(sphere4);
   var innovation = spgrf(6,inner,outer);
   innovation.addInner(sphere);
   innovation.addInner(sphere2);
   innovation.addInner(sphere3);
   innovation.addInner(sphere4);

   var pipe = BABYLON.Mesh.CreateTube("Force",[new BABYLON.Vector3(0,-10,-6),new BABYLON.Vector3(0,10,6)],null,6,function(i,distance){
     return 0.2
   },BABYLON.Mesh.CAP_ALL,scene)
   var r = 0;
   scene.registerBeforeRender(function () {
       r-=0.01;
       switch(window.s) {
         case "reservation":
         spgr=reservation;
         break;
         case "teamSpirit":
         spgr=teamSpirit;
         break;
         case "production":
         spgr=production;
         break;
         case "innovation":
         spgr=innovation;
         break;
         default:
          spgr=reservation;
          break;
       }
       //The color is defined at run time with random()
       spgr.refresh(r)
   });
   // Leave this function
   return scene;
}; // End of createScene function


// -------------------------------------------------------------
// Now, call the createScene function that you just finished creating
var scene = createScene();
scene.debugLayer.shouldDisplayLabel = function (node) {

    return node.name==="control" || node.name==="dependance" || node.name==="nurture" || node.name==="opposition";
}
scene.debugLayer.show(false);
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
   scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
   engine.resize();
});
