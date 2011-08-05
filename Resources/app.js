// Layout demos by Krawaller, http://blog.krawaller.se

/*
This object literal contains the definitions of the various categories and demos!

Each category object has these properties:
 - title: set as title for the containing window
 - demos: array of demo definitions (see below)
 - Parent: constructor function to use as demo parent, instead of default Parent constructor. Overridden by demo-specific constructor.
 - Child: constructor function to use for demo children, instead of default Child constructor. Overridden by demo-specific constructor.

Each demo object has these properties:
 - description: text used to explain the demo. Will be used if no platform-specific text is supplied.
 - iphone: text to be used on iphone only.
 - android: text to be used on android only.
 - children: object or array of objects sent to Child constructor, the result of which is added to the parent
 - parent: object sent to the Parent constructor. optional.
 - Parent: constructor function to use as demo parent, instead of category-specific or default Parent constructor.
 - Child: constructor function to use for demo children, instead of category-specific or default Child constructor.

To ensure that the demos have the same dimension on all platforms, the parent in a demo is contained in a grandparent with
dimensions 280*240

*/
var demos = {
	basicposition: {
		title: "Absolute positioning",
		demos: [{
			description: "Absolute positioning is the default layout mechanism used. A child view without any related properties set will fill out its parent view (the child is yellow, completely hiding the red parent).",
			children: {}
		},{
			description: "Use height and width to define the size of the child. Default values are 'auto', which will fill out the parent, as we saw before.",
			children: {height: 80, width: 80}
		},{
			description: "Use top/left/right/bottom to offset the child in relation to the parent's sides. Default is 'auto' for all, which centers the view, as we saw before.",
			children: {top: 30, right: 30}
		},{
			description: "Setting top and a height gets the same result as...",
			children: {top: 30, height: 80}
		},{
			description: "...setting top and bottom (if you know the parent's height and do the math right).",
			children: {top: 30, bottom: 130}
		},{
			description: "If you set top, bottom AND height (don't!), then weird things happen. On iPhone the height is honored, but the offset gets screwed up. On Android its the other way around.",
			children: {top: 5, height: 80, bottom: 60}
		},{
			description: "The same of course applies to using left, right AND width.",
			children: {left: 5, right: 50, width: 100}
		},{
			iphone: "A normal view has NO clipping functionality for unruly children on iPhone! If you want to hide overflow, you must use a ScrollView.",
			android: "On Android, a view will crop out overflowing children. On iPhone, however, no cropping is done, and the overflowing bits are visible!",
			children: [{left: 50, top: -10, width: 100, height: 100},{right:-10,width:100,height:100}]
		},{
			description: "Children will stack with the latest additions on top of former.",
			children: [{added:"first",width: 100, height: 100,top:50,left:50},{added:"second",width: 100, height: 100,top:130,left:100}]
		},{
			description: "If you want to control the stacking yourself, use the zIndex property. Highest goes on top.",
			children: [{added:"first",zIndex: 1, width: 100, height: 100,top:50,left:50},{added:"second",width: 100, height: 100,top:130,left:100}]
		},{
			iphone: "All controls (well, almost) inherit from view, and can thus have children! Here we're using a Switch as a parent. This doesn't work on Android.",
			android: "This switch has a child, but on Android this isn't rendered. On iPhone, (almost) any control can have child views.",
			children: {height: 80, width: 80, top: 15, left: 30},
			Parent: function(){
				return Ti.UI.createSwitch({ value: false });
			}
		},{
			description: "Even views with 'special' children of their own, such as tableviews, can have normal child views (although their behaviour is buggy on Android). Thus they must have special syntax to add the special children (addTab,addRow..).",
			children: {height: 80, width: 80, top: 15},
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
			children: [{height:80,width:100,left:30},{top:5,left:20,height:80,width:60}]
		},{
			iphone: "Everything works as normal, even negative offsets (not on Android though!) and zIndexes. Except...",
			android: "Negative top offsets have weird behaviour in a vertical layout on Android. Here, the second child ends up before the first!",
			children: [{height:80,width:100,left:30,zIndex:1},{top:-5,left:20,height:80,width:60}]
		},{
			iphone: "...the top and bottom properties are both used as margins (on Android only top!). So the height difference between two siblings is the sum of the bottom of the first and the top of the second.",
			android: "The height difference between two siblings is controlled by the top property of the second sibling. On iPhone, the bottom prop of the first is added to the difference as well.",
			children: [{height:80,width:100,left:10,bottom:10},{top:10,left:20,height:80,width:60}]
		},{
			description: "The top property of the first child offsets it in relation to the parent. The bottom property of the last child is simply ignored.",
			children: [{top:5,height:80,width:100,left:30},{top:10,left:20,height:80,width:100,bottom:500}]
		},{
			description: "Like in an absolute layout, if you set a width but not left or right, the view will be horizontally centered. This does not apply vertically, however, where a non-set top prop always will count as zero.",
			children: [{height:80,width:100}]
		},{
			description: "Because top and bottom are now used as margins, it is perfectly ok to set top, bottom AND height at the same time on a view. Unlike in absolute layouts, where this would break things.",
			children: [{top:5,height:80,width:100,bottom:30}]
		},{
			description: "Setting left, right and width, however, still makes no sense, and will get weird results.",
			children: [{left:50,height:80,width:100,right:0}]
		},{
			description:"Vertical layout is great if you just want to fill a view with children vertically, not caring about positioning.",
			children: [{height:80},{height:50},{height:40}]
		},{
			description: "Commonly you will want to set a small top offset to subsequent children, just to get some spacing, and then let the vertical layouting handle the rest.",
			children: [{height:80},{height:50,top:5},{height:40,top:5}]
		},{
			iphone: "Of course, the same thing can be achieved using the bottom property instead (although not on Android!).",
			android: "On iPhone, this demo would look exactly the same as the previous one, but Android doesn't use the bottom property in the sibling distance calculation.",
			children: [{height:80,bottom:5},{height:50,bottom:5},{height:40}]
		},{
			iphone: "You must always set a height on a child view in a vertical layout. If you don't, it will not automagically fill out the parent as in absolute layouts, but simply be invisible. This parent contains a child with a width of 200, but no height set.",
			android: "On iPhone, a child with no explicit height will not be rendered in a vertical layout. Here on Android, the child is given a sufficient height. Don't rely on this behaviour, though!",
			children: {width:200}
		}]
	},
	horizontallayout: {
		title: "Horizontal layout",
		Parent: function(){ return Ti.UI.createView({backgroundColor:"red",layout:"horizontal"}); },
		demos: [{
			description: "As you might have guessed, in a horizontal layout, the left and right properties instead are used as margins. Thus the space between two siblings in a horizontal layout is the sum of the right prop of the first and the left prop of the second.",
			children: [{top:10,height:80,width:100,right:10},{top:20,left:20,height:120,width:60}]
		},{
			iphone: "Horizontal layout has a useful clipping mechanism, where a child who wouldn't fit to the right of the previous child instead gets placed below the tallest child, thus beginning a new 'row'. This mechanism is unreliable on Android.",
			android: "If a child can't fit to the right of the previous sibling, it will be moved to a new 'row'. On iPhone this row begins directly beneath the tallest sibling in the previous row, but on Android there semms to be an uncontrollable gutter inbetween.",
			children: [{top:10,height:80,width:100},{top:5,left:20,height:120,width:60},{height:80,width:160}]			
		},{
			iphone: "No matter which child on the previous row is the tallest, the first on the next row will be offset vertically in relation to that child.",
			android: "No matter which child on the previous row is the tallest, the first on the next row will be offset vertically in relation to that child (plus the b0rky gutter).",
			children: [{top:10,height:120,width:100},{top:5,left:20,height:80,width:60},{height:80,width:160}]
		},{
			iphone: "The bottom property is included when calculating the tallest sibling on the previous row. Thus, here, it is the second child in the first row that determines the position of the next row.",
			android: "On iPhone, the bottom property is used as a margin towards the next row. On Android, however, this is used to offset from the parent bottom, and any height prop on the same child is ignored!",
			children: [{top:10,height:120,width:100},{top:10,left:20,height:100,width:100,bottom:40},{height:80,width:160}]
		},{
			iphone: "The left property of the first child (or any child that is first in a row) offsets in relation to the parent. The right property of the last child is ignored...",
			android: "On Android, a child without top (or bottom) is illogically centered vertically, screwing up all row concepts. Also, the right prop is ignored, not creating a gutter between siblings as on iPhone.",
			children: [{top:10,height:80,width:70,left:5,right:5},{height:80,width:70},{left:5,height:120,width:60,right:20}]
		},{
			iphone: "...except that it might make the view end up on its own row!",
			android: "On iPhone, the last sibling would be on its own row because of the huge right offset. Android just ignores this property.",
			children: [{top:10,height:80,width:70,left:5,right:5},{height:80,width:70},{left:5,height:120,width:60,right:2000}]
		},{
			iphone: "Much as a child in a vertical layout must have a height, all children in a horizontal layout must have a set width. This parent contains a child with height 200 but no width, which therefore is invisible.",
			android: "Much as in a vertical layout, a child without a width will be given a minimum width on Android. On iPhone it will be invisible.",
			children: {height:200}
		},{
			iphone: "The margins of widthless children will however still affect the layout! Here there is a first child with no width but left set to 10, which displaces the second child.",
			android: "A subsequent child will still be placed correctly next to the widthless child. But as this doesn't work on iPhone, don't rely on this.",
			children: [{height:80,left:10},{added:"second",width:100,height:80}]
		},{
			iphone: "The row clipping is updated whenever the dimensions of the parent changes. When the parent dimension animates, it seems that the children are immediately animated towards where they would end up after the parent animation. On Android they are moved after the animation.",
			android: "The row clipping is updated whenever the dimensions of the parent changes. When the parent dimension animates, the children are repositioned after the animation is finished. On iPhone, they are moved immediately.",
			children: [{top:10,height:80,width:70,left:5,right:5},{height:80,width:70},{left:5,height:120,width:60,right:20}],
			Parent: function(){
				var p = Ti.UI.createView({backgroundColor:"red",layout:"horizontal"}),
					b = Ti.UI.createButton({top:10,left:10,height:30,width:100,title:"Click me!"});
				b.addEventListener("click",function(){
					b.enabled = false;
					p.animate({right:100,left:0,duration:1000},function(){
						p.animate({right:0,left:0,duration:1000},function(){
							b.enabled = true;
						});
					});
				});
				p.add(b);
				return p;
			}
		},{
			description: "If a child is invisible (by setting the visible prop to false or opacity to 0), it will still take up room in the layout.",
			children: [{added:"first",top:10,left:10,height:80,width:80},{height:80,width:80,left:10,visible:false},{added:"third",top:10,left:10,height:80,width:80}]			
		},{
			description: "If it is visible upon adding to the parent, but made invisible later, the layout will still not change.",
			children: [{top:10,height:80,width:70,left:5,right:5},{height:80,width:70},{left:5,height:120,width:60,right:20}],
			Parent: function(){
				var p = Ti.UI.createView({backgroundColor:"red",layout:"horizontal"}),
					b = Ti.UI.createButton({top:10,left:10,height:30,width:100,title:"Click me!"});
				b.addEventListener("click",function(){
					b.visible = false;
					setTimeout(function(){ b.visible = true; },1000);
				});
				p.add(b);
				return p;
			}
		},{
			description: "If a child's dimension changes, the layout will be updated.",
			children: [{top:10,height:80,width:70,left:5,right:5},{height:80,width:70},{left:5,height:120,width:60,right:20}],
			Parent: function(){
				var p = Ti.UI.createView({backgroundColor:"red",layout:"horizontal"}),
					b = Ti.UI.createButton({top:10,left:10,height:30,width:100,title:"Click me!"});
				b.addEventListener("click",function(){
					b.width = {100:250,250:100}[b.width];
					b.height = {30:100,100:30}[b.height];
				});
				p.add(b);
				return p;
			}
		},{
			iphone: "If a child's dimensions are animated, the layout will immediately change to what it would be after the animation finishes (Xcode log will say 'Ignoring new layout while animating in layout child').",
			android: "If a child's dimensions are animated, the layout will be continuously updated on Android. Not on iPhone, where it would immediately change to what it would be after the animation finishes.",
			children: [{top:10,height:80,width:70,left:5,right:5},{height:80,width:70},{left:5,height:120,width:60,right:20}],
			Parent: function(){
				var p = Ti.UI.createView({backgroundColor:"red",layout:"horizontal"}),
					b = Ti.UI.createButton({top:10,left:10,height:30,width:100,title:"Click me!"});
				b.addEventListener("click",function(){
					b.enabled = false;
					b.animate({width:250,height:80,duration:1000},function(){
						b.animate({width:100,height:30,duration:1000},function(){
							b.enabled = true;
						});
					});
				});
				p.add(b);
				return p;
			}
		}]
	},
	scrollview: {
		title: "ScrollView container",
		Parent: function(o){
			o = o || ({});
			var scroll = Ti.UI.createScrollView(mixin({backgroundColor:"red"},o)),
				label = Ti.UI.createLabel({text:"",top:0,height:40,width:"auto",color:"#FFF",font:{fontSize:12,fontWeight:"bold"}});
			for(var p in o){
				label.text += p+": "+o[p]+"\n";
			}
			scroll.add(label);
			return scroll;
		},
		demos: [{
			iphone: "Here the red parents are ScrollViews. Contrary to normal views (on iPhone), they will crop overflowing content, as seen here. Many times this is why you will want to use them, so they might as well have been called CropViews!",
			android: "A scrollview without scrolling is just a normal view. On iPhone only scrollviews do content cropping, so a normal view could not have been used to get the above result! Here on Android, it doesn't matter.",
			children: {top:-10,left:20,height:90,width:90}
		},{
			description: "Scrolling is only available if explicitly enabled. If contentHeight is set to auto, the user can scroll the view vertically to reveal the outofbounds content.",
			parent: {contentHeight:"auto"},
			children: {top:50,left:20,height:300,width:90}
		},{
			description: "Scroll indicators also have to be explicitly enabled.",
			parent: {contentHeight:"auto",showVerticalScrollIndicator:true},
			children: {top:50,left:20,height:300,width:90}
		},{
			description: "Enabling scrolling if no children are outside the parents boundaries will have no effect. Try to scroll vertically here - nothing will happen.",
			parent: {contentHeight:"auto"},
			children: {top:30,left:30,height:90,width:90}
		},{
			description: "Horizontal scrolling is enabled through contentWidth. Note how the red scrollview now 'steals' the horizontal scroll event, and how you have to scroll outside of it to navigate the outer ScrollableView containing the different demos.",
			parent: {contentWidth:"auto"},
			children: {top:50,left:20,height:90,width:300}
		},{
			iphone: "Scrolling can be allowed in both directions at the same time. Note how the scrollview adapts its dimensions to exactly fit the content, making the child end up in the bottom-right corner.",
			android: "Scrolling doesn't seem to work in both directions at the same time on Android. Or is it perhaps broken because of the parent ScrollableView's event listener?",
			parent: {contentHeight:"auto",contentWidth:"auto"},
			children: {top:100,left:100,height:200,width:200}
		},{
			iphone: "A child's bottom and right properties are used as margins in a ScrollView. Scroll to the bottom-right to see how the child now has a gutter between itself and the corner!",
			android: "A child's bottom (and maybe right, if horizontal scrolling had worked) property is used as a margin in a ScrollView. Scroll to the bottom and see that the child now has a 10-wide gutter between itself and the parent bottom!",
			parent: {contentHeight:"auto",contentWidth:"auto"},
			children: {top:100,left:100,height:200,width:200,bottom:10,right:30}
		},{
			iphone: "So what happens if we put a tableview in a vertically scrolling Scrollview? Here the table doesn't have a height, so it will simply adapt to the parent and steal the scroll event. Thus we might as well have had a normal View parent.",
			android: "So what happens if we put a tableview in a vertically scrolling Scrollview? Here the table doesn't have a height, so it will simply adapt to the parent and steal the scroll event. Android isn't good at differentiating though, so scrolling the table is hard!",
			parent: {contentHeight:"auto"},
			children: {top:80,data:[{title:"foo1"},{title:"foo2"},{title:"foo3"},{title:"foo4"},{title:"foo5"}]},
			Child: function(o){ return Ti.UI.createTableView(mixin({backgroundColor:"#FFF"},o)); }
		},{
			description: "Here the table has a set height, triggering the parent to do the scrolling. Using the table's scrollToIndex function now would result in very weird behaviour. To wit: don't put tables in ScrollViews, there's absolutely no point!",
			parent: {contentHeight:"auto"},
			children: {top:80,height:400,data:[{title:"foo1"},{title:"foo2"},{title:"foo3"},{title:"foo4"},{title:"foo5"}]},
			Child: function(o){ return Ti.UI.createTableView(o); }
		},{
			description: "If a scrollview is given horizontal layout and horizontal scrolling, there will be no row clipping.",
			parent: {contentWidth:"auto",layout:"horizontal"},
			children: [{top:10,height:80,width:100,left:5,right:5},{height:80,width:120},{left:5,height:120,width:100,right:20}]
		},{
			iphone: "Combining horizontal layout with vertical scrolling works like a charm on iPhone (but not on Android)! You get row clipping, and can still scroll down to see children displaced to rows that are out of sight.",
			android: "On iPhone you can combine horizontal layout with vertical scrolling, to get row clipping and scrolling. On Android this doesn't work, so the out-of-bounds content will simply remain out of sight.",
			parent: {contentHeight:"auto",layout:"horizontal"},
			children: [{height:120,width:100,top:10,left:10},{height:120,width:100,top:10,left:10},{height:120,width:100,top:10,left:10},{height:120,width:100,top:10,left:10},{height:120,width:100,top:10,left:10},{height:120,width:100,top:10,left:10},{height:120,width:100,top:10,left:10}]
		},{
			iphone: "On iPhone you can still use bottom and right to offset a child from the parents edges, even when scrolling is enabled.",
			android: "On Android, using bottom and right offset with scrolling enabled doesn't work.",
			children: {bottom:30,right:30,height:80,width:80},
			parent: {contentHeight:"auto",contentWidth:"auto"}
		},{
			iphone: "A negative offset of either of those properties will however not trigger scrolling, even though the child is now outside the parent!",
			android: "Negative offsets get really weird behaviour on Android in a scrolling-enabled scrollview.",
			children: {bottom:-10,right:-10,height:80,width:80},
			parent: {contentHeight:"auto",contentWidth:"auto"}
		},{
			description: "Having no width or height will fill out the parent as normal on iPhone, even when scrolling is enabled. On Android, you get unpredictable behaviour.",
			children: {"I have no height or width":""},
			parent: {contentHeight:"auto",contentWidth:"auto"}
		},{
			iphone: "If a scrolling parent is extended due to another child with a long width/height, the autosized child will fill the extended space too.",
			android: "If a scrolling parent is extended due to another child with a long width/height, the autosized child will change behaviour. Don't go here. :)",
			children: [{"I have no height or width":""},{top:30,left:30,height:70,width:500}],
			parent: {contentHeight:"auto",contentWidth:"auto"}
		},{
			description: "Interestingly, if height and width are explicitly set to 'auto' instead of just being left blank, we get very weird behaviour on both Android and iPhone!",
			children: [{height:"auto",width:"auto"},{top:30,left:30,height:70,width:500}],
			parent: {contentHeight:"auto",contentWidth:"auto"}
		}]
	}
	
};

