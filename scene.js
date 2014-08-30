var Scene = Class.extend({
	init : function(size){
		this.tree = new Quadtree(16,{xmin:0,ymin:0,xmax:size.width,ymax:size.height},8);
		this.entities = [];
		this.layers = [];
		this._size = size;
	},

	render : function(context,bounds){
		//this.tree.draw(context);
		//Todo --> layer based rendering
		var inFrameEntities = this.tree.getObjectsIntersectingRegion(bounds);
		inFrameEntities.forEach(function(entity){entity.draw(context)});
	},
	update : function(t){
		this.entities.forEach(function(entity){entity.update(t)});
	},
	getEntity : function(name,hint){
	
	},
	addEntity : function(entity){
		this.tree.insertObject(entity);
		this.entities.push(entity);
	},
	_onEntityMove : function(entity){
		this.tree.moveObject(entity);
	},
	getSize : function(){
		return this._size;
	}
});
