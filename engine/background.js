var Background = Class.extend({
	init : function(){
		this.layers = [];
	},
	addLayer : function(sprite, distance, repeat, scale){
		this.layers.push({sprite: sprite, distance: distance, repeat: repeat, scale: scale});
	},
	removeLayer : function(idx){
		return this.layer.splice(idx,1);
	},
	render : function(context,bounds){
		this.layers.forEach(function(layer){
			x = (bounds.x)*layer.distance;
			y = (bounds.y)*layer.distance;
			
			
			irep = bounds.width/layer.sprite.getWidth()+1;
			jrep = bounds.height/layer.sprite.getHeight()+1;
			
			xmin = bounds.x-(x%layer.sprite.getWidth());
			ymin = bounds.y-(y%layer.sprite.getHeight());
			
			for(var i = 0; i<irep; i++){
				for(var j = 0; j<jrep; j++){
					context.translate(i*layer.sprite.getWidth()+xmin,j*layer.sprite.getHeight()+ymin);
					layer.sprite.draw(context);
					context.translate(-i*layer.sprite.getWidth()-xmin,-j*layer.sprite.getHeight()-ymin);
				}
			}
		});
	},
	update : function(dt){
		this.layers.forEach(function(layer){
			layer.sprite.update(dt);
		});
	}
});
