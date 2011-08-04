// Layout demos by Krawaller, http://blog.krawaller.se

function mixin(prio,def){
	var o = {};
	for(var p in def){
		o[p] = def[p];
	}
	for(p in prio){
		o[p] = prio[p];
	}
	return o;
}

var demos = {
	basicposition: {
		title: "Absolute positioning",
		demos: [{
			description: "Absolute positioning is the default layout mechanism used. A child view without any related properties set will fill out its parent view (the child is yellow, completely hiding the red parent).",
			definition: {}
		},{
			description: "Use height and width to define the size of the child. Default values are 'auto', which will fill out the parent, as we saw before.",
			definition: {height: 80, width: 80}
		},{
			description: "Use top/left/right/bottom to offset the child in relation to the parent's sides. Default is 'auto' for all, which centers the view, as we saw before.",
			definition: {top: 30, right: 30}
		},{
			description: "Setting top and a height gets the same result as...",
			definition: {top: 30, height: 80}
		},{
			description: "...setting top and bottom (if you know the parent's height and do the math right).",
			definition: {top: 30, bottom: 125}
		},{
			description: "If you set top, bottom AND height (don't!), then weird things happen. The height is honored, but the offset gets screwed up.",
			definition: {top: 5, height: 80, bottom: 60}
		},{
			description: "The same of course applies to using left, right AND width.",
			definition: {left: 5, right: 50, width: 100}
		},{
			description: "A normal view has NO clipping functionality for unruly children! If you want to hide overflow, you must use a ScrollView.",
			definition: [{left: 50, top: -10, width: 100, height: 100},{right:-10,width:100,height:100}]
		},{
			description: "Children will stack with the latest additions on top of former.",
			definition: [{added:"first",width: 100, height: 100,top:50,left:50},{added:"second",width: 100, height: 100,top:130,left:100}]
		},{
			description: "If you want to control the stacking yourself, use the zIndex property. Highest goes on top.",
			definition: [{added:"first",zIndex: 1, width: 100, height: 100,top:50,left:50},{added:"second",width: 100, height: 100,top:130,left:100}]
		},{
			description: "All controls (well, almost) inherit from view, and can thus have children! Here we're using a Switch as a parent.",
			definition: {height: 80, width: 80, top: 15},
			Parent: function(){
				return Ti.UI.createSwitch({ value: false });
			}
		},{
			description: "Even views with 'special' children of their own, such as tableviews, can have normal child views. Thus they must have special syntax to add the special children (addTab,addRow..).",
			definition: {height: 80, width: 80, top: 15},
			Parent: function(){
				return Ti.UI.createTableView({data:[{title:"row1"},{title:"row2"},{title:"row3"}]});
			}
		}]
	},
	verticalayout: {
		title: "Vertical layout",
		Parent: function(){
			return Ti.UI.createView({backgroundColor:"red",layout:"vertical"});
		},
		demos: [{
			description: "A parent with the layout property set to 'vertical' uses a vertical layout mechanism instead. Here, a child is placed in relation to the bottom of the previous child.",
			definition: [{height:80,width:100,left:30},{top:5,left:20,height:80,width:60}]
		},{
			description: "Everything works as normal, even negative offsets and zIndexes. Except...",
			definition: [{height:80,width:100,left:30,zIndex:1},{top:-5,left:20,height:80,width:60}]
		},{
			description: "...the top and bottom properties are both used as margins. So the height difference between two siblings is the sum of the bottom of the first and the top of the second.",
			definition: [{height:80,width:100,left:10,bottom:10},{top:10,left:20,height:80,width:60}]
		},{
			description: "The top property of the first child offsets it in relation to the parent. The bottom property of the last child is simply ignored.",
			definition: [{top:5,height:80,width:100,left:30},{top:10,left:20,height:80,width:100,bottom:500}]
		},{
			description: "Like in an absolute layout, if you set a width but not left or right, the view will be horizontally centered. This does not apply vertically, however, where a non-set top prop always will count as zero.",
			definition: [{height:80,width:100}]
		},{
			description: "Because top and bottom are now used as margins, it is perfectly ok to set top, bottom AND height at the same time on a view. Unlike in absolute layouts, where this would break things.",
			definition: [{top:5,height:80,width:100,bottom:30}]
		},{
			description: "Setting left, right and width, however, still makes no sense, and will get weird results.",
			definition: [{left:50,height:80,width:100,right:0}]
		},{
			description:"Vertical layout is great if you just want to fill a view with children vertically, not caring about positioning.",
			definition: [{height:80},{height:50},{height:40}]
		},{
			description: "Commonly you will want to set a small top offset to subsequent children, just to get some spacing, and then let the vertical layouting handle the rest.",
			definition: [{height:80},{height:50,top:5},{height:40,top:5}]
		},{
			description: "Of course, the same thing can be achieved using the bottom property instead.",
			definition: [{height:80,bottom:5},{height:50,bottom:5},{height:40}]
		},{
			description: "You must always set a height on a child view in a vertical layout. If you don't, it will not automagically fill out the parent as in absolute layouts, but simply be invisible. This parent contains a child with a width of 200, but no height set.",
			definition: {width:200}
		}]
	},
	horizontallayout: {
		title: "Horizontal layout",
		Parent: function(){ return Ti.UI.createView({backgroundColor:"red",layout:"horizontal"}); },
		demos: [{
			description: "As you might have guessed, in a horizontal layout, the left and right properties instead are used as margins. Thus the space between two siblings in a horizontal layout is the sum of the right prop of the first and the left prop of the second.",
			definition: [{top:10,height:80,width:100,right:10},{top:20,left:20,height:120,width:60}]
		},{
			description: "Horizontal layout has a useful clipping mechanism, where a child who wouldn't fit to the right of the previous child instead gets placed below the tallest child, thus beginning a new 'row'.",
			definition: [{top:10,height:80,width:100},{top:5,left:20,height:120,width:60},{height:80,width:160}]			
		},{
			description: "No matter which child on the previous row is the tallest, the first on the next row will be offset vertically in relation to that child.",
			definition: [{top:10,height:120,width:100},{top:5,left:20,height:80,width:60},{height:80,width:160}]
		},{
			description: "The bottom property is included when calculating the tallest sibling on the previous row. Thus, here, it is the second child in the first row that determines the position of the next row.",
			definition: [{top:10,height:120,width:100},{top:10,left:20,height:100,width:100,bottom:40},{height:80,width:160}]
		},{
			description: "The left property of the first child (or any child that is first in a row) offsets in relation to the parent. The right property of the last child is ignored...",
			definition: [{top:10,height:80,width:70,left:5,right:5},{height:80,width:70},{left:5,height:120,width:60,right:20}]
		},{
			description: "...except that it might make the view end up on its own row!",
			definition: [{top:10,height:80,width:70,left:5,right:5},{height:80,width:70},{left:5,height:120,width:60,right:2000}]
		},{
			description: "Must as a child in a vertical layout must have a height, all children in a horizontal layout must have a set width. This parent contains a child with height 200 but no width, which therefore is invisible.",
			definition: {height:200}
		}]
	},
	scrollview: {
		title: "ScrollView container",
		Parent: function(o){
			var scroll = Ti.UI.createScrollView(mixin({backgroundColor:"red"},o)),
				label = Ti.UI.createLabel({text:"",top:0,height:40,width:"auto",color:"#FFF",font:{fontSize:12,fontWeight:"bold"}});
			for(var p in o){
				label.text += p+": "+o[p]+"\n";
			}
			scroll.add(label);
			return scroll;
		},
		demos: [{
			description: "Here the red parents are ScrollViews. Contrary to normal views, they will crop overflowing content, as seen here. Many times this is why you will want to use them, so they might as well have been called CropViews!",
			definition: {top:-10,left:20,height:90,width:90}
		},{
			description: "Scrolling is only available if explicitly enabled. If contentHeight is set to auto, the user can scroll the view vertically to reveal the outofbounds content.",
			parent: {contentHeight:"auto"},
			definition: {top:50,left:20,height:300,width:90}
		},{
			description: "Scroll indicators also have to be explicitly enabled.",
			parent: {contentHeight:"auto",showVerticalScrollIndicator:true},
			definition: {top:50,left:20,height:300,width:90}
		},{
			description: "Enabling scrolling if no children are outside the parents boundaries will have no effect.",
			parent: {contentHeight:"auto"},
			definition: {top:30,left:30,height:90,width:90}
		},{
			description: "Horizontal scrolling is enabled through contentWidth. Note how the red scrollview now 'steals' the horizontal scroll event, and how you have to scroll outside of it to navigate the outer ScrollableView containing the different demos.",
			parent: {contentWidth:"auto"},
			definition: {top:50,left:20,height:90,width:300}
		},{
			description: "Scrolling can be allowed in both directions at the same time. Note how the scrollview adapts its dimensions to exactly fit the content, making the child end up in the bottom-right corner.",
			parent: {contentHeight:"auto",contentWidth:"auto"},
			definition: {top:100,left:100,height:200,width:200}
		},{
			description: "A child's bottom and right properties are used as margins in a ScrollView. Scroll to the bottom-right to see how the child now has a gutter between itself and the corner!",
			parent: {contentHeight:"auto",contentWidth:"auto"},
			definition: {top:100,left:100,height:200,width:200,bottom:10,right:30}
		},{
			description: "So what happens if we put a tableview in a vertically scrolling Scrollview? Here the table doesn't have a height, so it will simply adapt to the parent and steal the scroll event. Thus we might as well have had a normal View parent.",
			parent: {contentHeight:"auto"},
			Child: function(){
				return Ti.UI.createTableView({top:150,data:[{title:"foo1"},{title:"foo2"},{title:"foo3"},{title:"foo4"},{title:"foo5"}]});
			}
		},{
			description: "Here the table has a set height, triggering the parent to do the scrolling. Using the table's scrollToIndex function now would result in very weird behaviour. To wit: don't put tables in ScrollViews, there's absolutely no point!",
			parent: {contentHeight:"auto"},
			Child: function(){
				return Ti.UI.createTableView({top:150,height:400,data:[{title:"foo1"},{title:"foo2"},{title:"foo3"},{title:"foo4"},{title:"foo5"}]});
			}
		}]
	}
	
};

