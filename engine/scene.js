var Scene = Class.extend({
	init : function(size){
		this.layers = [];
		this.entities = [];
		this.layers = [];
		this._size = size;
		this.addLayer();
	},

	render : function(context,bounds){
		if(this._background)
			this._background.render(context,bounds);
		var inFOVEntities = [];
		this.layers.forEach(function(layer){inFOVEntities = [].concat(inFOVEntities,layer.getObjectsIntersectingRegion(bounds))});
		inFOVEntities.forEach(function(entity){entity.draw(context)});
		//console.log(inFrameEntities.length);
		this.layers[0].draw(context);
	},
	update : function(dt){
		this.entities.forEach(function(entity){entity.update(dt)});
		if(this._background)
			this._background.update(dt);
	},
	addEntity : function(entity,layerId){
		entity._sceneLayer = this.layers[layerId||0];
		entity._scene = this;
		this.layers[layerId||0].insertObject(entity);
		this.entities.push(entity);
	},
	removeEntity : function(){
		entity._sceneLayer.removeObject(entity);
		entity._sceneLayer =null;
		entity._scene=null;
	},
	getSize : function(){
		return this._size;
	},
	setBackground : function(background){
		this._background = background;
	},
	addLayer : function(index){
		if(index > -this.layers.length && index<this.layers.length)
			this.layers.splice(index || 0,0, new Quadtree(16,{xmin:0,ymin:0,xmax:this._size.width,ymax:this._size.height},5));
		else if(typeof index === "undefined" || index === this.layers.length)
			this.layers.push(new Quadtree(16,{xmin:0,ymin:0,xmax:this._size.width,ymax:this._size.height},5));
		else
			console.warn("Scene.addLayer : invalid index");

	}
});
