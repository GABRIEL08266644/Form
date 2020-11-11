//abre fecha menu
function menuToogle() {
    let menuArea = document.querySelector('.rightside');
    if (menuArea.classList.contains('menu-open') == true) {
        menuArea.classList.remove('menu-open');
    } else {
        menuArea.classList.add('menu-open');
    }
}

//valida conta
let validator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;
        let inputs = form.querySelectorAll('input');
        validator.clearErrors();
        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = validator.checkInput(input);
            if(check !== true){
                send = false;
                validator.showError(input, check);
            }
        }
        if (send){
            form.submit();
        }
    },
    checkInput:(input)=> {
        let rules = input.getAttribute('data-rules');
        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value =='') {
                            return 'Campo obrigatorio!'
                        }
                    break;

                    case 'min': 
                    if(input.value.length < rDetails[1]) {
                        return 'Digite pelo menos '+rDetails[1]+' caractes'
                    }
                    break;

                    case 'email':
                        if(input.value != '') {
                            let regex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'email invalido!';
                            }
                        }
                    break
                }
            }
        }
        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = '#ff0000';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:() => {
        let inputs = form.querySelector('input');
        for(let i=0;i<inputs.length;i++) {
            inputs[i].syile = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0;i<errorElements.length;i++){
            errorElements[i].remove();
        }
    }
};
let form = document.querySelector(".validator");
form.addEventListener('submit', validator.handleSubmit);