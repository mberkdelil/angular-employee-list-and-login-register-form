import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from './employee.model';
import * as uuid from 'uuid';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  employeeList: Array<any> = [];
  editEmploye: any;
  id: string = "";

  employeeModel: EmployeeModel = new EmployeeModel();

  employeeForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl(0, [Validators.required]),
    salary: new FormControl(0, [Validators.required]),
    image:new FormControl("")
  });

  editForm = new FormGroup({
    id: new FormControl(""),
    firstName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl(0, [Validators.required]),
    salary: new FormControl(0, [Validators.required]),
    image: new FormControl("")
  });

  constructor(private api: ApiService) {
    this.getEmployee();
  }

  ngOnInit(): void { }

  postEmployee() {
    let myId = uuid.v4();

    this.employeeModel.id = myId;
    this.employeeModel.firstName = this.employeeForm.value.firstName;
    this.employeeModel.lastName = this.employeeForm.value.lastName;
    this.employeeModel.email = this.employeeForm.value.email;
    this.employeeModel.phone = this.employeeForm.value.phone;
    this.employeeModel.salary = this.employeeForm.value.salary;
    this.employeeModel.image=this.employeeForm.value.image

    this.api.postEmployee(this.employeeModel).subscribe((res) => {
    })
    this.employeeForm.reset();
    this.getEmployee();
  }

  getEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeList = res;
    })
  }

  deleteEmployee(id: any) {
    this.api.deleteEmployee(id).subscribe((res) => {
      console.log(res);
      this.getEmployee();
    })
  }

  updateEmploye(id: string) {
    this.api.getEditEmployee(id).subscribe((res: any) => {
      this.id = res.id;
      this.editForm.controls['firstName'].setValue(res.firstName);
      this.editForm.controls['lastName'].setValue(res.lastName);
      this.editForm.controls['email'].setValue(res.email);
      this.editForm.controls['phone'].setValue(res.phone);
      this.editForm.controls['salary'].setValue(res.salary);
      this.editForm.controls['image'].setValue(res.image)
    })
  }

  updatedEmployee() {
    this.employeeModel.firstName = this.editForm.value.firstName;
    this.employeeModel.lastName = this.editForm.value.lastName;
    this.employeeModel.email = this.editForm.value.email;
    this.employeeModel.phone = this.editForm.value.phone;
    this.employeeModel.salary = this.editForm.value.salary;
    this.employeeModel.image = this.editForm.value.image;
    this.api.updateEmployee(this.id, this.employeeModel).subscribe((res) => {
      console.log(res);
      alert("The Employee Is Successfully Updated. ")
      this.getEmployee();
    })
  }

}
