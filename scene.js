var Camera = Entity.extend({
	init : function(position,size){
		this._super({position:position});
		this.width = size.width;
		this.height = size.height;
		this._aspectRatio = this.width/this.height;
	},
	getBounds : function(){
		return {x:this._position.x,y:this._position.y, width:this.width, height:this.height};
	},
	zoom : function(widthDiff){
		this.width-=widthDiff;
		if(this.width<=0)
			this.width=1;
		this.height = this.width/this._aspectRatio;
	}
});

var Scene = Class.extend({
	init : function(size,camera){
		this.camera = camera;
		this.tree = new Quadtree(16,{xmin:0,ymin:0,xmax:size.width,ymax:size.height},8);
		this.entities = [];
		this.layers = [];
	},

	render : function(context){
		if(this.camera){
		context.scale(1/this.camera.width,1/this.camera.height);
		context.translate(-this.camera.x,-this.camera.y);
		//this.tree.draw(context);
		//Todo --> layer based rendering
		var inFrameEntities = this.tree.getObjectsIntersectingRegion(this.camera.getBounds());
		inFrameEntities.forEach(function(entity){entity.draw(context)});
		context.translate(this.camera.x,this.camera.y);
		context.scale(this.camera.width,this.camera.height);
		}
		else{
			console.warn("No camera in Scene");
		}
	},
	update : function(t){
		this.entities.forEach(function(entity){entity.update(t)});
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
