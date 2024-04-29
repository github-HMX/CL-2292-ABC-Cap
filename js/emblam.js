  // For Emblem
  window.embRoot = 'embroideries'

// The `init_ui` parameter will cause buttons to be added to the UI if set to `true`
window.initEmblems = (function(init_ui) {

	console.log("init_ui", init_ui);

//    var currentModel = 'Uppsala_Model';
   var currentEmblemClr = "option1";
   var emblemGlobal = 'emblem_1';
   var emblemCurrentMaterial = 'HH_White_Drink_Matt_Top_Emblems_Env';
   var emblemcolors = [{
       type: "Top_Emblems_Matt",
       option1: "HH_White_Drink_Matt_Top_Emblems_Env",
       option2: "HH_Gold_Drink_Matt_Top_Emblems_Env",
       option3: "HH_Gold_Crystal_Drink_Matt_Top_Emblems_Env",
       option4: "HH_Silver_Drink_Matt_Top_Emblems_Env",
       option5: "HH_Silver_Crystal_Drink_Matt_Top_Emblems_Env",
       option6: "HH_Black_Drink_Matt_Top_Emblems_Env",
       option7: "HH_Red_Drink_Matt_Top_Emblems_Env",
       option8: "HH_Green_Drink_Matt_Top_Emblems_Env",
       option9: "HH_Light_Blue_Matt_Top_Emblems_Env",
       option10: "HH_Royal_Blue_Matt_Top_Emblems_Env",
       option11: "HH_Navy_Blue_Matt_Top_Emblems_Env",
       option12: "HH_Yellow_Matt_Top_Emblems_Env",
       option13: "HH_Purple_Matt_Top_Emblems_Env",
       option14: "HH_Light_Pink_Matt_Top_Emblems_Env",
       option15: "HH_Gray_Matt_Top_Emblems_Env",
       option16: "HH_Wine_Red_Matt_Top_Emblems_Env",
       option17: "HH_Dark_Pink_Matt_Top_Emblems_Env",
       option18: "HH_Orange_Matt_Top_Emblems_Env",
       option19: "HH_Rose_Gold_Crystal_Matt_Top_Emblems_Env",
       option20: "HH_Champagne_Crystal_Matt_Top_Emblems_Env",
       option21: "HH_Pink_Crystal_Matt_Top_Emblems_Env",
       option22: "HH_Blue_Crystal_Matt_Top_Emblems_Env",
       option23: "HH_Dark_Pink_Crystal_Matt_Top_Emblems_Env",
       option24: "HH_Onyx_Black_Matt_Top_Emblems_Env",
       option25: "HH_Self_Luminous_Matt_Top_Emblems_Env",
       option26: "HH_White_Crystal_Matt_Top_Emblems_Env",
       option27: "HH_Vintage_Rose_Crystal_Matt_Top_Emblems_Env",
       option28: "HH_Silk_Crystal_Matt_Top_Emblems_Env"
       }
   ];

	var emblem_names = [
		"Drink",
		"Crown",
		"Blekinge",
		"Bohuslän",
		"Dalarna",
		"Dalsland",
		"Gotland",
		"Guest country",
		"Halland",
		"Hälsingland",
		"Härjedalen",
		"Jämtland",
		"Lapland",
		"Medelpad",
		"Norrbotten",
		"Narrow",
		"Skåne",
		"Småland",
		"Södermanland",
		"Uppland",
		"Värmland",
		"Västerbotten",
		"Västergötland",
		"Västmanland",
		"Ångermanland",
		"Oland",
		"Ostergotland",
		"Children / Leisure",
		"Construction",
		"Humanistic",
		"Economy",
		"Aesthetic",
		"Vehicles / Transportation",
		"Trade / Admin",
		"Craft",
		"Hotel / Tourism",
		"Int. Baccalaureate",
		"Sports",
		"Industry",
		"Restaurant / Food",
		"Electricity and Energy",
		"Natural Resources",
		"Natural Science",
		"Health care",
		"Plumbing / Property",
		"Society / Humanist House",
		"Technology",
		"Skull",
		"Dollar",
		"Heart",
		"Jingjang",
		"Love Face",
		"Rock on",
		"Peace",
		"Peace-hand",
		"Smilingface",
		"Star",
		"Sunglasses",
		"Thumbs up",
		"Viking",
		"Krona",
		"Layer wreath",
		"Shield"
	];


   function callback(){}

   function slowinout2(x) {
		var a=2.5;
		var x2=1.0-x;
		var px= Math.pow(x,a);
		var px2= Math.pow(x2,a);

		return px/(px+px2);
	}

	window.updateCurrentEmblemClr = function(eleId) {

		let color_state_postfix = eleId.replace('btn_', '');

		console.log(eleId, color_state_postfix);

		scene.groupApplyState( "top_emblem_col:" + color_state_postfix );


		if(eleId == 'btn_blue_crystal') {
			currentEmblemClr = 'option22';
		}
		else if(eleId == 'btn_champagne_crystal') {
			currentEmblemClr = 'option20';
		}else if(eleId == 'btn_royal_blue') {
			currentEmblemClr = 'option10';
		}else if(eleId == 'btn_purple') {
			currentEmblemClr = 'option13';
		}else if(eleId == 'btn_pink_crystal') {
			currentEmblemClr = 'option21';
		}else if(eleId == 'btn_orange') {
			currentEmblemClr = 'option18';
		}else if(eleId == 'btn_onyx_black') {
			currentEmblemClr = 'option24';
		}else if(eleId == 'btn_navy_blue') {
			currentEmblemClr = 'option11';
		}else if(eleId == 'btn_light_pink') {
			currentEmblemClr = 'option14';
		}else if(eleId == 'btn_lsight_blue') {
			currentEmblemClr = 'option9';
		}else if(eleId == 'btn_drink_silver_crystal') {
			currentEmblemClr = 'option5';
		}else if(eleId == 'btn_drink_silver') {
			currentEmblemClr = 'option4';
		}else if(eleId == 'btn_drink_red') {
			currentEmblemClr = 'option7';
		}else if(eleId == 'btn_drink_green') {
			currentEmblemClr = 'option8';
		}else if(eleId == 'btn_drink_gold_crystal') {
			currentEmblemClr = 'option3';
		}else if(eleId == 'btn_drink_gold') {
			currentEmblemClr = 'option2';
		}else if(eleId == 'btn_drink_black') {
			currentEmblemClr = 'option6';
		}else if(eleId == 'btn_dark_pink_crystal') {
			currentEmblemClr = 'option23';
		}else if(eleId == 'btn_dark_pink') {
			currentEmblemClr = 'option17';
		}else if(eleId == 'btn_self_luminous') {
			currentEmblemClr = 'option25';
		}else if(eleId == 'btn_silk_crystal') {
			currentEmblemClr = 'option28';
		}else if(eleId == 'btn_vintage_rose_crystal') {
			currentEmblemClr = 'option27';
		}else if(eleId == 'btn_white_crystal') {
			currentEmblemClr = 'option26';
		}else if(eleId == 'btn_wine_red') {
			currentEmblemClr = 'option16';
		}else if(eleId == 'btn_grey') {
			currentEmblemClr = 'option15';
		}else if(eleId == 'btn_rose_gold_crystal') {
			currentEmblemClr = 'option19';
		}else if(eleId == 'btn_yellow') {
			currentEmblemClr = 'option12';
		}
		console.log('currentEmblemClr', currentEmblemClr)
		changeEmblemTexture(emblemGlobal, true);
	}

	// The ROOT method to set the Emblem
	window.setTopEmblem = function(id){
		scene.groupApplyState('top_emblem:on')
		if(id == 'emblem_61' || id == 'emblem_62' || id == 'emblem_63') {
			changeEmblemTextureDiamond(id);
		} else {
			changeEmblemTexture(id, false);
			console.log(id);
		}
		emblemGlobal = id;
		emblmBtnCliked = true;
	}

	// The ROOT method to set the Flagpin
	window.setFlagPin = function(id) {
		changeFlagTexture(id);
		changeFlagPin();
	}

	if (init_ui) {
		$(document).on('click', '.btnRTState', function() {
			console.log(this);
			window.updateCurrentEmblemClr(this.id);
		});
	}

	var flagPins_names = [
		"Sweden",
		"Afghanistan",
		"Albania",
		"Algeria",
		"Australia",
		"Belgium",
		"Bolivia",
		"Bosnia Herzegovina",
		"Bulgaria",
		"Chile",
		"Colombia",
		"Denmark",
		"Eritrea",
		"Estonia",
		"Ethiopia",
		"Finland",
		"France",
		"United Arab Emirates",
		"Netherlands",
		"Iraq",
		"Iran",
		"Iceland",
		"Israel",
		"Italy",
		"Jamaica",
		"Canada",
		"Kenya",
		"China",
		"Croatia",
		"Lebanon",
		"Macedonia",
		"Norway",
		"Pakistan",
		"Poland",
		"Russia",
		"Saudi Arabia",
		"Serbia",
		"Somalia",
		"Spain",
		"Britain",
		"Syria",
		"Thailand",
		"Turkey",
		"Germany",
		"USA",
		"Kurdistan",
		"HBTQ"
	]








if (init_ui) {

	//create Flag button
	var flaggPin = '';

	for(var l=1; l<=47; l++){
		var flagStr = flagPins_names[(l-1)].toLowerCase();
		flagStr = flagStr.replace(/\s/g, '');
		flaggPin+= '<div id="'+flagStr+'" class="flagpin_btn flagPin_'+l+'" ></div>';
	}

	$(".flagpin_btn").click(function(){
		// flagPinBtnCliked = true;
		console.log(this.id);
		window.setFlagPin(this.id);

	});
	//create Flag button END





	// Create emblem button
	var topEmblem = '';

	for(var i= 1; i<=63;i++){
		var str = emblem_names[(i-1)].toLowerCase();
		str = str.replace(/\s/g, '');
		topEmblem+= '<button id="emblem_'+(i) +'" class="emblem_btn" > emblem_'+(i) +' </button>';
	}


	$(".emblem_btn").on('click', function(){
		window.setTopEmblem( this.id );
	});

   // Create emblem button END
}






var emblemTextureImages = [
	{
		"id": "drink",
		"texture_ALPHA_Img": "drink_alpha.jpg",
		"texture_BUMP_Img": "drink_normal.jpg",
		"texture_DIFFUSE_Img": "drink_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "drink_diffuse_Crystal.jpg"
	},{
		"id": "crown",
		"texture_ALPHA_Img": "crown_alpha.jpg",
		"texture_BUMP_Img": "crown_normal.jpg",
		"texture_DIFFUSE_Img": "crown_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "crown_diffuse_Crystal.jpg"
	},
	{
		"id": "blekinge",
		"texture_ALPHA_Img": "blekinge_alpha.jpg",
		"texture_BUMP_Img": "blekinge_normal.jpg",
		"texture_DIFFUSE_Img": "blekinge_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "blekinge_diffuse_Crystal.jpg"
	},
	{
		"id": "bohuslän",
		"texture_ALPHA_Img": "bohuslän_alpha.jpg",
		"texture_BUMP_Img": "bohuslän_normal.jpg",
		"texture_DIFFUSE_Img": "bohuslän_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "bohuslän_diffuse_Crystal.jpg"
	},
	{
		"id": "dalarna",
		"texture_ALPHA_Img": "dalarna_alpha.jpg",
		"texture_BUMP_Img": "dalarna_normal.jpg",
		"texture_DIFFUSE_Img": "dalarna_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "dalarna_diffuse_Crystal.jpg"
	},
	{
		"id": "dalsland",
		"texture_ALPHA_Img": "dalsland_alpha.jpg",
		"texture_BUMP_Img": "dalsland_normal.jpg",
		"texture_DIFFUSE_Img": "dalsland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "dalsland_diffuse_Crystal.jpg"
	},
	{
		"id": "gotland",
		"texture_ALPHA_Img": "gotland_alpha.jpg",
		"texture_BUMP_Img": "gotland_normal.jpg",
		"texture_DIFFUSE_Img": "gotland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "gotland_diffuse_Crystal.jpg"
	},
	{
		"id": "guestcountry",
		"texture_ALPHA_Img": "guestcountry_alpha.jpg",
		"texture_BUMP_Img": "guestcountry_normal.jpg",
		"texture_DIFFUSE_Img": "guestcountry_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "guestcountry_diffuse_Crystal.jpg"
	},
	{
		"id": "halland",
		"texture_ALPHA_Img": "halland_alpha.jpg",
		"texture_BUMP_Img": "halland_normal.jpg",
		"texture_DIFFUSE_Img": "halland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "halland_diffuse_Crystal.jpg"
	},
	{
		"id": "hälsingland",
		"texture_ALPHA_Img": "hälsingland_alpha.jpg",
		"texture_BUMP_Img": "hälsingland_normal.jpg",
		"texture_DIFFUSE_Img": "hälsingland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "hälsingland_diffuse_Crystal.jpg"
	},
	{
		"id": "härjedalen",
		"texture_ALPHA_Img": "härjedalen_alpha.jpg",
		"texture_BUMP_Img": "härjedalen_normal.jpg",
		"texture_DIFFUSE_Img": "härjedalen_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "härjedalen_diffuse_Crystal.jpg"
	},
	{
		"id": "jämtland",
		"texture_ALPHA_Img": "jämtland_alpha.jpg",
		"texture_BUMP_Img": "jämtland_normal.jpg",
		"texture_DIFFUSE_Img": "jämtland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "jämtland_diffuse_Crystal.jpg"
	},
	{
		"id": "lapland",
		"texture_ALPHA_Img": "lapland_alpha.jpg",
		"texture_BUMP_Img": "lapland_normal.jpg",
		"texture_DIFFUSE_Img": "lapland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "lapland_diffuse_Crystal.jpg"
	},
	{
		"id": "medelpad",
		"texture_ALPHA_Img": "medelpad_alpha.jpg",
		"texture_BUMP_Img": "medelpad_normal.jpg",
		"texture_DIFFUSE_Img": "medelpad_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "medelpad_diffuse_Crystal.jpg"
	},
	{
		"id": "norrbotten",
		"texture_ALPHA_Img": "norrbotten_alpha.jpg",
		"texture_BUMP_Img": "norrbotten_normal.jpg",
		"texture_DIFFUSE_Img": "norrbotten_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "norrbotten_diffuse_Crystal.jpg"
	},
	{
		"id": "narrow",
		"texture_ALPHA_Img": "narrow_alpha.jpg",
		"texture_BUMP_Img": "narrow_normal.jpg",
		"texture_DIFFUSE_Img": "narrow_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "narrow_diffuse_Crystal.jpg"
	},
	{
		"id": "småland",
		"texture_ALPHA_Img": "småland_alpha.jpg",
		"texture_BUMP_Img": "småland_normal.jpg",
		"texture_DIFFUSE_Img": "småland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "småland_diffuse_Crystal.jpg"
	},
	{
		"id": "skåne",
		"texture_ALPHA_Img": "skåne_alpha.jpg",
		"texture_BUMP_Img": "skåne_normal.jpg",
		"texture_DIFFUSE_Img": "skåne_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "skåne_diffuse_Crystal.jpg"
	},
	{
		"id": "södermanland",
		"texture_ALPHA_Img": "södermanland_alpha.jpg",
		"texture_BUMP_Img": "södermanland_normal.jpg",
		"texture_DIFFUSE_Img": "södermanland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "södermanland_diffuse_Crystal.jpg"
	},
	{
		"id": "uppland",
		"texture_ALPHA_Img": "uppland_alpha.jpg",
		"texture_BUMP_Img": "uppland_normal.jpg",
		"texture_DIFFUSE_Img": "uppland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "uppland_diffuse_Crystal.jpg"
	},
	{
		"id": "värmland",
		"texture_ALPHA_Img": "värmland_alpha.jpg",
		"texture_BUMP_Img": "värmland_normal.jpg",
		"texture_DIFFUSE_Img": "värmland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "värmland_diffuse_Crystal.jpg"
	},
	{
		"id": "västerbotten",
		"texture_ALPHA_Img": "västerbotten_alpha.jpg",
		"texture_BUMP_Img": "västerbotten_normal.jpg",
		"texture_DIFFUSE_Img": "västerbotten_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "västerbotten_diffuse_Crystal.jpg"
	},
	{
		"id": "västergötland",
		"texture_ALPHA_Img": "västergötland_alpha.jpg",
		"texture_BUMP_Img": "västergötland_normal.jpg",
		"texture_DIFFUSE_Img": "västergötland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "västergötland_diffuse_Crystal.jpg"
	},
	{
		"id": "västmanland",

		"texture_ALPHA_Img": "västmanland_alpha.jpg",
		"texture_BUMP_Img": "västmanland_normal.jpg",
		"texture_DIFFUSE_Img": "västmanland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "västmanland_diffuse_Crystal.jpg"
	},
	{
		"id": "ångermanland",
		"texture_ALPHA_Img": "ångermanland_alpha.jpg",
		"texture_BUMP_Img": "ångermanland_normal.jpg",
		"texture_DIFFUSE_Img": "ångermanland_diffuse.jpg",
                "texture_DIFFUSE_Crystal_Img": "ångermanland_diffuse_Crystal.jpg"
	},
	{
		"id": "oland",
		"texture_ALPHA_Img": "oland_alpha.jpg",
		"texture_BUMP_Img": "oland_normal.jpg",
		"texture_DIFFUSE_Img": "oland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "oland_diffuse_Crystal.jpg"
	},
	{
		"id": "ostergotland",
		"texture_ALPHA_Img": "ostergotland_alpha.jpg",
		"texture_BUMP_Img": "ostergotland_normal.jpg",
		"texture_DIFFUSE_Img": "ostergotland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "ostergotland_diffuse_Crystal.jpg"
	},
	{
		"id": "children/leisure",
		"texture_ALPHA_Img": "children_alpha.jpg",
		"texture_BUMP_Img": "children_normal.jpg",
		"texture_DIFFUSE_Img": "children_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "children_diffuse_Crystal.jpg"
	},
	{
		"id": "construction",
		"texture_ALPHA_Img": "construction_alpha.jpg",
		"texture_BUMP_Img": "construction_normal.jpg",
		"texture_DIFFUSE_Img": "construction_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "construction_diffuse_Crystal.jpg"
	},
	{
		"id": "humanistic",
		"texture_ALPHA_Img": "humanistic_alpha.jpg",
		"texture_BUMP_Img": "humanistic_normal.jpg",
		"texture_DIFFUSE_Img": "humanistic_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "humanistic_diffuse_Crystal.jpg"
	},
	{
		"id": "economy",
		"texture_ALPHA_Img": "economy_alpha.jpg",
		"texture_BUMP_Img": "economy_normal.jpg",
		"texture_DIFFUSE_Img": "economy_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "economy_diffuse_Crystal.jpg"
	},
	{
		"id": "aesthetic",
		"texture_ALPHA_Img": "aesthetic_alpha.jpg",
		"texture_BUMP_Img": "aesthetic_normal.jpg",
		"texture_DIFFUSE_Img": "aesthetic_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "aesthetic_diffuse_Crystal.jpg"
	},
	{
		"id": "vehicles/transportation",
		"texture_ALPHA_Img": "vehicles_alpha.jpg",
		"texture_BUMP_Img": "vehicles_normal.jpg",
		"texture_DIFFUSE_Img": "vehicles_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "vehicles_diffuse_Crystal.jpg"
	},
	{
		"id": "trade/admin",
		"texture_ALPHA_Img": "trade_alpha.jpg",
		"texture_BUMP_Img": "trade_normal.jpg",
		"texture_DIFFUSE_Img": "trade_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "trade_diffuse_Crystal.jpg"
	},
	{
		"id": "craft",
		"texture_ALPHA_Img": "craft_alpha.jpg",
		"texture_BUMP_Img": "craft_normal.jpg",
		"texture_DIFFUSE_Img": "craft_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "craft_diffuse_Crystal.jpg"
	},
	{
		"id": "hotel/tourism",
		"texture_ALPHA_Img": "hotel_alpha.jpg",
		"texture_BUMP_Img": "hotel_normal.jpg",
		"texture_DIFFUSE_Img": "hotel_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "hotel_diffuse_Crystal.jpg"
	},
	{
		"id": "int.baccalaureate",
		"texture_ALPHA_Img": "int.baccalaureate_alpha.jpg",
		"texture_BUMP_Img": "int.baccalaureate_normal.jpg",
		"texture_DIFFUSE_Img": "int.baccalaureate_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "int.baccalaureate_diffuse_Crystal.jpg"
	},
	{
		"id": "sports",
		"texture_ALPHA_Img": "sports_alpha.jpg",
		"texture_BUMP_Img": "sports_normal.jpg",
		"texture_DIFFUSE_Img": "sports_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "sports_diffuse_Crystal.jpg"
	},
	{
		"id": "industry",
		"texture_ALPHA_Img": "industry_alpha.jpg",
		"texture_BUMP_Img": "industry_normal.jpg",
		"texture_DIFFUSE_Img": "industry_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "industry_diffuse_Crystal.jpg"
	},
	{
		"id": "restaurant/food",
		"texture_ALPHA_Img": "restaurant_food_alpha.jpg",
		"texture_BUMP_Img": "restaurant_food_normal.jpg",
		"texture_DIFFUSE_Img": "restaurant_food_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "restaurant_food_diffuse_Crystal.jpg"
	},
    {
		"id": "electricityandenergy",
        "texture_ALPHA_Img": "electricityandenergy_alpha.jpg",
		"texture_BUMP_Img": "electricityandenergy_normal.jpg",
		"texture_DIFFUSE_Img": "electricityandenergy_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "electricityandenergy_diffuse_Crystal.jpg"
	},
	{
		"id": "naturalresources",
		"texture_ALPHA_Img": "naturalresources_alpha.jpg",
		"texture_BUMP_Img": "naturalresources_normal.jpg",
		"texture_DIFFUSE_Img": "naturalresources_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "naturalresources_diffuse_Crystal.jpg"
	},
	{
		"id": "naturalscience",
		"texture_ALPHA_Img": "naturalscience_alpha.jpg",
		"texture_BUMP_Img": "naturalscience_normal.jpg",
		"texture_DIFFUSE_Img": "naturalscience_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "naturalscience_diffuse_Crystal.jpg"
	},
	{
		"id": "healthcare",
		"texture_ALPHA_Img": "healthcare_alpha.jpg",
		"texture_BUMP_Img": "healthcare_normal.jpg",
		"texture_DIFFUSE_Img": "healthcare_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "healthcare_diffuse_Crystal.jpg"
	},
	{
		"id": "plumbing/property",
		"texture_ALPHA_Img": "plumbing_alpha.jpg",
		"texture_BUMP_Img": "plumbing_normal.jpg",
		"texture_DIFFUSE_Img": "plumbing_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "plumbing_diffuse_Crystal.jpg"
	},
	{
		"id": "society/humanisthouse",
        "texture_ALPHA_Img": "sietocy_alpha.jpg",
		"texture_BUMP_Img": "sietocy_normal.jpg",
		"texture_DIFFUSE_Img": "sietocy_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "sietocy_diffuse_Crystal.jpg"
	},
	{
		"id": "technology",
        "texture_ALPHA_Img": "technology_alpha.jpg",
		"texture_BUMP_Img": "technology_normal.jpg",
		"texture_DIFFUSE_Img": "technology_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "technology_diffuse_Crystal.jpg"

	},
	{
		"id": "skull",
		"texture_ALPHA_Img": "skull_alpha.jpg",
		"texture_BUMP_Img": "skull_normal.jpg",
		"texture_DIFFUSE_Img": "skull_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "skull_diffuse_Crystal.jpg"
	},
	{
		"id": "dollar",
		"texture_ALPHA_Img": "dollar_alpha.jpg",
		"texture_BUMP_Img": "dollar_normal.jpg",
		"texture_DIFFUSE_Img": "dollar_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "dollar_diffuse_Crystal.jpg"
	},
	{
		"id": "heart",
		"texture_ALPHA_Img": "heart_alpha.jpg",
		"texture_BUMP_Img": "heart_normal.jpg",
		"texture_DIFFUSE_Img": "heart_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "heart_diffuse_Crystal.jpg"
	},
	{
		"id": "jingjang",
		"texture_ALPHA_Img": "jingjang_alpha.jpg",
		"texture_BUMP_Img": "jingjang_normal.jpg",
		"texture_DIFFUSE_Img": "jingjang_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "jingjang_diffuse_Crystal.jpg"
	},
	{
		"id": "loveface",
		"texture_ALPHA_Img": "loveface_alpha.jpg",
		"texture_BUMP_Img": "loveface_normal.jpg",
		"texture_DIFFUSE_Img": "loveface_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "loveface_diffuse_Crystal.jpg"
	},
	{
		"id": "rockon",
		"texture_ALPHA_Img": "rockon_alpha.jpg",
		"texture_BUMP_Img": "rockon_normal.jpg",
		"texture_DIFFUSE_Img": "rockon_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "rockon_diffuse_Crystal.jpg"
	},
	{
		"id": "peace",
		"texture_ALPHA_Img": "peace_alpha.jpg",
		"texture_BUMP_Img": "peace_normal.jpg",
		"texture_DIFFUSE_Img": "peace_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "peace_diffuse_Crystal.jpg"
	},
	{
		"id": "peace-hand",
		"texture_ALPHA_Img": "peace-hand_alpha.jpg",
		"texture_BUMP_Img": "peace-hand_normal.jpg",
		"texture_DIFFUSE_Img": "peace-hand_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "peace-hand_diffuse_Crystal.jpg"
	},
	{
		"id": "smilingface",
		"texture_ALPHA_Img": "smilingface_alpha.jpg",
		"texture_BUMP_Img": "smilingface_normal.jpg",
		"texture_DIFFUSE_Img": "smilingface_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "smilingface_diffuse_Crystal.jpg"
	},
	{
		"id": "star",
		"texture_ALPHA_Img": "star_alpha.jpg",
		"texture_BUMP_Img": "star_normal.jpg",
		"texture_DIFFUSE_Img": "star_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "star_diffuse_Crystal.jpg"
	},
	{
		"id": "sunglasses",
		"texture_ALPHA_Img": "sunglasses_alpha.jpg",
		"texture_BUMP_Img": "sunglasses_normal.jpg",
		"texture_DIFFUSE_Img": "sunglasses_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "sunglasses_diffuse_Crystal.jpg"
	},
	{
		"id": "thumbsup",
		"texture_ALPHA_Img": "thumbsup_alpha.jpg",
		"texture_BUMP_Img": "thumbsup_normal.jpg",
		"texture_DIFFUSE_Img": "thumbsup_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "thumbsup_diffuse_Crystal.jpg"
	},
	{
		"id": "viking",
		"texture_ALPHA_Img": "viking_alpha.jpg",
		"texture_BUMP_Img": "viking_normal.jpg",
		"texture_DIFFUSE_Img": "viking_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "viking_diffuse_Crystal.jpg"
	}


]




var flags = { cur: null, prev: null };
function changeFlagTexture(imgId) {
	flags.prev = flags.cur;
	flags.cur = null;

	var userID = imgId.trim();
	console.log('userID', userID);
	for(var em = 0; em < FlagTextureImages.length; em++){
		if(userID == FlagTextureImages[em].id){
			isEmblemAvailable = true;
			flags.cur = scene.createImage(imgId+"_col", "../images_gl/flags/"+FlagTextureImages[em].texture_DIFFUSE_Img);
			break;
		}
	}
	if(flags.cur === null)
		return;

	var timerLoad = setInterval(function() {
		if (scene._outstandingjobs == 0) {
			clearInterval(timerLoad);

		    var mat = scene._Material_ref["GG_Flag_Sweden_env"];
		    mat.setTexture(flags.cur, TEXTURE_MAP_DIFFUSETEX);
		    mat.setTexture(flags.cur, TEXTURE_MAP_GLOSSYTEX);
			scene.clearRefine();

			if (flags.prev)
				flags.prev.destroy();
		}
	}, 100);
}

var FlagTextureImages = [
    {"id": "flagPin_1", "texture_DIFFUSE_Img": "Flag_Sweden.jpg"},
    {"id": "flagPin_2", "texture_DIFFUSE_Img": "Flag_Afghanistan.jpg"},
    {"id": "flagPin_3", "texture_DIFFUSE_Img": "Flag_Albania.jpg"},
    {"id": "flagPin_4", "texture_DIFFUSE_Img": "ALGERIA.png"},
    {"id": "flagPin_5", "texture_DIFFUSE_Img": "AUSTRALIA.png"},
    {"id": "flagPin_6", "texture_DIFFUSE_Img": "BELGIUM.png"},
    {"id": "flagPin_7", "texture_DIFFUSE_Img": "BOLIVIA.png"},
    {"id": "flagPin_8", "texture_DIFFUSE_Img": "Flag_Bosnia_&_Hercegovina.jpg"},
    {"id": "flagPin_9", "texture_DIFFUSE_Img": "BULGARIA.png"},
    {"id": "flagPin_10", "texture_DIFFUSE_Img": "CHILE.png"},
    {"id": "flagPin_11", "texture_DIFFUSE_Img": "COLOMBIA.png"},
    {"id": "flagPin_12", "texture_DIFFUSE_Img": "Flag_Denmark.jpg"},
    {"id": "flagPin_13", "texture_DIFFUSE_Img": "ERITREA.png"},
    {"id": "flagPin_14", "texture_DIFFUSE_Img": "ESTONIA.png"},
    {"id": "flagPin_15", "texture_DIFFUSE_Img": "ETHIOPIA.png"},
    {"id": "flagPin_16", "texture_DIFFUSE_Img": "FINLAND.png"},
    {"id": "flagPin_17", "texture_DIFFUSE_Img": "FRANCE.png"},
    {"id": "flagPin_18", "texture_DIFFUSE_Img": "UNITED ARAB EMIRATES.png"},
    {"id": "flagPin_19", "texture_DIFFUSE_Img": "NETHERLAND.png"},
    {"id": "flagPin_20", "texture_DIFFUSE_Img": "Flag_Iraq.jpg"},
    {"id": "flagPin_21", "texture_DIFFUSE_Img": "IRAN.png"},
    {"id": "flagPin_22", "texture_DIFFUSE_Img": "ICELAND.png"},
    {"id": "flagPin_23", "texture_DIFFUSE_Img": "ISRAEL.png"},
    {"id": "flagPin_24", "texture_DIFFUSE_Img": "ITALY.png"},
    {"id": "flagPin_25", "texture_DIFFUSE_Img": "JAMECA.png"},
    {"id": "flagPin_26", "texture_DIFFUSE_Img": "CANADA.png"},
    {"id": "flagPin_27", "texture_DIFFUSE_Img": "KENYA.png"},
    {"id": "flagPin_28", "texture_DIFFUSE_Img": "CHINA.png"},
    {"id": "flagPin_29", "texture_DIFFUSE_Img": "CROATIA.png"},
    {"id": "flagPin_30", "texture_DIFFUSE_Img": "LEBANON.png"},
    {"id": "flagPin_31", "texture_DIFFUSE_Img": "MACEDONIA.png"},
    {"id": "flagPin_32", "texture_DIFFUSE_Img": "NORWAY.png"},
    {"id": "flagPin_33", "texture_DIFFUSE_Img": "PAKISTAN.png"},
    {"id": "flagPin_34", "texture_DIFFUSE_Img": "POLAND.png"},
    {"id": "flagPin_35", "texture_DIFFUSE_Img": "RISSIA.png"},
    {"id": "flagPin_36", "texture_DIFFUSE_Img": "SAUDI ARABIA.png"},
    {"id": "flagPin_37", "texture_DIFFUSE_Img": "Flag_Serbia.jpg"},
    {"id": "flagPin_38", "texture_DIFFUSE_Img": "Flag_Somalia.jpg"},
    {"id": "flagPin_39", "texture_DIFFUSE_Img": "SPAIN.png"},
    {"id": "flagPin_40", "texture_DIFFUSE_Img": "UNITED KINGHDOM.png"},
    {"id": "flagPin_41", "texture_DIFFUSE_Img": "SYRIA.png"},
    {"id": "flagPin_42", "texture_DIFFUSE_Img": "THAILAND.png"},
    {"id": "flagPin_43", "texture_DIFFUSE_Img": "TURKEY.png"},
    {"id": "flagPin_44", "texture_DIFFUSE_Img": "GERMANY.png"},
    {"id": "flagPin_45", "texture_DIFFUSE_Img": "UNITED STATES.png"},
    {"id": "flagPin_46", "texture_DIFFUSE_Img": "Flag_Kurdistan.jpg"},
    {"id": "flagPin_47", "texture_DIFFUSE_Img": "Flag_Rainbow.jpg"}
];

function changeFlagPin(){
    reverseFlagPin();
	scene.groupApplyState('flagpin:on');
	scene.clearRefine();
}

function reverseFlagPin(){
    scene.groupApplyState('flagpin:off');
    scene.clearRefine();
}

//Emblems
var emblemTextureImages = [
	{
		"id": "emblem_1",
		"texture_ALPHA_Img": "Emblem_DRINK_alpha.jpg",
		"texture_BUMP_Img": "Emblem_DRINK_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_DRINK_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_DRINK_diffuse_Crystal.jpg"
	},{
		"id": "emblem_2",
		"texture_ALPHA_Img": "Emblem_Crown_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Crown_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Crown_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Crown_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_3",
		"texture_ALPHA_Img": "Emblem_Blekinge_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Blekinge_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Blekinge_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Blekinge_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_4",
		"texture_ALPHA_Img": "Emblem_Bohuslan_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Bohuslan_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Bohuslan_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Bohuslan_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_5",
		"texture_ALPHA_Img": "Emblem_Dalarna_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Dalarna_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Dalarna_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Dalarna_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_6",
		"texture_ALPHA_Img": "Emblem_Dalsland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Dalsland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Dalsland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Dalsland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_7",
		"texture_ALPHA_Img": "Emblem_Gotland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Gotland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Gotland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Gotland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_8",
		"texture_ALPHA_Img": "Emblem_Guest_Country_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Guest_Country_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Guest_Country_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Guest_Country_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_9",
		"texture_ALPHA_Img": "Emblem_Halland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Halland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Halland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Halland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_10",
		"texture_ALPHA_Img": "Emblem_Halsingland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Halsingland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Halsingland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Halsingland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_11",
		"texture_ALPHA_Img": "Emblem_Harjedalen_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Harjedalen_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Harjedalen_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Harjedalen_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_12",
		"texture_ALPHA_Img": "Emblem_Jamtland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Jamtland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Jamtland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Jamtland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_13",
		"texture_ALPHA_Img": "Emblem_Lappland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Lappland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Lappland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Lappland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_14",
		"texture_ALPHA_Img": "Emblem_Medelpad_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Medelpad_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Medelpad_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Medelpad_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_15",
		"texture_ALPHA_Img": "Emblem_Norrbotten_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Norrbotten_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Norrbotten_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Norrbotten_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_16",
		"texture_ALPHA_Img": "Emblem_Narrow_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Narrow_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Narrow_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Narrow_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_17",
		"texture_ALPHA_Img": "Emblem_Skane_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Skane_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Skane_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Skane_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_18",
		"texture_ALPHA_Img": "Emblem_Smaland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Smaland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Smaland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Smaland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_19",
		"texture_ALPHA_Img": "Emblem_Sodermanland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Sodermanland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Sodermanland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Sodermanland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_20",
		"texture_ALPHA_Img": "Emblem_Uppland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Uppland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Uppland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Uppland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_21",
		"texture_ALPHA_Img": "Emblem_Varmland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Varmland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Varmland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Varmland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_22",
		"texture_ALPHA_Img": "Emblem_Vasterbotten_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Vasterbotten_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Vasterbotten_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Vasterbotten_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_23",
		"texture_ALPHA_Img": "Emblem_Vastergotland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Vastergotland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Vastergotland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Vastergotland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_24",

		"texture_ALPHA_Img": "Emblem_Vastmanland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Vastmanland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Vastmanland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Vastmanland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_25",
		"texture_ALPHA_Img": "Emblem_Angermanland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Angermanland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Angermanland_diffuse.jpg",
                "texture_DIFFUSE_Crystal_Img": "Emblem_Angermanland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_26",
		"texture_ALPHA_Img": "Emblem_Oland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Oland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Oland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Oland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_27",
		"texture_ALPHA_Img": "Emblem_Ostergotland_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Ostergotland_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Ostergotland_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Ostergotland_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_28",
		"texture_ALPHA_Img": "Emblem_Children_and_Leisure_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Children_and_Leisure_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Children_and_Leisure_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Children_and_Leisure_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_29",
		"texture_ALPHA_Img": "Emblem_Construction_and_Building_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Construction_and_Building_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Construction_and_Building_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Construction_and_Building_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_30",
		"texture_ALPHA_Img": "Emblem_Humanistic_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Humanistic_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Humanistic_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Humanistic_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_31",
		"texture_ALPHA_Img": "Emblem_Economy_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Economy_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Economy_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Economy_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_32",
		"texture_ALPHA_Img": "Emblem_Aesthetic_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Aesthetic_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Aesthetic_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Aesthetic_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_33",
		"texture_ALPHA_Img": "Emblem_Vehicles_and_Transport_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Vehicles_and_Transport_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Vehicles_and_Transport_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Vehicles_and_Transport_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_34",
		"texture_ALPHA_Img": "Emblem_Trade_and_Admin_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Trade_and_Admin_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Trade_and_Admin_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Trade_and_Admin_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_35",
		"texture_ALPHA_Img": "Emblem_Handicraft_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Handicraft_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Handicraft_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Handicraft_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_36",
		"texture_ALPHA_Img": "Emblem_Hotel_and_Tourism_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Hotel_and_Tourism_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Hotel_and_Tourism_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Hotel_and_Tourism_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_37",
		"texture_ALPHA_Img": "Emblem_International_Baccalaureate_alpha.jpg",
		"texture_BUMP_Img": "Emblem_International_Baccalaureate_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_International_Baccalaureate_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_International_Baccalaureate_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_38",
		"texture_ALPHA_Img": "Emblem_Athletics_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Athletics_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Athletics_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Athletics_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_39",
		"texture_ALPHA_Img": "Emblem_Industry_Technical_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Industry_Technical_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Industry_Technical_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Industry_Technical_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_40",
		"texture_ALPHA_Img": "Emblem_Restaurant_and_Food_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Restaurant_and_Food_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Restaurant_and_Food_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Restaurant_and_Food_diffuse_Crystal.jpg"
	},
    {
		"id": "emblem_41",
        "texture_ALPHA_Img": "Emblem_Electricity_and_Energy_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Electricity_and_Energy_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Electricity_and_Energy_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Electricity_and_Energy_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_42",
		"texture_ALPHA_Img": "Emblem_Natural_Resource_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Natural_Resource_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Natural_Resource_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Natural_Resource_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_43",
		"texture_ALPHA_Img": "Emblem_Nature_Science_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Nature_Science_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Nature_Science_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Nature_Science_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_44",
		"texture_ALPHA_Img": "Emblem_Care_and_Nursing_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Care_and_Nursing_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Care_and_Nursing_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Care_and_Nursing_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_45",
		"texture_ALPHA_Img": "Emblem_Plumber_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Plumber_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Plumber_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Plumber_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_46",
        "texture_ALPHA_Img": "Emblem_Society_Science_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Society_Science_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Society_Science_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Society_Science_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_47",
        "texture_ALPHA_Img": "Emblem_Technique_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Technique_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Technique_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Technique_diffuse_Crystal.jpg"

	},
	{
		"id": "emblem_48",
		"texture_ALPHA_Img": "Emblem_Dead_head_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Dead_head_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Dead_head_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Dead_head_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_49",
		"texture_ALPHA_Img": "Emblem_Doller_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Doller_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Doller_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Doller_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_50",
		"texture_ALPHA_Img": "Emblem_Heart_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Heart_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Heart_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Heart_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_51",
		"texture_ALPHA_Img": "Emblem_Jingjang_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Jingjang_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Jingjang_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Jingjang_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_52",
		"texture_ALPHA_Img": "Emblem_Loveface_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Loveface_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Loveface_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Loveface_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_53",
		"texture_ALPHA_Img": "Emblem_Music_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Music_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Music_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Music_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_54",
		"texture_ALPHA_Img": "Emblem_Peace_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Peace_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Peace_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Peace_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_55",
		"texture_ALPHA_Img": "Emblem_Peacehand_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Peacehand_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Peacehand_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Peacehand_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_56",
		"texture_ALPHA_Img": "Emblem_Smilingface_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Smilingface_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Smilingface_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Smilingface_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_57",
		"texture_ALPHA_Img": "Emblem_Star_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Star_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Star_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Star_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_58",
		"texture_ALPHA_Img": "Emblem_Sunglasses_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Sunglasses_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Sunglasses_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Sunglasses_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_59",
		"texture_ALPHA_Img": "Emblem_Thumb_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Thumb_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Thumb_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Thumb_diffuse_Crystal.jpg"
	},
	{
		"id": "emblem_60",
		"texture_ALPHA_Img": "Emblem_Viking_alpha.jpg",
		"texture_BUMP_Img": "Emblem_Viking_normal.jpg",
		"texture_DIFFUSE_Img": "Emblem_Viking_diffuse.jpg",
        "texture_DIFFUSE_Crystal_Img": "Emblem_Viking_diffuse_Crystal.jpg"
	}


]

var textureDiamondImg = {
	"emblem_61" : "Top_amblem_korona_dimond_alpha.jpg",
	"emblem_62" : "top_amblem_haert_dimond_alpha.jpg",
	"emblem_63" : "Top_amblem_Doller_dimond_alpha.jpg"
	};
// normal image = "TEXTURE_MAP_BUMPTEX"
//same image for TEXTURE_MAP_DIFFUSETEX || TEXTURE_MAP_SPECULARTEX || TEXTURE_MAP_ADDITIONALTEX
var textureDiamond = false;
function changeEmblemTextureDiamond(imgId){
if(!textureDiamond)scene.materialReplace(emblemcolors[0][currentEmblemClr], "HH_Diamond_Top_amblem_env");
		   var alpha = scene.createImage(imgId+"_alpha", "../images_gl/embroideries/"+textureDiamondImg[imgId]);
		   var mat3 = scene._Material_ref["HH_Diamond_Top_amblem_env"];
		mat3.setTexture(alpha, TEXTURE_MAP_ALPHATEX);
		scene.clearRefine();
					textureDiamond = true;
}

var emblems = { cur: null, prev: null };
function changeEmblemTexture(imgId, isColor) {
	emblems.prev = emblems.cur;
	emblems.cur = null;
	console.log('currentEmblemClr', currentEmblemClr)
	var embname = emblemcolors[0][currentEmblemClr].toLowerCase();
    var isCrystal = (embname.indexOf("crystal") >= 0 || embname.indexOf("clyster") >= 0 || embname.indexOf("cryster") >= 0);
	for(var em = 0; em < emblemTextureImages.length; em++){
		if(imgId == emblemTextureImages[em].id){
			emblems.cur = {
				alpha: scene.createImage(imgId+"_alpha", "../images_gl/embroideries/"+emblemTextureImages[em].texture_ALPHA_Img),
				bump: scene.createImage(imgId+"_bump", "../images_gl/embroideries/"+emblemTextureImages[em].texture_BUMP_Img),
				diffuse: scene.createImage(imgId+"_diffuse", "../images_gl/embroideries/"+emblemTextureImages[em].texture_DIFFUSE_Img)
				};
			if(isCrystal)
				emblems.cur.crystal = scene.createImage(imgId+"_diffuse_crystal", "../images_gl/embroideries/"+emblemTextureImages[em].texture_DIFFUSE_Crystal_Img);
			break;
		}
	}
	if(emblems.cur === null)
		return;

	var timerLoad = setInterval(function() {
		if (scene._outstandingjobs == 0) {
			clearInterval(timerLoad);
console.log(emblemcolors[0][currentEmblemClr]);
			var mat2 = scene._Material_ref[emblemcolors[0][currentEmblemClr]];
			if(isCrystal){
				mat2.setTexture(emblems.cur.alpha, TEXTURE_MAP_ALPHATEX);
				mat2.setTexture(emblems.cur.crystal, TEXTURE_MAP_DIFFUSETEX);
			}else{
				mat2.setTexture(emblems.cur.alpha, TEXTURE_MAP_ALPHATEX);
				mat2.setTexture(emblems.cur.bump, TEXTURE_MAP_BUMPTEX);
				mat2.setTexture(emblems.cur.diffuse, TEXTURE_MAP_DIFFUSETEX);
				mat2.setTexture(emblems.cur.diffuse, TEXTURE_MAP_GLOSSYTEX);
			}
			var mat = scene._Material_ref["HH_White_Drink_Matt_Top_Emblems_Env"];
			mat.setTexture(emblems.cur.alpha, TEXTURE_MAP_ALPHATEX);
			mat.setTexture(emblems.cur.bump, TEXTURE_MAP_BUMPTEX);
			mat.setTexture(emblems.cur.diffuse, TEXTURE_MAP_GLOSSYTEX);
			mat.setTexture((isCrystal) ? emblems.cur.crystal : emblems.cur.diffuse, TEXTURE_MAP_DIFFUSETEX);



			if (emblems.prev) {
				emblems.prev.alpha.destroy();
				emblems.prev.bump.destroy();
				emblems.prev.diffuse.destroy();
				if (emblems.prev.crystal)
					emblems.prev.crystal.destroy();
			}
		}
                if(textureDiamond)scene.materialReplace("HH_Diamond_Top_amblem_env", emblemcolors[0][currentEmblemClr]);
        textureDiamond = false;
	}, 1);
        scene.clearRefine();
}

})
