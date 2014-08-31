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
			x = (bounds.x)*layer.distance+bounds.width/2-layer.sprite.getWidth()/2;
			y = (bounds.y)*layer.distance+bounds.height/2-layer.sprite.getHeight()/2;
			//xrep = bounds.width/layer.sprite.getWidth();
			//yrep = bounds.height/layer.sprite.getHeight();
			
			imin = bounds.x/layer.sprite.getWidth();
			jmin = bounds.y/layer.sprite.getHeight();
			
			imax = (bounds.x+bounds.width)/layer.sprite.getWidth();
			jmax = (bounds.y+bounds.height)/layer.sprite.getHeight();
			
			
			
			//context.translate(-(xrep/2*layer.sprite.getWidth()),-(yrep/2*layer.sprite.getHeight()));
			for(var i = imin; i<imax; i++){
				for(var j = jmin; j<jmax; j++){
					context.translate(i*layer.sprite.getWidth(),j*layer.sprite.getHeight());
					layer.sprite.draw(context);
					context.translate(-(i*layer.sprite.getWidth()),-(j*layer.sprite.getHeight()));
				}
			}
			//context.translate(xrep/2*layer.sprite.getWidth(),yrep/2*layer.sprite.getHeight());
			
		});
	},
	update : function(dt){
		this.layers.forEach(function(layer){
			layer.sprite.update(dt);
		});
	}
});
