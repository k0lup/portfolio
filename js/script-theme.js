const theme_switch = document.querySelector("input.switch-checkbox");
const tag_body = document.querySelector("body");

function addTransitionAnimation(){
    tag_body.classList.add('on-transition');
    document.querySelector("footer").classList.add('on-transition');
    document.querySelector("a.contact-link_phone").classList.add('on-transition');
    document.querySelector("a.contact-link_email").classList.add('on-transition');
}

function saveThemeStatus(status){
    if(status === true){
        localStorage.setItem('theme_status', 'light');
    } else {
        localStorage.setItem('theme_status', 'dark');
    }
}

function setTheme(){
    if(theme_switch.checked === true){
        tag_body.classList.remove('dark-theme');
    } else {
        tag_body.classList.add('dark-theme');
    }
    saveThemeStatus(theme_switch.checked);
}

if (localStorage.getItem('theme_status') === null){
    localStorage.setItem('theme_status', 'light');
}

theme_switch.checked = localStorage.getItem('theme_status') === 'light';
setTheme();

theme_switch.addEventListener("click", setTheme);
theme_switch.addEventListener("click", addTransitionAnimation, {once : true});