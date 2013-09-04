//Application Window Component Constructor
function ApplicationWindow() {
	//declare module dependencies
	var rss = require('services/rss_hat'),
		MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView');

	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});

	//construct UI
	var masterView = new MasterView(),
		detailView = new DetailView();

	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title:'ミッシェル廿日市新着情報'
	});
	var button = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.REFRESH
	});
	button.addEventListener('click', function(e) {
		refreshRSS();
	});
	var back_btn = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.TRASH
	});
	back_btn.addEventListener('click',function(e){
		Ti.UI.currentWindow.close();
	});	
	masterContainerWindow.rightNavButton = button;
	masterContainerWindow.leftNavButton = back_btn;
	masterContainerWindow.add(masterView);

	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow();
	detailContainerWindow.add(detailView);

	//create iOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		detailView.showArticle(e.link);
		navGroup.open(detailContainerWindow);
	});
	
	function refreshRSS() {
		rss.loadRssFeed({
			success: function(data) {
	    		masterView.refreshRssTable(data);
	    	}
		});
	}
	
	// load initial rss feed
	refreshRSS();
	
	return self;
};
module.exports = ApplicationWindow;