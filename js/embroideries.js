  // For Embroideries

// The `init_ui` parameter will cause buttons to be added to the UI if set to `true`
window.initEmbroideries = (function(init_ui) {

console.log("init_ui", init_ui);

if (init_ui) {

	// Create Embroideries button

	$(".embroideries_btn").on('click', function(){
		window.setTopEmbroideries( this.id );
	});

   // Create Embroideries button END
}


var Embroideries = { cur: null, prev: null };
function changeEmbroideriesTexture(imgId, isColor) {
	Embroideries.prev = Embroideries.cur;
	Embroideries.cur = null;
	console.log('currentEmbroideriesClr', currentEmbroideriesClr)
	var Embroid = embroideriescolors[0][currentEmbroideriesClr].toLowerCase();
    var isCrystal = (Embroid.indexOf("crystal") >= 0 || Embroid.indexOf("clyster") >= 0 || Embroid.indexOf("cryster") >= 0);
	for(var em = 0; em < embroideriesTextureImages.length; em++){
		if(imgId == embroideriesTextureImages[em].id){
			Embroideries.cur = {
				alpha: scene.createImage(imgId+"_alpha", "../images_gl/Embroideries/"+embroideriesTextureImages[em].texture_ALPHA_Img),
				bump: scene.createImage(imgId+"_bump", "../images_gl/Embroideries/"+embroideriesTextureImages[em].texture_BUMP_Img),
				diffuse: scene.createImage(imgId+"_diffuse", "../images_gl/Embroideries/"+embroideriesTextureImages[em].texture_DIFFUSE_Img)
				};
			if(isCrystal)
				Embroideries.cur.crystal = scene.createImage(imgId+"_diffuse_crystal", "../images_gl/Embroideries/"+embroideriesTextureImages[em].texture_DIFFUSE_Crystal_Img);
			break;
		}
	}
	if(Embroideries.cur === null)
		return;

	var timerLoad = setInterval(function() {
		if (scene._outstandingjobs == 0) {
			clearInterval(timerLoad);
console.log(embroideriescolors[0][currentEmbroideriesClr]);
			var mat2 = scene._Material_ref[embroideriescolors[0][currentEmbroideriesClr]];
			if(isCrystal){
				mat2.setTexture(Embroideries.cur.alpha, TEXTURE_MAP_ALPHATEX);
				mat2.setTexture(Embroideries.cur.crystal, TEXTURE_MAP_DIFFUSETEX);
			}else{
				mat2.setTexture(Embroideries.cur.alpha, TEXTURE_MAP_ALPHATEX);
				mat2.setTexture(Embroideries.cur.bump, TEXTURE_MAP_BUMPTEX);
				mat2.setTexture(Embroideries.cur.diffuse, TEXTURE_MAP_DIFFUSETEX);
				mat2.setTexture(Embroideries.cur.diffuse, TEXTURE_MAP_GLOSSYTEX);
			}
			var mat = scene._Material_ref["HH_White_Drink_Matt_Top_Embroideries_Env"];
			mat.setTexture(Embroideries.cur.alpha, TEXTURE_MAP_ALPHATEX);
			mat.setTexture(Embroideries.cur.bump, TEXTURE_MAP_BUMPTEX);
			mat.setTexture(Embroideries.cur.diffuse, TEXTURE_MAP_GLOSSYTEX);
			mat.setTexture((isCrystal) ? Embroideries.cur.crystal : Embroideries.cur.diffuse, TEXTURE_MAP_DIFFUSETEX);



			if (Embroideries.prev) {
				Embroideries.prev.alpha.destroy();
				Embroideries.prev.bump.destroy();
				Embroideries.prev.diffuse.destroy();
				if (Embroideries.prev.crystal)
					Embroideries.prev.crystal.destroy();
			}
		}
                if(textureDiamond)scene.materialReplace("HH_Diamond_Top_Embroideries_env", embroideriescolors[0][currentEmbroideriesClr]);
        textureDiamond = false;
	}, 1);
        scene.clearRefine();
}

})
