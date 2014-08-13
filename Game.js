var Game = Class.extend({
	init : function(state,framerate){
		var self = this;
		this.lastFrame = +new Date;
		requestAnimationFrame(function(now){self.update(now);});
		
	},
	update : function(now){
		var self = this;
		requestAnimationFrame(function(now){self.update(now);});
		now = now ? now : +new Date();

		var timeSinceLastFrame = now - this.lastFrame;
		this.lastFrame = now;

		if(this.currentState === undefined){
			console.error("Game has no state... shouldn't happen :(");
			return;
		}
			this.currentState.update(timeSinceLastFrame/1000);
			this.currentState.render(this.context);
	},
	changeState : function(state, transition){
		if(this.currentState !== undefined){
			this.currentState._leave();
		}
		this.currentState = state;
		this.currentState._enter();
	},
	
});

var GameState = Class.extend({
	/**
	 * Constructor
	 * @param game Game instance owning this GameState
	 */
	init : function(game,useKeyboard,useMouse){
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
	}
});
