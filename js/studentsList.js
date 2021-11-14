import { deleteFromDB } from "./db.js";

const tableUsers = document.querySelector('.table-users');

export const removeStudentRenderById = (id) => {
    let tr = document.querySelector(`[data-id='${id}']`);
    let tbody = tr.parentElement;
    tableUsers.removeChild(tbody);
}

export const clearStudentRenders = () => {
    while(tableUsers.firstChild) {
        tableUsers.removeChild(tableUsers.firstChild);
    }

    const headerTr = `
        <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Дата рождения</th>
            <th>Группа</th>
            <th>Действие</th>
        </tr>
    `;
    tableUsers.insertAdjacentHTML('afterbegin', headerTr);
}

export const renderStudent = doc => {
    const tr = `
        <tr data-id='${doc.id}'>
            <td>${doc.data().firstName}</td>
            <td>${doc.data().lastName}</td>
            <td>${doc.data().birthday}</td>
            <td>${doc.data().group}</td>
            <td>
                <button class="btn btn-delete">Удалить</button>
            </td>
        </tr>
    `;
    tableUsers.insertAdjacentHTML('beforeend', tr);
    //Удаление студента
    const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
    btnDelete.addEventListener('click', () => {
        deleteFromDB(doc.id);
    })
}
