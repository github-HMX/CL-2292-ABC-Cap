var mob = (navigator.userAgent.indexOf("iPhone") != -1) || ((navigator.userAgent.indexOf("Android") != -1) || (navigator.userAgent.indexOf("Mobile") != -1)) || (navigator.userAgent.indexOf('iPod') != -1);

var isipad = (/CriOS/i.test(navigator.userAgent) && /ipad/i.test(navigator.userAgent)) || (navigator.userAgent.indexOf('iPad') != -1) ||
   (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2);

window.initExtra = (function() {
    "use strict";
    infinityrt_scene.prototype.emblemStatus = { cur: null, prev: null , imgId : 0};
    infinityrt_scene.prototype.emblemLiningStatus = { cur: null, prev: null , imgId : 0};
    infinityrt_scene.prototype.flagpinStatus = { cur: null, prev: null , imgId : 0};
    infinityrt_scene.prototype.flagpatchStatus = { cur: null, prev: null , imgId : 0};
    infinityrt_scene.prototype.textureDiamond = false;
    infinityrt_scene.prototype.textureDiamondAlpha = '';
    infinityrt_scene.prototype.regualrEmblemColor = 'EMBTOPCOLOR:DU_CHAMP';
    infinityrt_scene.prototype.regualrLiningEmblemColor = 'LINLOGOCOLOR:DU_CHAMP';
    infinityrt_scene.prototype.isCrystal = true; // This flag is depend on color. If color is Crystal then we need to set it 'true'.
    infinityrt_scene.prototype.setTopEmblemImage = function (a, b, c, d) {

        this.emblemStatus.prev = this.emblemStatus.cur;
        this.emblemStatus.cur = null;
        this.emblemStatus.imgId = this.emblemStatus.imgId + 1;
        this.emblemStatus.cur = {
            bump_alpha_diffuse: scene.createImage(this.emblemStatus.imgId+"_bump_alpha_diffuse", a),
            //crystal : scene.createImage(this.emblemStatus.imgId+"_diffuse_crystal", d)
            // WE ASSUME WE DO NOT HAVE CRYSTAL ON ABC CAP project
        };
        // if(this.isCrystal)
        this.emblemStatus.cur.bump_alpha_diffuse.isNormalMap = true;

        // scene.updateTopEmblemImage();
        scene.textureDiamond = false;
        scene.groupApplyStateTopEmblemColor(scene.regualrEmblemColor);


    }
    infinityrt_scene.prototype.updateTopEmblemImage = function (){
        if(scene.emblemStatus.cur === null)
            return;

        var inst = scene.getInstanceByNameIncEnv('top_emblem_lunda-0', this);
        var currentMaterial = scene._Materials[inst.mesh.currentMaterial].name;
        // scene.regualrEmblemColor = currentMaterial;
       // console.log('currentMaterial', currentMaterial)
        var timerLoad = setInterval(function() {
            if (scene._outstandingjobs == 0) {
                clearInterval(timerLoad);
                var mat2 = scene._Material_ref[currentMaterial]; // This name 'HH_White_Drink_Matt_Top_Emblems_Env' we need to read From Scene Object
             //   console.log('mat2', scene._Materials[inst.mesh.currentMaterial].textures)
                if(scene.isCrystal){
                    mat2.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_ALPHATEX);
                    //mat2.setTexture(scene.emblemStatus.cur.crystal, TEXTURE_MAP_DIFFUSETEX); // NO CRYSTAL ON ABC CAP
                    mat2.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_DIFFUSETEX); // NO CRYSTAL ON ABC CAP
                }else{
                    mat2.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_ALPHATEX);
                    mat2.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_BUMPTEX);
                    mat2.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_DIFFUSETEX);
                    mat2.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_GLOSSYTEX);
                }
                var mat = scene._Material_ref["HH_White_Drink_Matt_Top_Emblems_Env"];
                mat.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_ALPHATEX);
                mat.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_BUMPTEX);
                mat.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_GLOSSYTEX);
                mat.setTexture((this.isCrystal) ? scene.emblemStatus.cur.crystal : scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_DIFFUSETEX);



                if (scene.emblemStatus.prev) {
                    scene.emblemStatus.prev.bump_alpha_diffuse.destroy();
                    //scene.emblemStatus.prev.bump.destroy();
                    //scene.emblemStatus.prev.diffuse.destroy();
                    if (scene.emblemStatus.prev.crystal)
                        scene.emblemStatus.prev.crystal.destroy();
                }
            }
            // console.log('scene.textureDiamond', scene.textureDiamond)
            if(scene.textureDiamond)scene.materialReplace("HH_Diamond_Top_amblem_env", currentMaterial);// This name 'HH_White_Drink_Matt_Top_Emblems_Env' we need to read From Scene Object
            scene.textureDiamond = false;
        }, 1);
        setTimeout(function(){
            scene.clearRefine();
        },10)
        
    }
    infinityrt_scene.prototype.updateTopEmblemImageNew = function (statename){
        if(scene.emblemStatus.cur === null)
            return;

            var stateToMaterial = {
                'du_champ' : 'HH_Champagne_Crystal_Matt_Top_Emblems_Env',
                'du_gold' : 'HH_Gold_Drink_Matt_Top_Emblems_Env',
                'du_green' : 'HH_Green_Drink_Matt_Top_Emblems_Env',
                'du_onyx' : 'HH_Onyx_Black_Matt_Top_Emblems_Env',
                'du_pink' : 'HH_Dark_Pink_Matt_Top_Emblems_Env',
                'du_red' : 'HH_Red_Drink_Matt_Top_Emblems_Env',
                'du_rose' : 'HH_Pink_Crystal_Matt_Top_Emblems_Env',
                'du_royal' : 'HH_Royal_Blue_Matt_Top_Emblems_Env',
                'du_silver' : 'HH_Silver_Drink_Matt_Top_Emblems_Env',
                'du_white' : 'HH_White_Drink_Matt_Top_Emblems_Env',
                'du_yellow' : 'HH_Yellow_Matt_Top_Emblems_Env',
                'glow' : 'HH_Champagne_Crystal_Matt_Top_Emblems_EnvGLOW',
                'sh_champ' : 'HH_Champagne_Crystal_Matt_Top_Emblems_Env_copy',
                'sh_gold' : 'HH_Gold_Crystal_Drink_Matt_Top_Emblems_Env',
                'sh_green' : 'HH_Gold_Crystal_Drink_Matt_Top_Emblems_Env_copy',
                'sh_onyx' : 'HH_Onyx_Black_Matt_Top_Emblems_Env_copy',
                'sh_red' : 'HH_Red_Drink_Matt_Top_Emblems_Env_copy',
                'sh_rose' : 'HH_Pink_Crystal_Matt_Top_Emblems_Env_copy',
                'sh_royal' : 'HH_Royal_Blue_Matt_Top_Emblems_Env_copy',
                'sh_silver' : 'HH_Silver_Crystal_Drink_Matt_Top_Emblems_Env',
                'sh_white' : 'HH_White_Crystal_Matt_Top_Emblems_Env',
                'sh_yellow' : 'HH_Yellow_Matt_Top_Emblems_Env_copy',
                'blank' : 'HH_BLANK_Drink_Matt_Top_Emblems_Env_copy'
            }

        var inst = scene.getInstanceByNameIncEnv('top_emblem_lunda-0', this);
        var currentMaterialOLD = scene._Materials[inst.mesh.currentMaterial].name;
        var currentMaterial = stateToMaterial[statename];
        // scene.regualrEmblemColor = currentMaterial;
        // console.log('statename', statename)
        // console.log('currentMaterial', currentMaterial)
        // console.log('currentMaterialOLD', currentMaterialOLD)
        var timerLoad = setInterval(function() {
            if (scene._outstandingjobs == 0) {
                clearInterval(timerLoad);
                var mat2 = scene._Material_ref[currentMaterial]; // This name 'HH_White_Drink_Matt_Top_Emblems_Env' we need to read From Scene Object
                // console.log(mat2)
                if(scene.isCrystal){
                    mat2.setTexture(scene.emblemStatus.cur.updateTopEmblemImageNew, TEXTURE_MAP_ALPHATEX);
                    //mat2.setTexture(scene.emblemStatus.cur.crystal, TEXTURE_MAP_DIFFUSETEX); // NO CRYSTAL ON ABC CAP
                    mat2.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_DIFFUSETEX); // NO CRYSTAL ON ABC CAP
                }else{

                    mat2.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_ALPHATEX);
                    mat2.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_BUMPTEX);
                    mat2.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_DIFFUSETEX);
                    mat2.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_GLOSSYTEX);
                }
                var mat = scene._Material_ref["HH_White_Drink_Matt_Top_Emblems_Env"];
                mat.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_ALPHATEX);
                mat.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_BUMPTEX);
                mat.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_GLOSSYTEX);
                //mat.setTexture((this.isCrystal) ? scene.emblemStatus.cur.crystal : scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_DIFFUSETEX);
                mat.setTexture(scene.emblemStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_DIFFUSETEX);



                if (scene.emblemStatus.prev) {
                    scene.emblemStatus.prev.bump_alpha_diffuse.destroy();
                    //scene.emblemStatus.prev.bump.destroy();
                    //scene.emblemStatus.prev.diffuse.destroy();
                    //if (scene.emblemStatus.prev.crystal)
                    //    scene.emblemStatus.prev.crystal.destroy();
                }
            }
            // console.log('scene.textureDiamond', scene.textureDiamond)
            if(scene.textureDiamond)scene.materialReplace("HH_Diamond_Top_amblem_env", currentMaterial);// This name 'HH_White_Drink_Matt_Top_Emblems_Env' we need to read From Scene Object
            scene.textureDiamond = false;
        }, 1);
        setTimeout(function(){
            scene.clearRefine();
        },100)
        
    }
    infinityrt_scene.prototype.setTopEmblemImageDiamond = function (a) {
        var inst = scene.getInstanceByNameIncEnv('top_emblem_lunda-0', this);
        var currentMaterial = scene._Materials[inst.mesh.currentMaterial].name;
        // scene.regualrEmblemColor = currentMaterial;
        if(!scene.textureDiamond)scene.materialReplace(currentMaterial, "HH_Diamond_Top_amblem_env"); // This name 'HH_White_Drink_Matt_Top_Emblems_Env' we need to read From Scene Object
        scene.textureDiamondAlpha = scene.createImage(this.emblemStatus.imgId+"_alpha", a);

        scene.updateTopEmblemImageDiamond();

    }
    infinityrt_scene.prototype.updateTopEmblemImageDiamond = function (a) {
        var inst = scene.getInstanceByNameIncEnv('top_emblem_lunda-0', this);
        var currentMaterial = scene._Materials[inst.mesh.currentMaterial].name;
        // console.log('currentMaterial', currentMaterial)
        var mat3 = scene._Material_ref[currentMaterial];
        // console.log('mat3', mat3)
        // console.log('scene.textureDiamondAlpha', scene.textureDiamondAlpha)
        mat3.setTexture(scene.textureDiamondAlpha, TEXTURE_MAP_ALPHATEX);
        scene.clearRefine();
        scene.textureDiamond = true;
    }

    infinityrt_scene.prototype.setFlagPinImage = function (a) {

        scene.flagpinStatus.prev = scene.flagpinStatus.cur;
        scene.flagpinStatus.cur = null;

        scene.flagpinStatus.cur = scene.createImage(scene.flagpinStatus.imgId+"_col", a);

        if(scene.flagpinStatus.cur == null)  return;

        var timerLoad = setInterval(function() {
            if (scene._outstandingjobs == 0) {
                clearInterval(timerLoad);

                var mat = scene._Material_ref["GG_Flag_Sweden_env"];
                mat.setTexture(scene.flagpinStatus.cur, TEXTURE_MAP_DIFFUSETEX);
                mat.setTexture(scene.flagpinStatus.cur, TEXTURE_MAP_GLOSSYTEX);
                scene.clearRefine();

                if (scene.flagpinStatus.prev)
                    scene.flagpinStatus.prev.destroy();
            }
        }, 100);
    }

    infinityrt_scene.prototype.groupApplyStateTopEmblemColor = function (gName,opts){

// console.log(gName)
        var sarr=gName.split(":");
        var embname = sarr[1].toLowerCase();
        // console.log(embname)
        // console.log(gName)
        scene.isCrystal = (embname.indexOf("crystal") >= 0 || embname.indexOf("clyster") >= 0 || embname.indexOf("cryster") >= 0);

        //IF state is for Emblem Image Diamond then add state name in below if 
        if(gName == 'top_emblem_crystal_col:crystal_gold' || 
        gName == 'top_emblem_crystal_col:crystal_pink' || 
        gName == 'top_emblem_crystal_col:crystal_silver' ||
        gName == 'top_emblem_crystal_col:crystal_black' ||
        gName == 'top_emblem_crystal_col:crystal_champagne' ||
        gName == 'top_emblem_crystal_col:crystal_rose_gold')  {
            // console.log(opts)
            if(opts == undefined){
                opts = {}
            }
            opts.postpone=true;
            this.groupApplyState(gName,opts);
            scene.updateTopEmblemImageDiamond();
            // console.log('updateTopEmblemImageDiamond called')
        }  else{
            scene.regualrEmblemColor = gName;
            if(opts == undefined){
                opts = {}
            }
            opts.postpone=true;
            scene.updateTopEmblemImageNew(embname);
            setTimeout(function(){
                window.scene.groupApplyState(gName,opts);
            },100)
            
            // scene.updateTopEmblemImage();
            // console.log('updateTopEmblemImage called')
        }



    }
    infinityrt_scene.prototype.setLiningEmblemImage = function (a, b, c, d) {
        liningLogoPosition();
        this.emblemLiningStatus.prev = this.emblemLiningStatus.cur;
        this.emblemLiningStatus.cur = null;
        this.emblemLiningStatus.imgId = this.emblemLiningStatus.imgId + 1;
        this.emblemLiningStatus.cur = {
            bump_alpha_diffuse: scene.createImage(this.emblemLiningStatus.imgId+"_bump_alpha_diffuse", a),
            //crystal : scene.createImage(this.emblemLiningStatus.imgId+"_diffuse_crystal", d)
            // WE ASSUME WE DO NOT HAVE CRYSTAL ON ABC CAP project
        };
        // if(this.isCrystal)
        this.emblemLiningStatus.cur.bump_alpha_diffuse.isNormalMap = true;

        // scene.updateTopEmblemImage();
        scene.textureDiamond = false;
        scene.groupApplyStateLiningEmblemColor(scene.regualrLiningEmblemColor);


    }
    infinityrt_scene.prototype.updateLiningEmblemImageNew = function (statename){
        if(scene.emblemLiningStatus.cur === null)
            return;

            var stateToMaterial = {
                'blank' : 'HH_BLANK_Drink_Matt_Top_Emblems_Env_copy_copy',
                'du_champ' : 'HH_Champagne_Crystal_Matt_Top_Emblems_Env_copy_2',
                'du_gold' : 'HH_Gold_Drink_Matt_Top_Emblems_Env_copy',
                'du_green' : 'HH_Green_Drink_Matt_Top_Emblems_Env_copy',
                'du_onyx' : 'HH_Onyx_Black_Matt_Top_Emblems_Env_copy_1',
                'du_pink' : 'HH_Dark_Pink_Matt_Top_Emblems_Env_copy',
                'du_red' : 'HH_Red_Drink_Matt_Top_Emblems_Env_copy_1',
                'du_rose' : 'HH_Pink_Crystal_Matt_Top_Emblems_Env_copy_1',
                'du_royal' : 'HH_Royal_Blue_Matt_Top_Emblems_Env_copy_1',
                'du_silver' : 'HH_Silver_Drink_Matt_Top_Emblems_Env_copy',
                'du_white' : 'HH_White_Drink_Matt_Top_Emblems_Env_copy',
                'du_yellow' : 'HH_Yellow_Matt_Top_Emblems_Env_copy_1',
                'glow' : 'HH_Champagne_Crystal_Matt_Top_Emblems_EnvGLOW_copy',
                'sh_champ' : 'HH_Champagne_Crystal_Matt_Top_Emblems_Env_copy_copy',
                'sh_gold' : 'HH_Gold_Crystal_Drink_Matt_Top_Emblems_Env_copy_1',
                'sh_green' : 'HH_Gold_Crystal_Drink_Matt_Top_Emblems_Env_copy_copy',
                'sh_onyx' : 'HH_Onyx_Black_Matt_Top_Emblems_Env_copy_copy',
                'sh_red' : 'HH_Red_Drink_Matt_Top_Emblems_Env_copy_copy',
                'sh_rose' : 'HH_Pink_Crystal_Matt_Top_Emblems_Env_copy_copy',
                'sh_royal' : 'HH_Royal_Blue_Matt_Top_Emblems_Env_copy_copy',
                'sh_silver' : 'HH_Silver_Crystal_Drink_Matt_Top_Emblems_Env_copy',
                'sh_white' : 'HH_White_Crystal_Matt_Top_Emblems_Env_copy',
                'sh_yellow' : 'HH_Yellow_Matt_Top_Emblems_Env_copy_copy_1',
            }

        var inst = scene.getInstanceByNameIncEnv('TO.001-0', this);
        var currentMaterialOLD = scene._Materials[inst.mesh.currentMaterial].name;
        var currentMaterial = stateToMaterial[statename];
        // scene.regualrLiningEmblemColor = currentMaterial;
        // console.log('statename', statename)
        // console.log('currentMaterial', currentMaterial)
        // console.log('currentMaterialOLD', currentMaterialOLD)
        var timerLoad = setInterval(function() {
            if (scene._outstandingjobs == 0) {
                clearInterval(timerLoad);
                var mat2 = scene._Material_ref[currentMaterial]; // This name 'HH_White_Drink_Matt_Top_Emblems_Env' we need to read From Scene Object
                // console.log(mat2)
                if(scene.isCrystal){
                    mat2.setTexture(scene.emblemLiningStatus.cur.updateLiningEmblemImageNew, TEXTURE_MAP_ALPHATEX);
                    //mat2.setTexture(scene.emblemLiningStatus.cur.crystal, TEXTURE_MAP_DIFFUSETEX); // NO CRYSTAL ON ABC CAP
                    mat2.setTexture(scene.emblemLiningStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_DIFFUSETEX); // NO CRYSTAL ON ABC CAP
                }else{

                    mat2.setTexture(scene.emblemLiningStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_ALPHATEX);
                    mat2.setTexture(scene.emblemLiningStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_BUMPTEX);
                    mat2.setTexture(scene.emblemLiningStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_DIFFUSETEX);
                    mat2.setTexture(scene.emblemLiningStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_GLOSSYTEX);
                }
                var mat = scene._Material_ref["HH_White_Drink_Matt_Top_Emblems_Env_copy"];
                mat.setTexture(scene.emblemLiningStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_ALPHATEX);
                mat.setTexture(scene.emblemLiningStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_BUMPTEX);
                mat.setTexture(scene.emblemLiningStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_GLOSSYTEX);
                //mat.setTexture((this.isCrystal) ? scene.emblemLiningStatus.cur.crystal : scene.emblemLiningStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_DIFFUSETEX);
                mat.setTexture(scene.emblemLiningStatus.cur.bump_alpha_diffuse, TEXTURE_MAP_DIFFUSETEX);



                if (scene.emblemLiningStatus.prev) {
                    scene.emblemLiningStatus.prev.bump_alpha_diffuse.destroy();
                    //scene.emblemLiningStatus.prev.bump.destroy();
                    //scene.emblemLiningStatus.prev.diffuse.destroy();
                    //if (scene.emblemLiningStatus.prev.crystal)
                    //    scene.emblemLiningStatus.prev.crystal.destroy();
                }
            }
            // console.log('scene.textureDiamond', scene.textureDiamond)
            if(scene.textureDiamond)scene.materialReplace("HH_Diamond_Top_amblem_env", currentMaterial);// This name 'HH_White_Drink_Matt_Top_Emblems_Env' we need to read From Scene Object
            scene.textureDiamond = false;
        }, 1);
        setTimeout(function(){
            scene.clearRefine();
        },100)
        
    }

    infinityrt_scene.prototype.groupApplyStateLiningEmblemColor = function (gName,opts){

// console.log(gName)
        var sarr=gName.split(":");
        var embname = sarr[1].toLowerCase();
        // console.log(embname)
        // console.log(gName)
        scene.isCrystal = (embname.indexOf("crystal") >= 0 || embname.indexOf("clyster") >= 0 || embname.indexOf("cryster") >= 0);

        //IF state is for Emblem Image Diamond then add state name in below if 
        if(gName == 'top_emblem_crystal_col:crystal_gold' || 
        gName == 'top_emblem_crystal_col:crystal_pink' || 
        gName == 'top_emblem_crystal_col:crystal_silver' ||
        gName == 'top_emblem_crystal_col:crystal_black' ||
        gName == 'top_emblem_crystal_col:crystal_champagne' ||
        gName == 'top_emblem_crystal_col:crystal_rose_gold')  {
            // console.log(opts)
            if(opts == undefined){
                opts = {}
            }
            opts.postpone=true;
            this.groupApplyState(gName,opts);
            scene.updateTopEmblemImageDiamond();
            // console.log('updateTopEmblemImageDiamond called')
        }  else{
            scene.regualrLiningEmblemColor = gName;
            if(opts == undefined){
                opts = {}
            }
            opts.postpone=true;
            scene.updateLiningEmblemImageNew(embname);
            setTimeout(function(){
                window.scene.groupApplyState(gName,opts);
            },100)
            
            // scene.updateTopEmblemImage();
            // console.log('updateTopEmblemImage called')
        }



    }
});

  //Desktop camera 

  desktop = {
    "2": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ -0.929911, -0.000000, 0.321119, 0.350045, -25.990990 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "3": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ -0.929911, -0.000000, 0.321114, 0.350048, 0.065292 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Bake_Cam": {
        "doffocusdist": 5.000000,
        "fovy": 39.597752,
        "pos": [ -4.600688, -0.025132, -12.843693, 1.418577, -61.369926 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "NEW": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ 0.000000, 0.000000, -0.571974, -0.499802, 0.000000 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Position 3": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ -0.929911, -0.000000, -1.512245, 0.288918, 0.079422 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Position 4": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ 0.175929, -0.000000, 1.631771, 0.288878, 0.081856 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Position 5": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ 0.175929, -0.000000, 0.396023, 0.288878, 0.065414 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Position 7": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ -1.759292, -0.025133, 1.170477, -2.204664, 37.997826 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "UntitledCamera8": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ -2.411435, 1.545664, 0.000000, 0.000000, -76.008728 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "hmxBack": {
        "fovy": 23.299999,
        "pos": [ -3.518583, -0.025133, 0.000000, 0.000000, 57.322296 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxFront": {
        "fovy": 23.299999,
        "pos": [ -0.376991, -0.025133, 0.000000, 0.000000, 57.322296 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxHero": {
        "fovy": 23.299999,
        "pos": [ 0.000000, 0.000000, -0.571974, -0.499802, 0.000000 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxLeft": {
        "fovy": 23.299999,
        "pos": [ -1.947787, -0.025133, 0.000000, 0.000000, 57.322296 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxRight": {
        "fovy": 23.299999,
        "pos": [ -5.089380, -0.025133, 0.000000, 0.000000, 57.322296 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxTop": {
        "fovy": 23.299999,
        "pos": [ -0.376991, 1.545664, 0.000000, 0.000000, 57.322296 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "old": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ -3.254690, 0.050265, 0.389505, 0.284629, -28.668800 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    }
},
 //Mobile Camera
mobile =  {
    "2": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ -0.929911, -0.000000, 0.321119, 0.350045, -25.990990 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "3": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ -0.929911, -0.000000, 0.321114, 0.350048, 0.065292 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Bake_Cam": {
        "doffocusdist": 5.000000,
        "fovy": 39.597752,
        "pos": [ -4.600688, -0.025132, -12.843693, 1.418577, -61.369926 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "NEW": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ 0.000000, 0.000000, -0.571974, -0.499802, 0.000000 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Position 3": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ -0.929911, -0.000000, -1.512245, 0.288918, 0.079422 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Position 4": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ 0.175929, -0.000000, 1.631771, 0.288878, 0.081856 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Position 5": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ 0.175929, -0.000000, 0.396023, 0.288878, 0.065414 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Position 7": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ -1.759292, -0.025133, 1.170477, -2.204664, 37.997826 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "UntitledCamera8": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ -2.411435, 1.545664, 0.000000, 0.000000, -76.008728 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "hmxBack": {
        "fovy": 23.299999,
        "pos": [ -3.518583, -0.025133, 0.000000, 0.000000, 57.322296 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxFront": {
        "fovy": 23.299999,
        "pos": [ -0.376991, -0.025133, 0.000000, 0.000000, 57.322296 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxHero": {
        "fovy": 23.299999,
        "pos": [ 0.000000, 0.000000, -0.571974, -0.499802, 0.000000 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxLeft": {
        "fovy": 23.299999,
        "pos": [ -1.947787, -0.025133, 0.000000, 0.000000, 57.322296 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxRight": {
        "fovy": 23.299999,
        "pos": [ -5.089380, -0.025133, 0.000000, 0.000000, 57.322296 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxTop": {
        "fovy": 23.299999,
        "pos": [ -0.376991, 1.545664, 0.000000, 0.000000, 57.322296 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "old": {
        "doffocusdist": 5.000000,
        "fovy": 23.299999,
        "pos": [ -3.254690, 0.050265, 0.389505, 0.284629, -28.668800 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    }
}

  infinityrt_scene.prototype.gotoUINamedPosInTime = function (a, b, c, d, e) {
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
    
    // we have added this function for the Lining Logo position and in this function, we are using the lining text input id's like inputtext_lining_top, inputtext_lining_middle, inputtext_lining_bottom
    
    function liningLogoPosition() {
        let lining_top = document.getElementById("inputtext_lining_top").value;
        let lining_mid = document.getElementById("inputtext_lining_middle").value;
        let lining_bottom = document.getElementById("inputtext_lining_bottom").value;

        if(lining_top.length === 0 && lining_mid.length === 0 && lining_bottom.length === 0 ){
           scene.groupApplyState('LINLOGO:CENTRE_ON');
        }else{
           scene.groupApplyState('LINLOGO:TOP_ON');
        }
     }
