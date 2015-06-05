var labelfor, what2, what3, what5, whattoggle, science, all, weep; // debug
$(document).ready(function (){
	labelfor = $("[labelfor]");

	$(document).on("click", "[labelfor]", function(e){
		var label = $(this);
		var inputs = $(formatIDs(label.attr('labelfor')));
		all = inputs;

	    inputs.each(function (){
	    	// We click all inputs similiar to how label "for" attribute works
	    	$(this).click();
	    });
	});
	
	$("input").on("change", function () {
		executeInput($(this));
	});
});

function debug(tag){
	console.log("Clicked!");
	console.log(this);
	what2 = tag;
	// window.setTimeout(10);
}
var strg;
function formatIDs(str){
	strg = str;
	if (!str) return;
	return "#" + str.trim().replace(/ +/g, ", #");
}
function toggleProp(element, prop){
	var JQele = $(element);
	if (JQele.prop(prop))
		JQele.removeProp(prop);
	else JQele.prop(prop, true);
}
function setProp(element, prop){
	$(element).prop(prop, true);
}
function unsetProp(element, prop){
	$(element).removeProp(prop);
}
function prsStr(str){
	return str.trim().split(/ +/);
}
function loadInto(element, url){
	var JQele = $(element);
	JQele.load(url, '', function(e, e1, e2){
		// console.log('e', e1, e2);
		JQele.prop("loaded", true);
	})
}

// Extends input functionality, allowing us to also set properties and execute functions
function executeInput(input){
	var sibling = $(input.nextAll(":not(input)")[0]);
				
	// DEBUG
	what = input;
	science = sibling;
	
    if (toggle = input.attr('toggle')){
    	console.log("Has toggle", toggle);
    	toggle = prsStr(toggle);
    	for(var i = 0; i < toggle.length; ++i){
    		toggleProp(sibling, toggle[i]);	    		
    	}	    	
    }
    if (set = input.attr('set')){
    	console.log("Has set", set);
    	set = prsStr(set);
    	for(var i = 0; i < set.length; ++i){
    		setProp(sibling, set[i]);	    		
    	}
	}
	if (unset = input.attr('unset')){
    	console.log("Has unset", unset);
    	unset = prsStr(unset);
    	for(var i = 0; i < unset.length; ++i){
    		unsetProp(sibling, unset[i]);	    		
    	}
    }
    if (make = input.attr('make')){
    	console.log("Has make", make);
    	make = prsStr(make);
    	for(var i = 0; i < make.length; ++i){
    		sibling[0][make[i]]();
    	}
    }
    if (load = input.attr('load')){
    	console.log("Has load", load);
    	if (!sibling.prop("data-loaded")){
    		loadInto(sibling, load);
    	}
    }
}