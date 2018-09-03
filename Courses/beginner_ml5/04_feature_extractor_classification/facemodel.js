let model;
let video;
let label = 'Hello!';
let classifier;
let smileButton;
let sadButton;
let trainButton;
var text = document.getElementById('text');
let cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  cnv.position(x, 10);
}

function windowResized() {
  centerCanvas();
}

function setup(){
    cnv = createCanvas(640, 480);
    centerCanvas();
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    model = ml5.featureExtractor('MobileNet', modelReady);
    classifier = model.classification(video, videoReady);
    
    smileButton = createButton('Smile');
    smileButton.id('smile');
    smileButton.mousePressed(()=>{ classifier.addImage('Happy');
    });
    
    sadButton = createButton('Sad');
    sadButton.id('sad');
    sadButton.mousePressed(()=>{
        classifier.addImage('Sad');
    });
    
    trainButton = createButton('Train');
    trainButton.id('train');
    trainButton.mousePressed(()=> {
        classifier.train((loss)=>{
            if(loss == null){
               document.getElementById("training").innerHTML = 'Training Complete!!';
                classifier.classify(gotResults);
            }else{
                document.getElementById("error").innerHTML = 'Error: '+ Math.floor(loss*100);
                document.getElementById("training").innerHTML = 'Training...';
            }
        }); 
    });
}
                             

function modelReady(){
    console.log('Model is Ready!!');
}

function videoReady(){
    console.log('Video is Ready!!');
}

function gotResults(error, result){
    if(error){
       console.error(error);
       }else{
           label = result;
           classifier.classify(gotResults);
       }
}

function draw(){
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(32);
    text(label, 10, height-20);
}