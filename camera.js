var Camera = Entity.extend({
	init : function(position,size){
		this._super({position:position});
		this.width = size.width;
		this.height = size.height;
		this._aspectRatio = this.width/this.height;
		this._axis = Camera.Axis.BOTH;
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
		//this._super.update(t);//not sure how to call
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
			this.setPosition(tmpP); // now working
			/*
				After review will add other features such as boundaries
			*/
		}
	},
	place : function(context){
		context.scale(1/this.width,1/this.height);
		context.translate(-this.getPosition().x+this.width/2,-this.getPosition().y+this.height/2);
	}
});
//list axis
Camera.Axis = {
        NONE: 0, 
        HORIZONTAL: 1, 
        VERTICAL: 2, 
        BOTH: 3
    };
