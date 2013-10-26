//タブグループ作成
var tabGroup = Ti.UI.createTabGroup();

//空室状況確認ウィンドウ作成
var reservation_win = Ti.UI.createWindow({
	title :'空室状況・ご予約',
	backgroundColor: 'white',
	url: 'reservation_win.js'
});
//各店舗予約ウィンドウ作成
var event_win = Ti.UI.createWindow({
	title :'ご予約',	
	backgroundColor: 'white',
	url :'event_win.js'	
});
//地図ウィンドウ作成
var map_win = Ti.UI.createWindow({
	title :'ミッシェル各店の地図',	
	backgroundColor: 'white',
	url :'map_win.js'	
});

var reservation_tab = Ti.UI.createTab({
	icon: 'hotel_info.png',
	title:'空室状況',
	window: reservation_win
});

var map_tab = Ti.UI.createTab({
	icon: 'map.png',
	title:'ミッシェル地図',
	window: map_win
});
var form_tab = Ti.UI.createTab({
	icon: 'booking.png',
	title:'ご予約',
	window: event_win
});
// tabグループにタブ追加
tabGroup.addTab(reservation_tab);
tabGroup.addTab(form_tab);
tabGroup.addTab(map_tab);
//タブグループを開く
tabGroup.open();

