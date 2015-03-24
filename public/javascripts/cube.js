        "use strict";
        //read in data for each cube
        var cubeData = [{}];
        var container;
        var camera, scene, renderer, controls;


        function init() {
            //GLOBALS
             $.getJSON('https://enigmatic-chamber-3189.herokuapp.com/led/list', function(data) {
                console.log(data);            });
            var cubeSize = 4;
            var gapSize = cubeSize * 20;
            var id = 0;

            //render everthing
            //set renderer colour
            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(0x000000);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth /2, window.innerHeight/2);
            document.body.appendChild(renderer.domElement);
            //set the scene and camera
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2500);
            camera.position.set(250, 250, 1000);



            //controls :
            controls = new THREE.TrackballControls(camera, renderer.domElement);
            controls.minDistance = 200;
            controls.maxDistance = 1500;

            //lights
            scene.add(new THREE.AmbientLight(0x222222));
            var light = new THREE.PointLight(0xffffff);
            light.position.copy(camera.position);
            scene.add(light);


            // cube of cubes! 4 * 4 * 4 but set amount via cubesize
            for (var x = 0; x < cubeSize; x++) {
                for (var y = 0; y < cubeSize; y++) {
                    for (var z = 0; z < cubeSize; z++) {
                        id++;
                        var randomColor = Math.random() * 0xFFFFFF << 0;
                        cubeData.push({
                            "id": id,
                            "x": x,
                            "y": y,
                            "z": z,
                            "colour": 0x00FF00 
                        });

                        //create box 
                        var geometry = new THREE.SphereGeometry(20, 20, 20);
                        var material = new THREE.MeshBasicMaterial({
                        color: cubeData[id].colour
                        });
                        
                        var newMaterial = new THREE.MeshPhongMaterial({vertexColors: THREE.FaceColors, ambient: 0x555555, color: cubeData[id].colour, specular: 0xffffff, shininess: 50, shading: THREE.SmoothShading});
                        var shape = new THREE.Mesh(geometry, newMaterial);
                        shape.position.set(x * (gapSize), y * (gapSize), z * (gapSize)); //sort out gaps

                        scene.add(shape); //add shape to scene

                    }

                }
            }

        }
        console.log(cubeData);
        function animate() {            
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }
            //Do all the things
        init();
        animate();