function GrandParent(){ return Ti.UI.createView({bottom:80,top:20,left:20,right:20,borderSize:3,borderColor:"#CCC"}); }

function Parent(o){ return Ti.UI.createView(mixin({backgroundColor:"red"},o)); }

function Child(def){
	var child = Ti.UI.createView(mixin({backgroundColor:"yellow",borderColor:"#000",borderSize:1},def)),
		label = Ti.UI.createLabel({top:5,left:5,text:"", font: {fontSize:12}});
	child.add(label);
	for(var p in def){
		label.text += p+": "+def[p]+"\n";
	}
	return child;
};

function DemoView(o){
	var view = Ti.UI.createView(),
		gp = GrandParent(),
		parent = o.parent;
	o.children.forEach(function(child){
		parent.add(child);
	});
	gp.add(parent);
	view.add(gp);
	view.add(Ti.UI.createLabel({ bottom: 0, left:5, right: 5, height: 80, text: o.description, font: {fontSize:12} }));
	return view;
}

function CategoryWin(cat){
	var views = [];
	cat.demos.forEach(function(demo){
		var d = DemoView({
			description:demo.description,
			parent: (demo.Parent || cat.Parent || Parent)(demo.parent || (cat.parent) || ({})),
			children: (Array.isArray(demo.definition) ? demo.definition : [demo.definition]).map(function(cdef){return (demo.Child || cat.Child || (Child))(cdef);})
		});
		views.push(d);
	});
	var win = Ti.UI.createWindow({backgroundColor:"#FFF",title:cat.title});
	win.add(Ti.UI.createScrollableView({views:views,showPagingControl:true,pagingControlHeight:30}));
	return win;
}

