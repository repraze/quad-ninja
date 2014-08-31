var Game = Class.extend({
	init : function(state,canvas){
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.currentState = state;
		this.mouse = new Mouse(this.canvas);
		this.keyboard = new Keyboard();
		this.aspectRatio = this.canvas.width/this.canvas.height;
		var self = this;
		requestAnimationFrame(function(date){self.update(date)});
		this.currentState._enter();
		
		//Debugging
		this.fpsOffset = 0;
		this.fpsArray = [];
		for(var i = 0; i<10; i++){this.fpsArray.push(60.0);}
	},
	update : function(date){
		var self = this;
		if(!this.lastFrameDate){
			this.lastFrameDate = date;
		}
		else{
			if(this.currentState === undefined){
				console.error("Game has no state... shouldn't happen :(");
				return;
			}
			var deltaT = Math.min(0.05,(date-this.lastFrameDate)/1000);//minimize acceleration upon focus, test, possibility to put calculated number instead of constant
			this.fpsArray[this.fpsOffset] = 1.0/deltaT;
			this.fpsOffset=(++this.fpsOffset)%10;

			this.currentState._update(deltaT); 
			this.currentState.render(this.context);
			this.lastFrameDate = date;
		}
		requestAnimationFrame(function(date){self.update(date)});
	},
	changeState : function(state, transition){
		if(this.currentState !== undefined){
			this.currentState._leave();
		}
		this.currentState = state;
		this.currentState._enter();
	},
	resize : function(){
	},
	getFPS : function(){
		var fps = 0;
		this.fpsArray.forEach(function(fpsI){fps+=fpsI});
		return fps/10.0;

	}
	
});

var GameState = Class.extend({
	/**
	 * Constructor
	 * @param game Game instance owning this GameState
	 */
	init : function(game,useKeyboard,useMouse){
		this.clock = 0;
		if(game === undefined)
			console.error("GameState's game must be defined");
		this.game = game;
	},
	/**
	 * Update this state
	 * @virtual
	 */
	update : function(t){},
	/**
	 * Called when the state is entered using Game's "changeState" method
	 * @virtual
	 */
	enter : function(){},
	/**
	 * Called when the state is left using Game's "changeState" method
	 * @virtual
	 */
	leave : function(){},
	/**
	 * display anithing on the given context
	 */
	render : function(context){},
	/*private*/
	/*
	* Called before enter
	*/
	_enter : function(){
		this.game.mouse.addListener(this);
		this.game.keyboard.addListener(this);
		this.enter();
	},
	/*
	* Called before leave
	*/
	_leave : function(){
		this.game.mouse.removeListener(this);
		this.game.keyboard.removeListener(this);
		this.leave();
	},
	_update : function(t){
		this.clock+=t;
		this.update(t);
	}
});
