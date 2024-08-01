window.onload = () =>{

   
    const form = document.querySelector("#todoForm");
    const saveLocalData = (data)=>{
        if ("localStorage" in window) { 
            localStorage.setItem("todos", JSON.stringify(data)) 
        } 
    }
    const getLocalData = ()=>{
        if ("localStorage" in window) {
            return JSON.parse(localStorage.getItem("todos")) || []; 
        } 
        else {
            return [];
        }
    }

    const createtodolist = () =>{
        const ul = document.querySelector("ul#property");
        ul.innerHTML = "";
        todos.forEach(element => {
            const li = document.createElement("li");
            
            const buttonDelete = document.createElement("button");
            buttonDelete.className = "btn btn-danger";
            buttonDelete.innerHTML = "Delete";
            buttonDelete.addEventListener("click", ()=>{deletelist(element)});
            const buttonUpdate = document.createElement("button");
            if (element.isUpdating) { 
                const input = document.createElement("input");
                input.value = element.name;
                input.addEventListener("change", (ev)=>updatelist(ev,element)); 
                buttonUpdate.className = "btn btn-warning";
                buttonUpdate.innerHTML = "Save"; 
                li.appendChild(input);
            } 
            else { 
                const span = document.createElement("span");
                span.innerHTML = element.name;
                
                buttonUpdate.className = "btn btn-primary";
                buttonUpdate.innerHTML = "Update"; 
                li.appendChild(span);
            }
            buttonUpdate.addEventListener("click", ()=>toggleUpdatelist(element));
            li.appendChild(buttonUpdate);
            li.appendChild(buttonDelete);
            ul.appendChild(li);
        });
    }
    let todos = getLocalData();
    createtodolist();

    const deletelist = ({_id}) =>{ 
         console.log(_id);
         todos = todos.filter(element => element._id !== _id) 
         saveLocalData(todos);                                                  
         createtodolist();                                                  
    }
    const toggleUpdatelist = (element) =>{ 
           const index = todos.findIndex(t => t._id === element._id) 
                                                                   
            todos[index].isUpdating = !element.isUpdating;  
            saveLocalData(todos);
            createtodolist();                                                      

    }
    const updatelist = (ev,element) =>{ 
        const name = ev.target.value.trim();
        if (name) { 
            element.name = name;
            element.updateAt = new Date();
            const index = todos.findIndex(t => t._id === element._id); 
            todos[index] = element; 
            saveLocalData(todos);
           // createtodolist();    
        }
      
    }

   
   form.addEventListener("submit",(ev)=>{
      ev.preventDefault(); 
      const input = form.querySelector("input"); 
      const todoName = input.value.trim(); 
      if (todoName) { 
          const todo ={
              _id: Math.round(Math.random()*8585415) , 
              name : todoName,
              updateAt: null,
              isUpdating : false,
              createAt: new Date(),
          }
          todos.push(todo);
          saveLocalData(todos);
          createtodolist();
      }
      form.reset(); 
   })

}

