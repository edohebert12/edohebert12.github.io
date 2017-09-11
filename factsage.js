function loadXML(s) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    document.getElementById("php-content").innerHTML = this.responseText;
		}
	};
	xhttp.open("GET", s, true);
	xhttp.send();
}

function emptyXML() {
	document.getElementById("php-content").innerHTML = "";
}

function activate(s)
{
	var active = document.getElementsByClassName("active")[0];
	if(active !== undefined)
	{
		active.classList.remove("active");
	}
	document.getElementById(s).classList.add("active");
}