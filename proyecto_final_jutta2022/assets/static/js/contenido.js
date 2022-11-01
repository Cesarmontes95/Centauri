//===================================================== Escenas
var scene = new THREE.Scene();
//===================================================== camara
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.x = 0;
camera.position.y = 1;
camera.position.z = 275;
//===================================================== Añadir luces delanteras y traseras
var light = new THREE.DirectionalLight(new THREE.Color("white"), 1);
light.position.set(1, 3, 2).normalize();
scene.add(light);

var light = new THREE.DirectionalLight(new THREE.Color("white"), 1);
light.position.set(-1, -3, -2).normalize();
scene.add(light);

//===================================================== add Grid
 /*var plane = new THREE.GridHelper(5000, 10);
  plane.material.color = new THREE.Color( 'white');
  scene.add(plane);*/

//===================================================== add canvas
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.LinearToneMapping;
document.body.appendChild(renderer.domElement);

//===================================================== añadir controles
/*var controls = new THREE.OrbitControls(camera, renderer.domElement);*/

//===================================================== Glow
var renderScene = new THREE.RenderPass(scene, camera);
var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
effectFXAA.uniforms["resolution"].value.set(
  1 / window.innerWidth,
  1 / window.innerHeight
);
var copyShader = new THREE.ShaderPass(THREE.CopyShader);
copyShader.renderToScreen = true;

var bloomStrength = 1;
var bloomRadius = 0;
var bloomThreshold = 0.5;
var bloomPass = new THREE.UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  bloomStrength,
  bloomRadius,
  bloomThreshold
);

var composer = new THREE.EffectComposer(renderer);
composer.setSize(window.innerWidth, window.innerHeight);
composer.addPass(renderScene);
composer.addPass(effectFXAA);
composer.addPass(bloomPass);
composer.addPass(copyShader);

