var width = 640;
// var client = new HttpClient();
var height = 480;
var detector;
var item = false;
function nextItem() {
    item = true;
}
onload = function () {

    
    // client.get('https://g7gu5b2l8j.execute-api.us-east-1.amazonaws.com/developer ', function(response) {
    //     console.log(response);
    //     // do something with response
    // });

    // SDK Needs to create video and canvas nodes in the DOM in order to function
    // Here we are adding those nodes a predefined div.
    var divRoot = document.getElementById("affdex_elements");

    //Construct a CameraDetector and specify the image width / height and face detector mode.
    detector = new affdex.CameraDetector(divRoot, width, height, affdex.FaceDetectorMode.LARGE_FACES);

    //Enable detection of all Expressions, Emotions and Emojis classifiers.
    detector.detectAllEmotions();
    detector.detectAllExpressions();
    detector.detectAllEmojis();
    detector.detectAllAppearance();

    //Add a callback to notify when the detector is initialized and ready for runing.
    detector.addEventListener("onInitializeSuccess", function () {
        log('logs', "The detector reports initialized");
        //Display canvas instead of video feed because we want to draw the feature points on it
        document.getElementById("face_video_canvas").style.display = "block";
        document.getElementById("face_video").style.display = "none";
    });

    //Add a callback to notify when camera access is allowed
    detector.addEventListener("onWebcamConnectSuccess", function () {
        log('logs', "Webcam access allowed");

    });

    //Add a callback to notify when camera access is denied
    detector.addEventListener("onWebcamConnectFailure", function () {
        log('logs', "webcam denied");
        console.log("Webcam access denied");
    });

    //Add a callback to notify when detector is stopped
    detector.addEventListener("onStopSuccess", function () {
        log('logs', "The detector reports stopped");
        document.getElementById("results").innerHTML = ""
    });

    //Add a callback to receive the results from processing an image.
    //The faces object contains the list of the faces detected in an image.
    //Faces object contains probabilities for all the different expressions, emotions and appearance metrics
    detector.addEventListener("onImageResultsSuccess", function (faces, image, timestamp) {
        document.getElementById("results").innerHTML = ""
        log('results', "Timestamp: " + timestamp.toFixed(2));
        log('results', "Number of faces found: " + faces.length);
        if (faces.length > 0) {
            log('results', "Appearance: " + JSON.stringify(faces[0].appearance));
            //   console.log(faces[0].appearance)
            log('results', "Emotions: " + JSON.stringify(faces[0].emotions, function (key, val) {
                return val.toFixed ? Number(val.toFixed(0)) : val;
            }));
            log('results', "Expressions: " + JSON.stringify(faces[0].expressions, function (key, val) {
                return val.toFixed ? Number(val.toFixed(0)) : val;
            }));
            log('results', "Emoji: " + faces[0].emojis.dominantEmoji);
            drawFeaturePoints(image, faces[0].featurePoints);


            // if((faces[0].appearance["gender"]="Male") && (faces[0].appearance["age"]="18-24")){
            //     document.getElementById("myImg").src="https://cdn.shopify.com/s/files/1/1721/2851/files/BST-MidSeasonSale-Slider-Men-EN_1920x.jpg?v=1554226956";
            //     setTimeout(function(){
            //         detector.reset();
            //       }, 1000);
            // }
            // if((faces[0].appearance["gender"]="Male") && (faces[0].appearance["age"]="18-24") && 
            // faces[0].emotions["joy"]>=80){
            //     document.getElementById("myImg").src="http://quintessencetailor.com/catalog/view/theme/quintessence/images/slider/slide1.jpg";
            //     setTimeout(function(){
            //         detector.reset();
            //       }, 1000);
            // }
            // else if((faces[0].appearance["gender"]="Male") && (faces[0].appearance["age"]="35-44")){
            //     document.getElementById("myImg").src="https://cdn.shopify.com/s/files/1/1721/2851/files/BST-MidSeasonSale-Slider-Men-EN_1920x.jpg?v=1554226956";
            //     setTimeout(function(){
            //         detector.reset();
            //       }, 1000);
            // }
            // else if(faces[0].appearance["gender"]="Female" && (faces[0].appearance["age"]="18-24") ){
            //     document.getElementById("myImg").src="https://cdn.shopify.com/s/files/1/0022/9530/0155/t/7/assets/DISTRICT_HPSLIDER.jpg";
            //     setTimeout(function(){
            //         detector.reset();
            //       }, 1000);
            // }
            // else if(faces[0].appearance["gender"]="Female" && (faces[0].appearance["age"]="35-44") ){
            //     document.getElementById("myImg").src="https://queenspark.com/wp-content/uploads/2019/03/Winter_Collection_Desktop_Banner.png";
            //     setTimeout(function(){
            //         detector.reset();
            //       }, 1000);
            // }

            // Primitive UI for happy
            if (faces[0].emotions["joy"] > 75 && faces[0].appearance["gender"] == 'Male') {
                document.getElementById("myui").innerHTML = "Happy!!!";
                document.getElementById("cartImage").src="https://cdn-images.italist.com/image/upload/dpr_2,h_450,w_1000/v1/home/desktop/slider/1dcdd977a02d57539f74c84639bbec8f.jpg"
                document.getElementById("myImg").src = "https://cdn-images.italist.com/image/upload/dpr_2,h_450,w_1000/v1/home/desktop/slider/1dcdd977a02d57539f74c84639bbec8f.jpg";
                setTimeout(function(){
                    detector.reset();
                  }, 3000);
                $("#myModal").modal();
                detector.stop();
            }
            else if (faces[0].emotions["anger"] > 50 && faces[0].appearance["gender"]=="Male") {
                document.getElementById("myui").innerHTML = "Anger";
                document.getElementById("myImg").src = "https://www.montecarlo.in/images/slider1.jpg";
                setTimeout(function(){
                    detector.reset();
                  }, 3000);
            }
            else if (faces[0].emotions["browFurrow"] > 10 && faces[0].appearance["gender"]=="Female") {
                document.getElementById("myui").innerHTML = "Disgusting";
                document.getElementById("myImg").src = "https://www.kayseria.com/media/homepageslider/homepageslider/kayseria_sliderD_summer19_vol1_pret.jpg";
                setTimeout(function(){
                    detector.reset();
                  }, 3000);
            }
            else if (faces[0].expressions["dimpler"]> 20 && faces[0].appearance["gender"]=="Male") {
                document.getElementById("myui").innerHTML = "Sad";
                document.getElementById("myImg").src = "https://cdn.shopify.com/s/files/1/1721/2851/files/BST-MidSeasonSale-Slider-Men-EN_1920x.jpg?v=1554226956";
                setTimeout(function(){
                    detector.reset();
                  }, 3000);
            }
            else if (faces[0].expressions["browRaise"]> 50 && faces[0].appearance["gender"]=="Male") {
                document.getElementById("myui").innerHTML = "Surprise";
                document.getElementById("myImg").src = "http://quintessencetailor.com/catalog/view/theme/quintessence/images/slider/slide1.jpg";
                setTimeout(function(){
                    detector.reset();
                  }, 3000);
            }
            else if (faces[0].appearance["gender"] == 'Male') {
                document.getElementById("category").innerHTML="Male";
                document.getElementById("myImg").src = "https://corporate.lloyd.com/var/site/storage/images/_aliases/gallery_full_image/2/0/8/0/802-3-eng-GB/Teaser_Slider_men_collection.jpg";
            //   setTimeout(function(){
            //     detector.reset();
            //   }, 3000);
             }
            else if (faces[0].appearance["gender"] == 'Female') {
                document.getElementById("myui").innerHTML = "";
                document.getElementById("category").innerHTML="Female"
                document.getElementById("myImg").src = "https://cdn.shopify.com/s/files/1/0022/9530/0155/t/7/assets/DISTRICT_HPSLIDER.jpg";
                setTimeout(function(){
                    detector.reset();
                  }, 3000);
            }
            else if (faces[0].appearance["gender"] == 'Female' && faces[0].emotions["joy"]>75) {
                document.getElementById("myImg").src = "https://arbikas.com/pub/media/wysiwyg/smartwave/porto/homepage/03/slider/slide2.jpg";
                setTimeout(function(){
                    detector.reset();
                  }, 3000);
                  $("#myModal").modal();
                  detector.stop();
            }
            else if(faces[0].appearance["gender"]=='Female' && faces[0].emotions["anger"] >10) {
                document.getElementById("myImg").src="https://queenspark.com/wp-content/uploads/2019/02/Plus_Banner_Desktop.png";
                setTimeout(function(){
                    detector.reset();
                  }, 3000);
            }
            else if(faces[0].appearance["gender"] == 'Female' && faces[0].emotions["sadness"]>20){
                document.getElementById("myImg").src="https://cdn.catwalkjunkie.com/media/easybanner/KV_SPRING_19_FEB_SLIDER1_1.jpg";
                 setTimeout(function(){
                detector.reset();
              }, 3000);
            }
            else if (faces[0].expressions["browRaise"]> 50 && faces[0].appearance["gender"]=="Male") {
                document.getElementById("myui").innerHTML = "Surprise";
                document.getElementById("myImg").src = "https://static.jaypore.com/media/bsimages/20032019-the-great-seasonal-splurge-slider.jpg";
                setTimeout(function(){
                    detector.reset();
                  }, 3000);
            }
        }
    });
}
window.onclick = function (event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function log(node_name, msg) {
    document.getElementById(node_name).innerHTML += "<span>" + msg + "</span><br/>"
}

//function executes when Start button is pushed.
function onStart() {
    if (detector && !detector.isRunning) {
        document.getElementById("logs").innerHTML = ""
        detector.start();
    }
    log('logs', "Clicked the start button");
}

//function executes when the Stop button is pushed.
function onStop() {
    log('logs', "Clicked the stop button");
    if (detector && detector.isRunning) {
        detector.removeEventListener();
        detector.stop();
    }
};

//function executes when the Reset button is pushed.
function onReset() {
    log('logs', "Clicked the reset button");
    if (detector && detector.isRunning) {
        detector.reset();
        document.getElementById("results").innerHTML = ""
    }
}

// var client = new HttpClient();
// client.get('https://g7gu5b2l8j.execute-api.us-east-1.amazonaws.com/developer ', function(response) {
//     console.log(response)
//     // do something with response
// });

//Draw the detected facial feature points on the image
function drawFeaturePoints(img, featurePoints) {
    var c = document.getElementById("face_video_canvas");
    if (c == null) return;
    var contxt = c.getContext('2d');

    var hRatio = contxt.canvas.width / img.width;
    var vRatio = contxt.canvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);

    contxt.strokeStyle = "#FFFFFF";
    for (var id in featurePoints) {
        contxt.beginPath();
        contxt.arc(featurePoints[id].x,
            featurePoints[id].y, 2, 0, 2 * Math.PI);
        contxt.stroke();
    }
}