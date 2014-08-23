var Camera = Entity.extend({
	init : function(bounds){
		this._super({position:{x:bounds.x,y:bounds.y}});
	}
});
var Scene = Class.extend({
	init : function(size){
		this.camera = new Camera();
		this.entities = new Quadtree(16,{xmin:0,ymin:0,xmax:size.width,ymax:size.height},8);
		this.layers = [];
	},

	render : function(context){
		//Todo --> layer based rendering
		var inFrameEntities = this.entities.getObjectsIntersectingRegion(Camera.bounds);
		inFrameEntities.forEach(function(entity){object.draw(context)});
	}
});
