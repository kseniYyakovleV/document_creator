let parameters_button = document.getElementById("parameters_button");
let find_button = document.getElementById("find_button");
let parameters_header = document.getElementById("parameters_header");
let find_header = document.getElementById("find_header");
let selecting_name_version = document.getElementById("selecting_name_version");
let search_bar = document.getElementById("search_bar");
let filter_row = document.getElementById("filter_row");
let full_name_objs = document.getElementsByClassName("full_name");
let short_name_objs = document.getElementsByClassName("short_name");
let parameters_hr = document.getElementById("parameters_hr");
let find_hr = document.getElementById("find_hr");
let short_name_row = document.getElementById("short_name_row");
let full_name_row = document.getElementById("full_name_row");


let short_name_head = document.getElementById("short_name_head");
let full_name_head = document.getElementById("full_name_head");
let registration_number_head = document.getElementById("registration_number_head");



let element_selecting = document.getElementById("element_selecting");
let selection_checkboxes = document.getElementsByClassName("selection_checkbox");


let rows = document.getElementsByClassName("data")[0].getElementsByTagName("tr");
let find_short_name = document.getElementById("find_short_name");
let find_full_name = document.getElementById("find_full_name");
let find_registration_number = document.getElementById("find_registration_number");
let downloaded_type = document.getElementById("downloaded_type");
let showed_elements = [];


let mini_clear_buttons = document.getElementsByClassName("mini_clear_button");


let message = document.getElementById("message");
let block = document.getElementById("block");


parameters_button.addEventListener("click", e=>{
    parameters_header.hidden = !parameters_header.hidden;
    parameters_hr.hidden = !parameters_hr.hidden;
})

find_button.addEventListener("click", e=>{
    find_header.hidden = !find_header.hidden;
    find_hr.hidden = !find_hr.hidden;
    if (find_header.hidden) {
        document.getElementById("second_line").style = "flex-direction: row;";
        document.getElementById("download").style = " margin-left: 4px;";
    
    } else {
        document.getElementById("second_line").style = "flex-direction: column;";
        document.getElementById("download").style = " margin-left: 0px;";
    }
})

selecting_name_version.addEventListener("change", e=>{
    let hidden_collection, displayed_collection;
    let len;
    if (selecting_name_version.selectedIndex) {
        len = short_name_objs.length;
        displayed_collection = short_name_objs;
        hidden_collection = full_name_objs;
        short_name_row.hidden = false;
        full_name_row.hidden = true;
    } else {
        len = full_name_objs.length;
        displayed_collection = full_name_objs;
        hidden_collection = short_name_objs;
        short_name_row.hidden = true;
        full_name_row.hidden = false;
    }

    for (let index = 0; index < len; index++) {
        hidden_collection[index].hidden = true;
        displayed_collection[index].hidden = false;
    }
})





element_selecting.addEventListener("change", e=>{
    let len = selection_checkboxes.length;
    for (let index = 0; index < len; index++) {
        selection_checkboxes[index].hidden = !element_selecting.checked;
    }
})


function hide() {
    showed_elements = []
    let len = rows.length;
    for (let index = 1; index < len; index++) {
        let element = rows[index];
        result = true;
        result &= element.getElementsByClassName("registration_number")[0].textContent.toLowerCase().includes(find_registration_number.value.toLowerCase());
        let is_downloaded = element.getElementsByClassName("downloaded_checkbox")[0].getElementsByTagName("input")[0].checked;

        let downloaded_type_value = downloaded_type.value;
        result &= (is_downloaded & downloaded_type_value == "only_downloaded") | 
            (!is_downloaded & downloaded_type_value == "only_not_downloaded") | 
            (downloaded_type_value == "all");
        
        if (selecting_name_version.selectedIndex) {
            let short_name_value = element.getElementsByClassName("short_name")[0].textContent.toLowerCase();
            result &= short_name_value.includes(find_short_name.value.toLowerCase());
        } else {
            let full_name_value = element.getElementsByClassName("full_name")[0].textContent.toLowerCase();
            result &= full_name_value.includes(find_full_name.value.toLowerCase());
        }

        if (result) { 
            showed_elements.push(element); 
            element.hidden = false;
        } else {
            element.hidden = true;
        }
    }   
}

hide()

find_short_name.addEventListener("input", hide);
find_full_name.addEventListener("input", hide);
find_registration_number.addEventListener("input", hide);
downloaded_type.addEventListener("change", hide);
selecting_name_version.addEventListener("change", hide);

function check_all() {
    let len = showed_elements.length;
    for (let index = 0; index < len; index++) {
        let element = showed_elements[index];
        element.getElementsByClassName("selection_checkbox")[0].getElementsByTagName("input")[0].checked = true;
    }
}

function uncheck_all() {
    let len = showed_elements.length;
    for (let index = 0; index < len; index++) {
        let element = showed_elements[index];
        element.getElementsByClassName("selection_checkbox")[0].getElementsByTagName("input")[0].checked = false;
    }
}


for (let index = 0; index < mini_clear_buttons.length; index++) {
    let element = mini_clear_buttons[index];
    element.addEventListener("click", e=>{
        element.parentElement.parentElement.getElementsByTagName("input")[0].value = "";
        hide();
    });
}


function show_message() {
    message.hidden = false;
    block.hidden = false;
}

function hide_message() {
    message.hidden = true;
    block.hidden = true;
}
