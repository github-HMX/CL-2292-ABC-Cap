// --------------------------------------------------------START----------------------------------------------------------//
// --------------------------------------------------------do not edit or remove----------------------------------------------------------//

Vector3 = function (x,y,z) {
   this.x = x || 0;
   this.y = y || 0;
   this.z = z || 0;
};
Vector3.prototype = {
   constructor: Vector3,
   set: function (x,y,z) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
   },
   setX: function (x) {
      this.x = x;
      return this;
   },
   setY: function (y) {
      this.y = y;
      return this;
   },
   setZ: function (z) {
      this.z = z;
      return this;
   },
   setComponent: function (index,value) {
      switch (index) {
         case 0:
            this.x = value;
            break;
         case 1:
            this.y = value;
            break;
         case 2:
            this.z = value;
            break;
         default:
            throw new Error('index is out of range: ' + index);
      }
   },
   getComponent: function (index) {
      switch (index) {
         case 0:
            return this.x;
         case 1:
            return this.y;
         case 2:
            return this.z;
         default:
            throw new Error('index is out of range: ' + index);
      }
   },
   copy: function (v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      return this;
   },
   add: function (v,w) {
      if (w !== undefined) {
         console.warn('Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
         return this.addVectors(v,w);
      }
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      return this;
   },
   addScalar: function (s) {
      this.x += s;
      this.y += s;
      this.z += s;
      return this;
   },
   addVectors: function (a,b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;
      return this;
   },
   sub: function (v,w) {
      if (w !== undefined) {
         console.warn('Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
         return this.subVectors(v,w);
      }
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      return this;
   },
   subVectors: function (a,b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;
      return this;
   },
   multiply: function (v,w) {
      if (w !== undefined) {
         console.warn('Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
         return this.multiplyVectors(v,w);
      }
      this.x *= v.x;
      this.y *= v.y;
      this.z *= v.z;
      return this;
   },
   multiplyScalar: function (scalar) {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      return this;
   },
   multiplyVectors: function (a,b) {
      this.x = a.x * b.x;
      this.y = a.y * b.y;
      this.z = a.z * b.z;
      return this;
   },
   applyEuler: function () {
      var quaternion;
      return function (euler) {
         if (euler instanceof Euler === false) {
            console.error('Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order.');
         }
         if (quaternion === undefined) quaternion = new Quaternion();
         this.applyQuaternion(quaternion.setFromEuler(euler));
         return this;
      };
   }(),
   applyAxisAngle: function () {
      var quaternion;
      return function (axis,angle) {
         if (quaternion === undefined) quaternion = new Quaternion();
         this.applyQuaternion(quaternion.setFromAxisAngle(axis,angle));
         return this;
      };
   }(),
   applyMatrix3: function (m) {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      var e = m.elements;
      this.x = e[0] * x + e[3] * y + e[6] * z;
      this.y = e[1] * x + e[4] * y + e[7] * z;
      this.z = e[2] * x + e[5] * y + e[8] * z;
      return this;
   },
   applyMatrix4: function (m) {
      // input: Matrix4 affine matrix
      var x = this.x,
         y = this.y,
         z = this.z;
      var e = m.elements;
      this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
      this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
      this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
      return this;
   },
   applyProjection: function (m) {
      // input: Matrix4 projection matrix
      var x = this.x,
         y = this.y,
         z = this.z;
      var e = m.elements;
      var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]); // perspective divide
      this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;
      this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;
      this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;
      return this;
   },
   applyQuaternion: function (q) {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      var qx = q.x;
      var qy = q.y;
      var qz = q.z;
      var qw = q.w;
      // calculate quat * vector
      var ix = qw * x + qy * z - qz * y;
      var iy = qw * y + qz * x - qx * z;
      var iz = qw * z + qx * y - qy * x;
      var iw = -qx * x - qy * y - qz * z;
      // calculate result * inverse quat
      this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
      this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
      this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
      return this;
   },
   transformDirection: function (m) {
      // input: Matrix4 affine matrix
      // vector interpreted as a direction
      var x = this.x,
         y = this.y,
         z = this.z;
      var e = m.elements;
      this.x = e[0] * x + e[4] * y + e[8] * z;
      this.y = e[1] * x + e[5] * y + e[9] * z;
      this.z = e[2] * x + e[6] * y + e[10] * z;
      this.normalize();
      return this;
   },
   divide: function (v) {
      this.x /= v.x;
      this.y /= v.y;
      this.z /= v.z;
      return this;
   },
   divideScalar: function (scalar) {
      if (scalar !== 0) {
         var invScalar = 1 / scalar;
         this.x *= invScalar;
         this.y *= invScalar;
         this.z *= invScalar;
      } else {
         this.x = 0;
         this.y = 0;
         this.z = 0;
      }
      return this;
   },
   min: function (v) {
      if (this.x > v.x) {
         this.x = v.x;
      }
      if (this.y > v.y) {
         this.y = v.y;
      }
      if (this.z > v.z) {
         this.z = v.z;
      }
      return this;
   },
   max: function (v) {
      if (this.x < v.x) {
         this.x = v.x;
      }
      if (this.y < v.y) {
         this.y = v.y;
      }
      if (this.z < v.z) {
         this.z = v.z;
      }
      return this;
   },
   clamp: function (min,max) {
      // This function assumes min < max, if this assumption isn't true it will not operate correctly
      if (this.x < min.x) {
         this.x = min.x;
      } else if (this.x > max.x) {
         this.x = max.x;
      }
      if (this.y < min.y) {
         this.y = min.y;
      } else if (this.y > max.y) {
         this.y = max.y;
      }
      if (this.z < min.z) {
         this.z = min.z;
      } else if (this.z > max.z) {
         this.z = max.z;
      }
      return this;
   },
   clampScalar: (function () {
      var min,max;
      return function (minVal,maxVal) {
         if (min === undefined) {
            min = new Vector3();
            max = new Vector3();
         }
         min.set(minVal,minVal,minVal);
         max.set(maxVal,maxVal,maxVal);
         return this.clamp(min,max);
      };
   })(),
   floor: function () {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      return this;
   },
   ceil: function () {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      return this;
   },
   round: function () {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);
      return this;
   },
   roundToZero: function () {
      this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
      this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
      return this;
   },
   negate: function () {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      return this;
   },
   dot: function (v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
   },
   lengthSq: function () {
      return this.x * this.x + this.y * this.y + this.z * this.z;
   },
   length: function () {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
   },
   lengthManhattan: function () {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
   },
   normalize: function () {
      return this.divideScalar(this.length());
   },
   setLength: function (l) {
      var oldLength = this.length();
      if (oldLength !== 0 && l !== oldLength) {
         this.multiplyScalar(l / oldLength);
      }
      return this;
   },
   lerp: function (v,alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      this.z += (v.z - this.z) * alpha;
      return this;
   },
   cross: function (v,w) {
      if (w !== undefined) {
         console.warn('Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
         return this.crossVectors(v,w);
      }
      var x = this.x,
         y = this.y,
         z = this.z;
      this.x = y * v.z - z * v.y;
      this.y = z * v.x - x * v.z;
      this.z = x * v.y - y * v.x;
      return this;
   },
   crossVectors: function (a,b) {
      var ax = a.x,
         ay = a.y,
         az = a.z;
      var bx = b.x,
         by = b.y,
         bz = b.z;
      this.x = ay * bz - az * by;
      this.y = az * bx - ax * bz;
      this.z = ax * by - ay * bx;
      return this;
   },
   projectOnVector: function () {
      var v1,dot;
      return function (vector) {
         if (v1 === undefined) v1 = new Vector3();
         v1.copy(vector).normalize();
         dot = this.dot(v1);
         return this.copy(v1).multiplyScalar(dot);
      };
   }(),
   projectOnPlane: function () {
      var v1;
      return function (planeNormal) {
         if (v1 === undefined) v1 = new Vector3();
         v1.copy(this).projectOnVector(planeNormal);
         return this.sub(v1);
      }
   }(),
   reflect: function () {
      // reflect incident vector off plane orthogonal to normal
      // normal is assumed to have unit length
      var v1;
      return function (normal) {
         if (v1 === undefined) v1 = new Vector3();
         return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
      }
   }(),
   angleTo: function (v) {
      var theta = this.dot(v) / (this.length() * v.length());
      // clamp, to handle numerical problems
      return Math.acos(Math.clamp(theta,-1,1));
   },
   distanceTo: function (v) {
      return Math.sqrt(this.distanceToSquared(v));
   },
   distanceToSquared: function (v) {
      var dx = this.x - v.x;
      var dy = this.y - v.y;
      var dz = this.z - v.z;
      return dx * dx + dy * dy + dz * dz;
   },
   setEulerFromRotationMatrix: function (m,order) {
      console.error('Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.');
   },
   setEulerFromQuaternion: function (q,order) {
      console.error('Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.');
   },
   getPositionFromMatrix: function (m) {
      console.warn('Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().');
      return this.setFromMatrixPosition(m);
   },
   getScaleFromMatrix: function (m) {
      console.warn('Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().');
      return this.setFromMatrixScale(m);
   },
   getColumnFromMatrix: function (index,matrix) {
      console.warn('Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().');
      return this.setFromMatrixColumn(index,matrix);
   },
   setFromMatrixPosition: function (m) {
      this.x = m.elements[12];
      this.y = m.elements[13];
      this.z = m.elements[14];
      return this;
   },
   setFromMatrixScale: function (m) {
      var sx = this.set(m.elements[0],m.elements[1],m.elements[2]).length();
      var sy = this.set(m.elements[4],m.elements[5],m.elements[6]).length();
      var sz = this.set(m.elements[8],m.elements[9],m.elements[10]).length();
      this.x = sx;
      this.y = sy;
      this.z = sz;
      return this;
   },
   setFromMatrixColumn: function (index,matrix) {
      var offset = index * 4;
      var me = matrix.elements;
      this.x = me[offset];
      this.y = me[offset + 1];
      this.z = me[offset + 2];
      return this;
   },
   equals: function (v) {
      return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
   },
   fromArray: function (array) {
      this.x = array[0];
      this.y = array[1];
      this.z = array[2];
      return this;
   },
   toArray: function () {
      return [this.x,this.y,this.z];
   },
   clone: function () {
      return new Vector3(this.x,this.y,this.z);
   }
};
// --------------------------------------------------------do not edit or remove----------------------------------------------------------//
// --------------------------------------------------------END----------------------------------------------------------//
window.baseURL = '../';
window.modelBaseURL = '../model_gl/';
window.modelBaseURLMob = '../model_gl_mob/';
var first = false;
var second = false;
var third = false;
var fourth = false;
var cat4 = false;
var cat5 = false;
var fourth = false;
var onComplete = true;
$(function () {
   if (mob || (navigator.userAgent.indexOf('iPad') != -1) || (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0)) {
      //      console.log("ie")
      $("#close").css('display','none');
      $("#fullScreen").css('display','none');
   } else {
      $("#fullScreen").css('display','block');
   }
})


window.onload = function () {
   document.getElementById("fullScreenOff").onclick = function () {
      exitFullscreen(window.parent.document.documentElement);
   }
}

$(window).load(function () {
   resizePage(window.document.documentElement.clientWidth,window.document.documentElement.clientHeight);
   $(window).live('resize',function () {
      resizePage(window.innerWidth,window.innerHeight);
   });
   window.onresize = function (event) {
      resizePage(window.innerWidth,window.innerHeight);
   }
});



function onReset() {
   onResetCameraClickGL(); //in _ui.js
}
function onZoomSlide(event,ui) {
   var val = -20 * (ui.value / 100) + 10;
   NavSetDolly(val);
   updateZoomBar(val);
   scene.clearRefine();
}
$(function () {
   // Slider
   //range: 'min',
   $('#zoom_slider').slider({
      orientation: "vertical",
      value: 155,
      min: 0,
      max: 205,
      slide: onZoomSlide
   });
   $('nodrag').on('dragstart',function (event) {
      event.preventDefault();
   });
   $('.nodrag').mousedown(function () {
      return false
   });

});

function buttonsZoom(value) {
   var delta = value;
   var deltaScene = (delta * 0.03) * (0.3);
   deltaScene = -deltaScene;
   if (NavSetDolly(g_navDolly + deltaScene)) {
      scene.clearRefine();
      updateZoomBar(g_navDolly - 10);
   }
}
var updateEnabled = true;
var canvas = null,
   canvas2 = null;
