import { collection, query, where, getDocs, addDoc, deleteDoc, doc, onSnapshot, orderBy } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
import { db } from "./firestoreConfig.js"
import { UpdateSearchGroupList } from "./search.js";
import { renderStudent, removeStudentRenderById, clearStudentRenders } from "./studentsList.js";

var docsList = [];

onSnapshot(collection(db, "students"), (snapshot) => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            docsList.push(change.doc);
            renderStudent(change.doc);
        }
        if (change.type == 'removed') {
            const index = docsList.indexOf(change.doc);
            console.log(index);
            docsList.splice(index);
            removeStudentRenderById(change.doc.id);
        }
    })
    UpdateSearchGroupList();
});

export function showStudentsByFilter(firstName, lastName, birthdayFrom, birthdayTo, group) {
    clearStudentRenders();
    
    var q = query(collection(db, "students"));

    docsList.forEach((doc) => {
        let passes = true;
        
        if (firstName != '') {
            if (doc.data().firstName != firstName && !doc.data().firstName.toLowerCase().includes(firstName.toLowerCase())) {
                passes = false;
            }
        }
        if (lastName != '') {
            if (doc.data().lastName != lastName && !doc.data().lastName.toLowerCase().includes(lastName.toLowerCase())) {
                passes = false;
            }
        }
        if (birthdayFrom != '') {
            if (Date.parse(doc.data().birthday) < Date.parse(birthdayFrom)) {
                passes = false;
            }
        }
        if (birthdayTo != '') {
            if (Date.parse(doc.data().birthday) > Date.parse(birthdayTo)) {
                passes = false;
            }
        }
        if (group != '') {
            if (doc.data().group != group) {
                passes = false;
            }
        }

        if (passes) {
            renderStudent(doc);
        }
    });
}

export function GetUniqueGroups() {
    var q = query(collection(db, "students"));
    var fields = [];
    docsList.forEach((doc) => {
        fields.push(doc.data().group);
    });
    return fields.filter(onlyUnique);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

export async function addToDB(firstName, lastName, birthday, group) {
    let docRef = await addDoc(collection(db, "students"), {
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        group: group
    });
    return docRef;
}

export async function deleteFromDB(id) {
    await deleteDoc(doc(db, "students", id));
}