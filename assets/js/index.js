 //this function takes two arguments,the input and an array of possible autocompleted values/meals
function autocomplete(inp, arr) {
   
    var currentFocus;
    //listener when someone types something
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        //close already open dropdown list
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        //clone DIV element that will contain the available meals
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        //for loop to display all elemets that are matching with input
        for (i = 0; i < arr.length; i++) {
          //check if the item starts with the same letters as the inoput
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            //create a DIV element for each matching meals
            b = document.createElement("DIV");
            //highlight(bold) the matching letters
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            //insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            //execute a function when someone clicks on value in the dropdown(DIV element)
            b.addEventListener("click", function(e) {
                //insert the value for the autocomplete text field
                inp.value = this.getElementsByTagName("input")[0].value;
                //close the list of autocompleted values,
                //(or any other open lists of autocompleted values
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
        var data=document.getElementById("myInput").value;
      console.log(data);
      localStorage.setItem(0,data);
    });
}

/*An array containing all the country names in the world:*/
//var meals = ["Biryani","Burger","Chicken Curry","Chowmin","Donuts","Ice Cream","Mutton Curry"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), meals);