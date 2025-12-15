const theme_switch = document.querySelector("input.switch-checkbox");
const tag_body = document.querySelector("body");

function addTransitionAnimation(){
    tag_body.classList.add('on-transition');
    document.querySelector("footer").classList.add('on-transition');
    document.querySelector("a.contact-link_phone").classList.add('on-transition');
    document.querySelector("a.contact-link_email").classList.add('on-transition');
}

function saveStatusTheme(status){
    if(status === true){
        localStorage.setItem('status_theme', 'light');
    } else {
        localStorage.setItem('status_theme', 'dark');
    }
}

function changeTheme(){
    if(theme_switch.checked === true){
        tag_body.classList.remove('dark-theme');
    } else {
        tag_body.classList.add('dark-theme');
    }
    saveStatusTheme(theme_switch.checked);
}

if (localStorage.getItem('status_theme') === null){
    localStorage.setItem('status_theme', 'light');
}

theme_switch.checked = localStorage.getItem('status_theme') === 'light';
changeTheme();

theme_switch.addEventListener("click", changeTheme);
theme_switch.addEventListener("click", addTransitionAnimation, {once : true});