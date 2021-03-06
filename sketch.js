// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/iAr6pG2B6/';
// Video
let video;
let flippedVideo;
// To store the classification
let label = '';

let question;
let questionFade = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  question = loadImage('question.png');
}

// create canvas and video
function setup() {
  // create canvas
  //createCanvas(1280, 720);
  createCanvas(640, 360);
  // Create the video
  video = createCapture(VIDEO);
  //video.size(1280, 720);
  video.size(640, 360);
  video.hide(); //让video显示在canvas上而不是堆叠元素
  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

// draw the canvas
function draw() {
  background(0, 255, 0);
  imageMode(CORNER);

  // Draw the video
   tint(255);
   image(flippedVideo, 0, 0);
  //if (label == 'question') {
  if (label == 'confused') {
    questionFade = 255;
  }
  if (questionFade > 0) {
    tint(255, questionFade);
    image(question, 0, 0);
    questionFade -= 10;
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
