import * as THREE from "../build/three.module.js";
import Stats from "../js/jsm/libs/stats.module.js";
import {OrbitControls} from "../js/jsm/controls/OrbitControls.js";
import * as dat from "../js/jsm/libs/dat.gui.module.js";

"use strict";

let renderer, scene, camera, mesh, cameraControl, stats, raycaster, mouse, model;

let listColors = ["White", "Black", "Red", "Blue", "Pink", "Green", "Yellow", "Purple", "Orange", "Gray", "Aqua", "Burlywood"];

class Mesh extends THREE.Mesh {
    constructor() {
        super();
    }
    setWireframe(value) {
        this.material.wireframe = value;
    }
    callback = function () {
        mesh = this;
        model.name = this.name;
        model.wireframe = this.material.wireframe;
        model.posX = this.position.x;
        model.posY = this.position.y;
        model.posZ = this.position.z;
        model.rotX = (this.rotation.x * 180) / Math.PI;
        model.rotY = (this.rotation.y * 180) / Math.PI;
        model.rotZ = (this.rotation.z * 180) / Math.PI;
        model.colorPalette = [
        mesh.material.color.r * 255,
        mesh.material.color.g * 255,
        mesh.material.color.b * 255,
        ];
    };
}

class Quad extends Mesh {
    constructor(){
        super();
        //QUAD
        let vertices = [-1, 1, 0,
                        -1, -1, 0,
                        1, -1, 0,
                        1, 1, 0];
        let indices = [0, 1, 2,   
                    0, 2, 3];

        this.geometry = new  THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setIndex(indices);
        this.material = new THREE.MeshBasicMaterial({color: "white", wireframe: false, side: THREE.DoubleSide});
    }
}

class Cube extends Mesh {
    constructor(){
        super();
        //CUBE
        let vertices = [-1,-1,-1,    
                        1,-1,-1,    
                        1, 1,-1,    
                        -1, 1,-1,
                        -1,-1, 1,    
                        1,-1, 1,    
                        1, 1, 1,    
                        -1, 1, 1];
        let indices = [2,1,0,    0,3,2,
                        0,4,7,    7,3,0,
                        0,1,5,    5,4,0,
                        1,2,6,    6,5,1,
                        2,3,7,    7,6,2,
                        4,5,6,    6,7,4];
        this.geometry = new  THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setIndex(indices);
        this.material = new THREE.MeshBasicMaterial({color: "white", wireframe: false, side: THREE.DoubleSide});
    }
}

class Pyramid extends Mesh {
constructor(){
    super();
    //PYRAMID
    let vertices = [ 1, 0, 1 ,  1, 0, -1,  -1, 0, -1,  -1, 0, 1,  0, 1, 0 ];
    let indices = [ 3, 2, 1,
                    3, 1, 0,  
                    3, 0, 4,  
                    0, 1, 4,
                    1, 2, 4,
                    2, 3, 4];
    this.geometry = new  THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    this.geometry.setIndex(indices);
    this.material = new THREE.MeshBasicMaterial({color: "white", wireframe: false, side: THREE.DoubleSide});
}
}

class Icosaedro extends Mesh {
    constructor(){
        super();
        let vertices = [
                        0,0,0, 
                        -2, 0, 0,   
                        -1, -1.73, 0, 
                        -1, 1.29, 1.15, 
                        -2.62, -1.51, 1.15, 
                        0.62, -1.51, 1.15, 
                        0.62, 0.36, 1.87, 
                        -2.62, 0.36, 1.87, 
                        -1, -2.45, 1.87, 
                        -1, 0.58, 3.02, 
                        -2, -1.15, 3.02, 
                        0, -1.15, 3.02 
                    ];
        let indices = [ 0, 1, 2,
                        0, 1, 3,
                        0, 2, 5,
                        0, 3, 6,
                        0, 5, 6,
                        1, 2, 4,
                        1, 3, 7, 
                        1, 4, 7,
                        2, 4, 8,
                        2, 5, 8,
                        3, 6, 9,
                        3, 7, 9,
                        4, 7, 10, 
                        4, 8, 10,
                        5, 6, 11, 
                        5, 8, 11,
                        6, 9, 11,
                        7, 9, 10,
                        8, 10, 11,
                        9, 10, 11
        ];
        this.geometry = new  THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setIndex(indices);
        this.material = new THREE.MeshBasicMaterial({color: "white", wireframe: false, side: THREE.DoubleSide});
    }
}

