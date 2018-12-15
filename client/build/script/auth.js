var url = new URL(window.location.href);
var user_id = url.searchParams.get("user_id");

if (user_id) {
	alert(user_id);
}