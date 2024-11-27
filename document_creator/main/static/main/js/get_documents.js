let new_person_form = document.getElementById("new_person_form");
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

let len_full_name_cells = document.getElementsByClassName("full_name").length
let first_full_name_cell = document.getElementsByClassName("full_name")[len_full_name_cells-1];
first_full_name_cell.style = "border-bottom-left-radius: 10px;"
let second_full_name_cell = document.getElementById("full_name_head")
second_full_name_cell.style = "border-top-left-radius: 10px;"

let add_data = document.getElementById("add_data");


let mini_clear_buttons = document.getElementsByClassName("mini_clear_button");


let message = document.getElementById("message");
let person_manage = document.getElementById("person_manage");
let block = document.getElementById("block");
let open_data = document.getElementById("open_data");
let delete_data = document.getElementById("delete_data");
let delete_person_form = document.getElementById("delete_person_form");
let delete_person_form_input = document.getElementById("delete_person_form_input");

let download_showed_items_button = document.getElementById("download_showed_items_button");
let download_all_items_button = document.getElementById("download_all_items_button");

let choosing_person = null;


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
    person_manage.hidden = true;
    message.hidden = true;
    block.hidden = true;
}

add_data.addEventListener("click", e=>{
    let formdata = new FormData();
    let inputs = new_person_form.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; index++) {
        let element = inputs[index];
        formdata.append(element.name, element.value)
    }
    new_person_form.submit();
})



function update_input_width() {
    let inputs = new_person_form.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; index++) {
        let element = inputs[index];
        
        if (screen.orientation.type === "landscape-primary") {
            element.size = 60;
        } else {
            element.size = 25;
        }
    }
}
update_input_width();


function get_selected_items(){
    let selectedItems = new Set()
    for (let index = 1; index < rows.length; index++) {
        let row = rows[index];
        let is_checked = row.getElementsByTagName("input")[1].checked;
        if (is_checked) {
            selectedItems.add(row);
        }
    }
    return selectedItems;
}

function get_selected_showed_items() {
    let showed_items = new Set(showed_elements);
    let result = showed_items.intersection(get_selected_items());
    return result;
}

function check_downloaded_elements(elements) {
    elements.forEach(function(value1, value2, set){
        value1.getElementsByClassName("downloaded_checkbox")[0].getElementsByTagName("input")[0].checked = true
    });
    
}

download_showed_items_button.addEventListener("click", e=>{
    let getted_elements = get_selected_showed_items();
    let getted_elements_id = [];
    getted_elements.forEach(function(value1, value2, set){
        getted_elements_id.push(value1.getElementsByClassName("row_id")[0].value);
    });
    if (getted_elements_id.length > 0){
        check_downloaded_elements(getted_elements)
        let url = `/create_archive?indexes=${getted_elements_id.join(',')}`;
        window.location.replace(url);
    }
})

download_all_items_button.addEventListener("click", e=>{
    let getted_elements = get_selected_items();
    let getted_elements_id = [];
    getted_elements.forEach(function(value1, value2, set){
        getted_elements_id.push(value1.getElementsByClassName("row_id")[0].value);
    });
    if (getted_elements_id.length > 0){
        check_downloaded_elements(getted_elements)
        let url = `/create_archive?indexes=${getted_elements_id.join(',')}`;
        window.location.replace(url);
    }
})

function get_json(){

}

for (let index = 1; index < rows.length; index++) {
    const row = rows[index];
    row.getElementsByClassName("short_name")[0].addEventListener("click", e=>{
        choosing_person = row;
        block.hidden = false;
        person_manage.hidden = false;
    });
    row.getElementsByClassName("full_name")[0].addEventListener("click", e=>{
        choosing_person = row;
        block.hidden = false;
        person_manage.hidden = false;
    });
    row.getElementsByClassName("registration_number")[0].addEventListener("click", e=>{
        choosing_person = row;
        block.hidden = false;
        person_manage.hidden = false;
    });
}

open_data.addEventListener("click", e=>{
    let id = choosing_person.getElementsByClassName("row_id")[0].value;
    let url = `/main_page?id=${id}`
    window.location.replace(url);
})


delete_data.addEventListener("click", e=>{
    let id = choosing_person.getElementsByClassName("row_id")[0].value;
    delete_person_form_input.value = id;
    delete_person_form.submit();
})