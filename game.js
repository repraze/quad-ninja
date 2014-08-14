var Game = Class.extend({
	init : function(state,canvas){
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.currentState = state;
		this.mouse = new Mouse(this.canvas);
		this.keyboard = new Keyboard();

		var self = this;
		requestAnimationFrame(function(date){self.update(date)});
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
			//console.log(date+" - "+this.lastFrameDate);
			this.currentState._update((date-this.lastFrameDate)/1000);
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
