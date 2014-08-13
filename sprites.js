var Sprite = Class.extend({
	init : function(i,f,s,is){
		this.img = i;
		this.maxFrame = f;
		this.speed = s || 0;
		this.currentFrame = is || 0;
		
		this.clock = 0;
	},
	draw : function(ctx,dt){
		if(this.maxFrame!=null){
			ctx.drawImage(
				this.sprites[s],
				this.sprites[s].frame * this.sprites[s].width / spriteInfo[s].frames,
				0,
				this.sprites[s].width / spriteInfo[s].frames,
				this.sprites[s].height,
				0,
				0,
				this.sprites[s].width / spriteInfo[s].frames,
				this.sprites[s].height);
			return;
		}
		ctx.drawImage(this.sprites[s], 0, 0);
	},
	update : function(dt){
		if(this.maxFrame!=null){
			
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
	}
});

//data: {imageName: "block_3", <frame: 3, speed: 20, init: 0, spriteName: "block_3_mid">}

var SpriteManager = Class.extend({
	init : function(imagemng) {
		this.imagemng = imagemng;
		
		this.spritedata = {};
	},
	registerSprite : function(data) {
		this.spritedata[ data.spriteName || data.imageName] = data;
	},
	getSprite : function(name){
		if(!this.spritedata[name]){
			console.warn('SpriteManager : Sprite "'+name+'" not found.');
			return this.getSprite("error");
		}
		
		return new Sprite(imagemng.getImage(name),
			this.spritedata["frame"],
			this.spritedata["speed"],
			this.spritedata["init"]);
	}
});