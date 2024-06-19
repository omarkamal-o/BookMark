var siteName = document.getElementById('sitename');
var siteUrl= document.getElementById('siteurl');
var sitesContainer;

// localStorage.clear(sitesContainer);

if (localStorage.getItem("site") == null) {
    sitesContainer=[];
}
else{
    sitesContainer = JSON.parse(localStorage.getItem('site'));
    displaySites();
}

function addSites() {
    if (validateName()) {
    var sites = {
        name: siteName.value ,
        url: siteUrl.value,
    };
    sitesContainer.push(sites);
    clearSites();
    displaySites();
    localStorage.setItem('site', JSON.stringify(sitesContainer));
}
}
function clearSites() {
    siteName.value=null;
    siteUrl.value=null;
}  
function displaySites() {
   var display = ``;
    for (var i =0 ;i < sitesContainer.length;i++){
        display += ` <tr class='site'>
            <th class="ps-5 f-result pt-3" scope="row">`+(i+1)+`</th>
            <td class="f-result pt-3">`+sitesContainer[i].name+`</td>
            <td class=""><a href=`+sitesContainer[i].url+` target="_blank"><button class="btn btn-visit"><i class="fa fa-solid fa-eye pe-2"></i>Visit</button></a></td>
            <td><button onclick='deleteSites(${i})' class="btn btn-delete pe-2"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
          </tr> `;
    }
    document.getElementById('tableBody').innerHTML=display;   
}
function deleteSites(index) {
    console.log(index);
    sitesContainer.splice(index,1)
     displaySites(sitesContainer)
     localStorage.setItem('site', JSON.stringify(sitesContainer));
}
function validateName() {
    // var regex = /^\w{3,}$/;
    var regex = /^\w{3,}(\s+\w+)*$/ ;
    if (regex.test(siteName.value)==true) {
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid"); 
        return true ;
    }else {
        siteName.classList.add('is-invalid');
        siteName.classList.remove("is-valid");
        return false ;
    }
}
function validateUrl(){
    // var regex =/.com/g;
    var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/ ;
    if (regex.test(siteUrl.value)==true) {
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid"); 
        return true ;
    }else {
        siteUrl.classList.add('is-invalid');
        siteUrl.classList.remove("is-valid");
        return false ;
    }
}