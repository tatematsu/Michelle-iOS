stageWidth = Titanium.Platform.displayCaps.platformWidth;
// フォームを表示するビュー作成
var formView = Ti.UI.createView({
	top: 0
});
/* 可部店の予約ウィンドウ */
Ti.UI.currentWindow.addEventListener('open',function(e){
	 //やりたい事
	var selected_hotel = 2;
	var kabe_reserve_label = Ti.UI.createLabel({
		text:'金曜のみ宿泊・休憩受付可能/土日祝日は受付ておりません。',
		width: stageWidth*0.9,
		top: 10,
		color:'#333333'
	});
	var kabe_date_tf = Ti.UI.createTextField({
		color:'#333333',
		hintText:'ご予約希望日',
		height:35,
		top:60,
		left: 30,
		width: 250,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var kabe_time_tf = Ti.UI.createTextField({
		color:'#333333',
		hintText:'ご希望時間帯',
		height:35,
		top: 100,
		left: 30,
		width: 250,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});			
	var kabe_name_tf = Ti.UI.createTextField({
		color:'#333333',
		hintText:'お名前',
		height:35,
		top: 150,
		left: 30,
		width: 250,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var kabe_tel_tf = Ti.UI.createTextField({
		color:'#333333',
		hintText:'携帯番号（ハイフンなし）',
		height:35,
		top: 190,
		left: 30,
		width: 250,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var kabe_email_tf = Ti.UI.createTextField({
		color:'#333333',
		hintText:'ご連絡メールアドレス',
		height:35,
		top: 230,
		left: 30,
		width: 250,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});			
	var kabe_btn = Ti.UI.createButton({
		title:'可部店で予約する',
		top: 270,
		left: 100,
		width: 200,
		height: 50	
	});
	var kabe_cancel_btn = Ti.UI.createButton({
		title:'戻る',
		top: 270,
		left: 30,
		width: 100,
		height: 50	
	});
	// フォームパーツをビューに追加		
	formView.add(kabe_reserve_label);	
	formView.add(kabe_time_tf);							
	formView.add(kabe_date_tf);
	formView.add(kabe_name_tf);			
	formView.add(kabe_email_tf);
	formView.add(kabe_tel_tf);			
	formView.add(kabe_btn);		
	formView.add(kabe_cancel_btn);

	//キャンセル
	kabe_cancel_btn.addEventListener('click', function(e){
			Ti.UI.currentWindow.close();
	});
	
	// 送信ボタン押下時の処理
	kabe_btn.addEventListener('click', function(e){
		reserve_date = kabe_date_tf.getValue();
		reserve_time =  kabe_time_tf.getValue();
		reserve_name =  kabe_name_tf.getValue();
		reserve_email =  kabe_email_tf.getValue();
		reserve_tel =  kabe_tel_tf.getValue();

		try{

			if( reserve_date == "" ){
				//alert('empty date');
				var er = new Error("日付が入力されていません。");
				throw er;	
			}
			if( reserve_time == "" ){
				//alert('empty time');	
				var er = new Error("時間帯が入力されていません。");
				throw er;				}
			if( reserve_name == "" ){
				//alert('empty email');	
				var er = new Error("お名前が入力されていません。");
				throw er;
			}	
			if( reserve_email == "" ){
				//alert('empty email');	
				var er = new Error("メールアドレスが入力されていません。");
				throw er;
			}
			if (!reserve_email.match(/^[A-Za-z0-9]+[\w-]+@[\w\.-]+\.\w{2,}$/)){
				var er = new Error("メールアドレスをご確認ください。");
				throw er;
			}
			if( reserve_tel == "" ){
				//alert('empty email');	
				var er = new Error("電話番号が入力されていません。");
				throw er;
			}
			if ( !reserve_tel.match(/^[0-9]{11}$/) ){
				var er = new Error("電話番号をご確認ください。");
				throw er;
			}		
			// オブジェクトを生成
			var xhr = Ti.Network.createHTTPClient();
			//パラメータ作成
			var url_param = "?reserve_hotel="+selected_hotel
							+"&reserve_date="+reserve_date
							+"&reserve_time="+reserve_time
							+"&reserve_name="+reserve_name
							+"&reserve_email="+reserve_email
							+"&reserve_tel="+reserve_tel;																								
//Ti.API.info(url_param);
			// データダウンロード時のイベント処理
			xhr.onload = function() {
				//JSON形式レスポンス取得
				var	json = JSON.parse(this.responseText);
//alert(json);
				if( json.status == 1 ){
					var thanks_dialog = Ti.UI.createAlertDialog();
					thanks_dialog.setTitle('ラ・ミッシェル可部店へのご予約ありがとうございました。\nご予約内容を確認・ご手配の後ご連絡をいたします。\n何卒よろしくお願いいたします。');
					thanks_dialog.setMessage(e.message); 
					thanks_dialog.show();
/*
						Ti.UI.currentWindow.remove(tableView);
						thanksView.add(thanks_label);
						Ti.UI.currentWindow.add(thanksView);*/
				//正常に登録できたら、サンクスメッセージ
					Ti.UI.currentWindow.close();
					//正常に登録できたら、サンクスメッセージ
				}else{
					//var er = new Error("サーバエラーで予約が出来ませんでした。");
					//throw er;
				}

			};
			xhr.onerror = function(error){
				//Ti.API.info(error[0]);
			};
//xhr.timeout = 5000;  // 結果が5秒返ってこなかったらエラーにする
			xhr.open('GET','http://www.la-michelle.com/wp-content/themes/michelle-grp/reserve_mobile.php'+url_param);
			xhr.send();
							
		}catch(e){
			//alert(e.message);
			var err_dialog = Titanium.UI.createAlertDialog();
			err_dialog.setTitle('入力エラーです。');
			err_dialog.setMessage(e.message); 
			err_dialog.show();				
//			Ti.UI.currentWindow.close();
		}finally{
			
		}														
	});	
	Ti.UI.currentWindow.add(formView);
});