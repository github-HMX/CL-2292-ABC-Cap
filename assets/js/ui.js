// --------------------------------------------------------START----------------------------------------------------------//
// --------------------------------------------------------do not edit or remove----------------------------------------------------------//
var blaze3d_normalize = function (pt) {
   var d = Math.sqrt((pt[0] * pt[0]) + (pt[1] * pt[1]) + (pt[2] * pt[2]));
   if (d == 0) return [0,0,0];
   return [pt[0] / d,pt[1] / d,pt[2] / d];
}
var blaze3d_dp = function (v1,v2) {
   return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

function MatrixGetX(m) {
   return [m[0],m[1],m[2]];
}

function MatrixGetY(m) {
   return [m[4],m[5],m[6]];
}

function MatrixGetZ(m) {
   return blaze3d_normalize([0 - m[0],0 - m[1],0 - m[2]]);
}

function MatrixGetPos(m) {
   return [m[0],m[1],m[2]];
}

function MatrixRotationAxis(fAngle,fX,fY,fZ) {
   var s = Math.sin(fAngle);
   var c = Math.cos(fAngle);
   var x = fX;
   var y = fY;
   var z = fZ;
   var mOut = Array();
   mOut[0] = x * x * (1 - c) + c;
   mOut[4] = x * y * (1 - c) - (z * s);
   mOut[8] = x * z * (1 - c) + (y * s);
   mOut[12] = 0;
   mOut[1] = y * x * (1 - c) + (z * s);
   mOut[5] = y * y * (1 - c) + c;
   mOut[9] = y * z * (1 - c) - (x * s);
   mOut[13] = 0;
   mOut[2] = z * x * (1 - c) - (y * s);
   mOut[6] = z * y * (1 - c) + (x * s);
   mOut[10] = z * z * (1 - c) + c;
   mOut[14] = 0.0;
   mOut[3] = 0.0;
   mOut[7] = 0.0;
   mOut[11] = 0.0;
   mOut[15] = 1.0;
   return mOut;
}

function MatrixMultiply(mA,mB) {
   var mRet = Array();
   // Perform calculation on a dummy matrix (mRet)
   mRet[0] = mA[0] * mB[0] + mA[1] * mB[4] + mA[2] * mB[8] + mA[3] * mB[12];
   mRet[1] = mA[0] * mB[1] + mA[1] * mB[5] + mA[2] * mB[9] + mA[3] * mB[13];
   mRet[2] = mA[0] * mB[2] + mA[1] * mB[6] + mA[2] * mB[10] + mA[3] * mB[14];
   mRet[3] = mA[0] * mB[3] + mA[1] * mB[7] + mA[2] * mB[11] + mA[3] * mB[15];
   //
   mRet[4] = mA[4] * mB[0] + mA[5] * mB[4] + mA[6] * mB[8] + mA[7] * mB[12];
   mRet[5] = mA[4] * mB[1] + mA[5] * mB[5] + mA[6] * mB[9] + mA[7] * mB[13];
   mRet[6] = mA[4] * mB[2] + mA[5] * mB[6] + mA[6] * mB[10] + mA[7] * mB[14];
   mRet[7] = mA[4] * mB[3] + mA[5] * mB[7] + mA[6] * mB[11] + mA[7] * mB[15];
   //
   mRet[8] = mA[8] * mB[0] + mA[9] * mB[4] + mA[10] * mB[8] + mA[11] * mB[12];
   mRet[9] = mA[8] * mB[1] + mA[9] * mB[5] + mA[10] * mB[9] + mA[11] * mB[13];
   mRet[10] = mA[8] * mB[2] + mA[9] * mB[6] + mA[10] * mB[10] + mA[11] * mB[14];
   mRet[11] = mA[8] * mB[3] + mA[9] * mB[7] + mA[10] * mB[11] + mA[11] * mB[15];
   //
   mRet[12] = mA[12] * mB[0] + mA[13] * mB[4] + mA[14] * mB[8] + mA[15] * mB[12];
   mRet[13] = mA[12] * mB[1] + mA[13] * mB[5] + mA[14] * mB[9] + mA[15] * mB[13];
   mRet[14] = mA[12] * mB[2] + mA[13] * mB[6] + mA[14] * mB[10] + mA[15] * mB[14];
   mRet[15] = mA[12] * mB[3] + mA[13] * mB[7] + mA[14] * mB[11] + mA[15] * mB[15];
   return mRet
}

// --------------------------------------------------------do not edit or remove----------------------------------------------------------//
// --------------------------------------------------------END----------------------------------------------------------//

function showScene() {
   scene._slowinoutfac = .4;
   scene.gotoUINamedPosInTime('hmxHero');
   //    scene.gotoPosInTime(0,0,0,0,0,1);
   $("#scenediv").css("visibility","visible");
   $("#zoom_slider").slider("option","value",120);
   setTimeout(function () {
      $(".progressBarContainer").fadeOut(100);
      //        $("#loaderDfr").fadeOut(400);
   },100);
   //    var DeferInterval;
   //DeferInterval = setInterval(function() {  
   //      scene.decodeDeferredGeometry('Deffer_01');    
   //      if(scene._lstDeferredGrps['Deffer_01']._outstandingdeferred ==0)
   //	  {
   //		clearInterval(DeferInterval);
   //	  }                          
   //                               
   //}, 10);

}

function onResetCameraClickGL() {
   //    if (!animStoped || !clickEventActive) return;
   animStoped = false;
   //	changeColour('option1');
   //	$("")
   // scene._nav._navMinDolly = -25;
   scene.gotoUINamedPosInTime('hmxHero');
   // scene.gotoPosInTime(0,0,0,0,0,1000,function () {
   animComplete();
   // });
   scene.clearRefine();
}


//var currentColour = "color1";
//var swaps = [{
//     type: "materialSwap",
//    color1: "A_A_Glass_windows_transparent_env",
//    color2: "A_B_Glass_windows_semitransparent_env"
//}
//];
function changeColour(newColour) {
   //    console.log("in color chng");
   if (newColour != currentColour) {
      for (var i = 0; i < swaps.length; i++) {
         if (swaps[i].type == "materialSwap") {
            if (swaps[i][currentColour] != swaps[i][newColour]) {
               //setTimeout(function(){scene.materialReplace(swaps[i][currentColour], swaps[i][newColour]);},i*10);//stagger the swaps
               scene.materialReplace(swaps[i][currentColour],swaps[i][newColour]);
            }
         } else if (swaps[i].type == "visible") {
            scene.instanceSet(swaps[i].name,"visible",swaps[i][newColour]);
         }
      }
      currentColour = newColour;
   }
   scene.clearRefine();
}
var currentColour = "option4";
var swaps = [{
   type: "materialSwap",
   option1: "AA_fuel_tank_Brown_env",
   option2: "AA_fuel_tank_Green_env",
   option3: "AA_fuel_tank_White_env",
   option4: "AA_fuel_tank_Red_env",
   option5: "AA_fuel_tank_Black_env",
   option6: "AA_fuel_tank_Yellow_env",
   option7: "AA_fuel_tank_Grey_env"
},{
   type: "materialSwap",
   option1: "BB_wheel_Brown_ring_env",
   option2: "BB_wheel_Green_ring_env",
   option3: "BB_wheel_White_ring_env",
   option4: "BB_wheel_Red_ring_env",
   option5: "BB_wheel_black_ring_env",
   option6: "BB_wheel_Yellow_ring_env",
   option7: "BB_wheel_Grey_ring_env"
},{
   type: "materialSwap",
   option1: "CC_Royal_Enfield_logo_White_env",
   option2: "CC_Royal_Enfield_logo_White_env",
   option3: "CC_Royal_Enfield_logo_Black_env",
   option4: "CC_Royal_Enfield_logo_Black_env",
   option5: "CC_Royal_Enfield_logo_White_env",
   option6: "CC_Royal_Enfield_logo_Black_env",
   option7: "CC_Royal_Enfield_logo_Black_env"
}];


var colorText = ['Dynamite Red','Ibis White','Vegas Yellow','Camouflage Green','Floret Silver','Mythos Black','Suzuka Metallic','Tangorot Metallic','Ara Blue','Daytona Grey','Toucan Yellow','Solar Orange','Ipanema Brown','Mamba Black','Classic Red','Palace Blue','Saddle Brown','Sand Beige','Nimbus Grey','Nogaro Blue'];
var colorTextSelected = 1;


