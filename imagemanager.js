var ImageManager = Class.extend({
	init : function(callback){
		this.imagedata = {};
		this.callback = callback;
		
		this.stillLoading = 0;
		
		this.load("error.png","error");
	},
	load : function(src,name){
		var self = this;
		
		this.stillLoading++;
		
		var img = new Image();
		img.src = src;
		img.onload = function(){self.onLoad(img)};
		img.onerror = function(){
			console.warn('ImageManager : Image "'+name+'" could not be loaded.');
			self.imagedata[name || src] = self.getImage("error");
			self.onLoad();
		}; 
		this.imagedata[name || src] = img; //todo remove .ext from src
	},
	getImage : function(name){
		if(!this.imagedata[name]){
			console.warn('ImageManager : Image "'+name+'" not found.');
			return this.imagedata["error"];
		}
		return this.imagedata[name];
	},
	onLoad : function(){
		this.stillLoading--;
		if(!this.isLoading()){
			this.callback();
		}
	},
	isLoading : function(){
		return !!this.stillLoading;
	}
});
