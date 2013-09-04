//view create
var view = Ti.UI.createView();

var alert = Ti.UI.createAlertDialog({
	title:'delete?',
	message:'Are you sure?',
	buttonNames:['OK','Cancel','HELP'],
	cancel: 1
});
alert.addEventListener('click',function(e){
	Ti.API.info(e.index);
})
//label create
var label = Ti.UI.createLabel({
	text: "Hello World",
	height: 32,
	width: 155,
	top: 120,
	color: 'red'
});

var button = Ti.UI.createButton({
	title: 'push me!',
	top: 180,
	width: 100,
	height: 32
});
button.addEventListener('click',function(e){
	alert.show();
	//alert('you pushed button');
	//Ti.API.info('YOU PUSHED ME!');
});

// label を view 追加
view.add(label);
view.add(button);

//view を win に追加
Ti.UI.currentWindow.add(view);



