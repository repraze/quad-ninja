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
		this.smooth = false;
		this.context.mozImageSmoothingEnabled = this.smooth;
	},
	setBounds : function(bounds){
		this._bounds={x:0,y:0,width:this.canvas.width, height:this.canvas.height};
		if(bounds.x<0 ||
		   bounds.y<0 ||
		   (bounds.x+bounds.width)>this.canvas.width ||
		   (bounds.y+bounds.height)>this.canvas.height ){
			   return false;
		}
		this._bounds={x:bounds.x,y:bounds.y,width:bounds.width, height:bounds.height};
		return true;
	},
	getBounds : function(){
		return {x:this._bounds.width,y:this._bounds.y,width:this._bounds.width,height:this._bounds.height};
	},
	render : function(){
		if(this._camera){
			//this.smooth = this._camera.getBounds().width > this._bounds.width;
			//	this.context.mozImageSmoothingEnabled = this.smooth;
				
			this.context.save();
				this.context.beginPath();
				this.context.rect(this._bounds.x,this._bounds.y,this._bounds.width,this._bounds.height);
				this.context.clip();
				this.context.closePath();
				this.context.translate(this._bounds.x,this._bounds.y);
				this.context.scale(this._bounds.width,this._bounds.height); //TODO ratio camera/viewport , modify aspectratio 
				this._camera.render(this.context);
			this.context.restore();
		}
	},
	setCamera : function(camera){
		this._camera = camera;
	},
	getCamera : function(){
		return this._camera;
	},
	getAspectRatio : function(){
		return this._bounds.width/this._bounds.height;
	}
});
