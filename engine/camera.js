var Camera = Class.extend({
	init : function(scene,position,size){
		this._position = new Vector();
		this._scene = scene;//rendered scene
		this.width = size.width;
		this.height = size.height;
		this._aspectRatio = this.width/this.height;
		this._axis = Camera.Axis.BOTH;
		this._constraint = Camera.Constraint.NONE;
		if(position)
			this.setPosition(position);
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
	},
	setPosition : function(position){
		//Bounds
		if(this._constraint){
			tmpS = this._scene.getSize();
			//tmpPrev = this.getPosition();
			if(this._constraint | Camera.Constraint.HORIZONTAL){
				if(position.x-this.width/2<0){
					position.x=this.width/2;
				}
				else if(position.x+this.width/2>tmpS.width){
					position.x=tmpS.width-this.width/2;
				}
			}
			if(this._constraint | Camera.Constraint.VERTICAL){
				if(position.y-this.height/2<0){
					position.y=this.height/2;
				}
				else if(position.y+this.height/2>tmpS.height){
					position.y=tmpS.height-this.height/2;
				}
			}
		}
	
		this._position.set(position);
	},
	getPosition : function(){
		return this._position.clone(); //TODO return a clone
	},
	setConstraint : function(constraint){
		this._constraint = constraint;
		this.setPosition(this._position);
	},
	getConstraint : function(){
		return this._constraint;
	},
	move : function(translation){
		this.setPosition({x:this._position.x+translation.x,y:this._position.y+translation.y});
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
Camera.Constraint = {
        NONE: 0, 
        HORIZONTAL: 1, 
        VERTICAL: 2, 
        BOTH: 3
    };
