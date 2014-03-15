alert("hi");
var s = document.createElement('script');

s.innerHtml = "alert('gogo');";

document.body.appendChild(s);