class Octaedro extends Mesh {
    constructor(){
        super();
        let vertices = [0, 0, 0,    
                        1, 1, 1,    
                        1, 1,-1,    
                        -1, 1,-1,
                        -1, 1, 1,    
                        0,2,0,    
                        ];
        let indices = [ 0, 1, 2,
                        0, 2, 3,    
                        0, 3, 4,    
                        0, 4, 1,
                        5, 1, 2,
                        5, 2, 3,    
                        5, 3, 4,    
                        5, 4, 1 
        ];
        this.geometry = new  THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setIndex(indices);
        this.material = new THREE.MeshBasicMaterial({color: "white", wireframe: false, side: THREE.DoubleSide});
    }
}

class Estrella extends Mesh {
    constructor(){
        super();
        let vertices = [0,1,0.63,   
                        -2, 0,-2,    
                        0, 0,-1.08,    
                        2, 0, -2, 
                        1.62, 0, 0.1,  
                        3.24, 0, 1.8,    
                        1, 0, 2,    
                        0, 0, 4.16,  
                        -1, 0, 2,  
                        -3.24, 0, 1.8,  
                        -1.62, 0, 0.1  
                    ];
        let indices = [
                        1, 2, 0,
                        1, 0, 10,
                        3, 0, 2,
                        3, 4, 0,
                        5, 0, 4, 
                        5, 6, 0,
                        7, 0, 6,
                        7, 8, 0,
                        9, 0, 8,
                        9, 10, 0

        ];
        this.geometry = new  THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setIndex(indices);
        this.material = new THREE.MeshBasicMaterial({color: "white", wireframe: false, side: THREE.DoubleSide});
    }
}

class PiramideTriangular extends Mesh {
constructor() {
    super();
    let vertices = [-2.04, 0, -1.18, 2.04, 0, -1.18, 0, 0, 2.35, 0, 4, 0];
    let indices = [0, 1, 2, 0, 1, 3, 1, 2, 3, 2, 0, 3];
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
    );
    this.geometry.setIndex(indices);
    this.material = new THREE.MeshBasicMaterial({
    color: "white",
    wireframe: false,
    side: THREE.DoubleSide,
    });
}
}

class PrismaTriangular extends Mesh {
    constructor(){
        super();
        let vertices = [-2, 0, -1,   
                        2, 0, -1,    
                        0, 0, 2.46,  
                        -2, 4, -1,   
                        2, 4, -1,    
                        0, 4, 2.46   
                    ];
        let indices = [
                        0, 1, 2,
                        1, 2, 4,
                        2, 5, 4,
                        2, 0, 5,
                        0, 3, 5,
                        0, 1, 3,
                        1, 4, 3,
                        3, 4, 5
        ];
        this.geometry = new  THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setIndex(indices);
        this.material = new THREE.MeshBasicMaterial({color: "white", wireframe: false, side: THREE.DoubleSide});
    }
}

class PrismaRectangular extends Mesh {
    constructor(){
        super();
        let vertices = [-1, 0, -1, 
                        1, 0, -1, 
                        1, 0, 1, 
                        -1, 0, 1, 
                        -1, 4, -1, 
                        1, 4, -1, 
                        1, 4, 1, 
                        -1, 4, 1  
                    ];
        let indices = [
                        0, 1, 2,
                        0, 2, 3,
                        0, 1, 4,
                        1, 5, 4,
                        1, 2, 5,
                        2, 6, 5,
                        2, 3, 6,
                        3, 7, 6, 
                        3, 0, 7, 
                        0, 4, 7,
                        7, 4, 6,
                        6, 4, 5
        ];
        this.geometry = new  THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setIndex(indices);
        this.material = new THREE.MeshBasicMaterial({color: "white", wireframe: false, side: THREE.DoubleSide});
    }
}

