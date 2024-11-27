let new_person_button = document.getElementById("new_person_button");
let get_documents_button = document.getElementById("get_documents_button");
let new_person = document.getElementById("new_person");
let get_documents = document.getElementById("get_documents");
let title = document.getElementById("title");
let clear_data = document.getElementById("clear_data");

get_documents_button.addEventListener("click", e=>{
    title.textContent = "Скачать документы"
    new_person_button.style = "background-color: white;";
    get_documents_button.style = "background-color: rgba(211, 211, 211, 0.812);";
    new_person.hidden = true;
    get_documents.hidden = false;
    clear_data.hidden = true;
    add_data.hidden = true;
});

new_person_button.addEventListener("click", e=>{
    title.textContent = "Заполнить данные"
    new_person_button.style = "background-color: rgba(211, 211, 211, 0.812)";
    get_documents_button.style = "background-color: white";
    new_person.hidden = false;
    get_documents.hidden = true;
    clear_data.hidden = false;
    add_data.hidden = false;
});


clear_data.addEventListener("click", e=>{
    let characteristics = document.getElementsByClassName("characteristic");
    for (let index = 0; index < characteristics.length; index++) {
        const characteristic = characteristics[index];
        characteristic.value = "";
    }
});

change_button.click()