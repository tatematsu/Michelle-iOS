var win = Titanium.UI.currentWindow;
Titanium.Media.showCamera({

        success:function(event)
        {
                var cropRect = event.cropRect;
                var image = event.media;
                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
                {
                        // カメラで撮った画像を表示する
                        var imageView = Ti.UI.createImageView({
                        		top:200,
                                width:200,
                                height:200,
                                image:event.media
                        });
                        win.add(imageView);

                        // カメラで撮った画像をアップロード（uploadCameraImageはあとで説明）
                        uploadCameraImage(event.media);
                }
                else
                {
                        alert("got the wrong type back ="+event.mediaType);
                }
        },
        cancel:function()
        {
        },
        error:function(error)
        {
                // create alert
                var a = Titanium.UI.createAlertDialog({title:'Camera'});

                // set message
                if (error.code == Titanium.Media.NO_CAMERA)
                {
                        a.setMessage('Please run this App on device');
                }
                else
                {
                        a.setMessage('Unexpected error: ' + error.code);
                }

                // show alert
                a.show();
        },
        saveToPhotoGallery:false,
        allowEditing:true,
        mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
});
// switch front camera
Ti.Media.switchCamera(Ti.Media.CAMERA_FRONT);

function uploadCameraImage(image){
        var xhr = Ti.Network.createHTTPClient();
        var url = "http://www.la-michelle.com/upload_photos/index.php";
        xhr.open('POST', url);
        xhr.send({
        	media: image ,
        	name: 'pic01.jpg',
        	tmp_name:"pic01_tmp.jpg"
        } );
        xhr.onload = function(){
                var json = JSON.parse(xhr.responseText);
                //alert(json.error );// エラー判定
	                if( json.error == "OK" ){
						var dialog = Ti.UI.createAlertDialog();
						dialog.setTitle('写真の送信完了');
						dialog.setMessage('写真のエントリーを受け付けました！'); 
						dialog.show();	                	
//	                	alert("エントリーを受け付けました！");
	                	win.close();
	                }else{
	                	alert("写真のエントリーができませんでした。もう少し待ってから再度お試し下さい。");	                	
	                	win.close();	                	
	                }
        };
        xhr.onerror = function(){
    		alert("写真のエントリーできませんでした。通信状態をご確認いただいてから再度お試し下さい。");	                	
        };
}