class PiramideOctagonal extends Mesh {
    constructor(){
        super();
        let vertices = [-2.41, 0, 1,    
                        0, 0, 2,    
                        0, 0, 0,    
                        -1.41, 0,-1.41,
                        -3.41,0,-1.41,    
                        -4.83, 0, 0,    
                        -4.83, 0, 2,    
                        -3.41,0, 3.41,
                        -1.41, 0, 3.41,
                        -2.41, 3, 1];
        let indices = [
                        0, 1, 2,
                        0, 2, 3,    
                        0, 3, 4,    
                        0, 4, 5,
                        0, 5, 6,    
                        0, 6, 7,    
                        0, 7, 8,
                        0, 8, 1,
                        9, 1, 2,
                        9, 2, 3,    
                        9, 3, 4,    
                        9, 4, 5,
                        9, 5, 6,    
                        9, 6, 7,    
                        9, 7, 8,
                        9, 8, 1
        ];
        this.geometry = new  THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setIndex(indices);
        this.material = new THREE.MeshBasicMaterial({color: "white", wireframe: false, side: THREE.DoubleSide});
    }
}

class PiramideHexagonal extends Mesh {
    constructor(){
        super();
        let vertices = [0, 0, 0,    
                        0, 0, 2,    
                        1.73, 0, 1,    
                        1.73, 0, -1,
                        0, 0, -2,    
                        -1.73, 0, -1,    
                        -1.73, 0, 1,   
                        0, 3, 0];
        let indices = [
                        0, 1, 2,
                        0, 2, 3,    
                        0, 3, 4,    
                        0, 4, 5,
                        0, 5, 6,    
                        0, 6, 1,
                        7, 1, 2,
                        7, 2, 3,    
                        7, 3, 4,    
                        7, 4, 5,
                        7, 5, 6,    
                        7, 6, 1 ];
        this.geometry = new  THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setIndex(indices);
        this.material = new THREE.MeshBasicMaterial({color: "white", wireframe: false, side: THREE.DoubleSide});
    }
}