function mixin(prio,def){ var o = {}; for(var p in def){ o[p] = def[p]; } for(p in prio){ o[p] = prio[p]; } return o; }

function GrandParent(){ return Ti.UI.createView({top:20,left:20,width:280,height:240,borderSize:3,borderColor:"#CCC"}); }

function Parent(o){ return Ti.UI.createView(mixin({backgroundColor:"red"},o)); }

function Child(def,i){
	var child = Ti.UI.createView(mixin({backgroundColor:["#FCFF3D","#FFD032","#FF9424"][i%3]},def)),
		label = Ti.UI.createLabel({top:5,left:5,text:"", font: {fontSize:12}, color: "#000"});
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
	o.children.forEach(function(child){ parent.add(child); });
	gp.add(parent);
	view.add(gp);
	view.add(Ti.UI.createLabel({ bottom: 0, left:5, right: 5, height: 80, text: o.description, font: {fontSize:12}, color:"#000" }));
	return view;
}

function CategoryWin(cat){
	var views = [];
	cat.demos.forEach(function(demo){
		var d = DemoView({
			description:demo[PLATFORM] || demo.description || "[No "+PLATFORM+" or default description provided for this demo!]",
			parent: (demo.Parent || cat.Parent || Parent)(demo.parent || (cat.parent) || ({})),
			children: (Array.isArray(demo.children) ? demo.children : demo.children?[demo.children]:[]).map(function(cdef,i){return (demo.Child || cat.Child || (Child))(cdef,i);})
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
		top:20,textAlign:"top",left:10,right:10,color:"#000",
		text:
"This app contains a number of demonstrations aimed to further the understanding of how views are positioned in a titanium app.\n\nThe code is available at http://github.com/krawaller/tiview \n\nFor further explanation, please see the corresponding blog post on http://blog.krawaller.se"
	}));
	return win;
}

function MainTabGroup(){
	var tabGroup = Ti.UI.createTabGroup(); // Ti.UI.createTabGroup({tabs:[Ti.UI.createTab({title:"demos",window:CategorySelectionWin(demos)}),Ti.UI.createTab({title:"about",window:AboutWin()})]});   <--- won't work on Android, have to add tabs separately! Sigh...!
	tabGroup.addTab(Ti.UI.createTab({title:"demos",window:CategorySelectionWin(demos)}));
	tabGroup.addTab(Ti.UI.createTab({title:"about",window:AboutWin()}));
	return tabGroup;
}

var maintabgroup = MainTabGroup(),
	PLATFORM = Ti.Platform.osname;
maintabgroup.open();