var scene = null,
   scene2 = null;
var _scenePollInterval;
var outstandingJobs;
var totalJobs;
var firstTime = true;
var tempW = 5;
var animationLoading;



function isSuperblazeReady() {
   if (scene) {
      //totalJobs = 230;
      scene.start();
      outstandingJobs = scene.getOutstandingJobs();
      if (!(scene._projectparsed /*&& scene._started*/)) {
         if (firstTime) {

            firstTime = false;
            animationLoading = setInterval(function () {
               // console.log("loaderbar>>")
               tempW = tempW + 1;
               if (tempW > 30) tempW = 30;

               $("#loaderbar").css("width",tempW + "px");

            },10);

         }
      } else if (outstandingJobs <= 0 && scene._prepared) {

         onSuperBlazeReady();
         clearInterval(_scenePollInterval);
      } else if (scene._projectparsed /*&& scene._started*/) {

         clearInterval(animationLoading);
         updateProgressBar();


      }
   }
}

function updateProgressBar() {

   totalJobs = scene.getTotalJobs();
   outstandingJobs = scene.getOutstandingJobs();
   var perc = 100 - Math.round(outstandingJobs / totalJobs * 100);
   // var newwidth = 170-(170 * (outstandingJobs / totalJobs))+20;
   var newwidth = 50 + 123 * perc / 100;
   if (newwidth < 30) newwidth = 30;

   //console.log("updateProgressBar -- loaderbar "+newwidth+"px perc "+perc+" jobs "+outstandingJobs+"/"+totalJobs);

   $("#loaderbar").css("width",newwidth + "px");
}

var firstLoad = true;
function onSuperBlazeReady() {

   scene._jitRadius = 2.5;
   scene._zNearMin = 18.0;
   scene._fSharpenScale = 0.0;
   //    scene._bDoF=true;
   window.addEventListener('focus',onWindowFocus,false);
   window.addEventListener('blur',onWindowBlur,false);
   //    scene.gotoPosInTime(-0.38958530717958606,0.188502,0.28923,3.893001,86.015869, 1);
   end = new Date().getTime();
   var time = end - start;
   if (time < 60000) {
   }
   skin = new infinityrt_skin(window.modelBaseURL + "config.json");
   console.log('End time: ' + time);

   window.initExtra();
   setTimeout(function () {

      showScene();
      // scene.gotoPosInTime(0,0,0,0,0,1);
      $("#zoomSliderContainer").css("visibility","visible");
      $("#reset").css("visibility","visible");
      $(".ui-slider-handle").css("visibility","visible");
      $("#loader").css("display","none");


      $("#loaderbar").css('width','0px');
      $("#colors1").css('display','block');

      $("#canvasContainer").css("visibility","visible");
      $("#superblazeWrapper",window.document).css('display','block');
      $("#superblaze").css('display','block');
      //        $("#fullScreen").css('display', 'block');
      if (mob || (navigator.userAgent.indexOf('iPad') != -1) || (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0)) {
         //      console.log("ie")
         $("#fullScreen").css('display','none');
      } else {
         $("#fullScreen").css('display','block');
      }
   },500);
   scene.gotoUINamedPosInTime('hmxHero');
   setTimeout(function () {
      // scene.gotoUINamedPosInTime('hmxHero');
      //scene.clearRefine();  
   },3000)

   setTimeout(function () {
      
      $("#embroideries").show();
      $("#classButton").show();
      $("#btnClassButton").show();
      $("#btnClassExtra").show();
      $("#Top_embroideries").show();
      $("#Top_Emblem").show();
      $("#Pro_Top_embroideries").show();
      $("#flagpatch").show();
      $("#flagpin").show();
      $("#emblemColors").show();
      $("#liningImage").show();
      $("#liningImageTop").show();
      $("#flagImageTop").show();
      $("#flagImageLining").show();
      $("#embroideriesLining").show();
      $("#liningemblemColors").show();
      
   },3000)

   UiLoader();

}


function UiLoader() {
   // console.log("UI Loaded..")





   $("#fullScreen img").attr("src",window.baseURL + "images_gl/Fullscreen_01.png");
   $("#fullScreenOff img").attr("src",window.baseURL + "images_gl/cross_button.png");

   $("#resetBtn img").attr("src",window.baseURL + "images_gl/reset_up.png");

}
function SuperblazeStart(gl) {
   try {
      resizePage(window.document.documentElement.clientWidth,window.document.documentElement.clientHeight);
      $(window).resize(function () {
         resizePage(window.document.documentElement.clientWidth,window.document.documentElement.clientHeight);

      });

   } catch (e) {
      resizePage(document.documentElement.clientWidth,document.documentElement.clientHeight);
      $(window).resize(function () {
         resizePage(document.documentElement.clientWidth,document.documentElement.clientHeight);

      });

   }
   if (mob || isipad) {
      infinityrt_codeprefix = "../model_gl_mob/";
  } else {
      infinityrt_codeprefix = "../model_gl/";
  }
   canvas = document.getElementById("superblaze-canvas");
   //    var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
   //	    var isAtLeastIE11 = !!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/));
   var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
   var smartDeferralValue = false;//smartDefer ? true : false;
   if ((navigator.userAgent.indexOf("iPhone") != -1) || ((navigator.userAgent.indexOf("Android") != -1) || (navigator.userAgent.indexOf("Mobile") != -1)) || (navigator.userAgent.indexOf('iPod') != -1)) {

      scene = new infinityrt_scene({ rtgl: gl,useDraco: false,smartDeferral: smartDeferralValue/*,loaderjson:'loader360/loader360.json'*/ },window.modelBaseURLMob,canvas.width,canvas.height,undefined,undefined,undefined,InitialSceneState,AllGeometryComplete);
      //       console.log("mob");
   } else {

      scene = new infinityrt_scene({ rtgl: gl,useDraco: false,smartDeferral: smartDeferralValue/*,loaderjson:'loader360/loader360.json'*/ },window.modelBaseURL,canvas.width,canvas.height,undefined,undefined,undefined,InitialSceneState,AllGeometryComplete);
      //       console.log("desk");
   }
   scene.fnLoadProgress = updateProgressBar;
   scene.start();
   scene._nav = new infinityrt_navigation(scene,canvas.width,canvas.height);
   _scenePollInterval = setInterval("isSuperblazeReady()",100);
   start = new Date().getTime();
   //scene.gotoUINamedPosInTime('hmxHero');
  // scene.gotoPosInTime(-0.389557,0.188495,0.506855,-2.02251,59.76926,1);
   scene.gotoPosInTime(-0.523599,0.314159,0.122139,0.48673100000000025,72.931458,1);
   //    NavInit(canvas.width, canvas.height);
   var canvasDummy = document.getElementById("dummy-canvas");
   addMouseListeners(canvasDummy);
   scene._slowinoutfac = 0.9;
   if (scene != null) {


      window.requestAnimationFrame(frameUpdate);
      $(this).bind("contextmenu",onRightClick); //prevents a right click     
      document.body.oncontextmenu = onRightClick;
      //window.addEventListener('oncontextmenu',onRightClick,false);
      //if (typeof(onInit()) != 'undefined') onInit();
   }
   initDragCursor();
}
var mob = (navigator.userAgent.indexOf("iPhone") != -1) || ((navigator.userAgent.indexOf("Android") != -1) || (navigator.userAgent.indexOf("Mobile") != -1)) || (navigator.userAgent.indexOf('iPod') != -1);

var isipad = (/CriOS/i.test(navigator.userAgent) && /ipad/i.test(navigator.userAgent)) || (navigator.userAgent.indexOf('iPad') != -1) ||
   (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2);

var FullscreenOff = false;
function launchFullscreen(element) {

   window.fullScreen = true;

   resizePage(window.document.documentElement.clientWidth,window.document.documentElement.clientHeight);

   if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
      // console.log("IE 11");
      $("#fullScreenOff").css('display','none');
      $("#fullScreen").css('display','none');

   } else {
      // console.log("Not IE 11");
      $("#fullScreenOff").css('display','block');
      $("#fullScreen").css('display','none');
   }


   // console.log(" full screen ");
   if (element.requestFullscreen) {
      element.requestFullscreen();
   } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
   } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
   } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
   }
}
function exitFullscreen() {
   // console.log("Exit full screen");
   window.fullScreen = false;
   $("#fullScreenOff").css('display','none');
   $("#fullScreen").css('display','block');
   if (window.document.exitFullscreen) {
      window.document.exitFullscreen();
   } else if (window.document.mozCancelFullScreen) {
      window.document.mozCancelFullScreen();
   } else if (window.document.webkitExitFullscreen) {
      window.document.webkitExitFullscreen();
   }
   //    setTimeout(function() {
   resizePage(window.document.documentElement.clientWidth,window.document.documentElement.clientHeight);
   //    }, 40);

}

function InitialSceneState() {
   $(".progressBarContainer").css('display','block');
   $(".ChooseImg1").css('display','block');
   $(".ChooseImg2").css('display','block');
   $(".ChooseImg3").css('display','block');
   $(".ChooseImg4").css('display','block');
   scene.groupApplyState("CAP:6002");
}

var AllGeometryCompleted = false;

function AllGeometryComplete() {
   AllGeometryCompleted = true;
   console.log('All time: ' + (new Date().getTime() - start));
   $(".divRTSkin").css('display','block');

   $("#btn_6002").on("click",function () {
      $('#btn_110').css("display","inline-block");
      $('#btn_100').css("display","inline-block");
      $('#btn_995').css("display","inline-block");

      $('#btn_451').css("display","none");
      $('#btn_blue').css("display","none");
      $('#btn_light_blue').css("display","none");
      $('#btn_light_green').css("display","none");
      $('#btn_rose_gold').css("display","none");
      $('#btn_white').css("display","none");

   })
   $("#btn_6003").on("click",function () {
      $('#btn_110').css("display","inline-block");
      $('#btn_100').css("display","inline-block");
      $('#btn_995').css("display","inline-block");

      $('#btn_451').css("display","inline-block");
      $('#btn_blue').css("display","inline-block");
      $('#btn_light_blue').css("display","inline-block");
      $('#btn_light_green').css("display","inline-block");
      $('#btn_rose_gold').css("display","inline-block");
      $('#btn_white').css("display","inline-block");

   })
}

window.document.onkeyup = function (e) {
   // console.log("ECS pressed IE1");
   if (e.keyCode == 27) { // escape key maps to keycode `27`
      var iE = 0;
      var _intervalEsc = setInterval(function () {
         if (iE < 5) {
            // console.log("func"+iE);
            exitFullscreen(window.document.documentElement);
            iE++;
         } else {
            clearInterval(_intervalEsc);
         }
      },10);
   }

}