function init() {
    // RENDERER
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    // STATS
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    // PLANEHELPER
    let normal = new THREE.Vector3(0, 1, 0);
    let distanceToPlane = 0;
    let plane = new THREE.Plane(normal, distanceToPlane);
    let color = "grey";
    let planeHelper = new THREE.PlaneHelper(plane, 20, color);

    planeHelper.callback = () => {
        console.log("plane");
    };

    scene.add(planeHelper);

    // GRIDHELPER
    let divisions = 10;
    let colorCenterLine = "red";
    let colorGrid = "grey";
    let gridHelper = new THREE.GridHelper(
        20,
        divisions,
        colorCenterLine,
        colorGrid
    );

    gridHelper.callback = () => {
        console.log("grid");
    };

    scene.add(gridHelper);

    //CAMERA
    let fov = 60;
    let aspect = window.innerWidth / window.innerHeight;
    let near = 0.1;
    let far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 3);
    cameraControl = new OrbitControls(camera, renderer.domElement);

    // MODELS
    //let geometry = new THREE.BoxGeometry();
    //let material = new THREE.MeshBasicMaterial({ wireframe: false });
    //mesh = new THREE.Mesh(geometry, material);
    //mesh.name = "Mesh Name";
    let cube = new Cube();
    cube.material.wireframe = true;
    scene.add(cube);
    mesh = cube;

    // GUI
    let gui = new dat.GUI();

    let mainGui = new dat.GUI();

    let meshGui = mainGui.addFolder("General Menu");

    //model
    model = {
        name: mesh.name,
        wireframe: mesh.material.wireframe,
        posX: mesh.position.x,
        posY: mesh.position.y,
        posZ: mesh.position.z,
        rotX: (mesh.rotation.x * 180) / Math.PI,
        rotY: (mesh.rotation.y * 180) / Math.PI,
        rotZ: (mesh.rotation.z * 180) / Math.PI,
        posHome: function () {
        model.posX = 0;
        mesh.position.x = model.posX;
        model.posY = 0;
        mesh.position.y = model.posY;
        model.posZ = 0;
        mesh.position.z = model.posZ;
        },
        listColors,
        defaultItem: listColors[0],
        colorPalette: [255, 255, 255],
    };

    let meshModel = {
        spawnQuad: () => {
            let quad = new Quad();
            quad.material.wireframe = true;
            scene.add(quad);
            mesh = quad;
            mesh.callback();
        },
        spawnCube: () => {
            let cube = new Cube();
            cube.material.wireframe = true;
            scene.add(cube);
            mesh = cube;
            mesh.callback();
        },
        spawnPyramid: () => {
            let pyramid = new Pyramid();
            pyramid.material.wireframe = true;
            scene.add(pyramid);
            mesh = pyramid;
            mesh.callback();
        },
        spawnIcosaedro: () => {
            let icosaedro = new Icosaedro();
            icosaedro.material.wireframe = true;
            scene.add(icosaedro);
            mesh = icosaedro;
            mesh.callback();
        },
        spawnOctaedro: () => {
            let octaedro = new Octaedro();
            octaedro.material.wireframe = true;
            scene.add(octaedro);
            mesh = octaedro;
            mesh.callback();
        },
        spawnEstrella: () => {
            let estrella = new Estrella();
            estrella.material.wireframe = true;
            scene.add(estrella);
            mesh = estrella;
            mesh.callback();
        },
        spawnPiramideTriangular: () => {
            let piramideTriangular = new PiramideTriangular();
            piramideTriangular.material.wireframe = true;
            scene.add(piramideTriangular);
            mesh = piramideTriangular;
            mesh.callback();
        },
        spawnPrismaTriangular: () => {
            let prismaTriangular = new PrismaTriangular();
            prismaTriangular.material.wireframe = true;
            scene.add(prismaTriangular);
            mesh = prismaTriangular;
            mesh.callback();
        },
        spawnPrismaRectangular: () => {
            let prismaRectangular = new PrismaRectangular();
            prismaRectangular.material.wireframe = true;
            scene.add(prismaRectangular);
            mesh = prismaRectangular;
            mesh.callback();
        },
        spawnPiramideOctagonal: () => {
            let piramideOctagonal = new PiramideOctagonal();
            piramideOctagonal.material.wireframe = true;
            scene.add(piramideOctagonal);
            mesh = piramideOctagonal;
            mesh.callback();
        },
        spawnPiramideHexagonal: () => {
            let piramideHexagonal = new PiramideHexagonal();
            piramideHexagonal.material.wireframe = true;
            scene.add(piramideHexagonal);
            mesh = piramideHexagonal;
            mesh.callback();
        },
        backgroundColor: listColors[1],
        stats: true,
    };

    let btnQuad = meshGui.add(meshModel, "spawnQuad").name("Quad");
    let btnCube = meshGui.add(meshModel, "spawnCube").name("Cube");
    let btnPyramid = meshGui.add(meshModel, "spawnPyramid").name("Pyramid");
    let btnIcosaedro = meshGui.add(meshModel, "spawnIcosaedro").name("Icosaedro");
    let btnOctaedro = meshGui.add(meshModel, "spawnOctaedro").name("Octaedro");
    let btnEstrella = meshGui.add(meshModel, "spawnEstrella").name("Estrella");
    let btnPiramideTriangular = meshGui.add(meshModel, "spawnPiramideTriangular").name("PiramideTriangular");
    let btnPrismaTriangular = meshGui.add(meshModel, "spawnPrismaTriangular").name("PrismaTriangular");
    let btnPrismaRectangular = meshGui.add(meshModel, "spawnPrismaRectangular").name("PrismaRectangular");
    let btnPiramideOctagonal = meshGui.add(meshModel, "spawnPiramideOctagonal").name("PiramideOctagonal");
    let btnPiramideHexagonal = meshGui.add(meshModel, "spawnPiramideHexagonal").name("PiramideHexagonal");

    let backgroundMenu = mainGui.addFolder("Background Menu");

    let backgroundColor = backgroundMenu.add(meshModel, "backgroundColor", model.listColors).name("Background Color").listen().onChange((item) => {
        meshModel.backgroundColor = item;
        scene.background = new THREE.Color(item.toLowerCase());
    });

    // General Menu
    let generalMenu = gui.addFolder("Mesh Menu");

    let tfMeshName = generalMenu.add(model, "name").name("Model's Name").onChange().listen().onFinishChange((value) => {}).onFinishChange((value) => {
        mesh.name = value;
    });

    let chbPlaneHelper = backgroundMenu.add(planeHelper, "visible").setValue(false).name("PlaneHelper");
    let chbGridHelper = backgroundMenu.add(gridHelper, "visible").setValue(false).name("GridHelper");

    let chbStats = backgroundMenu.add(meshModel, "stats").name("Stats").onChange((value) => {
        if (value) {
            stats.showPanel(0);
        } else {
            stats.showPanel(3);
        }
    });

    //VIEW
    // Position Menu
    let posMenu = gui.addFolder("Model's Position Menu");
    //posMenu.open();
    // Model Position
    let sliderPosX = posMenu.add(model, "posX").min(-10).max(10).step(0.5).name("X").listen().onChange((value) => {
        mesh.position.x = value;
    });

    let sliderPosY = posMenu.add(model, "posY").min(-10).max(10).step(0.5).name("Y").listen().onChange((value) => {
        mesh.position.y = value;
    });

    let sliderPosZ = posMenu.add(model, "posZ").min(-10).max(10).step(0.5).name("Z").listen().onChange((value) => {
        mesh.position.z = value;
    });

    let btnPosHome = posMenu.add(model, "posHome").name("HOME");

    // Rotation Menu
    let rotMenu = gui.addFolder("Model's Rotation Menu");

    // Model Orientation
    let sliderRotX = rotMenu.add(model, "rotX").min(-180).max(180).step(5).name("X (deg)").listen().onChange((value) => {
        mesh.rotation.x = (value * Math.PI) / 180;
    });

    let sliderRotY = rotMenu.add(model, "rotY").min(-180).max(180).step(5).name("Y (deg)").listen()
        .onChange((value) => {
        mesh.rotation.y = (value * Math.PI) / 180;
        });

    let sliderRotZ = rotMenu.add(model, "rotZ").min(-180).max(180).step(5).name("Z (deg)").listen().onChange((value) => {
        mesh.rotation.z = (value * Math.PI) / 180;
    });

    let appearMenu = gui.addFolder("Model's Appearance Menu");

    // Model Draw Mode
    let chbWireframe = appearMenu.add(model, "wireframe").setValue(true).name("Wireframe").listen().onChange((value) => {
        mesh.material.wireframe = value;
    });

    let listColor = appearMenu.add(model, "defaultItem", model.listColors).name("Color List").listen().onChange((item) => {
        mesh.material.color = new THREE.Color(item.toLowerCase());
        model.colorPalette = [
            mesh.material.color.r * 255,
            mesh.material.color.g * 255,
            mesh.material.color.b * 255,
        ];
    });

    let listPalette = appearMenu.addColor(model, "colorPalette").name("Color Palette").listen().onChange((color) => {
        mesh.material.color = new THREE.Color(
            color[0] / 255,
            color[1] / 255,
            color[2] / 255
        );
    });

    appearMenu.add(mesh.material, "transparent");
    appearMenu.add(mesh.material, "opacity", 0, 1, 0.01);

    //gui.close();

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // RENDER LOOP
    renderLoop();
}

function renderLoop() {
    // DRAW SCENE
    stats.begin();
    renderer.render(scene, camera);
    updateScene();
    stats.end();
    stats.update();
    requestAnimationFrame(renderLoop);
}

function updateScene() {
    
}

// EVENT LISTENERS & HANDLERS
document.addEventListener("DOMContentLoaded", init);
window.addEventListener("click", onDocumentMouseDown, false);

window.addEventListener("resize", function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function onDocumentMouseDown(event) {
    event.preventDefault();

    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    for (var i = 0; i < intersects.length; i++) {
        let element = intersects[i];
        if (
        element.object != scene.children[0] &&
        element.object != scene.children[1]
        ) {
        element.object.callback();
        break;
        }
    }
}