//===================================================== tamaños
window.addEventListener("resize", function() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

//===================================================== Ubicaciones
const our_data = [
  {
    origin: { name: "El Salvador", latitude: 13.794185, longitude: -88.89653 },
    destination: { name: "Estados Unidos", latitude: 37.09024, longitude: -95.712891 }
  },
  {
    origin: { name: "Estados Unidos", latitude: 37.09024, longitude: -95.712891 },
    destination: { name: "España", latitude: 40.463667, longitude: -3.74922  }
  },
  {
    origin: { name: "India", latitude: 20.593684, longitude: 78.96288 },
    destination: { name: "Argentina", latitude: -38.416097, longitude: -63.616672 }
  },
  {
    origin: { name: "España", latitude: 40.463667, longitude: -3.74922 },
    destination: { name: "El Salvador", latitude: 13.794185, longitude: -88.89653 }
  }
    
];

//===================================================== helper functions
const clamp = (num, min, max) => (num <= min ? min : num >= max ? max : num);

const DEGREE_TO_RADIAN = Math.PI / 180;

function coordinateToPosition(lat, lng, radius) {
  const phi = (90 - lat) * DEGREE_TO_RADIAN;
  const theta = (lng + 180) * DEGREE_TO_RADIAN;

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

//===================================================== d3.json
d3.json(
  "https://raw.githubusercontent.com/baronwatts/data/master/world.json",
  function(err, data) {
    //===================================================== crate canvas texturefor the globe
    var projection = d3.geo
      .equirectangular()
      .translate([1024, 512])
      .scale(326);

    var countries = topojson.feature(data, data.objects.countries);

    var canvas = d3
      .select("body")
      .append("canvas")
      .style("display", "none")
      .attr("width", "2048px")
      .attr("height", "1024px");

    var context = canvas.node().getContext("2d");

    var path = d3.geo
      .path()
      .projection(projection)
      .context(context);

    context.strokeStyle = "white";
    context.lineWidth = 0.25;
    context.fillStyle = "#000";

    context.beginPath();

    path(countries);

    context.fill();
    context.stroke();

    var mapTexture = new THREE.Texture(canvas.node());
    mapTexture.needsUpdate = true;

    //===================================================== add globe
    var group = new THREE.Group();
    scene.add(group);
    group.rotateX(Math.PI / 8);

    var RADIUS = 140;

    var sphereGeometry = new THREE.SphereGeometry(RADIUS, 60, 60);
    var sphereMaterial = new THREE.MeshPhongMaterial({
      map: mapTexture,
      transparent: true,
      opacity: 1,
      color: new THREE.Color("white")
    });
    var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    earthMesh.name = "earth";
    group.add(earthMesh);

    //===================================================== add glow effect to globe
    var customMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: document.getElementById("vertexShader").textContent,
      fragmentShader: document.getElementById("fragmentShader").textContent,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    var ballGeometry = new THREE.SphereGeometry(170, 60, 60);
    var ball = new THREE.Mesh(ballGeometry, customMaterial);
    scene.add(ball);

    //===================================================== lng & lat
    function Destination(array) {
      array.map((d, i) => {
        //convert lng & lat coordinates to 3d space
        var startLat = d.origin.latitude;
        var startLng = d.origin.longitude;

        var endLat = d.destination.latitude;
        var endLng = d.destination.longitude;

        var x = -(
          RADIUS *
          Math.sin((90 - startLat) * (Math.PI / 180)) *
          Math.cos((startLng + 180) * (Math.PI / 180))
        );
        var z =
          RADIUS *
          Math.sin((90 - startLat) * (Math.PI / 180)) *
          Math.sin((startLng + 180) * (Math.PI / 180));
        var y = RADIUS * Math.cos((90 - startLat) * (Math.PI / 180));

        var x2 = -(
          RADIUS *
          Math.sin((90 - endLat) * (Math.PI / 180)) *
          Math.cos((endLng + 180) * (Math.PI / 180))
        );
        var z2 =
          RADIUS *
          Math.sin((90 - endLat) * (Math.PI / 180)) *
          Math.sin((endLng + 180) * (Math.PI / 180));
        var y2 = RADIUS * Math.cos((90 - endLat) * (Math.PI / 180));

        //store the starting and ending positions of each location
        var start = new THREE.Vector3(x, y, z);
        var end = new THREE.Vector3(x2, y2, z2);

        //points
        var pointGeom = new THREE.SphereGeometry(1, 10, 10);
        var point = new THREE.Mesh(
          pointGeom,
          new THREE.MeshBasicMaterial({ color: new THREE.Color("white") })
        );
        var point2 = new THREE.Mesh(
          pointGeom,
          new THREE.MeshBasicMaterial({ color: new THREE.Color("white") })
        );

        //spaces out the points
        point.position.set(x, y, z);
        point2.position.set(x2, y2, z2);
        point.lookAt(new THREE.Vector3(0, 0, 0));
        point2.lookAt(new THREE.Vector3(0, 0, 0));
        group.add(point);
        group.add(point2);

        //https://medium.com/@xiaoyangzhao/drawing-curves-on-webgl-globe-using-three-js-and-d3-draft-7e782ffd7ab
        const CURVE_MIN_ALTITUDE = 20;
        const CURVE_MAX_ALTITUDE = 100;
        const altitude = clamp(
          start.distanceTo(end) * 0.75,
          CURVE_MIN_ALTITUDE,
          CURVE_MAX_ALTITUDE
        );

        //get the middle position of each location
        var lat = [startLng, startLat];
        var lng = [endLng, endLat];
        var geoInterpolator = d3.geoInterpolate(lat, lng);

        const midCoord1 = geoInterpolator(0.25);
        const midCoord2 = geoInterpolator(0.75);

        const mid1 = coordinateToPosition(
          midCoord1[1],
          midCoord1[0],
          RADIUS + altitude
        );
        const mid2 = coordinateToPosition(
          midCoord2[1],
          midCoord2[0],
          RADIUS + altitude
        );

        //create bezier curve from the lng & lat positions
        var curve = new THREE.CubicBezierCurve3(start, mid1, mid2, end);
        var g = new THREE.TubeGeometry(curve, 100, 0.35, 10, false);
        var m = new THREE.MeshBasicMaterial({
          color: new THREE.Color(
            "hsl(" + Math.floor(Math.random() * 360) + ",50%,50%)"
          )
        });
        curveObject = new THREE.Mesh(g, m);
        group.add(curveObject);
      });
    } //end Destination()

    Destination(our_data);

    //===================================================== add Animation
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      composer.render();
    }
    animate();
  }
); //end d3.json
