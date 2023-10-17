function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('mobilenet',modelloaded);
}

function modelloaded(){
  console.log("Model has been loaded");

}

function draw() {
 image(video,0,0,300,300);
 classifier.classify(video,gotresult);
  
}
previousresult=''
function gotresult(error,results){
  if(error){
    console.error(error);
  }
  else{
     if((results[0].confidence>0.5)&&(previousresult!=results[0].label)){
      console.log(results);
      previousresult=results[0].label;
      document.getElementById("resultname").innerHTML=results[0].label;
      document.getElementById("resultaccuracy").innerHTML=results[0].confidence.toFixed(3);
      synth=window.speechSynthesis;
      speakdata="object identified as "+results[0].label;
      utterthis=new SpeechSynthesisUtterance(speakdata);
      synth.speak(utterthis);

     }
    
  }
}

