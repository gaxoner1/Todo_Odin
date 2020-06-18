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
		let form_title = document.createElement('input');
		let form_body = document.createElement('input');
		let form_add_button = document.createElement('button');
		form_add_button.innerText = 'Add ToDo';
		form_add_button.id = 'new_todo_button';
		form_title.id = 'new_todo_title';
    //form_title.setAttribute(`contenteditable="false"`)
		form_body.id = 'new_todo_body';
    //form_body.setAttribute(`contenteditable="false"`)
		form_parent_div.appendChild(form_title);
		form_parent_div.appendChild(form_body);
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
			toDo_element.innerText = `${item.title}
                                ${item.body}`;
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
// we can add event listeners  and input title/body content

  // Return a reference to the add todo button
	const getNewToDoButton = () => {
		return document.getElementById('new_todo_button');
	};

  //return content of title that user input
	const getNewToDoTitle = () => {
		let todo_title_element = document.getElementById('new_todo_title');
		let title = todo_title_element.value;
		return title;
	}
	// Return the content of the body input element
	const getNewToDoBody = () => {
		let todo_body_element = document.getElementById('new_todo_body');
		let body = todo_body_element.value;
		return body;
	}

  const refreshToDoList = (toDoArray) => {
		console.log('Hi from refreshPage in domCtrl.js');
		resetContainer();
		createNewToDoForm();
		displayToDoList(toDoArray);
	}

  const genModal = () => {
    console.log("gen modal reached")
    let root_element = document.getElementById('content');
    let modal_container = document.createElement('div');
    let modal_title = document.createElement('input');
		let modal_body = document.createElement('input');
		let done_button = document.createElement('button');
    modal_container.id = 'modal_container';
		done_button.innerText = 'Done';
		done_button.id = 'done';
		modal_title.id = 'modal_title';
		modal_body.id = 'modal_body';
		modal_container.appendChild(modal_title);
		modal_container.appendChild(modal_body);
		modal_container.appendChild(done_button);
		root_element.appendChild(modal_container);
  }

  const getDoneButton = () => {
    return document.getElementById('done');
  };

  const getModuleTitle = () => {
		let modal_title = document.getElementById('modal_title');
		let modalTitleContent = modal_title.value;
		return modalTitleContent;
	}

  const getModuleBody = () => {
    let modal_body = document.getElementById('modal_body');
    let modalBodyContent = modal_body.value;
    return modalBodyContent;
  }

  return {  init , getNewToDoButton, getNewToDoTitle,
           getNewToDoBody, refreshToDoList, genModal, getModuleTitle,
           getModuleBody }; 
})();



export { domCtrl };
