// js

var trackExtraStateObj = {};
var trackExtraStateArr=[];

var trackNormalStateObj = {};
var trackNormalStateArr=[];

var stateName = [];

var mob = (navigator.userAgent.indexOf("iPhone") != -1) || ((navigator.userAgent.indexOf("Android") != -1) || (navigator.userAgent.indexOf("Mobile") != -1)) || (navigator.userAgent.indexOf('iPod') != -1);

window.initExtra = (function() {
    "use strict";

    window.addEventListener('snapshot:scene:stackUpdated', (e) => {
        if ( window.location.href.indexOf('snapshot') >= 0 || window.location.href.indexOf('kundvagn') >= 0 || window.location.href.indexOf('orders') >= 0) {
            scene.groupApplyState('extra_cover_on_off:extra_cover_off');
            scene.groupApplyState('accessories:hide_box');
            // scene.groupApplyState('top_on_off:top_on');
        }
    })

    infinityrt_scene.prototype.embroideriesStatus = { cur: null, prev: null , imgId : 0};
    infinityrt_scene.prototype.specialButtonStatus = { cur: null, prev: null , imgId : 0};
    infinityrt_scene.prototype.flagpinStatus = { cur: null, prev: null , imgId : 0};
    infinityrt_scene.prototype.textureDiamond = false;
    infinityrt_scene.prototype.textureDiamondAlpha = '';
    infinityrt_scene.prototype.selectedTopEmbroideries = null;
    infinityrt_scene.prototype.regualrEmbroideriesColor = 'top_embroideries_col:drink_white';
    infinityrt_scene.prototype.isCrystal = true; // This flag is depend on color. If color is Crystal then we need to set it 'true'.

    infinityrt_scene.prototype.setTopEmbroideriesImage = infinityrt_scene.prototype.setTopEmblemImage = function (a) {

        this.embroideriesStatus.prev = this.embroideriesStatus.cur;
        this.embroideriesStatus.cur = null;
        this.embroideriesStatus.imgId = this.embroideriesStatus.imgId + 1;
        this.embroideriesStatus.cur = {
            alpha: scene.createImage(this.embroideriesStatus.imgId+"_alpha", a)
            // bump: scene.createImage(this.embroideriesStatus.imgId+"_bump", b),
            // diffuse: scene.createImage(this.embroideriesStatus.imgId+"_diffuse", c),
            // crystal : scene.createImage(this.embroideriesStatus.imgId+"_diffuse_crystal", d)
        };
        // if(this.isCrystal)
        // scene.groupApplyState('standard_top_embroideries:171');
        scene.groupApplyState('custom_top_embroideries:on');
        scene.selectedTopEmbroideries = 'custom_top_embroideries:on';

        // scene.updateTopEmbroideriesImage();
        scene.textureDiamond = false;
        scene.groupApplyStateTopEmbroideriesColor(scene.regualrEmbroideriesColor);
    }

    infinityrt_scene.prototype.updateTopEmbroideriesImage = function (){
        if(scene.embroideriesStatus.cur === null)
            return;

        var inst = scene.getInstanceByNameIncEnv('Acustom_uppsala_embroideries_geo-0', this);
        var inst2 = scene.getInstanceByNameIncEnv('Acustom_lunda_embroideries_geo-0', this);
        var currentMaterial = scene._Materials[inst.mesh.currentMaterial].name;
        var currentMaterial2 = scene._Materials[inst2.mesh.currentMaterial].name;
        // scene.regualrEmbroideriesColor = currentMaterial;
        // console.log('currentMaterial', currentMaterial)
        var timerLoad = setInterval(function() {
            if (scene._outstandingjobs == 0) {
                clearInterval(timerLoad);
                var mat2 = scene._Material_ref[currentMaterial]; // This name 'HH_White_Drink_Matt_Top_embroideriess_Env' we need to read From Scene Object
                var mat3 = scene._Material_ref[currentMaterial2];
                if(scene.isCrystal){
                    mat2.setTexture(scene.embroideriesStatus.cur.alpha, TEXTURE_MAP_ALPHATEX);
                    // mat2.setTexture(scene.embroideriesStatus.cur.crystal, TEXTURE_MAP_DIFFUSETEX);
                    // mat3.setTexture(scene.embroideriesStatus.cur.alpha, TEXTURE_MAP_ALPHATEX);
                    // mat3.setTexture(scene.embroideriesStatus.cur.crystal, TEXTURE_MAP_DIFFUSETEX);
                }else{
                    mat2.setTexture(scene.embroideriesStatus.cur.alpha, TEXTURE_MAP_ALPHATEX);
                    // mat2.setTexture(scene.embroideriesStatus.cur.bump, TEXTURE_MAP_BUMPTEX);
                    // mat2.setTexture(scene.embroideriesStatus.cur.diffuse, TEXTURE_MAP_DIFFUSETEX);
                    // mat2.setTexture(scene.embroideriesStatus.cur.diffuse, TEXTURE_MAP_GLOSSYTEX);
                    // mat2.setTexture(scene.embroideriesStatus.cur.diffuse, TEXTURE_MAP_ADDITIONALTEX);

                    mat3.setTexture(scene.embroideriesStatus.cur.alpha, TEXTURE_MAP_ALPHATEX);
                    // mat3.setTexture(scene.embroideriesStatus.cur.bump, TEXTURE_MAP_BUMPTEX);
                    // mat3.setTexture(scene.embroideriesStatus.cur.diffuse, TEXTURE_MAP_DIFFUSETEX);
                    // mat3.setTexture(scene.embroideriesStatus.cur.diffuse, TEXTURE_MAP_GLOSSYTEX);
                    // mat3.setTexture(scene.embroideriesStatus.cur.diffuse, TEXTURE_MAP_ADDITIONALTEX);
                }

                if (scene.embroideriesStatus.prev) {
                    scene.embroideriesStatus.prev.alpha.destroy();
                    // scene.embroideriesStatus.prev.bump.destroy();
                    // scene.embroideriesStatus.prev.diffuse.destroy();
                    // if (scene.embroideriesStatus.prev.crystal)
                    //     scene.embroideriesStatus.prev.crystal.destroy();
                }
            }
        }, 1);
        setTimeout(function(){
            scene.clearRefine();
        },10)

    }

    infinityrt_scene.prototype.groupApplyStateTopEmbroideriesColor = function (gName,opts){

        console.log(gName);
        var sarr=gName.split(":");
        var embname = sarr[1].toLowerCase();
        scene.isCrystal = (embname.indexOf("crystal") >= 0 || embname.indexOf("clyster") >= 0 || embname.indexOf("cryster") >= 0);

        if(gName == 'top_embroideries_crystal_col:crystal_gold' ||
        gName == 'top_embroideries_crystal_col:crystal_pink' ||
        gName == 'top_embroideries_crystal_col:crystal_silver' ||
        gName == 'top_embroideries_crystal_col:crystal_black' ||
        gName == 'top_embroideries_crystal_col:crystal_champagne' ||
        gName == 'top_embroideries_crystal_col:crystal_rose_gold')  {
            console.log(opts)
            if(opts == undefined){
                opts = {}
            }
            opts.postpone=true;
            this.groupApplyState(gName,opts);
            scene.updateTopEmbroideriesImageDiamond();
            // console.log('updateTopEmbroideriesImageDiamond called')
        }  else{
            scene.regualrEmbroideriesColor = gName;
            console.log(opts)
            if(opts == undefined){
                opts = {}
            }
            opts.postpone=true;

            this.groupApplyState(gName,opts);
            scene.updateTopEmbroideriesImage();
            console.log('updateTopEmbroideriesImage called', gName,opts)
        }



    }

    infinityrt_scene.prototype.groupApplyStateTE = function (a) {

        // console.log('groupApplyStateStandardTopEmbroideries called');
        var state = a;
        state = state.split(':');
        state = state[1];

        if(a=='top_embroidery_vis:off'){
            scene.groupApplyState('top_embroidery_vis:off');
            // scene.groupApplyState('custom_top_embroideries:off');
        }
        if(a=='top_embroidery_vis:on'){
            console.log('scene.selectedTopEmbroideries', scene.selectedTopEmbroideries);
            scene.groupApplyState(scene.selectedTopEmbroideries);
        }

        // console.log(state);
        // if(state != '171' && state != 'ON'){
        //     scene.selectedTopEmbroideries = a;
        // }
        if(a != 'top_embroidery_vis:off' && a != 'top_embroidery_vis:on'){
            scene.groupApplyState(a);
            scene.selectedTopEmbroideries = a;
            // console.log('!ON called', scene.selectedStandardTopEmbroideries);
        }
        //else if(state == 'ON' && scene.selectedTopEmbroideries != null){
        //     // console.log('ON STATE called', scene.selectedStandardTopEmbroideries);
        //     scene.groupApplyState(scene.selectedTopEmbroideries);
        // }

    }

    infinityrt_scene.prototype.setSpecialButtonImage = function (a) {
        this.specialButtonStatus.prev = this.specialButtonStatus.cur;
        this.specialButtonStatus.cur = null;
        this.specialButtonStatus.imgId = this.specialButtonStatus.imgId + 1;
        this.specialButtonStatus.cur = {
            alpha: scene.createImage(this.specialButtonStatus.imgId+"_alpha", a)
            // bump: scene.createImage(this.specialButtonStatus.imgId+"_bump", b),
            // diffuse: scene.createImage(this.specialButtonStatus.imgId+"_diffuse", c),
            // crystal : scene.createImage(this.specialButtonStatus.imgId+"_diffuse_crystal", d)
        };
        // if(this.isCrystal)
        // scene.groupApplyState('standard_top_embroideries:171');
        scene.groupApplyState('custom_button_logo:custom_button_logo_on');
        scene.updateClassButtonImage();
        // scene.textureDiamond = false;
        //scene.groupApplyStateTopEmbroideriesColor(scene.regualrEmbroideriesColor);


    }

    infinityrt_scene.prototype.updateClassButtonImage = function (){
        if(scene.specialButtonStatus.cur === null)
            return;

        var inst = scene.getInstanceByNameIncEnv('class_buttongeologo-0', this);
        // var inst2 = scene.getInstanceByNameIncEnv('Acustom_lunda_embroideries_geo-0', this);
        var currentMaterial = scene._Materials[inst.mesh.currentMaterial].name;
       // var currentMaterial2 = scene._Materials[inst2.mesh.currentMaterial].name;
        // scene.regualrEmbroideriesColor = currentMaterial;
        // console.log('currentMaterial', currentMaterial)
        var timerLoad = setInterval(function() {
            if (scene._outstandingjobs == 0) {
                clearInterval(timerLoad);
                var mat2 = scene._Material_ref[currentMaterial]; // This name 'HH_White_Drink_Matt_Top_embroideriess_Env' we need to read From Scene Object
               // var mat3 = scene._Material_ref[currentMaterial2];
                if(scene.isCrystal){
                    mat2.setTexture(scene.specialButtonStatus.cur.alpha, TEXTURE_MAP_ALPHATEX);
                    // mat2.setTexture(scene.specialButtonStatus.cur.crystal, TEXTURE_MAP_DIFFUSETEX);
                    // mat3.setTexture(scene.specialButtonStatus.cur.alpha, TEXTURE_MAP_ALPHATEX);
                    // mat3.setTexture(scene.specialButtonStatus.cur.crystal, TEXTURE_MAP_DIFFUSETEX);
                }else{
                    mat2.setTexture(scene.specialButtonStatus.cur.alpha, TEXTURE_MAP_ALPHATEX);
                    // mat2.setTexture(scene.specialButtonStatus.cur.bump, TEXTURE_MAP_BUMPTEX);
                    // mat2.setTexture(scene.specialButtonStatus.cur.diffuse, TEXTURE_MAP_DIFFUSETEX);
                    // mat2.setTexture(scene.specialButtonStatus.cur.diffuse, TEXTURE_MAP_GLOSSYTEX);
                    // mat2.setTexture(scene.specialButtonStatus.cur.diffuse, TEXTURE_MAP_ADDITIONALTEX);

                    mat3.setTexture(scene.specialButtonStatus.cur.alpha, TEXTURE_MAP_ALPHATEX);
                    // mat3.setTexture(scene.specialButtonStatus.cur.bump, TEXTURE_MAP_BUMPTEX);
                    // mat3.setTexture(scene.specialButtonStatus.cur.diffuse, TEXTURE_MAP_DIFFUSETEX);
                    // mat3.setTexture(scene.specialButtonStatus.cur.diffuse, TEXTURE_MAP_GLOSSYTEX);
                    // mat3.setTexture(scene.specialButtonStatus.cur.diffuse, TEXTURE_MAP_ADDITIONALTEX);
                }

                if (scene.specialButtonStatus.prev) {
                    scene.specialButtonStatus.prev.alpha.destroy();
                    // scene.specialButtonStatus.prev.bump.destroy();
                    // scene.specialButtonStatus.prev.diffuse.destroy();
                    // if (scene.specialButtonStatus.prev.crystal)
                    //     scene.specialButtonStatus.prev.crystal.destroy();
                }
            }
        }, 1);
        setTimeout(function(){
            scene.clearRefine();
        },10)

    }


    infinityrt_scene.prototype.gotoUINamedPosInTime = function (a, b, c, d, e) {

        if ( window.location.href.indexOf('snapshot') >= 0 || window.location.href.indexOf('kundvagn') >= 0) {
            scene.groupApplyState('extra_cover_on_off:extra_cover_off');
            // scene.groupApplyState('top_on_off:top_on');
        }

        if(mob){
            a = mobile[a]
            scene.setProjectionOffset(0, -110);
        } else if (this.skin && this.skin.ui){
            a = desktop[a]
        }
        this.skin && this.skin.ui && (a,
            b || (b = a.time),
            a.fovy && this.fovy != a.fovy && (e || (e = {}),
            e.fovy = a.fovy),
            5 < a.pos.length && (e || (e = {}),
            e.zang = a.pos[5]),
            a.doffocusdist && (this._fDoFFocusPos = a.doffocusdist),
            this.gotoPosInTime(a.pos[0], a.pos[1], a.pos[2], a.pos[3], a.pos[4], b, c, d, e))
    }
});

