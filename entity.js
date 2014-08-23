var Entity = Class.extend({
	init : function(){
		this.position = new Vector();
		this.sprite = sprite;
	},
	draw : function(context){
		context.translate(this.position.x,this.position.y);
		this.sprite.draw(context);
		context.translate(-this.position.x,-this.position.y);
	},
	_update : function(t){
		if(this.sprite){
			this.sprite.update();
		}
		this.update(t);
	},
	update : function(t){}

});
