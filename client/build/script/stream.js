var load_player = function() {
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var player;
	function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
	  height: '585',
	  width: '960',
	  videoId: '846cjX0ZTrk',
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