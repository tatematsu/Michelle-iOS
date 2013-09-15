//画像解像度取得
stageWidth = Titanium.Platform.displayCaps.platformWidth;
stageHeight = Titanium.Platform.displayCaps.platformHeight;

var camera_view = Ti.UI.createView();
// ロゴイメージ作成
var logo_image = Ti.UI.createImageView({
	image: 'logo.png',
	width: stageWidth/2,
	top: stageHeight*0.014,
	left: stageWidth*0.25
});
var contest_img = Ti.UI.createImageView({
	image: 'photo_contest.png',
	width: 300,
	top: 50,
	left: 12
});

var oubo_label = Ti.UI.createLabel({
	top:80,
	text:"二人の写真を応募しよう！"
	//一番ステキな写真が撮れた二人には・・・	な、な〜んと○○がもらえる！さあ、今スグ最高の一枚を撮って応募だ！
//	ご利用日と部屋番号をノートに書いて写してね！うまく取れるかな？？
//	カメラ起動ボタンを押すと、前面カメラが起動しますので、二人で上手に撮影してください。（インカメラがない機種に付きましてエントリーができませんのでご了承下さい。"
});

/*/ camera image
var camera_img = Ti.UI.createImageView({
	image: 'camera_event.png',
	width: 80,
	top: stageHeight*0.080,
	left: stageWidth*0.35	
});*/
var couples_img = Ti.UI.createImageView({
	image: 'couples.png',
	width: 300,
	top: 95,
	left: 12	
});
// カメラ起動ボタン
var camera_start_btn = Titanium.UI.createButton({
        title:'お楽しみカメラ起動',
        height:40,
        width:250,
        top:288,
});
//クリック時の動作
camera_start_btn.addEventListener('click', function(e)
{
        var win = Titanium.UI.createWindow({
                url:"camera.js",
                title:"camera",
        });
        win.open(win,{animated:true});
});
var oubo_memo = Ti.UI.createLabel({
	top:330,
	width:300,
	text:"入ったお店と部屋番号を書いて2人仲良く写真を撮ってね！ご応募の結果は各お店のホームページ上で発表致します。ステキなプレゼントをゲットしよう。",
	font:{fontSize:10}
});

camera_view.add(contest_img);
camera_view.add(couples_img);
camera_view.add(logo_image);
camera_view.add(oubo_label);
//カメラ起動ボタン追加
camera_view.add(camera_start_btn);
camera_view.add(oubo_memo);

//ウィンドウに追加
Ti.UI.currentWindow.add(camera_view);

/*
// RSSを表示するテーブルビュー作成
var tableView = Titanium.UI.createTableView({
	data: [],
	fontSize: 12,
	top:	150
});
// 表示対象の画像は配列として渡します
var images = [
    'funakoshi_logo.png',
    'hatsukaichi_logo.png',
    'kabe_logo.png'
];
// 背景色とセットで画像一覧を引き渡します
var cover_imageView = Ti.UI.iOS.createCoverFlowView({
    images: images,
    height:	150,
    top: 0,
    backgroundColor: '#efefef'
});

//alert(images);
// 画像選択時のイベント
cover_imageView.addEventListener('click',function(e){
	var selected_rss = e.index;
	// 各店舗のRSSを選択
	if( selected_rss == 0){
			var rss = require('services/rss_funa');
	}
	if( selected_rss == 1){
			var rss = require('services/rss_hat');
	}
	if( selected_rss == 2){
			var rss = require('services/rss_kabe');
	}
	if( selected_rss>2 || selected_rss<0 ){
			var rss = require('services/rss_funa');
	}
//	Ti.API.info(selected_rss);
	refreshRSS(rss);
});

// フリックなどで選択中の画像が変わったときのイベント
cover_imageView.addEventListener('change',function(e){
	var selected_rss = e.index;
	// 各店舗のRSSを選択

	if( selected_rss == 0){
			var rss = require('services/rss_funa');
	}
	if( selected_rss == 1){
			var rss = require('services/rss_hat');
	}
	if( selected_rss == 2){
			var rss = require('services/rss_kabe');
	}
	if( selected_rss>2 || selected_rss<0 ){
			var rss = require('services/rss_kabe');
	}
	refreshRSS(rss);
});
Ti.UI.currentWindow.add(cover_imageView);

function refreshRSS(rss) {
	var rows = [];
	var i;
	rss.loadRssFeed({
		success: function(data) {
    		var rssitems = data;
		    // TableViewで記事のタイトル一覧を表示
		    for (i = 0; i < rssitems.length; i++) {
		        rows.push({
		            title: rssitems[i].title,
		            hasDetail:true,
		        });
		 	 }
			// テーブルビューに記事をセット
		    tableView.setData(rows);

		    //記事タイトル時の挙動
			tableView.addEventListener(
				'click',
				function(e){
					// コールバック内では e.index でどの列がタップされたか取得できます
					var entryWindow = null,
						entryView = null;
					
					// 新しくWindowを作ってWebViewを表示します
					entryWindow = Titanium.UI.createWindow({
						title: rssitems[e.index].title
					});
					entryWindow.addEventListener('focus',function(){
						//Windows読み込み時の処理
					});
					entryView = Titanium.UI.createWebView({
						url: rssitems[e.index].link						
					});
					entryWindow.add(entryView);
					// 現在のTabでWebViewのWindowを表示
					Ti.UI.currentTab.open(entryWindow);
				}
			);// tableview event listener
//			tableView.removeEventListener('click',function(e){});
    	}// load success function
	});//load rss feed
}//refresh rss feed
*/