img="";
status="";
objects=[];


function setup(){
    canvas = createCanvas(600,500);
    canvas.position(645,400);
    video=createCapture(VIDEO);
    video.hide();
  
}
function start(){
  objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
     item = document.getElementById("item").innerHTML;
}
function modelLoaded(){
    console.log("Model has been loaded.");
    status=true;
   
}

function gotresult(error,result){

if(error){
   console.error(error);
}
else{
    console.log(result);
    objects=result;
}

}

function draw(){
 
      image(video,0,0,600,500);
 if(status != ""){
    objectDetector.detect(video,gotresult);
            
            for(i=0; i<objects.length; i++){ 
                percent=floor(objects[i].confidence*100);
                    text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
                    noFill();
                     rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

                if(objects[i].label == item){ 
                   
                    document.getElementById("status").innerHTML="Status: Object Detected";
                    document.getElementById("number_of_objects").innerHTML= item + " Detected : " + percent;
                    video.stop();
                    objectDetector.detect(gotresult);
                    var synth = window.speechSynthesis;
                    var utterThis = new SpeechSynthesisUtterance(item + "found");
                    synth.speak(utterThis);
                }

                else{
                    document.getElementById("status").innerHTML="Status: Object Not Detected";
                    document.getElementById("number_of_objects").innerHTML= item+" Not Detected";
                    var synth1 = window.speechSynthesis;
                    var utterThis1 = new SpeechSynthesisUtterance(item + "not found");
                    synth1.speak(utterThis1);
                   
                }
                    
            }
        }
}


  
