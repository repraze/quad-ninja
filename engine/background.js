
var ParallaxLayer = Class.extend({
	init : function(speedFactor,opts){
		opts=opts || {};
		if(speedFactor && typeof speedFactor.x === "number" )
			this.speedFactor = speedFactor;
		else{
			this.speedFactor = {x:speedFactor,y:speedFactor} || {x:0,y:0};
		}
		this.sprite = opts.sprite || null;
		this.pattern = opts.pattern || null;
		this.repeat = opts.repeat || "repeat";//REPEAT_BOTH;
		var scale = opts.scale || 1;
		this.over = opts.over || []; // A list of entities
		this.below = opts.below || []; //A list of entities
		this.visible=true;
	},
	render : function(context,camBounds){
		x = (camBounds.x)*this.speedFactor.x;
		y = (camBounds.y)*this.speedFactor.y;
		

		if(this.below.length){
			context.translate(camBounds.x-x,camBounds.y-y);
			this.below.forEach(function(ent){ent.draw(context)});
			context.translate(-camBounds.x+x,-camBounds.y+y);
		}

		if(this.sprite){

		irep = camBounds.width/this.sprite.getWidth()+1;
		jrep = camBounds.height/this.sprite.getHeight()+1;
		
		xmin = camBounds.x-(x%this.sprite.getWidth());
		ymin = camBounds.y-(y%this.sprite.getHeight());
			for(var i = 0; i<irep; i++){
				for(var j = 0; j<jrep; j++){
					context.translate(i*this.sprite.getWidth()+xmin,j*this.sprite.getHeight()+ymin);
					this.sprite.draw(context);
					context.translate(-i*this.sprite.getWidth()-xmin,-j*this.sprite.getHeight()-ymin);
				}
			}
		}

		if(this.over.length){
			context.translate(camBounds.x-x,camBounds.y-y);
			this.over.forEach(function(ent){ent.draw(context)});
			context.translate(-camBounds.x+x,-camBounds.y+y);
		}
	},
	update : function(dt){
		if(this.sprite)
			this.sprite.update(dt);

	},
	enablePattern : function(pattern){
		//TODO
	},
	disablePattern :function(){
		//TODO
	},
	addEntityBelow : function(entity){
		this.below.push(entity);
	},
	addEntityOver : function(entity){
		this.over.push(entity);
	},
	getPerceivedSize : function(scene){
		return {}
	},
	setVisible : function(visible){
		this.visible = (typeof visible !== "undefined" ? visible : true);
	}

});

var Background = Class.extend({
	init : function(){
		this.layers = [];
	},
	addLayer : function(layer){
		this.layers.push(layer);
	},
	removeLayer : function(idx){
		return this.layer.splice(idx,1);
	},
	render : function(context,camBounds){
		this.layers.forEach(function(layer){
			if(layer.visible)
				layer.render(context,camBounds);
		});
	},
	update : function(dt){
		this.layers.forEach(function(layer){
			layer.update(dt);
		});
	}
});
