var KeyState = {RELEASED:0,PRESSED:1,JUST_RELEASED:2,JUST_PRESSED:3};
var Key = {
LEFT : 37,
UP : 38,
RIGHT : 39,
DOWN : 40,
A : 65,
B : 66,
C : 67,
D : 68,
E : 69,
F : 70,
G : 71,
H : 72,
I : 73,
J : 74,
K : 75,
L : 76,
M : 77,
N : 78,
O : 79,
P : 80,
Q : 81,
R : 82,
S : 83,
T : 84,
U : 85,
V : 86,
W : 87,
X : 88,
Y : 89,
Z : 90,
ESC : 27,
SPACE : 32
//TODO add other keys

};

var Keyboard = Class.extend({
	init : function(){
		this.listeners = [];
		this.down = [];
		var self = this;
		document.addEventListener("keydown",function(e){self._onKeyDown(e)});
		document.addEventListener("keyup",function(e){self._onKeyUp(e)});
	},
	addListener : function(listener){
		this.listeners.push(listener);
	},
	//removeListener can't be called inside a handle for key events
	removeListener : function(listener){
		if(typeof listener !== 'number')
		listener = this.listeners.indexOf(listener);
		this.listeners.splice(listener,1);
	},

	update : function(){
		
	},

	isKeyDown : function(key){
		return this.down[key] === true;
	},
	isKeyUp : function(key){
		return !this.isKeyDown(key);
	},
	_onKeyDown :function(e){
		if(!this.down[e.keyCode]){
			this.down[e.keyCode] = true;
			for(var i=0; i<this.listeners.length; i++){
				if(typeof this.listeners[i].onKeyDown === 'function')
				this.listeners[i].onKeyDown(e);	
			}
		}
		//to avoid scrolling etc.
		if(e.ctrlKey !== true)//allow user to reload/quit...
			e.preventDefault();
	},
	_onKeyUp : function(e){
		this.down[e.keyCode] = false;
		for(var i=0; i<this.listeners.length; i++){
			if(typeof this.listeners[i].onKeyUp === 'function')
			this.listeners[i].onKeyUp(e);	
		}
	}
});


function absToRelEvt(e)
{
	var relPos= absToRel({x:e.clientX,y:e.clientY},e.target);
	e.x=relPos.x; e.y=relPos.y;
	return e;
}
//return a position converted from window to element coordinates.
function absToRel(pos,elem)
{
	var rect = elem.getBoundingClientRect();
	var root = document.documentElement;
	var out = {x:pos.x-rect.left-root.scrollLeft,y:pos.y-rect.top-root.scrollTop};
	return out;
}

var Mouse = Class.extend({
	init : function(element,capture,listener){
		//members
		this.target = element || document.body;
		this.useCapture = capture;
		this.listeners = [];
		if(listener)
			this.listeners.push(listener);
		//handling events
		var self = this;
		this.target.addEventListener("click",function(e){self._onClick.call(self,e);});
		this.target.addEventListener("mousedown",function(e){self._onMouseDown.call(self,e);});
		this.target.addEventListener("mouseup",function(e){self._onMouseUp.call(self,e);});
		this.target.addEventListener("mousemove",function(e){self._onMouseMove.call(self,e);});
		this.target.addEventListener("mouseover",function(e){self._onMouseOver.call(self,e);});
		this.target.addEventListener("mouseOut",function(e){self._onMouseOut.call(self,e);});
	},
	addListener : function(listener){
		this.listeners.push(listener);
	},
	//removeListener can't be called inside a handle for mouse events
	removeListener : function(listener){
		if(typeof listener !== 'number')
		listener = this.listeners.indexOf(listener);
		this.listeners.splice(listener);
	},
	_onClick : function(e){
		absToRelEvt(e);
		for(var i=0; i<this.listeners.length; i++){
			if(typeof this.listeners[i].onClick === 'function')
			this.listeners[i].onClick(e);	
		}
	},
	_onMouseDown : function(e){
		absToRelEvt(e);
		for(var i=0; i<this.listeners.length; i++){
			if(typeof this.listeners[i].onMouseDown === 'function')
			this.listeners[i].onMouseDown(e);	
		}
	},
	_onMouseUp : function(e){
		absToRelEvt(e);
		for(var i=0; i<this.listeners.length; i++){
			if(typeof this.listeners[i].onMouseUp === 'function')
			this.listeners[i].onMouseUp(e);	
		}
	},
	_onMouseMove : function(e){
		absToRelEvt(e);
		for(var i=0; i<this.listeners.length; i++){
			if(typeof this.listeners[i].onMouseMove === 'function')
			this.listeners[i].onMouseMove(e);	
		}
	},
	_onMouseOver : function(e){
		absToRelEvt(e);
		for(var i=0; i<this.listeners.length; i++){
			if(typeof this.listeners[i].onMouseOver === 'function')
			this.listeners[i].onMouseOver(e);	
		}
	},
	_onMouseOut : function(e){
		absToRelEvt(e);
		for(var i=0; i<this.listeners.length; i++){
			if(typeof this.listeners[i].onMouseOut === 'function')
			this.listeners[i].onMouseOut(e);	
		}
	}

});

