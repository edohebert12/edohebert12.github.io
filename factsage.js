function loadXML() {
	document.getElementById("php-content").innerHTML = "HAI";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    document.getElementById("php-content").innerHTML = this.responseText;
		}
	};
	xhttp.open("GET", "https://www.w3schools.com/xml/xmlhttp_info.txt", false);
	xhttp.send();
	document.getElementById("php-content").innerHTML = "LOL";
}