var extraOn = false;
function getStateLog(){

 if(extraOn){
       scene.groupApplyState("extra_cover_on_off:extra_cover_off")
        extraOn = false;
    }
    else{
        scene.groupApplyState("extra_cover_on_off:extra_cover_on")
        extraOn = true;
    }


    for(let i=0;i<scene.stateLog.length;i++){
        stateName.push(scene.stateLog[i].name);
    }
    scene.stateLog = [];

    trackExtraStateArr = stateName.filter((val)=>
        val.split(":")[0] == "extra_cover_col" ||
        val.split(":")[0] == "extra_cover_on_off" ||
        val.split(":")[0] == "extra_emb_back_top_col" ||
        val.split(":")[0] == "extra_flagband" ||
        val.split(":")[0] == "extra_top_embroidery" ||
        val.split(":")[0] == "extracover_goldedge" ||
        val.split(":")[0] == "extracover_goldedge_col" ||
        val.split(":")[0] == "extracover_silkeband" ||
        val.split(":")[0] == "extracover_stars" ||
        val.split(":")[0] == "extracover_stars_color");

    trackExtraStateObj = Object.assign({}, ...Object.entries({...trackExtraStateArr}).map(([a,b]) => ({ [b.split(":")[0]]: b })))

    let extraObjToArr= Object.values(trackExtraStateObj)

    trackNormalStateArr = stateName.filter((val)=>
        val.split(":")[0] == "emb_back_top_col" ||
        val.split(":")[0] == "Model_colours" ||
        val.split(":")[0] == "top_on_off" ||
        val.split(":")[0] == "Flagband" ||
        val.split(":")[0] == "Top_embroidery" ||
        val.split(":")[0] == "streak_up" ||
        val.split(":")[0] == "streak_up_col" ||
        val.split(":")[0] == "silkeband" ||
        val.split(":")[0] == "star_stitches" ||
        val.split(":")[0] == "star_stitches_color" );
     stateName = [];
    trackNormalStateObj = Object.assign({}, ...Object.entries({...trackNormalStateArr}).map(([a,b]) => ({ [b.split(":")[0]]: b })))

    let normalObjToArr= Object.values(trackNormalStateObj)

    if(extraOn){
        for(let i=0; i<extraObjToArr.length;i++){
            scene.groupApplyState(extraObjToArr[i]);

        }
    }
    else{
        for(let i=0; i<normalObjToArr.length;i++){
            scene.groupApplyState(normalObjToArr[i])
        }
    }

      }
