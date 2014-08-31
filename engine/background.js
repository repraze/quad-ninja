var Background = Class.extend({
	init : function(){
		this.layers = [];
	},
	addLayer : function(image, distance, repeat, scale){
		this.layers.push({image: image, distance :distance, repeat :repeat, scale :scale});
	},
	removeLayer : function(idx){
	},
	render : function(context){

	}

});
