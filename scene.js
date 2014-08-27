var Scene = Class.extend({
	init : function(size,camera){
		this.camera = camera;
		this.tree = new Quadtree(16,{xmin:0,ymin:0,xmax:size.width,ymax:size.height},8);
		this.entities = [];
		this.layers = [];
	},

	render : function(context){
		if(this.camera){
			context.save();
			this.camera.place(context);
			//this.tree.draw(context);
			//Todo --> layer based rendering
			var inFrameEntities = this.tree.getObjectsIntersectingRegion(this.camera.getBounds());
			inFrameEntities.forEach(function(entity){entity.draw(context)});
			
			context.restore();
		}
		else{
			console.warn("No camera in Scene");
		}
	},
	update : function(t){
		this.entities.forEach(function(entity){entity.update(t)});
		this.camera.update(t);
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
		this.tree.insertObject(entity);
		this.entities.push(entity);
	},
	_onEntityMove : function(entity){
		this.tree.moveObject(entity);
	}
});