var FullscreenOn = false;
function resizePage(width,height) {
   // console.log("resize")
   // alert("Resize page width: "+width+" height: "+height);


   if (mob) {
      $('#backgroud_strip').hide();
      $('#loaderImg').hide();
      var pixelRatio = 2;

      if ((navigator.userAgent.indexOf('iPad') != -1)) {

         width = window.document.documentElement.clientWidth;
         height = window.document.documentElement.clientHeight;
      }

      FullscreenOn = window.fullScreen;
      //// console.log(" resize page flscreen "+width+" "+height);
      if (mob) {
         jQuery("#dummy-canvas").detach().appendTo('#maincanvasContainer');
         jQuery("#superblaze-canvas").detach().appendTo('#canvasContainer');
      }
      var s;

      if (mob) {
      }
      var dummyCanvas = document.getElementById("dummy-canvas");
      var canvas = document.getElementById('superblaze-canvas');
      var h = window.innerHeight;
      var w = window.innerWidth;
      var ccs;
      //if(mob){        
      h = window.document.documentElement.clientHeight * pixelRatio;
      w = window.document.documentElement.clientWidth * pixelRatio;

      width1 = eval(window.document.documentElement.clientWidth / w);
      height1 = eval(window.document.documentElement.clientHeight / h);

      if (window.document.documentElement.clientWidth < window.document.documentElement.clientHeight) {
         ccs = width1;
      } else {
         ccs = height1;
      }
      //}

      canvas.width = dummyCanvas.width = w;
      canvas.height = dummyCanvas.height = h;


      isExpanded = false;
      $("#explore-feature, #rightAnim, #hotspot_container").removeClass("mob-landscap");
      if (w > h) {
         $("#explore-feature, #rightAnim, #hotspot_container").addClass("mob-landscap");
      }
      else {
         var i_ = 0
         var to_ = setInterval(function () {
            document.body.scrollTop = -1
            // clear timeout after 100 ms and reset scrollTop to 0
            if (i_++ > 10) {
               clearInterval(to_)
               document.body.scrollTop = 0
            }
         },10);

      }


      setTimeout(function () {
         var canvasWH = document.getElementById("superblaze-canvas");
         $("#images-anim-container, #maincanvasContainer .hot").css({ width: canvasWH.width,height: "100%" });
      },200);


      if (scene) {
         scene.resize(canvas.width,canvas.height);
         //        scene.clearRefine();        
      }
      //     if (mob) {
      $('#superblaze, #dummy-canvas').css({
         'margin-left': 0,
         'margin-top': 0
      });
      //            $('#canvasContainer, #maincanvasContainer').css({
      //                'margin-left': 0,
      //                'margin-top': 0
      //            });


      // $("#canvasContainer, #maincanvasContainer").css({
      $("#canvasContainer").css({   
         'transform': 'scale(' + ccs + ')',
         'transform-origin': '0% 0%',

         '-webkit-transform': 'scale(' + ccs + ')',
         '-webkit-transform-origin': '0% 0%',

         '-moz-transform': 'scale(' + ccs + ')',
         '-moz-transform-origin': '0% 0%',

         '-o-transform': 'scale(' + ccs + ')',
         '-o-transform-origin': '0% 0%',

         '-ms-transform': 'scale(' + ccs + ')',
         '-ms-transform-origin': '0% 0%',
      });


   }
   else {




      if ((navigator.userAgent.indexOf('iPad') != -1)) {

         width = window.document.documentElement.clientWidth;
         height = window.document.documentElement.clientHeight;

      }

      if (mob) {
         $("#fullScreen").css('display','none');
      } else if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
         // console.log("IE 11");
         $("#fullScreenOff").css('display','none');
         $("#fullScreen").css('display','none');
      } else {
         $("#fullScreenOff").css('display','none');
         $("#fullScreen").css('display','none');
      }

      //    

      FullscreenOn = window.fullScreen;
      //// console.log(" resize page flscreen "+width+" "+height);
      if (mob) {
         jQuery("#dummy-canvas").detach().appendTo('#maincanvasContainer');
         jQuery("#superblaze-canvas").detach().appendTo('#canvasContainer');
         $("#superblaze-canvas").attr({
            width: '1024px',
            height: '576px'
         });
      }
      var s;
      if (FullscreenOn == true) {
         if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
            // console.log("IE 11 FS on");
            $("#fullScreenOff").css('display','none');
            $("#fullScreen").css('display','none');
         } else {
            // console.log("Not IE 11");
            $("#fullScreenOff").css('display','block');
            $("#fullScreen").css('display','none');
         }

         if (width > 1920) {
            width = 1920;
         }
         if (height > 1080) {
            height = 1080;
         }

      } else {
         if (mob) {
            $("#fullScreen").css('display','none');
         } else {

            $("#fullScreen").css('display','block');
            $("#fullScreenOff").css('display','none');
         }

         if (width > 1280) {
            width = 1280;
         }
         if (height > 720) {
            height = 720;
         }
      }

      var w = eval(width / 1280);
      var h = eval(height / 720);

      if (w < h || (navigator.userAgent.indexOf('iPad') != -1)) {
         // console.log("Resize page2 width: "+width+" height: "+height);
         //// console.log(" width ...");
         s = w;
         sceneDivW = width;
         sceneDivH = 1080 * width / 1920;
         //if(s<0.815 || mob){
         $("#scenediv").css({ 'width': "1280px",'height': "720px" });
         $("#dummy-canvas").css({ 'width': "1280px",'height': "720px" });

         var div = document.getElementById("superblaze-canvas");
         if (div.getBoundingClientRect) {
            var rect = div.getBoundingClientRect();
            new_w = rect.right - rect.left;
            new_h = rect.bottom - rect.top;
         }
         if ((navigator.userAgent.indexOf('iPad') != -1)) {
            // console.log("resizing ipad....."+mob);
            $('#superblaze').css({
               'margin-left': 0,
               'margin-top': 0
            });
            $("#superblazeWrapper",window.document).css({
               'margin-left': 0,
               'margin-top': 0
            });
            $('#canvasContainer').css({
               'margin-left': 0,
               'margin-top': 0
            });
         } else if (mob) {
            // console.log("resizing mob....."+mob);
            $('#superblaze').css({
               'margin-left': (($(window).width() - new_w) / 2),
               'margin-top': 0
            });
            $("#superblazeWrapper",window.document).css({
               'margin-left': (($(window).width() - new_w) / 2),
               'margin-top': 0
            });
            $('#canvasContainer').css({
               'margin-left': (($(window).width() - new_w) / 2),
               'margin-top': 0
            });
         } else {
            // console.log("resizing else....."+mob);
            $('#superblaze').css({
               'margin-left': (($(window).width() - new_w) / 2),
               'margin-top': parseInt(window.innerHeight - new_h) / 2
            });
            $("#superblazeWrapper",window.document).css({
               'margin-left': (($(window).width() - new_w) / 2),
               'margin-top': parseInt(window.innerHeight - new_h) / 2
            });
            $('#canvasContainer').css({
               'margin-left': (($(window).width() - new_w) / 2),
               'margin-top': parseInt(window.innerHeight - new_h) / 2
            });
         }

      } else {
         // console.log("height 22...");
         s = h;
         sceneDivH = height;
         sceneDivW = 1920 * height / 1080;
         // if(s < 0.815 || mob){
         $("#scenediv").css({ 'width': "1280px",'height': "720px" });
         $("#dummy-canvas").css({ 'width': "1280px",'height': "720px" });

         var div = document.getElementById("superblaze-canvas");
         if (div.getBoundingClientRect) {
            var rect = div.getBoundingClientRect();
            new_w = rect.right - rect.left;
            new_h = rect.bottom - rect.top;
         }
         if ((navigator.userAgent.indexOf('iPad') != -1)) {
            // console.log("resizing mob2....."+mob);
            $('#superblaze').css({
               'margin-left': 0,
               'margin-top': 0
            });
            $("#superblazeWrapper",window.document).css({
               'margin-left': 0,
               'margin-top': 0
            });
            $('#canvasContainer').css({
               'margin-left': 0,
               'margin-top': 0
            });
         } else {
            // console.log("resizing else2....."+mob);
            $('#superblaze').css({
               'margin-left': (($(window).width() - new_w) / 2),
               'margin-top': parseInt(window.innerHeight - new_h) / 2
            });
            $("#superblazeWrapper",window.document).css({
               'margin-left': (($(window).width() - new_w) / 2),
               'margin-top': parseInt(window.innerHeight - new_h) / 2
            });
            $('#canvasContainer').css({
               'margin-left': (($(window).width() - new_w) / 2),
               'margin-top': parseInt(window.innerHeight - new_h) / 2
            });
         }
      }

      if (mob) {
         $("#close").css("display","none");
      } else {
         $("#zoomSliderContainer").css("display","block");
      }

      //// console.log("else ...");
      $("#superblaze").css({
         'transform': 'scale(' + s + ')',
         'transform-origin': '0% 0%',
         '-webkit-transform': 'scale(' + s + ')',
         '-webkit-transform-origin': '0% 0%',
         '-moz-transform': 'scale(' + s + ')',
         '-moz-transform-origin': '0% 0%',
         '-o-transform': 'scale(' + s + ')',
         '-o-transform-origin': '0% 0%',
         '-ms-transform': 'scale(' + s + ')',
         '-ms-transform-origin': '0% 0%',
      });
      $("#superblazeWrapper",window.document).css({
         'transform': 'scale(' + s + ')',
         'transform-origin': '0% 0%',
         '-webkit-transform': 'scale(' + s + ')',
         '-webkit-transform-origin': '0% 0%',
         '-moz-transform': 'scale(' + s + ')',
         '-moz-transform-origin': '0% 0%',
         '-o-transform': 'scale(' + s + ')',
         '-o-transform-origin': '0% 0%',
         '-ms-transform': 'scale(' + s + ')',
         '-ms-transform-origin': '0% 0%',
      });

      var ccs = s / 1.5;
      if (mob) {
         ccs = s / 0.8;
      }
      $("#canvasContainer").css({
         'transform': 'scale(' + ccs + ')',
         'transform-origin': '0% 0%',

         '-webkit-transform': 'scale(' + ccs + ')',
         '-webkit-transform-origin': '0% 0%',

         '-moz-transform': 'scale(' + ccs + ')',
         '-moz-transform-origin': '0% 0%',

         '-o-transform': 'scale(' + ccs + ')',
         '-o-transform-origin': '0% 0%',

         '-ms-transform': 'scale(' + ccs + ')',
         '-ms-transform-origin': '0% 0%',
      });

   }
}

function addMouseListeners(canvas) {
   canvas.addEventListener('mousemove',mouseMove,false);
   canvas.addEventListener('mousedown',mouseDown,false);
   canvas.addEventListener('mouseup',mouseUp,false);
   canvas.addEventListener('mousewheel',mouseWheel,false);
   canvas.addEventListener('DOMMouseScroll',mouseWheel,false);
   canvas.addEventListener('mouseout',mouseOut,false);
   canvas.addEventListener('touchstart',touchStart,false);
   canvas.addEventListener('touchmove',touchMove,false);
   canvas.addEventListener('touchend',touchEndCan,false);

   //   document.getElementById('fan2').addEventListener('mousedown', showRoof, false);

   document.getElementById('reset').addEventListener('mousedown',onReset,false);
   document.getElementById("reset").addEventListener("mouseover",mouseOverBtnDrag,false);
   document.getElementById('reset').addEventListener('mouseout',mouseOutBtnDrag,false);


}

function close_window() {
   window.close();
}

function onhoverint() {
   //	console.log("its hovered");
   $("#interiorBtn").css("color","#fff");
   $("#interiorBtn").css("background-color","#000");
   $("#extBtn").css("color","#000");
   $("#extBtn").css("background-color","transparent");
}

function onhoverout() {
   //	console.log("its hovered");
   $("#interiorBtn").css("color","#000");
   $("#interiorBtn").css("background-color","transparent");
   $("#extBtn").css("color","#fff");
   $("#extBtn").css("background-color","#000");

}

var roof = true;
function showRoof() {
   if (roof) {
      roof = false;
      $("#on").css("display","none");
      $("#off").css("display","block");
      scene.instanceSet("convertible","visible",false);
      scene.instanceSet("side_glass","visible",false);

   } else {
      roof = true;
      $("#on").css("display","block");
      $("#off").css("display","none");
      scene.instanceSet("convertible","visible",true);
      scene.instanceSet("side_glass","visible",true);
   }
   scene.clearRefine();

}



document.onselectstart = function () {
   return false;
};

var btnDrag = false;

function mouseOverBtnDrag() {
   btnDrag = true;
}

function mouseOutBtnDrag() {
   setTimeout(function () {
      btnDrag = false;
   },100);
}

var updateId = 0;

function onRightClick(event) {

   return false; //surpress theright menu 
}

function onWindowFocus() {
   // console.log("Focus returned, restarting..")
   updateEnabled = true;
   //	scene.stop();
   //   scene.start();
}

function onWindowBlur() {
   updateEnabled = false;
}

//function onWindowFocus(){
//   updatedEnabled = true;
//  
//   
//}

function debounce(func,wait,immediate) {
   var timeout;
   return function () {
      var context = this,
         args = arguments;
      var later = function () {
         timeout = null;
         if (!immediate) func.apply(context,args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later,wait);
      if (callNow) func.apply(context,args);
   };
};
var sceneViewMatrix;

function frameUpdate() {
   var backofftime = 50;
   if (navigator.userAgent.indexOf("Android") != -1)
      backofftime = 50;
   setTimeout(function () {
      window.requestAnimationFrame(frameUpdate);
   },scene.backoff);
   if (scene._refineCount < 64) frameUpdateForScene(scene);
   sceneViewMatrix = scene._nav.NavCreateViewMatrix(scene._initialNavMatrix);
   scene.setViewMatrix(sceneViewMatrix);

   if (mob || (navigator.userAgent.indexOf('iPad') != -1)) {
      // Do nothing
   } else {
      $(window).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange',function (e) {
         var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
         var event = state ? 'FullscreenOn' : 'FullscreenOff';
         window.fullScreen = state;
         //resizePage(window.document.documentElement.clientWidth,window.document.documentElement.clientHeight);  
      });
   }
}

