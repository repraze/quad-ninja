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
			this.bounds={x:0,y:0,width:this.canvas.width, height:this.canvas.height};
		}
		this.context = this.canvas.getContext("2d");
	},
	setBounds : function(bounds){
		this.bounds={x:0,y:0,width:canvas.width, height:canvas.height};
		if(bounds.x<0 ||
		   bounds.y<0 ||
		   (bounds.x+bounds.width)>this.canvas.width ||
		   (bounds.y+bounds.height)>this.canvas.height ){
			   return false;
		   }
		return true;
	},
	render : function(){
		//TODO clipping
		this.context.translate(this.bounds.x,this.bounds.y);
		this.context.scale(this.bounds.width,this.bounds.height);
		this.camera.render(this.context);
		this.context.scale(1/this.bounds.width,1/this.bounds.height);
		this.context.translate(-this.bounds.x,-this.bounds.y);

	}
});
