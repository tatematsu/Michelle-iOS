//画像解像度取得
stageWidth = Titanium.Platform.displayCaps.platformWidth;
stageHeight = Titanium.Platform.displayCaps.platformHeight;
//alert(stageWidth+"/"+stageHeight);

//空室予約
var reservation_view = Ti.UI.createView();

// ロゴイメージ作成
var logo_image = Ti.UI.createImageView({
	image: 'logo.png',
	width: stageWidth/2,
	top: stageHeight*0.014,
	left: stageWidth*0.25
});
// ふかわバナーイメージ作成
var fukawa_banner_image = Ti.UI.createImageView({
	image: 'fukawanoyu.png',
	width: stageWidth/2,
	top: 245,
	left: 0
});
fukawa_banner_image.addEventListener('click',function(e){
	Titanium.Platform.openURL('http://www.fukawanoyu.com/?utm_source=MichelleApp&utm_medium=mobileapp&utm_campaign=iOS');
});
// パルコバナーイメージ作成
var parco_banner_image = Ti.UI.createImageView({
	image: 'parco.png',
	width: stageWidth/2,
	top: 245,
	left: stageWidth/2
});
parco_banner_image.addEventListener('click',function(e){
	Titanium.Platform.openURL('http://www.hotel-parco.net/?utm_source=MichelleApp&utm_medium=mobileapp&utm_campaign=iOS');
});

var bar_height = stageHeight*0.02342;

//　区切り線
var border_img_01 = Ti.UI.createButton({
	backgroundImage:'michelle_border.png',
	width: stageWidth,
	height: 10,
	top: 96,
	left: 0
});
var border_img_02 = Ti.UI.createButton({
	backgroundImage:'michelle_border.png',
	width: stageWidth,
	height: 10,
	top: 142,
	left: 0
});
var border_img_03 = Ti.UI.createButton({
	backgroundImage:'michelle_border.png',
	width: stageWidth,
	height: 10,
	top: 188,
	left: 0
});

// JSON 読み込み
// オフラインの場合
if(Titanium.Network.online == false){
    // メッセージ
    alert('オフラインなので空室状況を取得できません。');
}

// オブジェクトを生成
var xhr = Ti.Network.createHTTPClient();

var status_width = 180;
var status_height = 36;
var status_left = 145;
var empty_label_left = 200;

// データダウンロード時のイベント処理
xhr.onload = function() {
	
	// JSONパース
	try{
//		var json = eval('('+this.responseText+')');
		var	json = JSON.parse(this.responseText);

//alert(json);
		// 各店舗のデータ
		for (var i=0; i<json.michelle.length;i++) {
			var info = json.michelle[i];
//Ti.API.info(i+"/"+info.shop_name);
	      // ここから生成する
			if( info.shop_name<2 || info.shop_name>4 || info.available<=0 ){
				//do nothing
			}
			if(info.shop_name == 4 && info.available >0){
//Ti.API.info('---------hatsukaichi--OK-------');				
				if(info.empty_room_nums>0){
					var empty_hatsukaichi = Ti.UI.createLabel({
						text:info.empty_room_nums+'部屋空きがあります',
						left:	empty_label_left,
						top:	70,
						color: '#fff',
						font:{fontSize:11}						
					});
					var status_hatsukaichi = Ti.UI.createImageView({
						image:'status_available.png',
						width:	status_width,
						height: status_height,
						left:	status_left,
						top:	60
					});
					reservation_view.add(status_hatsukaichi);
					reservation_view.add(empty_hatsukaichi);

				}else{
					//　廿日市満室ボタン作成
					var status_hatsukaichi = Ti.UI.createImageView({
						image:'status_full.png',
						width:	status_width,
						height: status_height,
						left:	status_left,
						top:	60
					})
					reservation_view.add(status_hatsukaichi);
				}
			}
			
			if(info.shop_name == 2 && info.available >0){
				if(info.empty_room_nums>0){				
//Ti.API.info('---------kabe--OK-------');				
					var empty_kabe = Ti.UI.createLabel({
						text:info.empty_room_nums+'部屋空きがあります',
						left:	empty_label_left,
						top:	162,
						color: '#fff',
						font:{fontSize:11}						
					});
					var status_kabe = Ti.UI.createImageView({
						image:'status_available.png',
						width:	status_width,
						height: status_height,
						left:	status_left,
						top:	152
					});
					reservation_view.add(status_kabe);
					reservation_view.add(empty_kabe);
				}else{
					//　可部満室ボタン作成
					var status_kabe = Ti.UI.createImageView({
						image:'status_full.png',
						width:	status_width,
						height: status_height,
						left:	status_left,
						top:	152
					});				
					reservation_view.add(status_kabe);				
				}
			}
			if(info.shop_name == 3 && info.available >0){
				
//Ti.API.info('---------funakoshi--OK-------');				
				if(info.empty_room_nums>0){
			
					var empty_funakoshi = Ti.UI.createLabel({
						text:info.empty_room_nums+'部屋空きがあります',
						left:	empty_label_left,
						top: 	116,
						color: '#fff',
						font:{fontSize:11}
					});
					var status_funakoshi = Ti.UI.createImageView({
						image:'status_available.png',
						width:	status_width,
						height: status_height,
						left:	status_left,
						top:	106
					});
					reservation_view.add(status_funakoshi);
					reservation_view.add(empty_funakoshi);
					
				}else{
					// 船越満室ボタン
					var status_funakoshi = Ti.UI.createImageView({
						image:'status_full.png',
						width:	status_width,
						height: status_height,
						left:	status_left,
						top:	106
					});					
					reservation_view.add(empty_funakoshi);
				}
			}
	  	};
	  	
	}catch(e){
		alert('空室状況のデータが読み込めませんでした。');			
	}
}
xhr.onerror = function(error){
	Ti.API.info(error[0]);
};
//xhr.timeout = 5000;  // 結果が5秒返ってこなかったらエラーにする
xhr.open('GET','http://www.la-michelle.com/wp-content/themes/michelle-grp/reserve_check.php');
xhr.send();

