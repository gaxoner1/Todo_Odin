import { domCtrl }  from './domCtrl'; 


const todoCtrl = (() => {
  let toDoList;

  class ToDo{
    constructor(title, body, completed = false){
      this.title = title; //string
      this.body = body; //string
      this.completed = completed; //boolean
    }
    getTitle(){
      return this.title;
    }
    getCompleted(){
      return this.completed;
    }
    getBody(){
      return this.body;
    }
    setTitle(title){
      this.title = title;
    }
    setCompleted(completed){
      this.completed = completed;
    }
    setBody(body){
      this.body = body;
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

    //we passed from edit event listener- the target todo obj ,the edited title and edited body
    edit(targetIndex, newTitle, newBody){
      let editable_array = this.toDoList[targetIndex]; //this is the object of title & body when edit clicked (target element)
      editable_array.title = newTitle  //updates todolist.title with edited title
      editable_array.body = newBody //updates todolist.body with edited body
      console.log(editable_array); //check that target object is updated with edited body and edited title.
      //console.log(editable_array.title);
      //console.log(editable_array.body);
    }

    save(){
      //(*** TO DO here or elsewhere: add a verification to make sure input is not empty)
      //save the toDoList array to local sotrage
      localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
      console.log(this.toDoList)
      //TODO Refresh the DOM because we just did an update
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
    let newToDoButton = domCtrl.getNewToDoButton();
    newToDoButton.addEventListener('click', function(){
    console.log('Button Clicked');
    //once clicked we want to add input from user (in title/body) to array
    let toDoTitle = domCtrl.getNewToDoTitle(); //calls function that returns title
    let toDoBody = domCtrl.getNewToDoBody(); // calls function that returns body
    let newTodo = new ToDo(toDoTitle, toDoBody); //pass title & body into constructor
    console.log(newTodo); //newTodo creates object cuz its constructor: e {title: "s", body: "s", completed: false}
    console.log(toDoList); //??? - toDoList is the array of objects ie: 0: {title: "s", body: "s", completed: false}
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

        //***TODO WRAP doneEditBtn into function(const =()=>{})...
        let doneEditBtn = document.querySelector('#done');
        doneEditBtn.addEventListener('click', function(){
          console.log('Done Button Clicked');
          let editToDoTitle = domCtrl.getModuleTitle(); //calls function that returns modal title
          console.log(`here is the modal title:--> ${editToDoTitle}`);
          let editToDoBody = domCtrl.getModuleBody(); //calls function that returns modal title
          console.log(`here is the modal body:--> ${editToDoBody}`);
          toDoList.edit(item.id, editToDoTitle, editToDoBody); // id is the number in array we pass so we can get content so user can edit (its an object w/ properties title:xxx & body: xxx)
          toDoList.save();

        });

      })
    });



  //   let doneEditBtn = domCtrl.getDoneButton();
  //   doneEditBtn.addEventListener('click', function(){
  //   console.log('Done Button Clicked');
  //   //once clicked we want to add input from user (in title/body) to array
  //   let editToDotitle = domCtrl.getModuleTitle(); //calls function that returns title
  //   console.log(`here is the modal title ${editToDoTitle}`);
  //   //let editToDoBody = domCtrl.getNewToDoBody(); // calls function that returns body
  //   //let newTodo = new ToDo(toDotitle, toDoBody); //pass title & body into constructor
  // });

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
