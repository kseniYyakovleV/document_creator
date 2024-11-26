let new_person_button = document.getElementById("new_person_button");
let get_documents_button = document.getElementById("get_documents_button");
let new_person = document.getElementById("new_person");
let get_documents = document.getElementById("get_documents");

get_documents_button.addEventListener("click", e=>{
    new_person_button.style = "background-color: white;";
    get_documents_button.style = "background-color: rgba(211, 211, 211, 0.812);";
    new_person.hidden = true;
    get_documents.hidden = false;
});

new_person_button.addEventListener("click", e=>{
    new_person_button.style = "background-color: rgba(211, 211, 211, 0.812)";
    get_documents_button.style = "background-color: white";
    new_person.hidden = false;
    get_documents.hidden = true;
});