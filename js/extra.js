var mob = (navigator.userAgent.indexOf("iPhone") != -1) || ((navigator.userAgent.indexOf("Android") != -1) || (navigator.userAgent.indexOf("Mobile") != -1)) || (navigator.userAgent.indexOf('iPod') != -1);

var isipad = (/CriOS/i.test(navigator.userAgent) && /ipad/i.test(navigator.userAgent)) || (navigator.userAgent.indexOf('iPad') != -1) ||
   (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2);

let chromeLinuxAndroidOS = (navigator.userAgent.indexOf('Linux') != -1) || (navigator.userAgent.indexOf('Android') != -1) || (navigator.userAgent.indexOf('CrOS') != -1);

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
                'none' : 'HH_BLANK_Drink_Matt_Top_Emblems_Env_copy'
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
        var inst = scene.getInstanceByNameIncEnv('top_emblem_lunda_strass-0', this);
        var currentMaterial = scene._Materials[inst.mesh.currentMaterial].name;
        console.log('currentMaterial', currentMaterial);
        // scene.regualrEmblemColor = currentMaterial;
        if(!scene.textureDiamond)scene.materialReplace(currentMaterial, "EMPTOP_STRASS3CROWNS__GOLD"); // This name 'HH_White_Drink_Matt_Top_Emblems_Env' we need to read From Scene Object
        scene.textureDiamondAlpha = scene.createImage(this.emblemStatus.imgId+"_alpha", a);

        scene.updateTopEmblemImageDiamond();

    }
    infinityrt_scene.prototype.updateTopEmblemImageDiamond = function (a) {
        var inst = scene.getInstanceByNameIncEnv('top_emblem_lunda_strass-0', this);
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
                scene.isCrystal = (embname.indexOf("crystal") >= 0 || embname.indexOf("clyster") >= 0 || embname.indexOf("cryster") >= 0);
        
                if(gName == 'SWAROV_EMBTOP_COL:SWAROV_EMBTOP_CHAMP' || 
                gName == 'SWAROV_EMBTOP_COL:SWAROV_EMBTOP_GOLD' ||
                gName == 'SWAROV_EMBTOP_COL:SWAROV_EMBTOP_SILVER')  {
                    console.log(opts)
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
                'none' : 'HH_BLANK_Drink_Matt_Top_Emblems_Env_copy_copy',
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
        if(gName == 'SWAROV_EMBTOP_COL:SWAROV_EMBTOP_CHAMP' || 
        gName == 'SWAROV_EMBTOP_COL:SWAROV_EMBTOP_GOLD' ||
        gName == 'SWAROV_EMBTOP_COL:SWAROV_EMBTOP_SILVER')  {
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

    infinityrt_scene.prototype.customImageTopAndLining = function(url, location){
        
        if(location.toLowerCase() == "top") {
            scene.customImageTopAndLining1 = scene.createImage("customImage", url);
            var selectMaterial1 ="AAAAA_top_image_set_07_uppsala_glossy_mat_env_WHITE_copy";
            if (scene) {
                var mat1 = scene._Material_ref[selectMaterial1];
                mat1.setTexture(scene.customImageTopAndLining1,TEXTURE_MAP_ADDITIONALTEX);
                scene.clearRefine();
             }
        }
        else if(location.toLowerCase() == "lining") {
            scene.customImageTopAndLining2 = scene.createImage("customImage", url);
            var selectMaterial2 ="SS_inner_normal_image_part_env";
            if (scene) {
                var mat2 = scene._Material_ref[selectMaterial2];
                mat2.setTexture(scene.customImageTopAndLining2,TEXTURE_MAP_ADDITIONALTEX);
                scene.clearRefine();
             }
        }
        
    }
    infinityrt_scene.prototype.customFlagTopAndLining = function(url, location){
       
        if(location.toLowerCase() == "top") {
            scene.customFlagTopAndLining1 = scene.createImage("customImage", url);
            var selectMaterial1 ="AAAAA_top_image_set_07_uppsala_glossy_mat_env_WHITE";            
            if (scene) {
                var mat1 = scene._Material_ref[selectMaterial1];
                mat1.setTexture(scene.customFlagTopAndLining1,TEXTURE_MAP_ADDITIONALTEX);
                scene.clearRefine();
             }
        }
        else if(location.toLowerCase() == "lining") {
            scene.customFlagTopAndLining2 = scene.createImage("customImage", url);
            var selectMaterial2 ="SS_inner_normal_image_part_env_copy";
            if (scene) {
                var mat2 = scene._Material_ref[selectMaterial2];
                mat2.setTexture(scene.customFlagTopAndLining2,TEXTURE_MAP_ADDITIONALTEX);
                scene.clearRefine();
             }
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

    infinityrt_texture.prototype.RenderText = function (text, font, w, h, vp, txtalign) {
        
        var fontVerticalAlignmentFactor = 2;
        var gl = this._scene.gl;
        var spriteCanvas = document.createElement('canvas');
        //window.document.body.appendChild(spriteCanvas);
        this.width = spriteCanvas.width = w;
        this.height = spriteCanvas.height = h;
        this.vp = vp;
        var ctx = spriteCanvas.getContext('2d', { alpha: false });
        ctx.font = font;
        ctx.fillStyle = "#ffffff";
        ctx.textBaseline = 'middle';
        
        if(chromeLinuxAndroidOS && font.indexOf("scriptFont") != -1){
            fontVerticalAlignmentFactor = 1.5
        }
        
        if (txtalign == 'left') {
            ctx.textAlign = txtalign;
            ctx.fillText(text, 0.05*w, h / fontVerticalAlignmentFactor);
        }
        else if (txtalign == 'right') {
            ctx.textAlign = txtalign;
            ctx.fillText(text, 0.89*w,h / fontVerticalAlignmentFactor);
        }
        else {
            ctx.textAlign = "center";
            ctx.fillText(text, w / 2, h / fontVerticalAlignmentFactor);
        }
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        var tx = this._scene._Textures[this.tex_id];
        if (tx == null) {
            tx = this._scene._Textures[this.tex_id] = gl.createTexture();
        }
        gl.bindTexture(gl.TEXTURE_2D, tx);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.filtering);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.filtering);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, spriteCanvas);
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.loaded = true;
        if (this.type == "FromBrowser") {
            this._scene.texDependencyTracking = false;
            this.UpdateDirectAndIndirect();
            this._scene.texDependencyTracking = true;
        }
        else
            this.CheckDependence();
        return true;
     };

});

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
        "pos": [0.349066, 0.174533, 0.065931, 0.738978, 2.042694 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Cover": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -3.141593, 0.785398, 0.300005, 0.707108, 3.272713 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Embroidery_Front_Left": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.698131, 0.209440, 0.099985, 0.689476, 2.011215 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Embroidery_Right_Left": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 1.134464, 0.174533, 0.172482, 1.392896, 2.873119 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Embroidery_lower_back": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -3.141593, -0.087266, 0.2, 3.922004, 2.590012 ],
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
        "pos": [ -2.356194, -0.523599, 5.656854, -3.408803, 1.860397 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "FL": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.523599, 0.314159, 0.022139, 0.486731, 2.931458 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Finnished": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [5.543345801190316,-0.07304984466517174,0.32319,3.089609,2.525993],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Lining": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -4.213224, -1.477247, -0.4, -0.075482, 2.981087 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Lower_strimma": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.012566, 0.000000, -0.2, 3.000000, 2.818287 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Peak": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.558505, -0.104719, 0.2, 4.930603, 2.166176 ],
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
        "pos": [ -1.483530, -0.349066, 0.12319, 3.089609, 3.525993 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Sweatband_engraving": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 0.942478, -0.523599, -0.759165, 3.346511, 3.989243 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "accessories_cam": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.523599, 0.314159, -0.044144, 9.454750, 4.395264 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "bow": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 0.000000, -0.698132, 0.000000, -7.211155, 1.601532 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "hmxBack": {
        "fovy": 23.000000,
        "pos": [ -3.141593, 0.000000, 0.000000, 0.000000, 4.331024 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxFront": {
        "fovy": 23.000000,
        "pos": [ 0.000000, 0.000000, 0.000000, 0.000000, 4.331024 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxHero": {
        "fovy": 23.000000,
        "pos": [ -0.523599, 0.314159, 0.122139, 0.486731, 3.931458 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxLeft": {
        "fovy": 23.000000,
        "pos": [ -1.570796, 0.000000, 0.000000, 0.000000, 4.331024 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxRight": {
        "fovy": 23.000000,
        "pos": [ -4.712389, 0.000000, 0.000000, 0.000000, 4.331024 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "hmxTop": {
        "fovy": 23.000000,
        "pos": [ 0.000000, 1.570796, 0.000000, 0.000000, 4.331024 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 0
    },
    "sizeandbow": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ 0.000000, -0.366519, -0.2, 1.264650, 2.636341 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "upper_strimma": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -0.037699, 0.211534, -0.3, 0.631493, 2.197620 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    },
    "Top_Embroidery": {
        "doffocusdist": 5.000000,
        "fovy": 23.000000,
        "pos": [ -3.577227, 0.590620, 1.26092, 0.676258, 2.687349 ],
        "target": [ 0.0, 0.0, 0.0 ],
        "time": 1000
    }
}


    
