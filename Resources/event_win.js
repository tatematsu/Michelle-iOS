//画像解像度取得
stageWidth = Titanium.Platform.displayCaps.platformWidth;
stageHeight = Titanium.Platform.displayCaps.platformHeight;

// ロゴイメージ作成
var logo_image = Ti.UI.createImageView({
	image: 'logo.png',
	width: stageWidth/2,
	top: stageHeight*0.014,
	left: stageWidth*0.25
});
// フォームを表示するビュー作成
var menuView = Ti.UI.createView({
//	backgroundImage:'reserve_menu_bg.png',
	top: 0
});

//各店舗の予約ウインドウを作成
var win_funakoshi = Ti.UI.createWindow({
	title :'ラ・ミッシェル船越のご予約',
	backgroundColor:'white',
	url :'order_funakoshi.js'	
});
var win_hatsukaichi = Ti.UI.createWindow({
	title :'ラ・ミッシェル廿日市のご予約',	
	backgroundColor: 'white',
	url :'order_hatsukaichi.js'	
});
var win_kabe = Ti.UI.createWindow({
	title :'ラ・ミッシェル可部のご予約',	
	backgroundColor: 'white',
	url :'order_kabe.js'	
});

//各店舗予約ボタンを作成
var funakoshi_btn = Ti.UI.createButton({
//	title:'船越予約',
	width: 220,
	height: 130,
	backgroundImage:'funakoshi_logo.png',
	top:50
});
var hatsukaichi_btn = Ti.UI.createButton({
//	title:'廿日市予約',
	width: 220,
	height: 130,
	backgroundImage:'hatsukaichi_logo.png',
	top:185
});
var kabe_btn = Ti.UI.createButton({
//	title:'可部予約',
	width: 220,
	height: 130,
	backgroundImage:'kabe_logo.png',
	top:325
});

//各店舗ボタンクリックで予約画面をオープン
funakoshi_btn.addEventListener('click',function(e){
	win_funakoshi.open();
});
hatsukaichi_btn.addEventListener('click',function(e){
	win_hatsukaichi.open();
});
kabe_btn.addEventListener('click',function(e){
	win_kabe.open();
});

menuView.add(funakoshi_btn);
menuView.add(hatsukaichi_btn);
menuView.add(kabe_btn);

Ti.UI.currentWindow.add(menuView);