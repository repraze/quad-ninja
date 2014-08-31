TrashState = GameState.extend({
	init : function(game){
		this._super(game);
	},
	update : function(t){
	}
});

var QuadNinja = Game.extend({
	init : function(){
		this.canvas = document.getElementById("gameCanvas");
		this._super(new TrashState(this),this.canvas);
	}
});

window.onload = function(){
new QuadNinja();
}
