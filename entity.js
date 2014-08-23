var Vector = Class.extend({
	init : function(x,y){
		this.x = x||0; this.y = y||0;
	}
});
var Entity = Class.extend({
	init : function(sprite){
		this.position = new Vector();
		this.bounds = {x:this.position.x,y:this.position.y}
		this.setSprite(sprite);
	},
	draw : function(context){
		context.translate(this.position.x,this.position.y);
		this._sprite.draw(context);
		context.translate(-this.position.x,-this.position.y);
	},
	_update : function(t){
		if(this.sprite){
			this._sprite.update();
		}
		this.update(t);
	},
	update : function(t){},
	setSprite : function(sprite){
		this._sprite = sprite;
		this.bounds.width = sprite.getWidth();
		this.bounds.height = sprite.getHeight();
	},
	getSprite : function(){
		return this._sprite;
	}

});
