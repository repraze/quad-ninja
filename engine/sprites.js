var Sprite = Class.extend({
	init : function(i,f,s,is,org){
		this.img = i;
		this.maxFrame = typeof f !== "undefined" ? f : 1;
		this.speed = s || 0;
		this.currentFrame = is || 0;
		
		this.clock = 0;
		this.origin = org || {x:0,y:0};
	},
	draw : function(context){
			context.translate(-this.origin.x,-this.origin.y);
			context.drawImage(
				this.img,
				this.currentFrame * this.img.width / this.maxFrame,
				0,
				this.img.width / this.maxFrame,
				this.img.height,
				0,
				0,
				this.img.width / this.maxFrame+1,
				this.img.height+1);
			context.translate(this.origin.x,this.origin.y);
			return;
	},
	update : function(dt){
		if(this.maxFrame!=1){
			this.clock += dt;
			if(this.clock>=this.speed){
				this.clock-=this.speed;
				
				//reboot anim
				this.currentFrame = (this.currentFrame+1)%this.maxFrame;
			}
		}
	},
	copy : function(){
		return new Sprite(this.img,this.maxFrame,this.speed,this.currentFrame);
	},
	getWidth : function(){return this.img.width/this.maxFrame;},
	getHeight: function(){return this.img.height;},
	setOrigin : function(vec){
		this.origin = vec;
	},
	getOrigin : function(){
		return this.origin.clone();
	}
});

//data: {imageName: "block_3", <frame: 1, speed: 1, init: 0, spriteName: "block_3_mid">}

var SpriteManager = Class.extend({
	init : function(imageMgr) {
		this.imageMgr = imageMgr;
		this.spritedata = {};
		this.spritedata["error"] = {imageName:"error"};
	},
	registerSprite : function(data) {
		this.spritedata[ data.spriteName || data.imageName] = data;
	},
	getSprite : function(name){
		if(!this.spritedata[name]){
			console.warn('SpriteManager : Sprite "'+name+'" not found.');
			return this.getSprite("error");
		}
		return new Sprite(this.imageMgr.getImage(this.spritedata[name].imageName),
			this.spritedata[name].frames,
			this.spritedata[name].speed,
			this.spritedata[name].init,
			this.spritedata[name].origin
			);
	}
});
