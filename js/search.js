import { GetUniqueGroups, showStudentsByFilter } from "./db.js";
const searchForm = document.querySelector('.search-body .form');
const searchGroupList = document.querySelector('.search-body .select-list')

export function UpdateSearchGroupList() {

    while(searchGroupList.firstChild) {
        searchGroupList.removeChild(searchGroupList.firstChild);
    }

    let groups = GetUniqueGroups();
    
    for (let i = 0; i < groups.length; i++) {
        let tr = `
        <option value='${groups[i]}'>${groups[i]}</option>
    `;
    searchGroupList.insertAdjacentHTML('beforeend', tr);
    }

    let noneTr = `
        <option value='' selected>Выберите группу</option>
    `;
    searchGroupList.insertAdjacentHTML('afterbegin', noneTr);

}

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    showStudentsByFilter(
        searchForm.firstName.value,
        searchForm.lastName.value,
        searchForm.birthdayFrom.value,
        searchForm.birthdayTo.value,
        searchForm.groupList.value
    )
});

