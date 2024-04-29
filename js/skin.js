infinityrt_skin = function (uijson,enableui,fnComplete,opt) {
   var jsonhttp = new XMLHttpRequest();
   jsonhttp.skin = this;
   jsonhttp.enableui = (enableui != undefined) ? enableui : true;
   jsonhttp.open("GET",uijson,true);
   jsonhttp.onload = function (e) {
      if (jsonhttp.status >= 200 && jsonhttp.status <= 299) {
         var s = jsonhttp.skin;
         if (scene)
            scene.skin = s;
         else
            console.warn("***Warning: States not associated with a scene");
         s.ui = JSON.parse(jsonhttp.response);
         if (jsonhttp.enableui)
            s.createUI(opt);
         if (fnComplete)
            fnComplete();
      }
   };
   jsonhttp.send("");
};

infinityrt_skin.prototype.createDD = function (typename) {
   var div = document.createElement("div");
   div.className = "divRTSkinDD";
   this.DDs.push(div);
   this.divUI.appendChild(div);

   btn = div.btn = document.createElement("button");
   btn.innerHTML = typename;
   btn.id = "btnDD" + typename;
   btn.className = "btnDD";
   btn.parentDiv = div;
   btn.skin = this;
   btn.addEventListener("click",function () {
      if (document.querySelector(".btnDD.active") != null) {
         var btnDDList = document.querySelector(".btnDD.active");
         btnDDList.classList.remove("active");
      }
      this.classList.add("active");
      var ts = this.parentDiv.style;
      var ts_status = (ts.display === "");
      ts.display = ts_status ? "block" : "";
      for (var i = 0; i < this.skin.DDs.length; i++) {
         var div = this.skin.DDs[i];
         if (div == this.parentDiv)
            continue;
         div.style.display = "";
         div.btn.style.display = ts_status ? "none" : "";
      }
   });
   this.divUI.appendChild(btn);

   return div;
};

infinityrt_skin.prototype.createSkinButton = function (btnID,className,btnData,div) {
   var btn = document.createElement("button");
   btn.id = "btn_" + btnID;
   btn.innerHTML = btnID;
   btn.className = className;
   btn.dataID = btnID;
   btn.data = btnData;
   btn.parentDiv = div;
   btn.skin = this;
   div.appendChild(btn);
   return btn;
};

infinityrt_skin.prototype.createUI = function (opt) {
   var div,btn;
   this.opt = opt;
   this.DDs = [];
   this.divUI = document.createElement("div");
   this.divUI.id = "divRTSkinMain";
   if (this.opt && this.opt.ref)
      this.divUI.id = this.opt.ref + ":" + this.divUI.id;
   this.divUI.className = "divRTSkinMain";
   if (opt && opt.top)
      this.divUI.style.top = opt.top;
   document.body.appendChild(this.divUI);

   if (this.ui.states.length > 0) {
      this.divStates = [];
      for (var i = 0; i < this.ui.states.length; i++) {
         var cat,displayname,name = this.ui.states[i];
         var nameelems = name.split(':');
         if (nameelems.length > 1) {
            cat = nameelems[0];
            displayname = nameelems[1];
         } else {
            cat = "States";
            displayname = name;
         }
         div = this.divStates[cat];
         if (div == undefined) {
            div = this.divStates[cat] = this.createDD(cat);
         }
         btn = this.createSkinButton(displayname,"btnRTState",name,div);
         btn.addEventListener("click",function () {
            if (document.querySelector(".btnRTState.active") != null) {
               var btnDDList = document.querySelector(".btnRTState.active");
               btnDDList.classList.remove("active");
            }
            this.classList.add("active");
            var data = this.data;
            if (this.skin.opt && this.skin.opt.ref)
               data = this.skin.opt.ref + ":" + data;
            scene.groupApplyState(data);
             
            if(document.querySelector("#btn_RESET")){
               console.log("std");
               if (currentfont4 == "fontCal4") {
                  scene.groupApplyState('embroidery_text:front_right_emb_on');
                  
               }
               else if (currentfont4 == "fontTNR4") {
                  scene.groupApplyState('embroidery_text:front_right_serif_emb_on');
            
               }
            }
//             getStateLog();
             
         });
      }
       
       
   }

   if (this.ui.positions) {
      div = this.createDD("GotoPos");
      for (var spname in this.ui.positions) {
         var sp = this.ui.positions[spname];
         btn = this.createSkinButton(spname,"btnRTGotoPos",sp,div);
         btn.addEventListener("click",function () {
            scene.gotoUINamedPosInTime(this.dataID,undefined,undefined,slowinout2);
         });
      }
   }

   if (this.ui.anims) {
      div = this.createDD("Anims");
      for (var animname in this.ui.anims) {
         var anim = this.ui.anims[animname];
         anim.name = animname;
         anim.curr = false;
         btn = this.createSkinButton(animname,"btnRTAnim",anim,div);
         btn.addEventListener("click",function () {
            var an = this.data;
            an.curr = !an.curr;
            scene.animPlayAllChildrenInTime(an.name,an.curr ? an.end : an.start,an.time);
            scene.clearRefine();
         });
      }
   }

   if (this.ui.displaylayers.length > 0) {
      div = this.createDD("DisplayLayers");
      for (var i = 0; i < this.ui.displaylayers.length; i++) {
         var dl = { name: this.ui.displaylayers[i],curr: true };
         btn = this.createSkinButton(dl.name,"btnRTDisplayLayer",dl,div);
         btn.addEventListener("click",function () {
            var dl = this.data;
            if (dl.name.indexOf('#') != -1) {
               scene.groupSet(dl.name,'visible',1);
            } else {
               dl.curr = !dl.curr;
               scene.groupSet(dl.name,'visible',dl.curr ? 1 : 0);
            }
            scene.clearRefine();
         });
      }
   }
    

    
};
