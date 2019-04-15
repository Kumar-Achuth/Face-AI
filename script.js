var width = 640;
var height = 480;
var detector;
var item = false;
var result = []
var maleSixty = [];
var maleForty = [];
var maleTwenty = [];
var womenTwenty = [];
var womenForty = [];
var womenSixty = [];
// import entire SDK
// var AWS = require('aws-sdk');
// // import AWS object without services
// var AWS = require('aws-sdk/global');
// // import individual service
// var S3 = require('aws-sdk/clients/s3');




onload = function () {

    $.get("https://g7gu5b2l8j.execute-api.us-east-1.amazonaws.com/developer", function (data, status) {
        // alert("Data: " + data + "\nStatus: " + status);
        // console.log(JSON.stringify(data.body));
        result = JSON.stringify(data.body)
        console.log(result);
        console.log(data.body);

        for (i = 0; i < data.body.length; i++) {
            if (data.body[i].customerAge == "M-40") {
                maleForty.push(data.body[i].dress1);
                maleForty.push(data.body[i].dress2);
                maleForty.push(data.body[i].dress3);
                maleForty.push(data.body[i].dress4);
                maleForty.push(data.body[i].dress5);
            }
            else if (data.body[i].customerAge == "M-60") {
                maleSixty.push(data.body[i].dress1);
                maleSixty.push(data.body[i].dress2);
                maleSixty.push(data.body[i].dress3);
                maleSixty.push(data.body[i].dress4);
                maleSixty.push(data.body[i].dress5);
            }
            else if (data.body[i].customerAge == "M-20") {
                maleTwenty.push(data.body[i].dress1);
                maleTwenty.push(data.body[i].dress2);
                maleTwenty.push(data.body[i].dress3);
                maleTwenty.push(data.body[i].dress4);
                maleTwenty.push(data.body[i].dress5);
            }
            else if (data.body[i].customerAge == "W-20") {
                womenTwenty.push(data.body[i].dress1);
                womenTwenty.push(data.body[i].dress2);
                womenTwenty.push(data.body[i].dress3);
                womenTwenty.push(data.body[i].dress4);
                womenTwenty.push(data.body[i].dress5);
            }
            else if (data.body[i].customerAge == "W-40") {
                womenForty.push(data.body[i].dress1);
                womenForty.push(data.body[i].dress2);
                womenForty.push(data.body[i].dress3);
                womenForty.push(data.body[i].dress4);
                womenForty.push(data.body[i].dress5);
            }
            else if (data.body[i].customerAge == "W-60") {
                womenSixty.push(data.body[i].dress1);
                womenSixty.push(data.body[i].dress2);
                womenSixty.push(data.body[i].dress3);
                womenSixty.push(data.body[i].dress4);
                womenSixty.push(data.body[i].dress5);
            }
        }
        console.log(maleSixty);
        console.log(maleForty);
        console.log(maleTwenty);
        console.log(womenTwenty);
        console.log(womenForty);
        console.log(womenSixty);

        document.getElementById("myImg").src = womenTwenty[4];
    });

    // SDK Needs to create video and canvas nodes in the DOM in order to function
    // Here we are adding those nodes a predefined div.
    var divRoot = $("#affdex_elements")[0];
    // var divRoot = document.getElementById("affdex_elements");

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
            if (faces[0].appearance["gender"] == 'Male') {
                if (faces[0].appearance["age"] == 'Under 18') {
                    document.getElementById("myImg").src = "https://www.thefryecompany.com/media/gene-cms/h/p/hp-hero-mens-walker.jpg";
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src = "https://cdn.catwalkjunkie.com/media/easybanner/KV_SUMMER_19_SLIDER2_1.jpg";
                        document.getElementById("cartImage").src = "https://cdn.catwalkjunkie.com/media/easybanner/KV_SUMMER_19_SLIDER2_1.jpg";
                        $("#myModal").modal();
                        detector.stop();
                    }
                    else if (faces[0].emotions["anger"] > 30) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = "https://cdn.shopify.com/s/files/1/1721/2851/files/BST-MidSeasonSale-Slider-Men-EN_1920x.jpg?v=1554226956";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = "https://www.montecarlo.in/images/slider1.jpg"
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = "https://corporate.lloyd.com/var/site/storage/images/_aliases/gallery_full_image/2/0/8/0/802-3-eng-GB/Teaser_Slider_men_collection.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }
                else if (faces[0].appearance["age"] == '18 - 24') {
                    document.getElementById('myImg').src = "https://www.usc.co.uk/images/marketing/MENS-OUTLET-HERO.jpg";
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src = maleTwenty[0];
                        document.getElementById("cartImage").src = maleTwenty[0];
                        $("#myModal").modal();
                        detector.stop();
                    }
                    else if (faces[0].emotions["anger"] > 30) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = maleTwenty[1];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = maleTwenty[2];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = maleTwenty[3];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }
                else if (faces[0].appearance["age"] == '25 - 34') {
                    document.getElementById('myImg').src = maleForty[4];
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src = maleForty[0];
                        document.getElementById("cartImage").src = maleForty[0];
                        $("#myModal").modal();
                        detector.stop();
                    }
                    else if (faces[0].emotions["anger"] > 30) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = maleTwenty[1];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = maleForty[2];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = maleForty[3];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }
                else if (faces[0].appearance["age"] == '35 - 44') {
                    document.getElementById('myImg').src = maleForty[4];
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src = maleForty[0];
                        document.getElementById("cartImage").src = maleForty[0];
                        $("#myModal").modal();
                        detector.stop();
                    }
                    else if (faces[0].emotions["anger"] > 30) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = maleTwenty[1];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = maleForty[2];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = maleForty[3];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }
                else if (faces[0].appearance["age"] == '55 - 65') {
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src = maleSixty[0];
                        document.getElementById("cartImage").src = maleSixty[0];
                        $("#myModal").modal();
                        detector.stop();
                    }
                    else if (faces[0].emotions["anger"] > 30) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = maleSixty[1];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = maleSixty[2];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = maleSixty[3];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }
            }

            /******************************* Women Section********************************/

            else if (faces[0].appearance["gender"] == 'Female') {

                /** *************Age Section Under 18*************** */

                if (faces[0].appearance["age"] == 'Under 18') {
                    document.getElementById("myImg").src = "https://queenspark.com/wp-content/uploads/2019/02/Valentines_Day_Banner_Desktop.png";
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src = "https://arbikas.com/pub/media/wysiwyg/smartwave/porto/homepage/03/slider/slide2.jpg";
                        document.getElementById("cartImage").src = "https://arbikas.com/pub/media/wysiwyg/smartwave/porto/homepage/03/slider/slide2.jpg";
                        $("#myModal").modal();
                        detector.stop();
                    }
                    else if (faces[0].emotions["anger"] > 10) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = "https://queenspark.com/wp-content/uploads/2019/01/cath.nic_Miss_Cassidy_Website.png";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = "https://cdn.catwalkjunkie.com/media/easybanner/KV_SPRING_19_FEB_SLIDER1_1.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = "https://www.kazo.com/pub/static/version1554118313/frontend/Solwin/freego/en_US/images/newarrbags.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }
                else if(faces[0].appearance["age"]== '25-34'){
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src = womenTwenty[0];
                        document.getElementById("cartImage").src = womenTwenty[0];
                        $("#myModal").modal();
                        detector.stop();
                    }
                    else if (faces[0].emotions["anger"] > 10) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = womenTwenty[1];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = womenTwenty[2];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = womenTwenty[3];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }

                /** *******************Age Section Between 18 and 24********** */

                else if (faces[0].appearance["age"] == '18 - 24') {
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src = womenTwenty[0];
                        document.getElementById("cartImage").src = womenTwenty[0];
                        $("#myModal").modal();
                        detector.stop();
                    }
                    else if (faces[0].emotions["anger"] > 10) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = womenTwenty[1];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = womenTwenty[2];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = womenTwenty[3];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }

                /** ***************Age Section Between 35 and 44*************** */

                else if (faces[0].appearance["age"] == '35 - 44') {
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src = womenForty[0];
                        document.getElementById("cartImage").src = womenForty[0];
                        $("#myModal").modal();
                        detector.stop()
                    }
                    else if (faces[0].emotions["anger"] > 10) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = womenForty[1];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = womenForty[2];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = womenForty[3];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }
                else if (faces[0].appearance["age"] == '55 - 65') {                    
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src = womenSixty[0];
                        document.getElementById("cartImage").src = womenSixty[0];
                        $("#myModal").modal();
                        detector.stop()
                    }
                    else if (faces[0].emotions["anger"] > 10) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = womenSixty[1];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = womenSixty[2];
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = womenSixty[3];
                        setTimeout(function () {
                            ``
                            detector.reset();
                        }, 3000);
                    }
                }
            }
            // else {
            //     document.getElementById("myImg").src = "https://cdn.shopify.com/s/files/1/0411/6201/t/58/assets/slider-02.jpg?231"
            // }
        }
    });
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