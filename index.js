const PAGE= {
  data:{
    todos:[{
      title:'跑步',
      completed:false
    },{
      title:'游泳',
      completed:false
    },{
      title:'背单词',
      completed:true
    }],
    filter:1,
    filters:{
      1:'全部',
      2:'进行中',
      3:'已完成'
    }
  },
  init:function(){
    this.bind();
    this.render();
    this.getTodo();
  },
  bind:function(){
    let input = document.getElementById('todos-input')
    input.addEventListener('keyup',this.addTodo);
    let todoLitst = document.getElementById('todos-list')
    this.onEventLister(todoLitst,'click','todos-item-hd',this.toggleTodo);
    this.onEventLister(todoLitst,'click','todos-item-ft',this.removeTodo);
    let todoFilter = document.getElementById('filter-list');
    this.onEventLister(todoFilter,'click','filter-item',this.filterTodo)
    window.addEventListener('unload',this.saveTodo);
    let todoDell = document.getElementById('todos-dell');
    this.onEventLister(todoDell,'click','filter-dell',this.dellTodl);
  },
  onEventLister:function(parentNode,action,chilClassName,callback){
    parentNode.addEventListener(action,function(e){
      e.target.className.indexOf(chilClassName)>= 0 && callback(e);
    })
  },
  render:function(){
    let todos = this.data.todos;
    let filter = this.data.filter;
    let filters = this.data.filters;
    todos.forEach((data,index) => data.index = index);
    let showTodo;
    switch(filter){
      case 2:
        showTodo = todos.filter(data => !data.completed);
      break;
      case 3:
        showTodo = todos.filter(data => data.completed);
      break;
      default:
        showTodo = todos;
    }
   
    let todosElement = showTodo.map((data)=>{
      return`
      <div class="todos-item ${data.completed ? ' active' :''}" data-index="${data.index}">
          <div class="todos-item-hd"></div>
          <div class="todos-item-bd">${data.title}</div>
          <div class="todos-item-ft">X</div>
        </div>
      `
    }).join('');
    let filterElement = Object.keys(filters).map(key =>{
      return`
      <div class="filter-item  ${filter == key ? ' active' : ''}" data-id="${key}">${filters[key]}</div>
      `
    }).join('');
    let todoFilter = document.getElementById('filter-list');
    let todoLitst = document.getElementById('todos-list');
    todoFilter.innerHTML = filterElement;
    todoLitst.innerHTML = todosElement;

    let filterCount = document.getElementsByClassName('filter-count');
    let index = todos.filter(data => data.completed);
    filterCount[0].innerHTML=index.length + '个项目';
  },
  addTodo:function(e){
    let value =this.value.trim();
    if(e.which !== 13 || !value){
      return;
    }
    let todos = PAGE.data.todos;
    todos.push({
      title:value,
      completed:false
    })
    this.value='';
    PAGE.render();
  },
  toggleTodo:function(e){
    let filterCount = document.getElementsByClassName('filter-count');
    let todos = PAGE.data.todos;
    todos.filter(data => data.completed);
    filterCount.innerHTML=todos.length + '个项目';
    let todoItem = e.target.parentNode;
    let index = todoItem.dataset.index;
    todos[index].completed = !todos[index].completed;
    PAGE.render();
  },
  removeTodo:function(e){
    let todos = PAGE.data.todos;
    let todoItem = e.target.parentNode;
    let index = todoItem.dataset.index;
    todos.splice(index,1);
    PAGE.render();
  },
  filterTodo:function(e){
    let filterItem = e.target;
    let filter = filterItem.dataset.id;
    PAGE.data.filter = Number(filter);
    PAGE.render(); 
  },
  saveTodo:function(){
    let todos = PAGE.data.todos;
    let todosStr =JSON.stringify(todos);
    localStorage.setItem('todos',todosStr);
  },
  getTodo:function(){
    let todos = localStorage.getItem('todos');
    todos = JSON.parse(todos) || [];
    PAGE.data.todos =todos;
    PAGE.render()
  },
  dellTodl:function(){
    let todos = PAGE.data.todos;
    PAGE.data.todos = todos.filter(data => !data.completed);
    PAGE.render();
  }
}
PAGE.init();