function CategorySelectionWin(demos){
	var win = Ti.UI.createWindow({title:"Categories"}),
		data = [];
	for(var cat in demos){
		var row = Ti.UI.createTableViewRow({category:cat,title:demos[cat].title+" ("+demos[cat].demos.length+")"});
		row.addEventListener("click",function(e){ maintabgroup.activeTab.open(CategoryWin(demos[e.row.category])); });
		data.push(row);
	}
	win.add(Ti.UI.createTableView({data:data}));
	return win;
}

function AboutWin(){
	var win = Ti.UI.createWindow({title:"About",backgroundColor:"#FFF"});
	win.add(Ti.UI.createLabel({
		top:20,textAlign:"top",left:5,right:5,
		text:
"This app contains a number of demonstrations aimed to further the understanding of how views are positioned in a titanium app.\nThe code is available at http://github.com/krawaller/tiview \nFor further explanation, please see the corresponding blog post on http://blog.krawaller.se"
	}));
	return win;
}

function MainTabGroup(){
	return Ti.UI.createTabGroup({
		tabs: [Ti.UI.createTab({title:"demos",window:CategorySelectionWin(demos)}),Ti.UI.createTab({title:"about",window:AboutWin()})]
	});
}

var maintabgroup = MainTabGroup();
maintabgroup.open();

