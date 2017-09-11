function loadXML() {
	document.getElementById("php-content").innerHTML = "HAI";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    document.getElementById("php-content").innerHTML = this.responseText;
		}
		else{
			console.log("nope");
		}
	};
	xhttp.open("GET", "fs_general.php", false);
	xhttp.send();
	document.getElementById("php-content").innerHTML = "LOL";
}