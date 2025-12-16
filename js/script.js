const menu = {
    menu: null,
    button: null,

    init(selector_menu, selector_button){
        this.menu = document.querySelector(selector_menu);
        this.button = document.querySelector(selector_button);
    },

    open(){
        this.menu.classList.remove('main-nav_closed');
        this.button.classList.remove('nav-btn_open');
        this.button.classList.add('nav-btn_close');
        this.button.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
    },

    close(){
        this.menu.classList.add('main-nav_closed');
        this.button.classList.remove('nav-btn_close');
        this.button.classList.add('nav-btn_open');
        this.button.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
    }
}

menu.init('nav.main-nav', 'button.nav-btn');

menu.close();

menu.button.addEventListener('click', (e) => {
    if(e.target.classList.contains('nav-btn_open')){
        menu.open();
    } 
    else {
        menu.close();
    }
});

function getComparer(prop) {
    return function (a, b) {
        if (a[prop] < b[prop]) {
            return -1;
        }
        
        if (a[prop] > b[prop]) {
            return 1;
        }

        return 0;
    }
};

const skills = {
    elem: null,
    data: [],
    sortMode: null,

    init(selector) { this.elem = document.querySelector(selector); },

    getData(json_path) {
        fetch(json_path)
        .then(promise_obj => promise_obj.json())
        .then(json_data => {
            this.data = json_data;
            this.generateList();
        })
        .catch(() => console.error('что-то пошло не так'));
    },

    generateList() {
        if (this.data.length !== 0) {
            this.elem.parentNode.style = "";
            this.elem.innerHTML = "";
            this.data.forEach((item) => {
                const dt = document.createElement("dt");
                dt.style.backgroundImage = `url("img/${item.image}")`;
                dt.className = "skill-item";
                dt.textContent = item.name;
                this.elem.append(dt);

                const div = document.createElement("div");
                div.style.width = `${item.level}%`;
                div.textContent = `${item.level}%`;

                const dd = document.createElement("dd");
                dd.className = "skill-level";
                dd.append(div);
                this.elem.append(dd);
            })
        }
    },

    sortList(object_sort) {
        if(this.sortMode === object_sort) {
            this.data.reverse();
        } else {
            this.data.sort(getComparer(object_sort));
            this.sortMode = object_sort;
        }
    }
}

skills.init("dl.skill-list");
skills.getData("db/skills.json");

const skills_sort = document.querySelector("div.skills-sort");

skills_sort.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        const type = e.target.dataset.type;
        switch (type) {
            case 'name':
                skills.sortList(type);
                skills.generateList(skills);
            break;

            case 'level':
                skills.sortList(type);
                skills.generateList(skills);
            break;

            default:
                console.log('not find button');
            break;
        }
    }
});