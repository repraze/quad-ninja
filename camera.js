var Camera = Entity.extend({
	init : function(position,size){
		this._super({position:position});
		this.width = size.width;
		this.height = size.height;
		this._aspectRatio = this.width/this.height;
	},
	getBounds : function(){
		return {x:this._position.x-this.width/2,
				y:this._position.y-this.height/2,
				width:this.width+this.width/2,
				height:this.height+this.width/2};//center cam
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
	update : function(t){
		//this._super.update(t);//not sure how to call
		if(this.followed != null){
			tmpP = this.followed.getPosition();
			tmpB = this.followed.getBounds();
			this._position.x = tmpP.x+tmpB.width/2;
			this._position.y = tmpP.y+tmpB.height/2;
			//this._super.setPosition(this.followed.getPosition()); //not working, bug?
			/*
				After review will add other features such as boundaries and following axis
			*/
		}
	},
	place : function(context){
		context.scale(1/this.width,1/this.height);
		context.translate(-this.getPosition().x+this.width/2,-this.getPosition().y+this.height/2);
	}
});