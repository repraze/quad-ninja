var Scene = Class.extend({
	init : function(size){
		this.tree = new Quadtree(16,{xmin:0,ymin:0,xmax:size.width,ymax:size.height},5);
		this.entities = [];
		this.layers = [];
		this._size = size;
	},

	render : function(context,bounds){
		//this.tree.draw(context);
		//Todo --> layer based rendering
		if(this._background)
			this._background.render(context,bounds);
		var inFrameEntities = this.tree.getObjectsIntersectingRegion(bounds);
		inFrameEntities.forEach(function(entity){entity.draw(context)});
		//console.log(inFrameEntities.length);
	},
	update : function(dt){
		this.entities.forEach(function(entity){entity.update(dt)});
		if(this._background)
			this._background.update(dt);
	},
	getEntity : function(name,hint){
	
	},
	addEntity : function(entity){
		this.tree.insertObject(entity);
		this.entities.push(entity);
		entity._scene = this;
	},
	_onEntityMove : function(entity){
		this.tree.moveObject(entity);
	},
	getSize : function(){
		return this._size;
	},
	setBackground : function(background){
		this._background = background;
	}
});
