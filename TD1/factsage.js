var fixed = false;

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

function bodyScroll()
{
	if(document.body.scrollTop >= 110 && !fixed)
	{
		document.getElementsByClassName("menu-bar")[0].style.position = "fixed";
		document.getElementsByClassName("menu-bar")[0].style.top = "0px";
		fixed = true;
	}
	else if(document.body.scrollTop < 110 && fixed)
	{
		document.getElementsByClassName("menu-bar")[0].style.position = "absolute";
		document.getElementsByClassName("menu-bar")[0].style.top = "110px";
		fixed = false;
	}
}