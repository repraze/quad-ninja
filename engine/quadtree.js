function aabbIntersect(aabb1,aabb2){
		return !( (aabb1.x+aabb1.width <= aabb2.x) || (aabb1.x >= aabb2.x+aabb2.width)
			    ||(aabb1.y+aabb1.height <= aabb2.y) || (aabb1.y >= aabb2.y+aabb2.height))

}

var Quadtree = Class.extend({

	init : function(depth,bounds,capacity,parent){
		this.parent = parent || null;
		this.depth = depth ;
		this.bounds = bounds;
		this.capacity= capacity;
		this.leaf = true;
		this.objects = [];
		this.trees = [];
	},

	intersects : function(bounds){
		return !( (this.bounds.xmax <= bounds.x) || (this.bounds.xmin >= bounds.x+bounds.width)
			    ||(this.bounds.ymax <= bounds.y) || (this.bounds.ymin >= bounds.y+bounds.height))
	},
	containsRegion : function(bounds){
		var a = (bounds.x >= this.bounds.xmin) && (bounds.x+bounds.width <= this.bounds.xmax )&& 
		      (bounds.y >= this.bounds.ymin) && (bounds.y+bounds.height <= this.bounds.ymax);
		return a;
	},
	containsPoint : function(point){
		return point.x<=this.bounds.xmax && point.x >= this.bounds.xmin && point.y <= this.bounds.ymax && point.y >= this.bounds.ymin;
	},

	//exposed method to insert an object
	insertObject : function(obj){
		if(!this.containsRegion(obj.getBounds())){
			if(this.parent===null)
				this._insertObject(obj);
			return false;
		}
		else
			return this._insertObject(obj);
	},

	_insertObject : function(obj){
		var inserted = false;
		//If this node is a leaf
		if(this.leaf){
			//if it is not full
			if(this.objects.length < this.capacity || this.depth == 0){
				this.objects.push(obj);
				obj.qtNode = this;
				inserted = true;
			}
			else{

				//subdivide this tree
				this.createSubTree();
				//insert newly added object
				inserted = this._insertObject(obj);
			}
		}
		//If this node is not a leaf, find the nodes containing the object
		else{
			for(var i = 0 ; i<4; i++){
				if(this.trees[i].insertObject(obj)){
					inserted = true;
					break;
				}

			}
			if(inserted=== false)
			{
				this.objects.push(obj);
				obj.qtNode=this;
				inserted=true;
			}
		}
		return inserted;
	},
	tryMerge : function(){
		for(var i = 0; i< 4; i++){
			if(!this.trees[i].leaf || this.trees[i].objects.length>0)
				return false;// Merging is not possible
		}
		//do Merge :
		this.trees = [];
		this.leaf = true;
		return true;
	},
	createSubTree : function(){
		this.leaf = false;
		this.trees = [];
		var b = this.bounds;
		var half = {w:(b.xmax-b.xmin)/2.0,h:(b.ymax-b.ymin)/2.0}
		//create sub quadtrees
		for(var row = 0 ; row<2 ; row++){
			for(var col = 0 ; col<2 ; col++){
				var B = {xmin: b.xmin+col*half.w, xmax:b.xmin+(col+1)*half.w,
					ymin : b.ymin+row*half.h, ymax: b.ymin+(row+1)*half.h};
				this.trees.push(new Quadtree(this.depth-1,B,this.capacity,this));
			}
		}
		// We populate subtrees with current node's objects
		for(var i = this.objects.length - 1 ; i >=0 ; --i){
			for(var tId = 0 ; tId<4; tId++){
				if(this.trees[tId].insertObject(this.objects[i])){

					this.objects.splice(i,1);
					break;
				}
			}
		}
	},
	//Access
	getObjectsNearPoint : function(pt,objs){
		objs = typeof objs !== 'undefined' ? objs : [];
		if(this.containsPoint(pt)){
			for(var objId = 0 ; objId < this.objects.length; objId++)
				objs.push(this.objects[objId]);
			if(!this.leaf){
				for(var treeId = 0; treeId <4 ; treeId++){
					this.trees[treeId].getObjectsNearPoint(pt,objs);
				}
			}
		}
		return objs;
	},
	getObjectsNearRegion : function(bounds){
		if(this.intersects(bounds)){
			if(!this.leaf){
				var arrsObj = [];
				for(var treeId = 0; treeId <4 ; treeId++){
					arrsObj.push( this.trees[treeId].getObjectsNearRegion(bounds));
				}
			return this.objects.concat.apply(this.objects,arrsObj);
			}
			return this.objects;
		}
		return [];
	},
	getObjectsIntersectingRegion : function(bounds){
		var objs  = this.getObjectsNearRegion(bounds);
		for(var i = objs.length-1 ; i>=0; i--){
			if(!aabbIntersect(objs[i].getBounds(),bounds))
				objs.splice(i,1);
		}
		return objs;
	},
	draw : function(context){
		if(this.parent===null);
			context.beginPath();
		if(this.leaf){
			var b = this.bounds;
			context.rect(b.xmin,b.ymin, b.xmax-b.xmin, b.ymax-b.ymin);
		}
		else{
			for(var i = 0; i<4 ; i++)
			{
				this.trees[i].draw(context);
			}
		}

		for(var i =0; i< this.objects.length; i++){
			var o = this.objects[i];
			context.fillStyle = "#aad";
			context.rect(o.getBounds().x,o.getBounds().y,o.getBounds().width, o.getBounds().height);
		context.stroke();
		}
		if(this.parent===null);
		context.stroke();

    },
	removeObject : function(obj){
		var objIdx = obj.qtNode.objects.indexOf(obj);
		if(objIdx!==-1){
			obj.qtNode.objects.splice(objIdx,1);
			if(obj.qtNode.leaf && obj.qtNode.parent!==null)
				obj.qtNode.parent.tryMerge();
			return true;
		}
		else
			return false;
	},
	moveObject : function(obj){
		var baseNode = obj.qtNode;
		if(baseNode.containsRegion(obj.getBounds())){
			if(baseNode.leaf)//nothing to do
				return true;
			else{ //look if the object is contained in a child
				var subNode = null;
				for(var i=0; i<4; i++){
					if(baseNode.trees[i].containsRegion(obj.getBounds())){
						subNode = baseNode.trees[i];
						break;
					}
				}
				if(subNode !== null){
					obj.qtNode.removeObject(obj);
					subNode._insertObject(obj);

				}
			}

		}
		else if(this.containsRegion(obj.getBounds()))
		{
			baseNode.removeObject(obj);
			//this.insertObject(obj);
			var inserted = false;
			for(node = baseNode; !inserted && node!==null; node = node.parent){
				inserted=node.insertObject(obj);
			}
		}

	}
});