// メモリリーク対策
/*
xhr.onload = null;
xhr.onreadystatechange = null;
xhr.ondatastream = null;
xhr.onerror = null;
xhr = null;
*/

var button_width = stageWidth*0.46;
var button_height = stageHeight*0.0644;

//　廿日市ボタン作成
var hatsukaichi_button = Ti.UI.createButton({
	backgroundImage:'hatsukaichi_ttl.png',
	width: 144,
	height: 36,
	top: 60,
	left: 0
})

// 廿日市のウェブ画面に移動。
hatsukaichi_button.addEventListener('click',function(e){
	Titanium.Platform.openURL('http://hatsukaichi.la-michelle.com/reservation/#reservation');
});
//　船越ボタン作成
var funakoshi_button = Ti.UI.createButton({
	backgroundImage:'funakoshi_ttl.png',
	width: 144,
	height: 36,
	top: 106,
	left: 0
})

funakoshi_button.addEventListener('click',function(e){
	Titanium.Platform.openURL('http://funakoshi.la-michelle.com/reservation/#reservation');
});

//　可部ボタン作成
var kabe_button = Ti.UI.createButton({
	backgroundImage:'kabe_ttl.png',
	width: 144,
	height: 36,
	top: 152,
	left: 0
})
// 可部のウェブ画面に移動。
kabe_button.addEventListener('click',function(e){
	Titanium.Platform.openURL('http://kabe.la-michelle.com/reservation/#reservation');
});

/*
var airport_button = Ti.UI.createButton({
	title:'空港店'
})*/
var notify_alert_button = Ti.UI.createButton({
	//backgroundImage:	'letter.png',
	title:'空室お知らせアラートを登録する',
	width:	300,
	top: 200
});

// メール送信画面生成
var emailDialog = Ti.UI.createEmailDialog();

notify_alert_button.addEventListener('click',function(e){
//	Ti.API.info(tf.getValue());
    // メールの宛先
    emailDialog.setToRecipients(['check@la-michelle.com']);

    // メール本文
    emailDialog.setMessageBody('グループ店舗内で部屋に空きが出た場合にお知らせいたします。このままメールを送信してください。');

    // メールの題名
    emailDialog.setSubject('空室お知らせアラートご登録');

    // メール送信画面を起動
    emailDialog.open();
});

//ロゴ追加
reservation_view.add(logo_image);

// バナー追加
reservation_view.add(fukawa_banner_image);
reservation_view.add(parco_banner_image);

//区切り線追加
reservation_view.add(border_img_01);
reservation_view.add(border_img_02);
reservation_view.add(border_img_03);


//ボタン追加
//reservation_view.add(call_button);
reservation_view.add(hatsukaichi_button);
reservation_view.add(funakoshi_button);
reservation_view.add(kabe_button);
reservation_view.add(notify_alert_button);

//ウィンドウに追加
Ti.UI.currentWindow.add(reservation_view);