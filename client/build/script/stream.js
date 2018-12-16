var url = new URL(window.location.href);
var user_id = url.searchParams.get("user_id");

if (user_id) { // user_id
	
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var player;
	function onYouTubeIframeAPIReady() {
		player = new YT.Player('player', {
		  height: '585',
		  width: '960',
		  videoId: 'cwv0NRhx-tw', // '846cjX0ZTrk',
		  events: {
		    'onReady': onPlayerReady,
		    'onStateChange': onPlayerStateChange
		  }
		});
	}

	function onPlayerReady(event) {
		// do nothing
	}

	var state = 0;
	function onPlayerStateChange(event) {
	if (event.data == 1 && state == 0) {
		state = 1;
		alert("Video playing...");
		$.post({
			url: `${window.location.href}/api/sql/aster`,
			data: {user_id: user_id, amount: 100},
			success: function (data) {
				alert("Post success!");
			},
			dataType: "json"
		});
		$.get({
			url: `${window.location.href}/api/sql/aster`,
			data: {},
			success: function (data) {
				alert("Get success!");
			},
			dataType: "json"
		});
	}
	else if (event.data == 0 && state == 1) {
		state = 2;
		alert("Video complete! Thank you!");
	}
		else if (state == 1) {
			state = -1;
			alert("Video interrupted...Please refresh.");
		}
	}
}