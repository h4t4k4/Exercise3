var datanya = null;

function loadnya() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      datanya = myObj.results;
      isidata(datanya, 'tbldata');
    }
  };
  xmlhttp.open("GET", "https://swapi.co/api/planets/?format=json", true);
  xmlhttp.send();
}

function isidata(objData, idtbl) {
  var x = document.getElementById(idtbl);
  while (x.rows.length != 1) {
    x.removeChild(x.lastChild);
  }

  for (var i = 1; i <= objData.length; i++) {
    x.insertRow(i);
    var nr = x.rows[i];
    nr.insertCell(0);
    nr.insertCell(1);
    nr.insertCell(2);
    nr.insertCell(3);
    nr.insertCell(4);

    nr.cells[0].innerHTML = objData[i - 1].name;
    nr.cells[1].innerHTML = objData[i - 1].rotation_period;
    nr.cells[2].innerHTML = objData[i - 1].orbital_period;
    nr.cells[3].innerHTML = objData[i - 1].diameter;
    nr.cells[4].innerHTML = objData[i - 1].terrain;
    x.appendChild(nr);
  }
}

function filterkan() {
  var result = datanya.filter(function (datanya) {
    var nm = document.getElementById("nl_nm").value;
    var ro = parseInt(document.getElementById("nl_ro").value);
    var or = parseInt(document.getElementById("nl_or").value);
    var di = parseInt(document.getElementById("nl_di").value);
    var tr = document.getElementById("nl_tr").value;

    if(nm!=""){
      return (datanya.name.toUpperCase().indexOf(nm.toUpperCase())>-1);
    }else if(ro>0){
      return datanya.rotation_period==ro;
    }else if(or>0){
      return datanya.orbital_period==or;
    }else if(di>0){
      return datanya.diameter==di;
    }else if(tr!=""){
      return (datanya.terrain.toUpperCase().indexOf(tr.toUpperCase())>-1);
    }else{
      return true;
    }
  });
  isidata(result, 'tbldata');
}




loadnya();