var updateDynamicText = false;
var updateDynamicText3 = false;
var updateDynamicText4 = false;
var updateDynamicText5 = false;
var updateDynamicText6 = false;
var updateDynamicText7 = false;
var updateDynamicText8 = false;
var updateDynamicText9 = false;
var updateDynamicText10 = false;
var updateDynamicText11 = false;
function frameUpdateForScene(scene) {
   //var numJobs = scene.getTotalJobs();
   //var numDone = numJobs-scene.getOutstandingJobs();
   //if (numDone != numJobs)
   //   // console.log("Scene ("+scene.urlRoot+") Progress "+numDone+"/"+numJobs);

   if (updateDynamicText) {
      ChangeTextTo(document.getElementById('inputtext_backtop').value);
      updateDynamicText = false;
   }
   if (updateDynamicText3) {
      ChangeTextTo3(document.getElementById('inputtext_left').value);
      updateDynamicText3 = false;
   }
   if (updateDynamicText4) {
      ChangeTextTo4(document.getElementById('inputtext_right').value);
      updateDynamicText4 = false;
   }
   if (updateDynamicText5) {
      ChangeTextTo5(document.getElementById('inputtext_BackBottom').value);
      updateDynamicText5 = false;
   }
   if (updateDynamicText6) {
      ChangeTextTo6(document.getElementById('Embhat_top').value);
      updateDynamicText6 = false;
   }
   if (updateDynamicText7) {
      ChangeTextTo7(document.getElementById('Embhat_middle').value);
      updateDynamicText7 = false;
   }
   if (updateDynamicText8) {
      ChangeTextTo8(document.getElementById('Embhat_bottom').value);
      updateDynamicText8 = false;
   }
   if (updateDynamicText9) {
      ChangeTextTo9(document.getElementById('inputtext_lining_top').value);
      updateDynamicText9 = false;
   }
   if (updateDynamicText10) {
      ChangeTextTo10(document.getElementById('inputtext_lining_middle').value);
      updateDynamicText10 = false;
   }
   if (updateDynamicText11) {
      ChangeTextTo11(document.getElementById('inputtext_lining_bottom').value);
      updateDynamicText11 = false;
   }
   if(AllGeometryCompleted){
   // var box = scene.getInstanceByNameIncEnv('box_closed', this);
   // var box2 = scene.getInstanceByNameIncEnv('cardboard_box_geo', this);
   // var box3 = scene.getInstanceByNameIncEnv('box_cloth1', this);
   // if(box.visible || box2.visible || box3.visible){
   //    scene._nav._navMaxDolly = 175;
   // } else {
   //    scene._nav._navMaxDolly = 95;
   // }
}
   var bGotoPosUpdate = scene._nav._navGotoPosActive;
   scene.setViewMatrix(scene._nav.NavCreateViewMatrix(scene._initialNavMatrix));
   scene.setModelMatrix(scene._nav.NavCreateModelMatrix(scene._initialNavMatrix));
   scene.draw();
   if (bGotoPosUpdate)
      scene.clearRefine();




}

function getScene(ev) {
   var s = scene;
   if (scene2 != null && ev.currentTarget == canvas2)
      s = scene2;
   return s;
}

var mpos = [0,0];
var mdown = false;
var panNav = false;

function mouseDown(ev) {
   var s = getScene(ev);
   if (ev.which == 3) {
      panNav = true;
   }
   var mouseDownPos = [ev.clientX - canvas.offsetLeft,ev.clientY - canvas.offsetTop];
   if (!s.onClick(mouseDownPos,ev.button)) {
      mdown = true;
      mpos = mouseDownPos;
   }

}

function mouseUp(ev) {
   mdown = false;
   if (ev.which == 3 || panNav) panNav = false;
   handOpen();
}

function mouseOut(ev) {
   mdown = false;
   if (ev.which == 3 || panNav) panNav = false;
   handOpen();
}

function mouseMove(ev) {
   if (!mdown || !animStoped) return;
   var s = getScene(ev);
   var mousePos = [ev.clientX - canvas.offsetLeft,ev.clientY - canvas.offsetTop];
   var mdelta = [(mpos[0] - mousePos[0]),(mpos[1] - mousePos[1])];
   mpos = [mousePos[0],mousePos[1]];
   //pan nav is initialized and set in ui\_ui.js for now.
   if (!panNav) {
      if (s._nav.NavRotation(mpos,mdelta)) s.clearRefine();
      mdelta = [mdelta[0] * 30,mdelta[1] * 30];
   } else {
      var mdelta2 = [mdelta[0] * 0.50,mdelta[1] * 0.50];
      if (s._nav.NavPan(mdelta2)) s.clearRefine();
   }
}

function mouseWheel(ev) {

   var s = getScene(ev);
   var delta = ev.wheelDelta ? ev.wheelDelta : (-ev.detail * 10.0);
   //var deltaScene = (delta*0.05)*(scene.sceneRadius*0.01);
   var deltaScene = delta * 0.01;
   if (s._nav.NavChangeDolly(deltaScene))
      s.clearRefine();
}
function updateZoomBarBg(newval) {
   var scale = -(navMinDolly - navMaxDolly);
   var val = -newval + navMaxDolly;
   $("#zoom_slider_bg").css("height",(val / scale) * 100 + "%");
}


function updateZoomBar(newval) {
   var scale = -(navMinDolly - navMaxDolly);
   var val = -newval;
   $(".ui-slider-handle").css("bottom",(val / scale) * 100 + "%");
}

var animStoped = true;

function animComplete() {
   animStoped = true;
   g_navEnabled = true;
}


var dragCursor;
var curBrowser = BrowserDetect.browser;
// IE doesn't support co-ordinates
var cursCoords = (curBrowser == "Explorer") ? "" : " 4 4";

function initDragCursor() {
   handOpen();
   $('#sliderBG').mousedown(function () {
      handClosed();
   });
   $('.ui-slider-handle').mousedown(function () {
      handClosed();
   });
   $('body').mouseup(function () {
      handOpen();
   });
   $('body').mouseup(function () {
      handOpen();
   });
}

function handClosed() {
   dragCursor = (curBrowser == "Firefox") ? "-moz-grabbing" : "url(" + window.baseURL + "images_gl/closedhand.cur)" + cursCoords + ", move";
   // Opera doesn't support url cursors and doesn't fall back well...
   if (curBrowser == "Opera") dragCursor = "move";
   $('.ui-slider-handle').css("cursor",dragCursor);
   $('#sliderBG').css("cursor",dragCursor);
   $('#dummy-canvas').css("cursor",dragCursor);
}

function handOpen() {
   dragCursor = (curBrowser == "Firefox") ? "-moz-grab" : "url(" + window.baseURL + "images_gl/openhand.cur)" + cursCoords + ", move";
   $('.ui-slider-handle').css("cursor",dragCursor);
   $('#sliderBG').css("cursor",dragCursor);
   $('#dummy-canvas').css("cursor",dragCursor);
}

var mouseIsDown = false;
var loopCtr = 0;
var touch = new Vector3();
var touches = [new Vector3(),new Vector3(),new Vector3()];
var prevTouches = [new Vector3(),new Vector3(),new Vector3()];
var prevDistance = null;

function touchStart(event) {
   switch (event.touches.length) {
      case 1:
         touches[0].set(event.touches[0].pageX,event.touches[0].pageY,0);
         touches[1].set(event.touches[0].pageX,event.touches[0].pageY,0);
         break;
      case 2:
         touches[0].set(event.touches[0].pageX,event.touches[0].pageY,0);
         touches[1].set(event.touches[1].pageX,event.touches[1].pageY,0);
         prevDistance = touches[0].distanceTo(touches[1]);
         break;
   }
   prevTouches[0].copy(touches[0]);
   prevTouches[1].copy(touches[1]);
}

var doubleTouch = false;

function touchMove(event) {
   var s = getScene(event);
   event.preventDefault();
   event.stopPropagation();
   var getClosest = function (touch,touches) {
      var closest = touches[0];
      for (var i in touches) {
         if (closest.distanceTo(touch) > touches[i].distanceTo(touch)) closest = touches[i];
      }
      return closest;
   }
   switch (event.touches.length) {
      case 1:
         if (doubleTouch == false) {
            touches[0].set(event.touches[0].pageX,event.touches[0].pageY,0);
            touches[1].set(event.touches[0].pageX,event.touches[0].pageY,0);
            if (s._nav.NavRotation([touches[0].x,touches[0].y],[(prevTouches[0].x - touches[0].x) * 0.5,(prevTouches[0].y - touches[0].y) * 0.5])) s.clearRefine();
            //scope.rotate( touches[ 0 ].sub( getClosest( touches[ 0 ] ,prevTouches ) ).multiplyScalar( - 0.005 ) );
         }
         break;
      case 2:
         doubleTouch = true;
         //alert("double");
         touches[0].set(event.touches[0].pageX,event.touches[0].pageY,0);
         touches[1].set(event.touches[1].pageX,event.touches[1].pageY,0);
         distance = touches[0].distanceTo(touches[1]);
         var deltaScene = -(prevDistance - distance) * 25;//touch zoom level
         if (s._nav.NavChangeDolly(deltaScene)) {
            s.clearRefine();
         }
         //scope.zoom( new Vector3( 0, 0, prevDistance - distance ) );
         prevDistance = distance;
         var offset0 = touches[0].clone().sub(getClosest(touches[0],prevTouches));
         var offset1 = touches[1].clone().sub(getClosest(touches[1],prevTouches));
         offset0.x = -offset0.x;
         offset1.x = -offset1.x;
         var mdelta2 = [offset1.x * 10,-offset1.y * 10]; //touch panning

         if (s._nav.NavPan(mdelta2)) s.clearRefine();
         //scope.pan( offset0.add( offset1 ).multiplyScalar( 0.5 ) );
         break;
   }
   prevTouches[0].copy(touches[0]);
   prevTouches[1].copy(touches[1]);

}

function touchEndCan(event) {

   setTimeout(function () {
      doubleTouch = false;
   },100);
}

/*For Font Geometry*/

var storedpos_old = { xang: -0.816814,yang: -3.09133,xpan: 0,ypan: 0,dolly: -28.7342 };
var storedpos_2 = { xang: -1.10584,yang: 0,xpan: 0,ypan: 0,dolly: -26.0564 };
var storedpos_3 = { xang: -1.10584,yang: 0,xpan: 0,ypan: 0,dolly: -0.00012207 };
var storedpos_Position_3 = { xang: -1.10584,yang: 0,xpan: 0,ypan: 0,dolly: 0.0140076 };
var storedpos_Position_4 = { xang: 0,yang: 0,xpan: 0,ypan: 0,dolly: 0.0164413 };
var storedpos_Position_5 = { xang: 0,yang: 0,xpan: 0,ypan: 0,dolly: 0 };

