console.log("start");


function main(){
    let buttons = document.getElementsByClassName("clear_button");
    for (let index = 0; index < buttons.length; index++) {
        const button = buttons[index];
        button.addEventListener("click", function clear_field(event){
            let input_field = button.parentElement.parentElement.getElementsByTagName("input")[0];
            input_field.value = "";
        });
    }
}

main();

