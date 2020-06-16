const domCtrl = (() => {
  //call on this function to initalize all DOM related manipulations
  const init = (toDoArray) => { 
    console.log('Hi from init in dom.js')
    //reset page or clear out old content.
    resetContainer();
    //setup ToDo form
    setupPage();
    //diplay
    displayToDoList(toDoArray);
  }; 

  const resetContainer = () => {
    let root_element = document.getElementById('content');
    root_element.innerHTML ="";
  }

  const setupPage = () => {
    createNewToDoForm();
  }

  const createNewToDoForm = () => {
    console.log('Hi from createNewToDoForm in domCtrl.js');
		let root_element = document.getElementById('content');
		let form_parent_div = document.createElement('div');
		let form_body = document.createElement('input');
		let form_category = document.createElement('input');
		let form_add_button = document.createElement('button');
		form_add_button.innerText = 'Add ToDo';
		form_add_button.id = 'new_todo_button';
		form_body.id = 'new_todo_body';
    //form_body.setAttribute(`contenteditable="false"`)
		form_category.id = 'new_todo_category';
    //form_category.setAttribute(`contenteditable="false"`)
		form_parent_div.appendChild(form_body);
		form_parent_div.appendChild(form_category);
		form_parent_div.appendChild(form_add_button);
		root_element.appendChild(form_parent_div);
  }

  // Display all the todo's on the page
	const displayToDoList = (toDoArray) => {
		console.log('Hi from displayToDoList in domCtrl.js');
		let root_element = document.getElementById('content');
		// This will hold all the todos
		let todo_container = document.createElement('div');
		// Iterate over all the todo's and display each one
		toDoArray.forEach((item, index) => {
			let toDo_element = document.createElement('p');
			toDo_element.innerText = `${item.body}
                                ${item.category}`;
      toDo_element.setAttribute('contenteditable', 'false')
			todo_container.appendChild(toDo_element);
      //Add delete button to each todo getItem
      let delete_element = document.createElement('button');
      delete_element.innerText = 'Delete'
      delete_element.className = 'delete_button'
      delete_element.id = `${index}`; //each button now has unique ID (needed to add index as arg in toDoArray.foreach)
      todo_container.appendChild(delete_element);

      let edit_element = document.createElement('button');
      edit_element.innerText = 'Edit'
      edit_element.className = 'edit_button'
      edit_element.id = `${index}`;
      todo_container.appendChild(edit_element);
		});
		// Place content into todo container
		root_element.appendChild(todo_container);
	}

// These only does one thing- retrieve the button to pass to todocrtl so
// we can add event listeners  and input body/category content

  // Return a reference to the add todo button
	const getNewToDoButton = () => {
		return document.getElementById('new_todo_button');
	};

  //return content of body that user input
	const getNewToDoBody = () => {
		let todo_body_element = document.getElementById('new_todo_body');
		let body = todo_body_element.value;
		return body;
	}
	// Return the content of the category input element
	const getNewToDoCategory = () => {
		let todo_category_element = document.getElementById('new_todo_category');
		let category = todo_category_element.value;
		return category;
	}

  const refreshToDoList = (toDoArray) => {
		console.log('Hi from refreshPage in domCtrl.js');
		resetContainer();
		createNewToDoForm();
		displayToDoList(toDoArray);
	}

  const genModal = () => {
    console.log("gen modal reached!!!")
    let root_element = document.getElementById('content');
    let modal_container = document.createElement('div');
    let modal_body = document.createElement('input');
		let modal_category = document.createElement('input');
		let done_button = document.createElement('button');
		done_button.innerText = 'Done';
		done_button.id = 'done';
		modal_body.id = 'modal_body';
		modal_category.id = 'new_todo_category';
		modal_container.appendChild(modal_body);
		modal_container.appendChild(modal_category);
		modal_container.appendChild(done_button);
		root_element.appendChild(modal_container);
  }

  return {  init , getNewToDoButton, getNewToDoBody,
           getNewToDoCategory, refreshToDoList, genModal}; 
})();



export { domCtrl };
