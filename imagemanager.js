var ImageManager = Class.extend({
	init : function(callback){
		this.imagedata = {};
		this.callback = callback;
		this.listeners = [];
		
		this.stillLoading = 0;
		
		var errorImg = new Image();
		errorImg.onerror = function(){console.error("ImageManager : Error image couldn't be loaded");}
		errorImg.src = "error.png"
		this.imagedata["error"] = errorImg; 
	},
	load : function(src,name){
		var self = this;
		var name = name || src;//todo remove .ext from src
		
		this.stillLoading++;
		
		var img = new Image();
		img.onerror = function(){
			console.warn('ImageManager : Image "'+src+'" could not be loaded.');
			self.onLoad(name,false,self.getImage("error"));
		}; 
		img.onload = function(){self.onLoad(name,true,img)};
		img.src = src;
	},
	getImage : function(name){
		if(!this.imagedata[name]){
			console.warn('ImageManager : Image "'+name+'" not found.');
			return this.imagedata["error"];
		}
		return this.imagedata[name];
	},
	onLoad : function(name, success, imgRef){
		this.stillLoading--;
		this.listeners.forEach(
				function(listener){
					if(typeof listener.onImageLoad === 'function' )
						listener.onImageLoad(name,success,imgRef);
				});

		//add the image to the list
		this.imagedata[name] = imgRef; 

		if(!this.isLoading()){
			this.callback();
		}
	},
	isLoading : function(){
		return !!this.stillLoading;
	},
	addListener : function(listener){
		this.listeners.push(listener);
	},
	//removeListener can't be called inside a handler for ImageManager
	removeListener : function(listener){
		if(typeof listener !== 'number')
		listener = this.listeners.indexOf(listener);
		this.listeners.splice(listener);
	}
});