var currentfont = "fontCal";
function changeFont(fontname) {
   ChangeTextTo('');	// Clear text first before changing
   currentfont = fontname;
   updateDynamicText = true;
   scene.clearRefine();
}
var currentfont3 = "fontCal3";
function changeFont3(fontname3) {
   ChangeTextTo3('');	// Clear text first before changing
   currentfont3 = fontname3;
   updateDynamicText3 = true;
   scene.clearRefine();
}
var currentfont4 = "fontCal4";
function changeFont4(fontname4) {
   ChangeTextTo4('');	// Clear text first before changing
   currentfont4 = fontname4;
   updateDynamicText4 = true;
   scene.clearRefine();
}
var currentfont5 = "fontCal5";
function changeFont5(fontname5) {
   ChangeTextTo5('');	// Clear text first before changing
   currentfont5 = fontname5;
   updateDynamicText5 = true;
   scene.clearRefine();
}
var currentfont6 = "fontCal6";
function changeFont6(fontname6) {
   ChangeTextTo6('');	// Clear text first before changing
   currentfont6 = fontname6;
   updateDynamicText6 = true;
   scene.clearRefine();
}
var currentfont7 = "fontCal7";
function changeFont7(fontname7) {
   ChangeTextTo7('');	// Clear text first before changing
   currentfont7 = fontname7;
   updateDynamicText7 = true;
   scene.clearRefine();
}
var currentfont8 = "fontCal8";
function changeFont8(fontname8) {
   ChangeTextTo8('');	// Clear text first before changing
   currentfont8 = fontname8;
   updateDynamicText8 = true;
   scene.clearRefine();
}
var currentfont9 = "fontCal9";
function changeFont9(fontname9) {
   ChangeTextTo9('');	// Clear text first before changing
   currentfont9 = fontname9;
   updateDynamicText9 = true;
   scene.clearRefine();
}
var currentfont10 = "fontCal10";
function changeFont10(fontname10) {
   ChangeTextTo10('');	// Clear text first before changing
   currentfont10 = fontname10;
   updateDynamicText10 = true;
   scene.clearRefine();
}
var currentfont11 = "fontCal11";
function changeFont11(fontname11) {
   ChangeTextTo11('');	// Clear text first before changing
   currentfont11 = fontname11;
   updateDynamicText11 = true;
   scene.clearRefine();
}
var letterDB = {
   'a': { 'in': 'a_geo','in_d': 'a_Dimond_geo','lw': 1.9 },
   'b': { 'in': 'b_geo','in_d': 'b_Diamond_geo' },
   'c': { 'in': 'c_geo','in_d': 'c_Diamond_geo' },
   'd': { 'in': 'd_geo','in_d': 'd_Diamond_geo' },
   'e': { 'in': 'e_geo','in_d': 'e_Diamond_geo','lw': 1.5 },
   'f': { 'in': 'f_geo','in_d': 'f_Diamond_geo','lw': 1.5 },
   'g': { 'in': 'g_geo','in_d': 'g_Diamond_geo' },
   'h': { 'in': 'h_geo','in_d': 'h_Diamond_geo' },
   'i': { 'in': 'i_geo','in_d': 'i_Diamond_geo','lw': 1 },
   'j': { 'in': 'j_geo','in_d': 'j_Diamond_geo','lw': 1.5 },
   'k': { 'in': 'k_geo','in_d': 'k_Diamond_geo' },
   'l': { 'in': 'l_geo','in_d': 'l_Diamond_geo','lw': 1.3 },
   'm': { 'in': 'm_geo','in_d': 'm_Diamond_geo','lw': 2.5 },
   'n': { 'in': 'n_geo','in_d': 'n_Diamond_geo1' },
   'o': { 'in': 'o_geo','in_d': 'o_Diamond_geo' },
   'p': { 'in': 'p_geo','in_d': 'p_Diamond_geo' },
   'q': { 'in': 'q_geo','in_d': 'q_Diamond_geo' },
   'r': { 'in': 'r_geo','in_d': 'r_Diamond_geo' },
   's': { 'in': 's_geo','in_d': 's_Diamond_geo','lw': 1.5 },
   't': { 'in': 't_geo','in_d': 't_diamond_geo' },
   'u': { 'in': 'u_geo','in_d': 'u_Diamond_geo' },
   'v': { 'in': 'v_geo','in_d': 'v_Diamond_geo' },
   'w': { 'in': 'w_geo','in_d': 'w_Diamond_geo','lw': 2.75 },
   'x': { 'in': 'x_geo','in_d': 'x_Diamond_geo' },
   'y': { 'in': 'y_geo','in_d': 'y_Diamond_geo','lw': 1.5 },
   'z': { 'in': 'z_geo','in_d': 'z_Diamond_geo' },
   '0': { 'in': 'Zero_geo','in_d': 'Zero_diamond_geo' },
   '1': { 'in': 'One_geo','in_d': 'One_diamond_geo','lw': 1.3 },
   '2': { 'in': 'Two_geo','in_d': 'Tow_diamond_geo','lw': 1.7 },
   '3': { 'in': 'Three_geo','in_d': 'Three_diamond_geo','lw': 1.7 },
   '4': { 'in': 'Four_geo','in_d': 'Four_diamond_geo','lw': 1.7 },
   '5': { 'in': 'Five_geo','in_d': 'Five_diamond_geo','lw': 1.7 },
   '6': { 'in': 'Six_geo','in_d': 'Six_diamond_geo','lw': 1.7 },
   '7': { 'in': 'Seven_geo','in_d': 'Seven_diamond_geo','lw': 1.7 },
   '8': { 'in': 'Eight_geo','in_d': 'Eight_diamond_geo','lw': 1.7 },
   '9': { 'in': 'Nine_geo','in_d': 'Nine_diamond_geo','lw': 1.7 },
   '!': { 'in': 'Exclamation_mark_geo','in_d': 'Exclamation_mark_dia','lw': 1.2 },
   '?': { 'in': 'question_mark_geo','in_d': 'question_mark_dia','lw': 1.4 },
   '.': { 'in': 'full_stop_geo','in_d': 'full_stop_dia','lw': 1.5 },
   '\'': { 'in': 'Apostrophe_geo1','in_d': 'Apostrophe_dia','lw': 1.5 },
   ':': { 'in': 'colon_geo','in_d': 'colon_dia','lw': 1.4 },
   '“': { 'in': 'open_Quote_geo','in_d': 'open_Quote_dia','lw': 1.5 },
   '”': { 'in': 'Close_quote_geo','in_d': 'Close_Quote_dia','lw': 1.5 },
   '%': { 'in': 'percentage_geo','in_d': 'Percent_dia' },
   '…': { 'in': 'three_dots_geo','in_d': 'three_dots_dia','lw': 2.2 },
   '/': { 'in': 'Forward_slash_geo','in_d': 'Forward_slash_dia','lw': 1.9 },
   '\\': { 'in': 'Backslash_geo','in_d': 'Backslash_dia','lw': 1.9 },
   '|': { 'in': 'PIPE_GEO','in_d': 'Pipe_dia','lw': 1.3 },
   ';': { 'in': 'SEMICOLON_GEO','in_d': 'semicolon_dia','lw': 1.4 },
   '+': { 'in': 'PLUSE_GEO','in_d': 'plus_dia','lw': 1.5 },
   '_': { 'in': 'underscore_geo','in_d': 'underscore_dia' },
   '-': { 'in': 'dash_geo','in_d': 'dash_dia','lw': 1.2 },
   '=': { 'in': 'EQUALS','in_d': 'equals_dia','lw': 1.9 },
   '&': { 'in': 'And_geo','in_d': 'And_Dia','lw': 2.2 },
   '^': { 'in': 'CARET_GEO','in_d': 'Caret_Dia' },
   '$': { 'in': 'Dollor_geo','in_d': 'Dollor_Dia' },
   '@': { 'in': 'AT_GEO','in_d': 'At_Dia','lw': 2.7 },
   '#': { 'in': 'Hash_geo','in_d': 'Hash_Dia','lw': 1.9 },
   '~': { 'in': 'Tilde_geo','in_d': 'Tilde_Dia','lw': 1.9 },
   '(': { 'in': 'Open_brackcet_geo','in_d': 'Open_brackcet_Dia','lw': 1.8 },
   ')': { 'in': 'Close_brackcet_geo','in_d': 'Close_brackcet_Dia','lw': 1.8 },
   '*': { 'in': 'Asterisk_geo','in_d': 'Asterisk_Dia','lw': 1.8 },
   'á': { 'in': 'SPANISH_A_geo','in_d': 'SPANISH_A_Dia' },
   'é': { 'in': 'SPANISH_E_geo','in_d': 'SPANISH_E_Dia','lw': 1.5 },
   'í': { 'in': 'SPANISH_I_geo','in_d': 'SPANISH_I_Dia','lw': 1 },
   'ó': { 'in': 'SPANISH_O_geo','in_d': 'SPANISH_O_Dia' },
   'ü': { 'in': 'SPANISH_U01_geo','in_d': 'SPANISH_U01_Dia' },
   'ú': { 'in': 'SPANISH_U02_geo','in_d': 'SPANISH_U02_Dia' },
   'ñ': { 'in': 'SPANISH_N_geo','in_d': 'SPANISH_N_Dia' },
   'å': { 'in': 'SPANISH_A_dot_geo','in_d': 'SPANISH_A_dot_Dia' },
   'ä': { 'in': 'SPANISH_A_2dot_geo','in_d': 'SPANISH_A_2dot_Dia' },
   'ö': { 'in': 'SPANISH_O_2dot_geo','in_d': 'SPANISH_O_2dot_Dia' }
};
function GetLetterGeoName(ch,dia) {
   var le = letterDB[ch];
   if (le == undefined)
      return '';
   return (dia) ? le.in_d : le.in;
}
function GetLetterWidth(ch) {
   var le = letterDB[ch];
   if (le == undefined || le.lw == undefined)
      return 2;
   return le.lw;
}
// var inputtext_1 = true;
var arrLetterPositions = null,instLetters = null;
function ChangeTextTo(text) {
   var i,texlen = text.length;
   if (currentfont == "fontCal") {
      console.log("fontCal");
      setUserInputBackTop(text,"Text_upsala_lunda.png","center");
   }else if (currentfont == "fontTNR") {
      console.log("fontTNR");
      setUserInputBackTop(text,"Text_upsala_lunda.png","center");
   }else if (currentfont == "fontCLS") {
      console.log("fontCLS");
      setUserInputBackTop(text,"Text_upsala_lunda.png","center");
   }else if (currentfont == "fontLeague") {
      console.log("fontLeague");
      setUserInputBackTop(text,"Text_upsala_lunda.png","center");
   }
}

