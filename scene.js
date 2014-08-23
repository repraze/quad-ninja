var Camera = Entity.extend({
	init : function(position,size){
		this._super({position:position});
		this.width = size.x;
		this.height = size.y;
	},
	getBounds : function(){
		return {x:this.position.x,y:this.position.y, width:this.width, height:this.height};
	}
});

var Scene = Class.extend({
	init : function(size,camera){
		this.camera = camera;
		this.entities = new Quadtree(16,{xmin:0,ymin:0,xmax:size.width,ymax:size.height},8);
		this.layers = [];
	},

	render : function(context){
		context.scale(this.camera.width,this.camera.height);
		context.translate(-this.camera.x,-this.camera.y);
		//Todo --> layer based rendering
		var inFrameEntities = this.entities.getObjectsIntersectingRegion(this.camera.getBounds());
		inFrameEntities.forEach(function(entity){object.draw(context)});
		context.translate(this.camera.x,this.camera.y);
		context.scale(1/this.camera.width,1/this.camera.height);
	},
	setCamera : function(camera){
		this.camera = camera;
	},
	getCamera : function(){
		return this.camera;
	},
	getEntity : function(name,hint){
	
	},
	addEntity : function(entity){
		this.entities.insertObject(entity);
	}
});
