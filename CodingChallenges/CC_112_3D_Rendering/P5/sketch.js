// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in
// Javascript transcription: Chuck England

// Coding Challenge #112: 3D Rendering with Rotation and Projection
// https://youtu.be/p4Iz0XJY-Qk

let angle = 0;

let points = [];

const projection = [
    [1, 0, 0],
    [0, 1, 0],
];

function setup() {
    createCanvas(600, 400);

    points[0] = createVector(-0.5, -0.5, -0.5);
    points[1] = createVector(0.5, -0.5, -0.5);
    points[2] = createVector(0.5, 0.5, -0.5);
    points[3] = createVector(-0.5, 0.5, -0.5);
    points[4] = createVector(-0.5, -0.5, 0.5);
    points[5] = createVector(0.5, -0.5, 0.5);
    points[6] = createVector(0.5, 0.5, 0.5);
    points[7] = createVector(-0.5, 0.5, 0.5);
}

function draw() {
    background(0);
    translate(width / 2, height / 2);

    const rotationZ = [
        [cos(angle), -sin(angle), 0],
        [sin(angle), cos(angle), 0],
        [0, 0, 1],
    ];

    const rotationX = [
        [1, 0, 0],
        [0, cos(angle), -sin(angle)],
        [0, sin(angle), cos(angle)],
    ];

    const rotationY = [
        [cos(angle), 0, sin(angle)],
        [0, 1, 0],
        [-sin(angle), 0, cos(angle)],
    ];

    let projected = [];

    let index = 0;
    points.forEach(v => {
        let rotated = matmul(rotationY, v);
        rotated = matmul(rotationX, rotated);
        rotated = matmul(rotationZ, rotated);
        let projected2d = matmul(projection, rotated);
        projected2d.mult(200);
        projected[index] = projected2d;
        //point(projected2d.x, projected2d.y);
        index++;
    });

    projected.forEach(v => {
        stroke(255);
        strokeWeight(16);
        noFill();
        point(v.x, v.y);
    });

    // Connecting
    for (let i = 0; i < 4; i++) {
        connect(i, (i + 1) % 4, projected);
        connect(i + 4, ((i + 1) % 4) + 4, projected);
        connect(i, i + 4, projected);
    }

    angle += 0.03;
}

function connect(i, j, points) {
    const a = points[i];
    const b = points[j];
    strokeWeight(1);
    stroke(255);
    line(a.x, a.y, b.x, b.y);
}