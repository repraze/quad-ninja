var Viewport  = Class.extend({
	init : function(canvas,bounds){
		this.canvas = canvas || document.createElement("CANVAS");
		if(bounds){
			if(!this.setBounds(bounds) && !canvas){
				this.canvas.width = bounds.x+bounds.width;
				this.canvas.height = bounds.x+bounds.height;
			}
		}
		else{
			this._bounds={x:0,y:0,width:this.canvas.width, height:this.canvas.height};
		}
		this.context = this.canvas.getContext("2d");
	},
	setBounds : function(bounds){
		this._bounds={x:0,y:0,width:this.canvas.width, height:this.canvas.height};
		if(bounds.x<0 ||
		   bounds.y<0 ||
		   (bounds.x+bounds.width)>this.canvas.width ||
		   (bounds.y+bounds.height)>this.canvas.height ){
			   return false;
		   }
		return true;
	},
	getBounds : function(){
		return {x:this._bounds.width,y:this._bounds.y,width:this._bounds.width,height:this._bounds.height};
	},
	render : function(){
		//TODO clipping
		if(this._camera){
			this.context.translate(this._bounds.x,this._bounds.y);
			//this.context.scale(this._bounds.width,this._bounds.height); //TODO ratio camera/viewport , modify aspectratio 
			this._camera.render(this.context);
			//this.context.scale(1/this._bounds.width,1/this._bounds.height);
			this.context.translate(-this._bounds.x,-this._bounds.y);
		}
	},
	setCamera : function(camera){
		this._camera = camera;
	},
	getCamera : function(){
		return this._camera;
	}
});
