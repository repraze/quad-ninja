var Vector = Class.extend({
	init : function(x,y){
		this.x = x||0; this.y = y||0;
	},
	set : function(vec){
		this.x = vec.x;
		this.y = vec.y;
		return this;
	},
	clone : function(){
		return new Vector(this.x,this.y);
	},
	add : function(vec){
		this.x+=vec.x;
		this.y+=vec.y;
		return this;
	},
	sub : function(vec){
		this.x-=vec.x;
		this.y-=vec.y;
		return this;
	},
	mul : function(k){
		this.x *= k;
		this.y *= k;
	},
	div : function(k){
		this.x /= k;
		this.y /= k;
		return this;
	},
	dot : function(vec){
		return this.x * vec.x + this.y * vec.y;
	},
	normalize : function(){
		this.div(this.length());
	},
	sqLength : function(){
		return this.x*this.x+this.y*this.y;
	},
	length : function(){
		return Math.sqrt( this.x*this.x+this.y*this.y);
	},
	distanceTo : function(vec){
		return this.clone().sub(vec).length();
	},
	sqDistanceTo : function(vec){
		return this.clone().sub(vec).sqLength();
	}
});

var Entity = Class.extend({
	init : function(opts){
		this.scene=null;
		this._position = new Vector();
		if(opts.position)
			this._position.set(opts.position);
		this.bounds = {x:this._position.x,y:this._position.y,width:0,height:0}
		if(opts.sprite)
			this.setSprite(opts.sprite);
	},
	draw : function(context){
		if(!this._sprite)
			return;
		context.translate(this._position.x,this._position.y);
		this._sprite.draw(context);
		context.translate(-this._position.x,-this._position.y);
	},
	update : function(t){
		if(this._sprite){
			this._sprite.update(t);
		}
	},
	setSprite : function(sprite){
		this._sprite = sprite;
		this.bounds.width = sprite.getWidth();
		this.bounds.height = sprite.getHeight();
	},
	getSprite : function(){
		return this._sprite;
	},
	getBounds : function(){
		return this.bounds;
	},
	setPosition : function(position){
		this._position.set(position);
		this.bounds.x=position.x;
		this.bounds.y=position.y;
		if(this.scene)
			this.scene.onEntityMove(this);
	},
	getPosition : function(){
		return this._position.clone(); //TODO return a clone
	},
	move : function(translation){
		this.setPosition({x:this._position.x+translation.x,y:this._position.y+translation.y});
	}
});