function ChangeTextTo3(text) {
   if (currentfont3 == "fontCal3") {
      console.log("fontCal3");
      setUserInputLeft(text,"Text_nameband_FL.png","right");
   }  else if (currentfont3 == "fontTNR3") {
      console.log("fontTNR3");
      setUserInputLeft(text,"Text_nameband_FL.png","right");
   } else if (currentfont3 == "fontCLS3") {
      console.log("fontCLS3");
      setUserInputLeft(text,"Text_nameband_FL.png","right");
   } else if (currentfont3 == "fontLeague3") {
      console.log("fontLeague3");
      setUserInputLeft(text,"Text_nameband_FL.png","right");
   }
}
function ChangeTextTo4(text) {
   if (currentfont4 == "fontCal4") {
      console.log("fontCal4");
      setUserInputRight(text,"Text_nameband_FR.png","left");
   }else if (currentfont4 == "fontTNR4") {
      console.log("fontTNR4");
      setUserInputRight(text,"Text_nameband_FR.png","left");
   }else if (currentfont4 == "fontCLS4") {
      console.log("fontCLS4");
      setUserInputRight(text,"Text_nameband_FR.png","left");
   }else if (currentfont4 == "fontLeague4") {
      console.log("fontLeague4");
      setUserInputRight(text,"Text_nameband_FR.png","left");
   }
}
function ChangeTextTo5(text) {
   if (currentfont5 == "fontCal5") {
      console.log("fontCal5");
      setUserInputBackBottom(text,"Font_Text.png","center");
   }else if (currentfont5 == "fontTNR5") {
      console.log("fontTNR5");
      setUserInputBackBottom(text,"Font_Text.png","center"); 
   }else if (currentfont5 == "fontCLS5") {
      console.log("fontCLS5");
      setUserInputBackBottom(text,"Font_Text.png","center"); 
   }else if (currentfont5 == "fontLeague5") {
      console.log("fontLeague5");
      setUserInputBackBottom(text,"Font_Text.png","center"); 
   }
}
function ChangeTextTo6(text) {
   if (currentfont6 == "fontCal6") {
      console.log("fontCal6");
      setUserInputEmbhatTop(text,"Text_lining_Top_Cap_Front.png","center");
   }else if (currentfont6 == "fontTNR6") {
      console.log("fontTNR6");
      setUserInputEmbhatTop(text,"Text_lining_Top_Cap_Front.png","center"); 
   }else if (currentfont6 == "fontCLS6") {
      console.log("fontCLS6");
      setUserInputEmbhatTop(text,"Text_lining_Top_Cap_Front.png","center"); 
   }else if (currentfont6 == "fontLeague6") {
      console.log("fontLeague6");
      setUserInputEmbhatTop(text,"Text_lining_Top_Cap_Front.png","center"); 
   }
}
function ChangeTextTo7(text) {
   if (currentfont7 == "fontCal7") {
      console.log("fontCal7");
      setUserInputEmbhatMiddle(text,"Text_lining_Top_Cap_Front - Middle.png","center");
   }else if (currentfont7 == "fontTNR7") {
      console.log("fontTNR7");
      setUserInputEmbhatMiddle(text,"Text_lining_Top_Cap_Front - Middle.png","center"); 
   }else if (currentfont7 == "fontCLS7") {
      console.log("fontCLS7");
      setUserInputEmbhatMiddle(text,"Text_lining_Top_Cap_Front - Middle.png","center"); 
   }
}
function ChangeTextTo8(text) {
   if (currentfont8 == "fontCal8") {
      console.log("fontCal8");
      setUserInputEmbhatBottom(text,"Text_lining_Top_Cap_Front - Bottom.png","center");
   }else if (currentfont8 == "fontTNR8") {
      console.log("fontTNR8");
      setUserInputEmbhatBottom(text,"Text_lining_Top_Cap_Front - Bottom.png","center"); 
   }else if (currentfont8 == "fontCLS8") {
      console.log("fontCLS8");
      setUserInputEmbhatBottom(text,"Text_lining_Top_Cap_Front - Bottom.png","center"); 
   }
}
function ChangeTextTo9(text) {
   if (currentfont9 == "fontCal9") {
      console.log("fontCal9");
      setUserInputLiningTop(text,"Text_lining_Top.png","center");
   }else if (currentfont9 == "fontTNR9") {
      console.log("fontTNR9");
      setUserInputLiningTop(text,"Text_lining_Top.png","center"); 
   }else if (currentfont9 == "fontCLS9") {
      console.log("fontCLS9");
      setUserInputLiningTop(text,"Text_lining_Top.png","center"); 
   }
}
function ChangeTextTo10(text) {
   if (currentfont10 == "fontCal10") {
      console.log("fontCal10");
      setUserInputLiningMiddle(text,"Text_lining.png","center");
   }else if (currentfont10 == "fontTNR10") {
      console.log("fontTNR10");
      setUserInputLiningMiddle(text,"Text_lining.png","center"); 
   }else if (currentfont10 == "fontCLS10") {
      console.log("fontCLS10");
      setUserInputLiningMiddle(text,"Text_lining.png","center"); 
   }
}
function ChangeTextTo11(text) {
   if (currentfont11 == "fontCal11") {
      console.log("fontCal11");
      setUserInputLiningBottom(text,"Text_lining_Bottom.png","center");
   }else if (currentfont11 == "fontTNR11") {
      console.log("fontTNR10");
      setUserInputLiningBottom(text,"Text_lining_Bottom.png","center"); 
   }else if (currentfont11 == "fontCLS11") {
      console.log("fontCLS11");
      setUserInputLiningBottom(text,"Text_lining_Bottom.png","center"); 
   }
}
function Create3DBlockLetter(i,ch,chname,dia,xv,yv,interzv,interpos) {
   var srcInst = scene.getInstanceByName(GetLetterGeoName(ch,dia),scene);
   if (srcInst != null) {
      var inst = srcInst.clone(chname + i,instLetters);
      inst.visible = 1;
      inst.matrix[0] = xv[0]; inst.matrix[1] = xv[1]; inst.matrix[2] = xv[2];
      inst.matrix[4] = yv[0]; inst.matrix[5] = yv[1]; inst.matrix[6] = yv[2];
      inst.matrix[8] = interzv[0]; inst.matrix[9] = interzv[1]; inst.matrix[10] = interzv[2];
      inst.matrix = MatrixMultiply(inst.matrix,MatrixScaling(0.45,0.45,0.45));
      inst.matrix[12] = interpos[0];
      inst.matrix[13] = interpos[1];
      inst.matrix[14] = interpos[2];
   }
}

function RenderDynamicText() {
   updateDynamicText = true;
   scene.clearRefine();
}

$(document).ready(function () {
   
   var spriteCanvasPreload3 = document.createElement('canvas');
   spriteCanvasPreload3.width = spriteCanvasPreload3.height = 8;
   var ctx2 = spriteCanvasPreload3.getContext('2d',{ alpha: false });
   ctx2.font = '90px TimesNewRoman';
   ctx2.fillText('Preload',0,0);

   var spriteCanvasPreload3 = document.createElement('canvas');
   spriteCanvasPreload3.width = spriteCanvasPreload3.height = 8;
   var ctx2 = spriteCanvasPreload3.getContext('2d',{ alpha: false });
   ctx2.font = '90px serifFont';
   ctx2.fillText('Preload',0,0);

   var spriteCanvasPreload4 = document.createElement('canvas');
   spriteCanvasPreload4.width = spriteCanvasPreload4.height = 8;
   var ctx2 = spriteCanvasPreload4.getContext('2d',{ alpha: false });
   ctx2.font = '90px leagueGothicFont';
   ctx2.fillText('Preload',0,0);

   var spriteCanvasPreload = document.createElement('canvas');
   spriteCanvasPreload.width = spriteCanvasPreload.height = 8;
   var ctx = spriteCanvasPreload.getContext('2d',{ alpha: false });
   ctx.font = '90px scriptFont';
   ctx.fillText('Preload',0,0);

   var spriteCanvasPreload2 = document.createElement('canvas');
   spriteCanvasPreload2.width = spriteCanvasPreload2.height = 8;
   var ctx2 = spriteCanvasPreload2.getContext('2d',{ alpha: false });
   ctx2.font = '90px classicFont';
   ctx2.fillText('Preload',0,0);

   // document.getElementById('inputtext_1').addEventListener('input',function () { RenderDynamicText(); });


   //Bottom buttons

$('#embroideries').click(function(){
   $("#embroideriesBtn").toggle();
   $("#btnLiningImg").hide();
   $("#extraClassBtn").hide();
   $("#classButtonShow").hide();
   $("#iconsBtn").hide();
   $("#classBtn").hide();
   $("#Top_embroideries_1").hide();
   $("#Top_Emblem_1").hide();
   $("#Pro_Top_embroideries_1").hide();
   $("#flagPatchBtn").hide();
   $("#emblemColorBtn").hide();
   $("#flagPinBtn").hide();
   $("#btnLiningImgTop").hide();
   $("#btnFlagImgTop").hide();
   $("#btnFlagImgLining").hide();
   $("#embLiningBtn").hide();
   $("#liningemblemColorBtn").hide();
});


$('#emblemColors').click(function(){
   $("#emblemColorBtn").toggle();
   $("#Top_Emblem_1").hide();
   $("#Top_embroideries_1").hide();
   $("#extraClassBtn").hide();
   $("#btnLiningImg").hide();
   $("#embroideriesBtn").hide();
   $("#flagPatchBtn").hide();
   $("#flagPinBtn").hide();
   $("#btnLiningImgTop").hide();
   $("#btnFlagImgTop").hide();
   $("#btnFlagImgLining").hide();
   $("#embLiningBtn").hide();
   $("#liningemblemColorBtn").hide();
});
$('#flagpin').click(function(){
   $("#flagPinBtn").toggle();
   $("#emblemColorBtn").hide();
   $("#Top_Emblem_1").hide();
   $("#Top_embroideries_1").hide();
   $("#extraClassBtn").hide();
   $("#btnLiningImg").hide();
   $("#embroideriesBtn").hide();
   $("#flagPatchBtn").hide();
   $("#btnLiningImgTop").hide();
   $("#btnFlagImgTop").hide();
   $("#btnFlagImgLining").hide();
   $("#embLiningBtn").hide();
   $("#liningemblemColorBtn").hide();
});
$('#liningImage').click(function(){
   $("#btnLiningImg").toggle();
   $("#flagPinBtn").hide();
   $("#emblemColorBtn").hide();
   $("#Top_Emblem_1").hide();
   $("#Top_embroideries_1").hide();
   $("#extraClassBtn").hide();
   $("#embroideriesBtn").hide();
   $("#flagPatchBtn").hide();
   $("#btnLiningImgTop").hide();
   $("#btnFlagImgTop").hide();
   $("#btnFlagImgLining").hide();
   $("#embLiningBtn").hide();
   $("#liningemblemColorBtn").hide();
});
$('#liningImageTop').click(function(){
   $("#btnLiningImgTop").toggle();
   $("#flagPinBtn").hide();
   $("#emblemColorBtn").hide();
   $("#Top_Emblem_1").hide();
   $("#Top_embroideries_1").hide();
   $("#extraClassBtn").hide();
   $("#embroideriesBtn").hide();
   $("#flagPatchBtn").hide();
   $("#btnLiningImg").hide();
   $("#btnFlagImgTop").hide();
   $("#btnFlagImgLining").hide();
   $("#embLiningBtn").hide();
   $("#liningemblemColorBtn").hide();
});
$('#flagImageTop').click(function(){
   $("#btnFlagImgTop").toggle();
   $("#btnLiningImgTop").hide();
   $("#flagPinBtn").hide();
   $("#emblemColorBtn").hide();
   $("#Top_Emblem_1").hide();
   $("#Top_embroideries_1").hide();
   $("#extraClassBtn").hide();
   $("#embroideriesBtn").hide();
   $("#flagPatchBtn").hide();
   $("#btnLiningImg").hide();
   $("#btnFlagImgLining").hide();
   $("#embLiningBtn").hide();
   $("#liningemblemColorBtn").hide();
});
$('#flagImageLining').click(function(){
   $("#btnFlagImgLining").toggle();
   $("#btnFlagImgTop").hide();
   $("#btnLiningImgTop").hide();
   $("#flagPinBtn").hide();
   $("#emblemColorBtn").hide();
   $("#Top_Emblem_1").hide();
   $("#Top_embroideries_1").hide();
   $("#extraClassBtn").hide();
   $("#embroideriesBtn").hide();
   $("#flagPatchBtn").hide();
   $("#btnLiningImg").hide();
   $("#embLiningBtn").hide();
   $("#liningemblemColorBtn").hide();
});
$('#embroideriesLining').click(function(){
   $("#embLiningBtn").toggle();
   $("#btnFlagImgTop").hide();
   $("#btnLiningImgTop").hide();
   $("#flagPinBtn").hide();
   $("#emblemColorBtn").hide();
   $("#Top_Emblem_1").hide();
   $("#Top_embroideries_1").hide();
   $("#extraClassBtn").hide();
   $("#embroideriesBtn").hide();
   $("#flagPatchBtn").hide();
   $("#btnLiningImg").hide();
   $("#btnFlagImgLining").hide();
   $("#liningemblemColorBtn").hide();
});
$('#liningemblemColors').click(function(){
   $("#liningemblemColorBtn").toggle();
   $("#btnFlagImgTop").hide();
   $("#btnLiningImgTop").hide();
   $("#flagPinBtn").hide();
   $("#emblemColorBtn").hide();
   $("#Top_Emblem_1").hide();
   $("#Top_embroideries_1").hide();
   $("#extraClassBtn").hide();
   $("#embroideriesBtn").hide();
   $("#flagPatchBtn").hide();
   $("#btnLiningImg").hide();
   $("#btnFlagImgLining").hide();
   $("#embLiningBtn").hide();
});



function preloadImage(url)
{
    var img=new Image();
    img.src=url;
}

var imgArray = [
   '../images_gl/embroideries/Embroideries_Bohuslan_alpha.jpg',
   '../images_gl/embroideries/Embroideries_Bohuslan_diffuse.jpg',
   '../images_gl/embroideries/Embroideries_Bohuslan_diffuse_Crystal.jpg',
   '../images_gl/embroideries/Embroideries_Bohuslan_normal.jpg'
]

for (var preLoadImg = 0; preLoadImg<=imgArray.length-1;preLoadImg++)
   preloadImage(imgArray[preLoadImg]);

});
/*For Font Geometry*/
var isMac = navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
//setUserInput START//
function setUserInputBackTop(text,textureName,a) {
   var texture_ref = scene._Texture_ref[textureName];
   var align = "center";
   if (a) align = a
   if(currentfont=='fontCal'){
      if(isMac){
         texture_ref.RenderText(text,'35px scriptFont',1024,74,[0,0,1,1],align);
      }else{
         texture_ref.RenderText(text,'35px scriptFont',1024,64,[0,0,1,1],align);
      }
   }else if(currentfont=='fontTNR'){
      texture_ref.RenderText(text,'35px serifFont',1024,64,[0,0,1,1],align);
   }else if(currentfont=='fontCLS'){
      texture_ref.RenderText(text,'35px classicFont',1024,64,[0,0,1,1],align);
   }
   
   scene.clearRefine();
   console.log("call setUserInput",text)
}