//Desktop camera
const desktop = {
    "Cockade": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 0.349066, 0.174533, -2.065931, 0.738978, 1.042694 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Cover": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -3.141593, 0.785398, 0.000005, 0.707108, 3.356591722178762 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Embroidery_Front_Left": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.698131, 0.209440, -1.099985, 0.689476, 1.011215 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Embroidery_Right_Left": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 1.134464, 0.174533, -2.672482, 1.392896, 1.873119 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Embroidery_lower_back": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -3.141593, -0.087266, -0.000000, 3.922004, 1.590012 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Embroidery_upper_back": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 3.191858307179586,-0.236666,-0.09253800000000001,5.922426771513418,1.5751 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Engraving_Peak": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -2.356194, -0.523599, 5.656854, -3.408803, 0.860397 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "FL": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.523599, 0.314159, 0.122139, 0.486731, 3.931458 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Finnished": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.645771, -0.104719, 0.113554, 5.226418, 1.833221 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Lining": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -4.213224, -1.477247, -1.894985, -0.075482, 2.981087 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Lower_strimma": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.012566, 0.000000, 0.011577, 3.000000, 1.818287 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Peak": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.558505, -0.104719, -0.004465, 4.930603, 1.166176 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Start": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 5.885250307179586,0.251328,0.043509,1.9565338327695958,1.656433 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Sweatband_cam": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -1.483530, -0.349066, 0.623190, 3.089609, 1.525993 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Sweatband_engraving": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 0.942478, -0.523599, -0.759165, 3.346511, 1.989243 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Top_Embroidery": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -3.577227, 0.590620, 0.816034, 0.676245, 3.231354 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "accessories_cam": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.523599, 0.314159, -0.044144, 9.454750, 46.395264 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "bow": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 0.000000, -0.698132, 0.000000, -7.211155, 0.601532 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "hmxBack": {
        "fovy": 23.000000,
        "pos": [ -3.141593, 0.000000, 0.000000, 0.000000, 1.538940 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxFront": {
        "fovy": 23.000000,
        "pos": [ 0.000000, 0.000000, 0.000000, 0.000000, 1.538940 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxHero": {
        "fovy": 23.000000,
        "pos": [ -0.397935, 0.251328, 0.043509, 0.392292, 1.656433 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxLeft": {
        "fovy": 23.000000,
        "pos": [ -1.570796, 0.000000, 0.000000, 0.000000, 1.538940 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxRight": {
        "fovy": 23.000000,
        "pos": [ -4.712389, 0.000000, 0.000000, 0.000000, 1.538940 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxTop": {
        "fovy": 23.000000,
        "pos": [ 0.000000, 1.570796, 0.000000, 0.000000, 1.538940 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "sizeandbow": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 0.000000, -0.366519, 0.000000, 1.264650, 1.636341 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "upper_strimma": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.037699, 0.211534, 0.030633, 0.631493, 1.197620 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    }
}
 //Mobile Camera
const mobile = {
    "Cockade": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [0.349066, 0.174533, 0.065931, 0.738978, 85.042694 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Cover": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -3.141593, 0.785398, 0.300005, 0.707108, 92.272713 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Embroidery_Front_Left": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.698131, 0.209440, 0.099985, 0.689476, 84.011215 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Embroidery_Right_Left": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 1.134464, 0.174533, 0.172482, 1.392896, 89.873119 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Embroidery_lower_back": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -3.141593, -0.087266, 0.2, 3.922004, 75.590012 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Embroidery_upper_back": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 3.191858307179586,-0.236666,-0.09253800000000001,5.922426771513418,1.5751 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Engraving_Peak": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -2.356194, -0.523599, 5.656854, -3.408803, 46.860397 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "FL": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.523599, 0.314159, 0.022139, 0.486731, 78.931458 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Finnished": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [5.543345801190316,-0.07304984466517174,0.32319,3.089609,78.525993],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Lining": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -4.213224, -1.477247, -0.4, -0.075482, 85.981087 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Lower_strimma": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.012566, 0.000000, -0.2, 3.000000, 75.818287 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Peak": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.558505, -0.104719, 0.2, 4.930603, 77.166176 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Start": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 5.885250307179586,0.251328,0.043509,1.9565338327695958,1.656433 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Sweatband_cam": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -1.483530, -0.349066, 0.12319, 3.089609, 90.525993 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Sweatband_engraving": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 0.942478, -0.523599, -0.759165, 3.346511, 85.989243 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "accessories_cam": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.523599, 0.314159, -0.044144, 9.454750, 164.395264 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "bow": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 0.000000, -0.698132, 0.000000, -7.211155, 37.601532 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "hmxBack": {
        "fovy": 23.000000,
        "pos": [ -3.141593, 0.000000, 0.000000, 0.000000, 133.331024 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxFront": {
        "fovy": 23.000000,
        "pos": [ 0.000000, 0.000000, 0.000000, 0.000000, 133.331024 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxHero": {
        "fovy": 23.000000,
        "pos": [ -0.523599, 0.314159, 0.122139, 0.486731, 92.931458 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxLeft": {
        "fovy": 23.000000,
        "pos": [ -1.570796, 0.000000, 0.000000, 0.000000, 133.331024 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxRight": {
        "fovy": 23.000000,
        "pos": [ -4.712389, 0.000000, 0.000000, 0.000000, 133.331024 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxTop": {
        "fovy": 23.000000,
        "pos": [ 0.000000, 1.570796, 0.000000, 0.000000, 133.331024 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "sizeandbow": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 0.000000, -0.366519, -0.2, 1.264650, 70.636341 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "upper_strimma": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.037699, 0.211534, -0.3, 0.631493, 73.197620 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Top_Embroidery": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -3.577227, 0.590620, 1.26092, 0.676258, 78.687349 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    }
}