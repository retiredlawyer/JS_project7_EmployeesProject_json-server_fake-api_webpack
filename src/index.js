// Import İşlemleri
import {Request} from "./request";
import {UI} from "./ui";

// Elementleri seçme
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const hiddenUpdateButton = document.getElementById("update");


const request = new Request("http://localhost:3000/employees");
const ui = new UI();

let updateState = null;

/*               // REQUEST DENEMELERİ
request.get()
.then(employees => console.log(employees))
.catch(err => console.error(err));

request.post({"name": "Hasan","department": "Baro","salary": "ÜçKağıt"})
.then(response => console.log(response))
.catch(err => console.error(err));

request.put(1,{
    "name": "Babageldi",
    "department": "Genetik",
    "salary": 150000 })
.then(response => console.log(response))
.catch(err => console.error(err));

request.delete(2)
.then(response => console.log(response))
.catch(err => console.error(err));
*/

eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded",getAllEmployees);
    form.addEventListener("submit",addEmployee);
    employeesList.addEventListener("click",updateOrDelete);
    hiddenUpdateButton.addEventListener("click",updateEmployee);
}

function updateOrDelete(e){

    if (e.target.id === "delete-employee") {
        deleteEmployee(e.target);
    }
    else if (e.target.id === "update-employee") {
        updateEmployeeController(e.target.parentElement.parentElement);
    }

}

function addEmployee(e){

    const employeeName = nameInput.value.trim();
    const departmentName = departmentInput.value.trim();
    const employeeSalary = Number(salaryInput.value.trim());

    if (employeeName === "" || departmentName === "" || employeeSalary === "") {
        alert("Lütfen tüm alanları doldurunuz!");
    }
    else {

        request.post({"name":employeeName,"department":departmentName,"salary":employeeSalary})
        .then(newEmployee => {
            ui.addNewEmployeeToUI(newEmployee);
            ui.displayMessage("success","Çalışan başarıyla eklendi!");
        })
        .catch(err => console.error(err));

    }
    


    ui.clearInputs();
    e.preventDefault();
}

function getAllEmployees(){

        request.get()
        .then(employees => {
            ui.addAllEmployeesToUI(employees);

        })
        .catch(err => console.error(err));

}

function deleteEmployee(targetEmployee){
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;

    request.delete(id)
    .then(response => {
        ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
        ui.displayMessage("danger","Çalışan başarıyla silindi!");
    })
    .catch(err => console.error(err));
}

function updateEmployeeController(targetEmployee){
    ui.hiddenUpdateButton(targetEmployee);

    if (updateState === null) {
        updateState = {
            updateId : targetEmployee.children[3].textContent,
            updateParent : targetEmployee
        }
    }
    else {
        updateState = null;
        }
    
}

function updateEmployee(){

    if (updateState){
        const data = {name:nameInput.value.trim(),department:departmentInput.value.trim(),salary:Number(salaryInput.value.trim())};

        request.put(updateState.updateId,data)
        .then(response => {
            ui.updateEmployeeOnUI(response,updateState.updateParent);
            ui.clearInputs();
            ui.displayMessage("info","Çalışan başarıyla güncellendi!");
        })
        .catch(err => console.error(err));
    }
}
