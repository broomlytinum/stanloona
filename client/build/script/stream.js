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

		

		$.ajax({
			url: `https://stan-loona.herokuapp.com/api/discord/aster`,
			type: "GET",
			data: {"user_id": String(user_id)},
			success: function (res) {

				var new_aster = 100;
				var update = false;

				alert(res);

				if (res["amount_aster"] != null) {
					new_aster += res["amount_aster"];
					update = true;
					alert(new_aster);
				}

				$.ajax({
					url: `https://stan-loona.herokuapp.com/api/discord/aster`,
					type: "POST",
					data: JSON.stringify({"user_id": user_id, "amount": new_aster, "update": update}),
					success: function (res) {
						alert("Post success!");
					},
					contentType: 'application/json',
				});

			},
			contentType: 'application/json',
		});

		/*
		$.get({
			url: `https://stan-loona.herokuapp.com/api/discord/aster`,
			data: {},
			success: function (data) {
				alert("Get success!");
			},
			dataType: "json"
		});
		*/
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