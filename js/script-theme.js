const themeSwitch = document.querySelector("input.switch-checkbox");
const tagBody = document.querySelector("body");

function addTransitionAnimation(){
    tagBody.classList.add('on-transition');
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
    if(themeSwitch.checked === true){
        tagBody.classList.remove('dark-theme');
    } else {
        tagBody.classList.add('dark-theme');
    }
    saveThemeStatus(themeSwitch.checked);
}

if (localStorage.getItem('theme_status') === null){
    localStorage.setItem('theme_status', 'light');
}

themeSwitch.checked = localStorage.getItem('theme_status') === 'light';
setTheme();

themeSwitch.addEventListener("change", setTheme);
themeSwitch.addEventListener("change", addTransitionAnimation, {once : true});