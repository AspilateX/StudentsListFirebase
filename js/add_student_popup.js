import { addToDB } from "./db.js"

const btnAdd = document.querySelector('.btn-add');
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

//Нажата кнопка добавления студента
btnAdd.addEventListener('click', () => {
    addModal.classList.add('modal-show');
})

//Пользователь нажал снаружи окна
window.addEventListener('click', e => {
    if (e.target === addModal) {
        e.target.classList.remove('modal-show');
        clearForm();
    }
})

//Кнопка отправки была нажата
addModalForm.addEventListener('submit', e => {
    e.preventDefault();
    addToDB(
        addModalForm.firstName.value,
        addModalForm.lastName.value,
        addModalForm.birthday.value,
        addModalForm.group.value,
    )
    clearForm();
    addModal.classList.remove('modal-show');
})

function clearForm() {
    addModalForm.firstName.value = '';
    addModalForm.lastName.value = '';
    addModalForm.birthday.value = '';
    addModalForm.group.value = '';
}