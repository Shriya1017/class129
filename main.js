scoreLeftWrist=0;
leftWristX=0;
leftWristY=0;

RightWristX=0;
RightWristY=0;
song="";

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses)
}

function modelLoaded(){
    console.log("posenet is Initialized");
}

function draw(){
    image(video,0,0,600,500);
     fill("#4287f5");
     stroke("#f5427b");
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        InNumberLeftWristY=Number(leftWristY);
        remove_decimals=floor(InNumberLeftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume= "+volume;
        song.setVolume(volume);
    }

}

function preload(){
    song=loadSound("music.mp3");
}

function Play(){
    song.play();
    
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length>0){
    console.log(results);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist="+scoreLeftWrist);
    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    console.log("leftwristX="+leftwristX+" leftwristY="+leftwristY);

    RightWristX=results[0].pose.rightWrist.x;
    RightWristY=results[0].pose.rightWrist.y;
    console.log("RightWristX="+RightWristX+"RightWristY="+RightWristY);
    }
}