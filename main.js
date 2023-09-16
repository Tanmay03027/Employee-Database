
// step 1: validation 

function validateForm(){
    // targeting all id to a variable and storing the value of input into respective variables using (.value)
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    let position = document.getElementById("position").value;
   

    // name condition : - validation for Name 
    if(name == ""){
        // if user doesn't enter their name the alert message will display and statement will return false value
        alert("Name is required!");
        return false;
    }
    


    // address condition 
    if(address == ""){
        alert("Address is required!");
        return false;
    }


    //email condition 
    if(email == ""){
        alert("Email is requireed!");
        return false;
    }else if(!email.includes("@")){ 
        alert("Invalid email address");
        return false;
    }


    //position condition
   if(position == ""){
    alert("Position is required!");
    return false;
   }

    return true;

}


// step 2: To show data from local storage 

function showData(){
    let peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    let html = '';
    peopleList.forEach(function(element, index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.position + "</td>";
        html += '<td><button onclick="deleteData('+index+')" class="delete">Delete</button><button onclick="updateData('+index+')" class="edit">Edit</button></td>';
        html +="</tr>";

    });

   
document.querySelector("#crudTable tbody").innerHTML = html;
}
// onload event 
document.onload = showData();




//step 3: To add the data to local storage 
function AddData(){
    // if form is validate
    if(validateForm() == true){
        let name = document.getElementById("name").value;
        let address = document.getElementById("address").value;
        let email = document.getElementById("email").value;
        let position = document.getElementById("position").value;
  
      let peopleList;
      if(localStorage.getItem("peopleList") == null){
          peopleList = [];
       }else{
           peopleList = JSON.parse(localStorage.getItem("peopleList"));
       }
  
       peopleList.push({
          name: name,
          address: address,
          email: email,
          position: position
       });
  
       localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();
  
      document.getElementById("name").value="";
      document.getElementById("position").value="";
      document.getElementById("address").value="";
      document.getElementById("email").value="";
    }
  }



  // step 4: To delete data from local storage 
  function deleteData(index){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
     }else{
         peopleList = JSON.parse(localStorage.getItem("peopleList"));
     }

     peopleList.splice(index, 1);
     localStorage.setItem("peopleList", JSON.stringify(peopleList));
     showData();

}



// step 5: fucntion to update/edit data from localstorage
function updateData(index){
    //submit btn will hide and update btn will show for updating of data in local storage
  document.getElementById("submit").style.display="none";
  document.getElementById("update").style.display="block";
     
  var peopleList;
  if(localStorage.getItem("peopleList") == null){
      peopleList = [];
   }else{
       peopleList = JSON.parse(localStorage.getItem("peopleList"));
   }

   document.getElementById("name").value = peopleList[index].name;
   document.getElementById("position").value = peopleList[index].position;
   document.getElementById("address").value = peopleList[index].address;
   document.getElementById("email").value = peopleList[index].email;



   document.querySelector("#update").onclick = function(){
      if(validateForm() == true){
        peopleList[index].name = document.getElementById("name").value;
        peopleList[index].position = document.getElementById("position").value;
        peopleList[index].address = document.getElementById("address").value;
        peopleList[index].email = document.getElementById("email").value;
         


        localStorage.setItem("peopleList", JSON.stringify(peopleList));

        showData();


        document.getElementById("name").value = "";
        document.getElementById("position").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";





         //update btn will hide and submit  btn will show after updating the data 
            document.getElementById("submit").style.display="block";
            document.getElementById("update").style.display="none";
      }
   }
}
