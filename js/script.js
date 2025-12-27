const menu = {
    menu: null,
    button: null,

    init(selectorMenu, selectorButton){
        this.menu = document.querySelector(selectorMenu);
        this.button = document.querySelector(selectorButton);
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

    getData(jsonPath) {
        fetch(jsonPath)
        .then(promiseObj => promiseObj.json())
        .then(jsonData => {
            this.data = jsonData;
            this.generateList();
        })
        .catch(() => console.error('что-то пошло не так'));
    },

    generateList() {
        if (this.data.length !== 0) {
            this.elem.parentNode.style = "";
            this.elem.innerHTML = `
            <div class="skills-head">
                <h2>Мои навыки</h2>
                <div class="skills-sort">
                    <p>Сортировать</p>
                    <button data-type="name">по названию</button>
                    <button data-type="level">по уровню</button>
                </div>
            </div>
            <dl class="skill-list">
            </dl>
            `;
            let childElem = this.elem.children[1];
            this.data.forEach((item) => {
                const dt = document.createElement("dt");
                dt.style.backgroundImage = `url("img/${item.image}")`;
                dt.className = "skill-item";
                dt.textContent = item.name;
                childElem.append(dt);

                const div = document.createElement("div");
                div.style.width = `${item.level}%`;
                div.textContent = `${item.level}%`;

                const dd = document.createElement("dd");
                dd.className = "skill-level";
                dd.append(div);
                childElem.append(dd);
            })
            const skillsSort = document.querySelector("div.skills-sort");
            skillsSort.addEventListener('click', (e) => {
                if (e.target.nodeName === 'BUTTON') {
                    const type = e.target.dataset.type;
                    console.log(1);
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
        }
    },

    sortList(objectSort) {
        if(this.sortMode === objectSort) {
            this.data.reverse();
        } else {
            this.data.sort(getComparer(objectSort));
            this.sortMode = objectSort;
        }
    }
}

skills.init("section.section-skills");
skills.getData("db/skills.json");