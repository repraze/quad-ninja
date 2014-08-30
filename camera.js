var Camera = Entity.extend({
	init : function(scene,position,size){
		this._scene = scene;
		this._super({position:position});
		this.width = size.width;
		this.height = size.height;
		this._aspectRatio = this.width/this.height;
		this._axis = Camera.Axis.BOTH;
		this._bound = Camera.Bound.NONE;
	},
	getBounds : function(){ //needs to be fixed
		return {x:this._position.x-this.width/2,
				y:this._position.y-this.height/2,
				width:this.width,
				height:this.height};//center cam
	},
	zoom : function(widthDiff){
		this.width-=widthDiff;
		if(this.width<=0)
			this.width=1;
		this.height = this.width/this._aspectRatio;
	},
	follow : function(entity){
		this.followed = entity;
	},
	setAxis : function(axis){
		this._axis = axis;
	},
	update : function(t){
		//Entity.prototype.update.call(this,t);//The javascript way to do this.
		//Maybe we can just create a "_update" function for entities.
		if(this.followed != null){
			tmpP = this.followed.getPosition();
			tmpB = this.followed.getBounds();
			if(this._axis | Camera.Axis.HORIZONTAL){
				tmpP.add({x:tmpB.width/2, y:0});
			}
			if(this._axis | Camera.Axis.VERTICAL){
				tmpP.add({x:0,y:tmpB.height/2});
			}
			this.setPosition(tmpP);
		}
		//Bounds
		if(this._bound){
			tmpS = this._scene.getSize();
			if(this._bound | Camera.Bound.HORIZONTAL){
				tmpP = this.getPosition();
				if(tmpP.x-this.width/2<0){
					this.setPosition({x:this.width/2,y:tmpP.y});
				}
				else if(tmpP.x+this.width/2>tmpS.width){
					this.setPosition({x:tmpS.width-this.width/2,y:tmpP.y});
				}
			}
			if(this._bound | Camera.Bound.VERTICAL){
				tmpP = this.getPosition();
				if(tmpP.y-this.height/2<0){
					this.setPosition({x:tmpP.x,y:this.height/2});
				}
				else if(tmpP.y+this.height/2>tmpS.height){
					this.setPosition({x:tmpP.x,y:tmpS.height-this.height/2});
				}
			}
		}
	},
	render : function(context){
		if(this._scene){
			context.save();
			context.scale(1/this.width,1/this.height);
			context.translate(-this.getPosition().x+this.width/2,-this.getPosition().y+this.height/2);
			this._scene.render(context,this.getBounds());
			context.restore();
		}
		else{
			console.warn("No scene in camera");
		}
	},
	setScene : function(scene){
		this._scene = scene;
	},
	getScene : function(){
		return this._scene;
	}
});
//list axis
Camera.Axis = {
        NONE: 0, 
        HORIZONTAL: 1, 
        VERTICAL: 2, 
        BOTH: 3
    };
//bound behaviour
Camera.Bound = {
        NONE: 0, 
        HORIZONTAL: 1, 
        VERTICAL: 2, 
        BOTH: 3
    };
