export class UI {

    constructor(){
        this.employeesList = document.getElementById("employees");
        this.updateButton = document.getElementById("update");
        this.nameInput = document.getElementById("name");
        this.departmentInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");
        this.cardBody = document.querySelector(".card-body");
    }

    addAllEmployeesToUI(employees){

        let result = "";
        employees.forEach(employee => {
            result += `
            <tr>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
            </tr> 
            `
        });
        this.employeesList.innerHTML = result;

    }

    clearInputs(){
        this.nameInput.value = "";
        this.departmentInput.value = "";
        this.salaryInput.value = "";
    }

    addNewEmployeeToUI(newEmployee){

        this.employeesList.innerHTML += `
            <tr>
                <td>${newEmployee.name}</td>
                <td>${newEmployee.department}</td>
                <td>${newEmployee.salary}</td>
                <td>${newEmployee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
            </tr>
        `;
    }

    deleteEmployeeFromUI(element){
        element.remove();
    }

    hiddenUpdateButton(target){
        if (this.updateButton.style.display === "none"){
            this.updateButton.style.display = "block";
            this.addEmployeeInfoToInputs(target);
        }
        else {
            this.updateButton.style.display = "none";
            this.clearInputs();
        }
    }
    
    addEmployeeInfoToInputs(target){
        const children = target.children;
        this.nameInput.value = children[0].textContent;
        this.departmentInput.value = children[1].textContent;
        this.salaryInput.value = children[2].textContent;
    }

    updateEmployeeOnUI(updatedEmployee,element){
        element.innerHTML = `
        <tr>
            <td>${updatedEmployee.name}</td>
            <td>${updatedEmployee.department}</td>
            <td>${updatedEmployee.salary}</td>
            <td>${updatedEmployee.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
        `;

        this.updateButton.style.display = "none";

    }

    displayMessage(type,message){
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        this.cardBody.appendChild(alert);

        setTimeout(function(){
            alert.remove();
        },1100);
    }
}