function setUserInputLeft(text,textureName,a) {
   var texture_ref = scene._Texture_ref[textureName];
   var align = "left";
   if (a) align = a
   if(currentfont3=='fontCal3'){
         if(isMac){
            texture_ref.RenderText(text,'56px scriptFont',1024,80,[0,0,1,1],align);
         }
       else{
            texture_ref.RenderText(text,'56px scriptFont',1024,80,[0,0,1,1],align);
       }
   }  else if(currentfont3=='fontTNR3'){
      texture_ref.RenderText(text,'56px serifFont',1024,80,[0,0,1,1],align);
   }  else if(currentfont3=='fontCLS3'){
      texture_ref.RenderText(text,'56px classicFont',1024,80,[0,0,1,1],align);
   } 
   scene.clearRefine();
   console.log("call setUserInput",text)
}

function setUserInputRight(text,textureName,a) {
   var texture_ref = scene._Texture_ref[textureName];
   var align = "right";
   if (a) align = a
   if(currentfont4=='fontCal4'){
      if(isMac){
         texture_ref.RenderText(text,'56px scriptFont',1024,80,[0,0,1,1],align);
      }else{
         texture_ref.RenderText(text,'56px scriptFont',1024,80,[0,0,1,1],align);
      }
   }else if(currentfont4=='fontTNR4'){
      texture_ref.RenderText(text,'56px serifFont',1024,80,[0,0,1,1],align);
   }else if(currentfont4=='fontCLS4'){
      texture_ref.RenderText(text,'56px classicFont',1024,80,[0,0,1,1],align);
   }
   // texture_ref.RenderText(text,'45px scriptFont',1024,64,[0,0,1,1],align);
   scene.clearRefine();
   console.log("call setUserInput",text)
}

function setUserInputBackBottom(text,textureName,a) {
   var texture_ref = scene._Texture_ref[textureName];
   var align = "center";
   if (a) align = a
   if(currentfont5=='fontCal5'){
      if(isMac){
         texture_ref.RenderText(text,'52px scriptFont',1024,80,[0,0,1,1],align);
      }else{
         texture_ref.RenderText(text,'52px scriptFont',1024,80,[0,0,1,1],align);
      }
   }else if(currentfont5=='fontTNR5'){
      texture_ref.RenderText(text,'52px serifFont',1024,80,[0,0,1,1],align);
   }else if(currentfont5=='fontCLS5'){
      texture_ref.RenderText(text,'52px classicFont',1024,80,[0,0,1,1],align);
   }
   // texture_ref.RenderText(text,'40px scriptFont',1024,64,[0,0,1,1],align);
   scene.clearRefine();
   console.log("call setUserInput",text)
}

function setUserInputPeakEngTop(text,textureName,a) {
   var texture_ref = scene._Texture_ref[textureName];
   var align = "center";
   if (a) align = a
   texture_ref.RenderText(text,'55px leagueGothicFont',1024,64,[0,0,1,1],align);
   scene.clearRefine();
   console.log("call setUserInput",text);
   scene.groupApplyState('ENGRPEAK:TWOLINES');
   // if(text.length === 0){
   //    if(document.getElementById("inputtext__Peak_Eng_Bottom") !=  null){
   //       document.getElementById("inputtext__Peak_Eng_Bottom").style.display = "none"
   //    }
   // }else{
   //    if(document.getElementById("inputtext__Peak_Eng_Bottom") !=  null){
   //       document.getElementById("inputtext__Peak_Eng_Bottom").style.display = "block"
   //    }
   // }
}

function setUserInputPeakEngMid(text,textureName,a) {
   var texture_ref = scene._Texture_ref[textureName];
   var align = "center";
   if (a) align = a
   texture_ref.RenderText(text,'55px leagueGothicFont',1024,64,[0,0,1,1],align);
   scene.clearRefine();
   console.log("call setUserInput",text)
   scene.groupApplyState('ENGRPEAK:TWOLINES');
   // if(text.length === 0){
   //    if(document.getElementById("inputtext__Peak_Eng_Bottom") !=  null){
   //       document.getElementById("inputtext__Peak_Eng_Bottom").style.display = "none"
   //    }
   // }else{
   //    if(document.getElementById("inputtext__Peak_Eng_Bottom") !=  null){
   //       document.getElementById("inputtext__Peak_Eng_Bottom").style.display = "block"
   //    }
   // }

}

function setUserInputPeakEngBottom(text,textureName,a) {
   var texture_ref = scene._Texture_ref[textureName];
   var align = "center";
   if (a) align = a
   texture_ref.RenderText(text,'55px leagueGothicFont',1024,64,[0,0,1,1],align);
   scene.clearRefine();
   console.log("call setUserInput",text)
   if(text.length === 0){ 
      scene.groupApplyState('ENGRPEAK:TWOLINES');
   }else{
      scene.groupApplyState('ENGRPEAK:THREELINES');  
   }      
}

function setUserInputEmbhatTop(text,textureName,a) {
   var texture_ref = scene._Texture_ref[textureName];
   var align = "center";
   if (a) align = a
   // texture_ref.RenderText(text,'45px classicFont',1024,64,[0,0,1,1],align);
   if(currentfont6=='fontCal6'){
      if(isMac){
         texture_ref.RenderText(text,'52px scriptFont',1024,80,[0,0,1,1],align);
      }else{
         texture_ref.RenderText(text,'52px scriptFont',1024,80,[0,0,1,1],align);
      }
   }else if(currentfont6=='fontTNR6'){
      texture_ref.RenderText(text,'52px serifFont',1024,80,[0,0,1,1],align);
   }else if(currentfont6=='fontCLS6'){
      texture_ref.RenderText(text,'52px classicFont',1024,80,[0,0,1,1],align);
   }
   scene.clearRefine();
   console.log("call setUserInput",text)
}

function setUserInputEmbhatMiddle(text,textureName,a) {
   var texture_ref = scene._Texture_ref[textureName];
   var align = "center";
   if (a) align = a
   // texture_ref.RenderText(text,'45px classicFont',1024,64,[0,0,1,1],align);
   if(currentfont7=='fontCal7'){
      if(isMac){
         texture_ref.RenderText(text,'52px scriptFont',1024,80,[0,0,1,1],align);
      }else{
         texture_ref.RenderText(text,'52px scriptFont',1024,80,[0,0,1,1],align);
      }
   }else if(currentfont7=='fontTNR7'){
      texture_ref.RenderText(text,'52px serifFont',1024,80,[0,0,1,1],align);
   }else if(currentfont7=='fontCLS7'){
      texture_ref.RenderText(text,'52px classicFont',1024,80,[0,0,1,1],align);
   }
   scene.clearRefine();
   console.log("call setUserInput",text)
}

