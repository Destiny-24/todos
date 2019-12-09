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
    $('.todos-input-content').on('keyup','.todos-input',this.addTodo);
    $('.todos-list').on('click','.todos-item-hd',this.toggleTodo);
    $('.todos-list').on('click','.todos-item-ft',this.removeTodo);
    $('.filter-list').on('click','.filter-item',this.filterTodo);
    $('.todos-filter').on('click','.filter-dell',this.dellTodo);
    $(window).on('unload',this.saveTodo);
  },
  render:function(){
    let todos = this.data.todos;
    let filter = this.data.filter;
    let filters = this.data.filters;
    let index = todos.filter(data => data.completed);
    todos.forEach((data,index) => data.index = index);
    $('.filter-count').get(0).innerHTML=index.length + '个项目';
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
     $('.filter-list').html(filterElement);
     $('.todos-list').html(todosElement);
    
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
  toggleTodo:function(){
    let todos = PAGE.data.todos;
    todos.filter(data => data.completed);
    let index = $(this).parent().data('index');
    todos[index].completed = !todos[index].completed;
    PAGE.render();
  },
  removeTodo:function(){
    let todos = PAGE.data.todos;
    let index = $(this).parent().data('index');
    todos.splice(index,1);
    PAGE.render();
  },
  filterTodo:function(){
    let filter =$(this).data('id')
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
  dellTodo:function(){
    let todos = PAGE.data.todos;
    PAGE.data.todos = todos.filter(data => !data.completed);
    PAGE.render();
  }
}
PAGE.init();