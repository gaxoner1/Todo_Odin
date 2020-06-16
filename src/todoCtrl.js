import { domCtrl }  from './domCtrl'; 


const todoCtrl = (() => {
  let toDoList;

  class ToDo{
    constructor(body, category, completed = false){
      this.body = body; //string
      this.category = category; //string
      this.completed = completed; //boolean
    }
    getBody(){
      return this.body;
    }
    getCompleted(){
      return this.completed;
    }
    getCategory(){
      return this.category;
    }
    setBody(body){
      this.body = body;
    }
    setCompleted(completed){
      this.completed = completed;
    }
    setCategory(category){
      this.category = category;
    }
  };

  class ToDoList{
    constructor(list){
      this.toDoList = list //array;
    }
    //add a todo item to the 'this' list
    addToDo(todo){
      this.toDoList.push(todo);
    }

    delete(index){
      this.toDoList.splice(index, 1);
    }

    // edit(targetIndex){
    //   let editable_array = this.toDoList[targetIndex]; //this is the object of body & category when edit clicked (target element)
    //   let editable_content = document.getElementsByTagName('p')[targetIndex];// this is the 'p' element that corresponds to target element clicked by using same index value.
    //   //console.log(editable_content.getAttribute('contenteditable'));//should returns boolean;
    //   editable_content.setAttribute('contenteditable', true);//make content editable
    // }

    save(){
      //save the toDoList array to local sotrage
      localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
      //TODO Refresh the DOM because we just did an update
      console.log(this.toDoList)
      domCtrl.refreshToDoList(this.toDoList);
      //TODO reattach the event listeners to DOM
      attachEventListeners();
    }
  };

  //init called when starting web app.
  const init = () => { 
  console.log("Hi from init in list.js"); 
  if (localStorage.toDoList) {
    const storedToDoArr = JSON.parse(localStorage.getItem('toDoList'));
    toDoList = new ToDoList(storedToDoArr)
  } else {
    toDoList = new ToDoList([]);
    toDoList.save();
  }

  //Page initialization
  domCtrl.init(toDoList.toDoList);
  attachEventListeners();
};

  const attachEventListeners = () => {
    //TODO add listeners to buttons, etc.
    let newToDoButton = domCtrl.getNewToDoButton();
    newToDoButton.addEventListener('click', function(){
    console.log('Button Clicked');
    //once clicked we want to add input from user (in body/category) to array
    let toDoBody = domCtrl.getNewToDoBody(); //calls function that returns body
    let toDoCategory = domCtrl.getNewToDoCategory(); // calls function that returns category
    let newTodo = new ToDo(toDoBody, toDoCategory); //pass body & category into constructor
    console.log(newTodo); //newTodo creates object cuz its constructor: e {body: "s", category: "s", completed: false}
    console.log(toDoList); //??? - toDoList is the array of objects ie: 0: {body: "s", category: "s", completed: false}
    toDoList.addToDo(newTodo);
    toDoList.save();
  });

    //attach event listener to delete button (foreach)
    document.querySelectorAll('.delete_button').forEach(item =>{
      item.addEventListener('click', event => {
        console.log(`delete button a todo ${item.id}`)
        let item_index = item.id;
        toDoList.delete(item_index)
        //deleteToDo(item_index);
        toDoList.save();
    })
  });

    document.querySelectorAll('.edit_button').forEach(item =>{
      item.addEventListener('click', event => {
        console.log(`edit button on todo ${item.id}`)
        //trigger a modal to generate:
        domCtrl.genModal();
        //toDoList.edit(item.id); // id is the number in array we pass
        //deleteToDo(item_index);
        //let newTodo = new ToDo(toDoBody, toDoCategory); //pass body & category into constructor
        //toDoList.addToDo(newTodo);
        //toDoList.save();
      })
    });
} //end of attacheventlistener function

  return { init };
 })(); 


export { todoCtrl };



// START take input from form-after submit clicked(START)
// document.getElementById('tsubmit').addEventListener('click', addTask);
// let taskList =[];
// const addTask = (e) =>{
//   e.preventDefault();
//   let taskList = {
//     name: document.getElementById('tname').value,
//     description: document.getElementById('tdesc').value,
//     dueDate: document.getElementById('tdate').value
//   }
//   // taskList.push(addTask);
//   console.log(taskList);
// }
/// END take input from form-after submit clicked(END)