function setUserInputEmbhatBottom(text,textureName,a) {
   var texture_ref = scene._Texture_ref[textureName];
   var align = "right";
   if (a) align = a
   // texture_ref.RenderText(text,'45px classicFont',1024,64,[0,0,1,1],align);
   if(currentfont8=='fontCal8'){
      if(isMac){
         texture_ref.RenderText(text,'52px scriptFont',1024,80,[0,0,1,1],align);
      }else{
         texture_ref.RenderText(text,'52px scriptFont',1024,80,[0,0,1,1],align);
      }
   }else if(currentfont8=='fontTNR8'){
      texture_ref.RenderText(text,'52px serifFont',1024,80,[0,0,1,1],align);
   }else if(currentfont8=='fontCLS8'){
      texture_ref.RenderText(text,'52px classicFont',1024,80,[0,0,1,1],align);
   }
   scene.clearRefine();
   console.log("call setUserInput",text)
   liningLogoPosition();
}
function setUserInputLiningMiddle(text,textureName,a) {
   var texture_ref = scene._Texture_ref[textureName];
   var align = "center";
   if (a) align = a
   // texture_ref.RenderText(text,'30px scriptFont',1024,64,[0,0,1,1],align);
   if(currentfont10=='fontCal10'){
      if(isMac){
         texture_ref.RenderText(text,'52px scriptFont',1024,80,[0,0,1,1],align);
      }else{
         texture_ref.RenderText(text,'52px scriptFont',1024,80,[0,0,1,1],align);
      }
   }else if(currentfont10=='fontTNR10'){
      texture_ref.RenderText(text,'52px serifFont',1024,80,[0,0,1,1],align);
   }else if(currentfont10=='fontCLS10'){
      texture_ref.RenderText(text,'52px classicFont',1024,80,[0,0,1,1],align);
   }
   scene.clearRefine();
   console.log("call setUserInput",text)
   liningLogoPosition()
}
function setUserInputLiningTop(text,textureName,a) {
   var texture_ref = scene._Texture_ref[textureName];
   // console.log(texture_ref)
   var align = "center";
   if (a) align = a
   // texture_ref.RenderText(text,'30px scriptFont',1024,64,[0,0,1,1],align);
   if(currentfont9=='fontCal9'){
      if(isMac){
         texture_ref.RenderText(text,'52px scriptFont',1024,80,[0,0,1,1],align);
      }else{
         texture_ref.RenderText(text,'52px scriptFont',1024,80,[0,0,1,1],align);
      }
   }else if(currentfont9=='fontTNR9'){
      texture_ref.RenderText(text,'52px serifFont',1024,80,[0,0,1,1],align);
   }else if(currentfont9=='fontCLS9'){
      texture_ref.RenderText(text,'52px classicFont',1024,80,[0,0,1,1],align);
   }
   scene.clearRefine();
   console.log("call setUserInput",text)
   liningLogoPosition();
}
function setUserInputLiningBottom(text,textureName,a) {
   var texture_ref = scene._Texture_ref[textureName];
   // console.log(texture_ref)
   var align = "center";
   if (a) align = a
   // texture_ref.RenderText(text,'30px scriptFont',1024,64,[0,0,1,1],align);
   if(currentfont11=='fontCal11'){
      if(isMac){
         texture_ref.RenderText(text,'52px scriptFont',1024,80,[0,0,1,1],align);
      }else{
         texture_ref.RenderText(text,'52px scriptFont',1024,80,[0,0,1,1],align);
      }
   }else if(currentfont11=='fontTNR11'){
      texture_ref.RenderText(text,'52px serifFont',1024,80,[0,0,1,1],align);
   }else if(currentfont11=='fontCLS11'){
      texture_ref.RenderText(text,'52px classicFont',1024,80,[0,0,1,1],align);
   }
   scene.clearRefine();
   console.log("call setUserInput",text)
   liningLogoPosition();
}
function setUserInputSweatband(text,textureName,a) {
   var texture_ref = scene._Texture_ref[textureName];
   // console.log(texture_ref)
   var align = "center";
   if (a) align = a
   // if(currentfont=='fontCal'){
   //     if(isMac){
   //          texture_ref.RenderText(text,'35px scriptFont',1024,74,[0,0,1,1],align);
   //     }else{
   //         texture_ref.RenderText(text,'35px scriptFont',1024,64,[0,0,1,1],align);
   //     }
   // }
   texture_ref.RenderText(text,'35px leagueGothicFont',1024,64,[0,0,1,1],align);
   scene.clearRefine();
   console.log("call setUserInput",text)
}
//setUserInput End//
var open = false;
$(document).ready(function () {

   //Change text on Cap

   $(document).on("click",".btnFont",function () {
      changeFont(this.id);
      $('.btnFont').removeClass('activefontbtn');
      $(this).addClass('activefontbtn');
   });
   $(document).on("click",".btnFont3",function () {
      changeFont3(this.id);
      $('.btnFont3').removeClass('activefontbtn');
      $(this).addClass('activefontbtn');
   });
   $(document).on("click",".btnFont4",function () {
      changeFont4(this.id);
      $('.btnFont4').removeClass('activefontbtn');
      $(this).addClass('activefontbtn');
   });
   $(document).on("click",".btnFont5",function () {
      changeFont5(this.id);
      $('.btnFont5').removeClass('activefontbtn');
      $(this).addClass('activefontbtn');
   });
   $(document).on("click",".btnFont6",function () {
      changeFont6(this.id);
      $('.btnFont6').removeClass('activefontbtn');
      $(this).addClass('activefontbtn');
   });
   $(document).on("click",".btnFont7",function () {
      changeFont7(this.id);
      $('.btnFont7').removeClass('activefontbtn');
      $(this).addClass('activefontbtn');
   });
   $(document).on("click",".btnFont8",function () {
      changeFont8(this.id);
      $('.btnFont8').removeClass('activefontbtn');
      $(this).addClass('activefontbtn');
   });
   $(document).on("click",".btnFont9",function () {
      changeFont9(this.id);
      $('.btnFont9').removeClass('activefontbtn');
      $(this).addClass('activefontbtn');
   });
   $(document).on("click",".btnFont10",function () {
      changeFont10(this.id);
      $('.btnFont10').removeClass('activefontbtn');
      $(this).addClass('activefontbtn');
   });
   $(document).on("click",".btnFont11",function () {
      changeFont11(this.id);
      $('.btnFont11').removeClass('activefontbtn');
      $(this).addClass('activefontbtn');
   });
   /*Nammed Band*/

   var elements = document.getElementsByClassName('inputCustomText');
   for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('input',function (event) {

         console.log(this.id);
         if (scene == null) return;
         firstLoad = false;
         var text = event.target.value;
         text = text.length > 32 ? text.substring(0,32) : text;
         if (this.id == "inputtext_backtop") {
            setUserInputBackTop(text,"Text_upsala_lunda.png","center");
         } else if (this.id == "inputtext_lining_top") {
            setUserInputLiningTop(text,"Text_lining_Top.png","center");
            scene.groupApplyState('EMBLIN:EMBLIN_ON');

         } else if (this.id == "inputtext_lining_middle") {
            setUserInputLiningMiddle(text,"Text_lining.png","center");
            scene.groupApplyState('EMBLIN:EMBLIN_ON');

         } else if (this.id == "inputtext_lining_bottom") {
            setUserInputLiningBottom(text,"Text_lining_Bottom.png","center");
            scene.groupApplyState('EMBLIN:EMBLIN_ON');

         }else if (this.id == "Embhat_top") {
            setUserInputEmbhatTop(text,"Text_lining_Top_Cap_Front.png","center");
            scene.groupApplyState('EMBHATTOP:EMBHATTOP_ON');

         } else if (this.id == "Embhat_middle") {
            setUserInputEmbhatMiddle(text,"Text_lining_Top_Cap_Front - Middle.png","center");
            scene.groupApplyState('EMBHATTOP:EMBHATTOP_ON');

         } else if (this.id == "Embhat_bottom") {
            setUserInputEmbhatBottom(text,"Text_lining_Top_Cap_Front - Bottom.png","center");
            scene.groupApplyState('EMBHATTOP:EMBHATTOP_ON');

         }else if (this.id == "inputtext_left") {
            setUserInputLeft(text,"Text_nameband_FL.png","right");
            scene.groupApplyState('EMB_NAMEBAND_FRONT:EMB_NAMEBAND_FRONT_ON');
         } else if (this.id == "inputtext_right") {
            setUserInputRight(text,"Text_nameband_FR.png","left");
            scene.groupApplyState('EMB_NAMEBAND_FRONT:EMB_NAMEBAND_FRONT_ON');
         } else if (this.id == "inputtext_BackBottom") {
            setUserInputBackBottom(text,"Font_Text.png","center");
         } else if (this.id == "inputtext_Peak_Eng_Top") {
            // checkCase();
            setUserInputPeakEngTop(text,"PEAK_TEXT_LINE_1.png","center");
         } else if (this.id == "inputtext_Peak_Eng_Mid") {
            setUserInputPeakEngMid(text,"PEAK_TEXT_LINE_2.png","center");
         } else if (this.id == "inputtext__Peak_Eng_Bottom") {
            setUserInputPeakEngBottom(text,"PEAK_TEXT_LINE_3.png","center");
         }else if (this.id == "inputtext_Sweatband_Top") {
            scene.groupApplyState('ENGRSWBA:ENGRSWBA_On');
            setUserInputSweatband(text,"Text_sweatband.png","center");
         }else if (this.id == "inputtext_Sweatband_Bottom") {
            scene.groupApplyState('ENGRSWBA:ENGRSWBA_On');
            setUserInputSweatband(text,"Text_sweatband_line2.png","center");
         }
      });
   }


   /*Nammed Band End*/


   $('.colorBtn').click(function () {
      var colorId = this.id;
      var currneColor = Number(newId.slice(5));
      //    console.log(currneColor);
      var colorClicked = "" + colorId + "Clicked";
      //        console.log(colorClicked);
      //    eval(colorClicked)(); 
      colorClicked("option" + currneColor)
   });

   function color1Clicked() {
      //        console.log('color1');
   }

   $('.colorBtn').hover(function () {
      var spanText = $(this).attr("ColorName");
      //        console.log("spanText",spanText);
      var span = '<span class="tooltiptext">' + spanText + '</span>'
      $(this).after(span);
      $(this).css("transform","scale(1.2)");
   },function () {
      $(this).css("transform","scale(1)");
      $(".tooltiptext").remove();

   });


   $('.btnC2').click(function () {
      var colorId = this.id;
      var currneColor = Number(colorId.slice(6,7));
      //    console.log(currneColor, colorId);
      var colorClicked = "option" + currneColor + "Clicked";
      //        console.log(colorClicked);
      changeColour("option" + currneColor);

   });

   /*$('#takeScreenshot').click(function(){
       
   scene.groupSet('Ground_Shadow', 'visible', 1);
   var pngbuffer = scene.drawOffscreenPNG(1920, 1080, 64, {transparent: true}); // This buffer could be included in a Blob for download as follows 
   scene.groupSet('Ground_Shadow', 'visible', 0);
   var link = document.createElement('a'); 
   link.href = window.URL.createObjectURL(new Blob([pngbuffer], {type: "image/png"})); 
   link.download = 'test'; link.click(); 
   
   });*/

   $('.ChooseImg1').click(function () {
      console.log("loadImage1");
      $('#changeLoadImage').attr('src','../images_gl/loaderImg1.jpg');
   });
   $('.ChooseImg2').click(function () {
      console.log("loadImage2");
      $('#changeLoadImage').attr('src','../images_gl/loaderImg2.jpg');
   });
   $('.ChooseImg3').click(function () {
      console.log("loadImage3");
      $('#changeLoadImage').attr('src','../images_gl/loaderImg3.jpg');
   });
   $('.ChooseImg4').click(function () {
      console.log("loadImage4");
      $('#changeLoadImage').attr('src','../images_gl/loaderImg4.jpg');
   });

   $(".withLiningImg").click(function () {
      if (this.id == "withLiningImg") {
         console.log("With Lining Img");
         scene.groupApplyState('LIN:PHOTO');
         TestChangeTextureLining3(screens2);
         scene.clearRefine();
         scene.gotoPosInTime(2.794728403345009,-1.8559628877554557,-0.571974,-0.8408153648,25.501798243967038,1000);
      } else if (this.id == "noLiningImg") {
         console.log("No Lining Img");
         scene.groupApplyState('LIN:NONE');
         scene.clearRefine();
         scene.gotoPosInTime(2.794728403345009,-1.8559628877554557,-0.571974,-0.8408153648,25.501798243967038,1000);
      }
   });
   $(".withFlagImgLining").click(function () {
      if (this.id == "withFlagImgLining") {
         console.log("withFlagImgLining Img");
         scene.groupApplyState('LIN:FLAG');
         TestChangeTextureLining6(screens5);
         scene.clearRefine();
         scene.gotoPosInTime(2.794728403345009,-1.8559628877554557,-0.571974,-0.8408153648,25.501798243967038,1000);
      } else if (this.id == "noFlagImgLining") {
         console.log("No FlagImgLining Img");
         scene.groupApplyState('LIN:NONE');
         scene.clearRefine();
         scene.gotoPosInTime(2.794728403345009,-1.8559628877554557,-0.571974,-0.8408153648,25.501798243967038,1000);
      }
   });
   $(".withLiningImgTop").click(function () {
      if (this.id == "withLiningImgTop") {
         console.log("With top Lining Img");
         scene.groupApplyState('HATTOP_COVER:POLY');
         TestChangeTextureLining4(screens4);
         scene.clearRefine();
         // scene.gotoPosInTime(5.901626502787006,1.1992582527670728,-0.571974,-0.8408153648,25.501798243967038,1000);
         scene.gotoPosInTime(5.929750502787008,1.710733652767073,-0.571974,-0.8408153648,25.501798243967038,1000);
      } else if (this.id == "noLiningImgTop") {
         console.log("No top Lining Img");
         scene.groupApplyState('HATTOP_COVER:COT_WHITE');
         scene.clearRefine();
         scene.gotoPosInTime(5.929750502787008,1.710733652767073,-0.571974,-0.8408153648,25.501798243967038,1000);
      }
   });

   $(".withFlagImgTop").click(function () {
      if (this.id == "withFlagImgTop") {
         console.log("With top flag Img");
         scene.groupApplyState('HATTOP_COVER:POLY_WHITE');
         TestChangeTextureLining5(screens5);
         scene.clearRefine();
         scene.gotoPosInTime(5.929750502787008,1.710733652767073,-0.571974,-0.8408153648,25.501798243967038,1000);
      } else if (this.id == "noFlagImgTop") {
         console.log("No top flag Img");
         scene.groupApplyState('HATTOP_COVER:COT_WHITE');
         scene.clearRefine();
         scene.gotoPosInTime(5.929750502787008,1.710733652767073,-0.571974,-0.8408153648,25.501798243967038,1000);
      }
   });  

});

$(".btnDD, .btnRTState").on("mousedown",function () {
   scene._nav._navMinDolly = 38;
});
$("#btn_box_open_show, #btn_box_close_show,#btn_deep_blue_shiny").on("click",function () {
   scene._nav._navMinDolly = 88;
});
function slowinout2(x) {
   // console.log('slowinout2 called')
   var a = 3.9;
   var x2 = 1.0 - x;
   var px = Math.pow(x,a);
   var px2 = Math.pow(x2,a);
   return px / (px + px2);
}

var screens2;
/*Upload Custom Lining img*/

setTimeout(function () {
   screens2 = scene.createImage("colours","../images_gl/screen/custom_lining_image_2.png");
},2000);

function TestChangeTextureLining3(screenCh) {
   console.log(screenCh);
   if (scene) {
      var mat = scene._Material_ref["SS_inner_normal_image_part_env"];
      mat.setTexture(screenCh,TEXTURE_MAP_ADDITIONALTEX);
      scene.clearRefine();
   }
}

var screens4;
/*Upload Custom Top Lining img*/

setTimeout(function () {
   screens4 = scene.createImage("colours","../images_gl/screen/custom_lining_image_2.png");
},2000);

function TestChangeTextureLining4(screenCh) {
   console.log(screenCh);
   if (scene) {
      var mat = scene._Material_ref["AAAAA_top_image_set_07_uppsala_glossy_mat_env_WHITE_copy"];
      mat.setTexture(screenCh,TEXTURE_MAP_ADDITIONALTEX);
      scene.clearRefine();
   }
}

var screens5;
/*Upload Custom Top Flag img*/

setTimeout(function () {
   screens5 = scene.createImage("colours","../images_gl/screen/flag_1.png");
},2000);

function TestChangeTextureLining5(screenCh) {
   console.log(screenCh);
   if (scene) {
      var mat = scene._Material_ref["AAAAA_top_image_set_07_uppsala_glossy_mat_env_WHITE"];
      mat.setTexture(screenCh,TEXTURE_MAP_ADDITIONALTEX);
      scene.clearRefine();
   }
}

var screens6;
/*Upload Custom Lining Flag img*/

setTimeout(function () {
   screens6 = scene.createImage("colours","../images_gl/screen/flag_1.png");
},2000);

function TestChangeTextureLining6(screenCh) {
   console.log(screenCh);
   if (scene) {
      var mat = scene._Material_ref["SS_inner_normal_image_part_env_copy"];
      mat.setTexture(screenCh,TEXTURE_MAP_ADDITIONALTEX);
      scene.clearRefine();
   }
}
function embLiningOff(){
   scene.groupApplyState('LINLOGO:TOP_OFF');
}