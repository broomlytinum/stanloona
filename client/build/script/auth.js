var url = window.location.href;
var token = url.searchParams.get("token");

if (token) {
	alert(token);
}