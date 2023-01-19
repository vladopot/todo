/* function create(text){
	return `<li class = "item" data-todo-state="active">
  	<span class="todo__task">${text}
  	<span>добавлено: ${new Date().toLocaleString().slice(0, -3)}</span>
  	</span>
	</li>`};
function edit(){};
function add(){
	let input = document.querySelector('.input__text').value;
	if (input == '' || input == undefined) {
		return false;
	} else {
		document.querySelector('.list').insertAdjacentHTML('afterbegin', create(input));
	}
	document.querySelector('.input__text').value = '';
}
function action(e){
	const target = e.target;
	if (target.classList.contains('item') || target.classList.contains('todo__task')) {
		const elemItem = target.closest('.item');
		const toEdit = target.closest('.todo__task');
		del.addEventListener('click', function(){elemItem.remove()});
		change.addEventListener('click', function(){
			let status = elemItem.dataset.todoState;
			if (status === 'active') {
				elemItem.dataset.todoState = 'completed';
			} else if (status === 'completed') {
				elemItem.dataset.todoState = 'active';
			}
		});
	}

	document.querySelector('.todo_options').addEventListener('change', this.update());
}

function update(){
	let option = document.querySelector('.todo_options').value;
	document.querySelector('.list').dataset.todoOption = option;
}

function rem(){
	let items = document.querySelectorAll('.item');
	for(let i = 0; i < items.length; i++){
		items[i].outerHTML = '';
	}
} */

document.querySelector(".add_btn").addEventListener("click", add);
document.querySelector(".options").addEventListener("change", update);
document.querySelector(".ch_box_all").addEventListener("change", check_all);
document.querySelector(".sort_btn").addEventListener("click", sort);

function add() {
	let text = document.querySelector(".input_text").value;
	let date = new Date();
	let sort_stat = document.querySelector(".sort_btn").dataset.option;
	let add_direction;
	if (sort_stat === "normal") {
		add_direction = "afterbegin"
	} else {
		add_direction = "beforeend";
	}
	if (text === '' || text === undefined) {
		return false;
	} else {
		document.querySelector(".todo").insertAdjacentHTML(add_direction ,`<li class="elem" data-status = "active"><input type="checkbox" class="ch_box">${text}<div class="control_panel">
			<button class="del_btn">del</button>
			<button class="done_btn">done</button>
			<button class="notDone_btn">nDone</button>
			</div><br><span class = "date">${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}   ${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}<span></li>`);
		document.querySelector(".del_btn").addEventListener("click", del);
		document.querySelector(".done_btn").addEventListener("click", done);
		document.querySelector(".notDone_btn").addEventListener("click", done);
		save();
	}
	document.querySelector(".input_text").value = "";
}

function update () {
	let option = document.querySelector(".options").value;
	document.querySelector(".todo").dataset.option = option;
	save();
}

function del (e) {
	let target = e.target.closest("li");
	let targets = document.querySelectorAll(".ch_box");
	for (let i = 0; i < targets.length; i++) {
		if (targets[i].checked) {
			targets[i].closest("li").remove();
		}
	}
	target.remove();
	document.querySelector(".ch_box_all").checked = false;
	save();
}

function done (e) {
	let target = e.target.parentNode.previousSibling.previousSibling;
	target.checked = true;
	let targets = document.querySelectorAll(".ch_box");
	for (let i = 0; i < targets.length; i++) {
		if (targets[i].checked) {
			if (targets[i].closest("li").dataset.status === "active"){
				targets[i].closest("li").dataset.status = "completed";
			} else if (targets[i].closest("li").dataset.status === "completed") {
				targets[i].closest("li").dataset.status = "active";
			}
			targets[i].checked = false;	
		}
	}
	target.checked = false;
	document.querySelector(".ch_box_all").checked = false;
	/* if (target.dataset.status === "active") {
		target.dataset.status = "completed";
	} else if (target.dataset.status === "completed") {
		target.dataset.status = "active"; 
	} */
	save();
}
function init () {
	const fromStorage = localStorage.getItem("todo");
	if (fromStorage) {
		document.querySelector(".list").innerHTML = fromStorage;
		let del_btn = document.querySelectorAll(".del_btn");
		let done_btn = document.querySelectorAll(".done_btn");
		let notDone_btn = document.querySelectorAll(".notDone_btn");
		for (let index = 0; index < del_btn.length; index++) {
			del_btn[index].addEventListener("click", del);
		}
		for (let index = 0; index < done_btn.length; index++) {
			done_btn[index].addEventListener("click", done);
		}
		for (let index = 0; index < notDone_btn.length; index++) {
			notDone_btn[index].addEventListener("click", done);
		}
	};
}

function save () {
	localStorage.setItem("todo", document.querySelector(".list").innerHTML);
}

function check_all() {
	let ch_all = document.querySelector(".ch_box_all");
	let ch_boxes = document.querySelectorAll(".ch_box");
	for (let i = 0; i < ch_boxes.length; i++) {
		if (ch_all.checked) {
			ch_boxes[i].checked = this.checked;
		} else {
			ch_boxes[i].checked = this.disabled;
		}
	}
}

function sort () {
	let list = document.querySelectorAll("li");
	list.forEach((e) => e.remove());
	for (let i = 0; i < list.length; i++) {
		document.querySelector("ul").insertAdjacentHTML("afterbegin", `<li class="elem" data-status = "active">${list[i].innerHTML}</li>`);
	}
	if (document.querySelector(".sort_btn").dataset.option === "normal") {
		document.querySelector(".sort_btn").dataset.option = "reverse";
	} else {
		document.querySelector(".sort_btn").dataset.option = "normal";
	}
}	