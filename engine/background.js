var Background = Class.extend({
	init : function(){
		this.layers = [];
	},
	addLayer : function(sprite, distance, repeat, scale){
		this.layers.push({sprite: sprite, distance :distance, repeat :repeat, scale :scale});
	},
	removeLayer : function(idx){
		return this.layer.splice(idx,1);
	},
	render : function(context,bounds){
		this.layers.forEach(function(layer){
			layer.sprite.draw();
		});
	},
	update : function(dt){
		this.layers.forEach(function(layer){
			layer.sprite.update(dt);
		});
	}
});
