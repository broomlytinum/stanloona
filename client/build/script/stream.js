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

	function award_aster(reward) {
		$.ajax({
			url: `https://stan-loona.herokuapp.com/api/discord/aster`,
			type: "GET",
			data: {"user_id": String(user_id)},
			success: function (res) {

				var new_aster = reward;
				var update = false;

				if (res.amount_aster) {
					new_aster += res.amount_aster;
					update = true;
				}

				$.ajax({
					url: `https://stan-loona.herokuapp.com/api/discord/aster`,
					type: "POST",
					data: JSON.stringify({"user_id": String(user_id), "amount": new_aster, "update": update}),
					success: function (res) {},
					contentType: 'application/json',
				});

				alert(`You now have ${new_aster} aster! To view this over discord, type "loona.aster" on a server with the bot.`);

			},
			contentType: 'application/json',
		});
	}

	function onPlayerReady(event) {
		// do nothing
	}

	var state = 0;
	function onPlayerStateChange(event) {
	if (event.data == 1 && state == 0) {
		state = 1;
		award_aster(1);
	}
	else if (event.data == 0 && state == 1) {
		state = 2;
		//alert("Video complete! Thank you!");
		award_aster(100);
	}
		else if (state == 1) {
			state = -1;
			alert("Video interrupted...Please refresh.");
		}
	}
}