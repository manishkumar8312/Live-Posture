// Used p5.js for capturing Images
let capture;
let posenet;
let singlePose, skeleton;
function setup() {
  createCanvas(800, 500);
  capture = createCapture(VIDEO);
  capture.size(800, 500); // Match canvas size
  capture.hide();

  posenet = ml5.poseNet(capture, modelLoaded);
  posenet.on("pose", receivedPoses); // Important! Calls receivedPoses when PoseNet detects a pose
}

function modelLoaded() {
  console.log("PoseNet Model has loaded");
}

function receivedPoses(poses) {
  if (poses.length > 0) {
    singlePose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function draw() {
  // Mirror the video
  translate(width, 0);
  scale(-1, 1);
  image(capture, 0, 0, 800, 500);

  // Flip back for correct ellipse positioning
  translate(width, 0);
  scale(-1, 1);

  if (singlePose) {
    fill(255, 0, 0);
    for (let i = 0; i < singlePose.keypoints.length; i++) {
      let mirroredX = width - singlePose.keypoints[i].position.x;
      let y = singlePose.keypoints[i].position.y;
      ellipse(mirroredX, y, 10, 10); // Adjusted for mirroring
    }

    stroke(255, 255, 255);
    strokeWeight(2);
    for (let j = 0; j < skeleton.length; j++) {
      let mirroredX1 = width - skeleton[j][0].position.x;
      let y1 = skeleton[j][0].position.y;
      let mirroredX2 = width - skeleton[j][1].position.x;
      let y2 = skeleton[j][1].position.y;
      line(mirroredX1, y1, mirroredX2, y2); // Adjusted for mirroring
    }
  }
}
