var url = new URL(window.location.href);
var token = url.searchParams.get("token");

if (token) {
	alert(token);
}