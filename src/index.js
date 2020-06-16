//console.log('hello')
import { todoCtrl } from './todoCtrl'; 

const main = ((todo) => { 
  const init = () => { 
    console.log("Hi from from init in index.js");
     todo.init();
   } 
  return { init }; 
})(todoCtrl);  

 main.init(); 

 class Task {
   constructor(name, description, dueDate) {
     this.name = name;
     this.description = description;
     this.dueDate = dueDate;
   }
 }
// let taskList;
// document.getElementById('tsubmit').addEventListener('click', addTask);
// taskList =[];
// const addTask = (e) =>{
//   e.preventDefault();
//   let taskList = {
//     name: document.getElementById('tname').value,
//     description: document.getElementById('tdesc').value,
//     dueDate: document.getElementById('tdate').value
//   }
//   taskList.push(addTask);
//   console.log(taskList);
// }
