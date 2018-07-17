// Daniel Shiffman
// Intelligence and Learning
// The Coding Train

// Full tutorial playlist:
// https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bmMRCIoTi72aNWHo7epX4L

// Code from end of 7.4
// https://youtu.be/gRNvA6c4ero

// Community version:
// https://codingtrain.github.io/ColorClassifer-TensorFlow.js
// https://github.com/CodingTrain/ColorClassifer-TensorFlow.js

// Suspect Users
// YGdqOTDDmrbGm80gM5UHicxMBgS2
// HUXmyv1dSSUnIvYk976MPWUSaTG2
// hPdk0Qpo0Gb5NsWSgxsqPM7M2EA2

let colorByLabel = {
  'blue-ish': [],
  'green-ish': [],
  'pink-ish': [],
  'grey-ish': [],
  'red-ish': [],
  'purple-ish': [],
  'brown-ish': [],
  'orange-ish': [],
  'yellow-ish': [],
}

let label = 'grey-ish';


function setup() {
  createCanvas(400, 400);


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDPekCKX4ee6h9NVR2lEITGAM0XIHn-c7c",
    authDomain: "color-classification.firebaseapp.com",
    databaseURL: "https://color-classification.firebaseio.com",
    projectId: "color-classification",
    storageBucket: "",
    messagingSenderId: "590040209608"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  let ref = database.ref('colors');
  ref.once('value', gotData); //, errorData);
}



function gotData(results) {
  let data = results.val();

  // Processing data
  let keys = Object.keys(data);
  console.log(keys.length);

  let userData = [];

  for (let key of keys) {
    let record = data[key];
    //let col = color(record.r, record.g, record.b);
    colorByLabel[record.label].push(record);


    if(record.uid == 'YGdqOTDDmrbGm80gM5UHicxMBgS2') {
      userData.push(record);
    }
  }

  // Visualizing Data by User
  userData.sort((a,b) => {a.label > b.label
    if (a.label > b.label) {
      return 1;
    } else {
      return -1;
    }
  });

  let title = createDiv(`Data Entered by ${userData[0].uid}`);
  title.style('padding-top','50px');
  for (let entry of userData) {
    let div = createDiv(entry.label);
    let colorBox = createDiv('');
    colorBox.parent(div);
    colorBox.size(10,10);
    colorBox.style('background-color',`rgb(${entry.r},${entry.g},${entry.b})`)
  }



  // Visualizing Data by Color Label
  let blues = colorByLabel[label];
  let x = 0;
  let y = 0;
  for (let i = 0; i < blues.length; i++) {
    noStroke();
    fill(blues[i].r, blues[i].g, blues[i].b);
    rect(x,y,10,10);
    x += 10;
    if (x >= width) {
      x = 0;
      y += 10;
    }
  }

  function mousePressed() {
    let i = floor(mouseX / 10);
    let j = floor(mouseY / 10);
    let index = i + j * (width / 10);
    let data = colorByLabel[label];
    console.log(data[index]);
  }

  // Console Log Users (sorted by amoutn of entries)

  //console.log(colorByLabel);

  // let uid_bycount = {};
  // let users = [];
  //
  // for (let key of keys) {
  //   let record = data[key];
  //   let id = record.uid;
  //
  //   if (!uid_bycount[id]) {
  //     uid_bycount[id] = 1;
  //     users.push(id);
  //   } else {
  //     uid_bycount[id]++;
  //   }
  // }
  //
  // users.sort((a,b) => {
  //   return uid_bycount[a] - uid_bycount[b];
  // })
  //
  // for (let id of users) {
  //   console.log(`${id} ${uid_bycount[id]}`);
  // }

  //console.log(uid_bycount)

}
