const readline = require("readline")

const read = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

let task_list = []


function addTask(){
    read.question("Enter task Name:" ,(task)=>{
        read.question("Enter task ID:", (id)=>{
            id = parseInt(id)
            task = {id: id,
                description:task,
                mark:"not completed"
            }
            task_list.push(task)
            console.log("Task Added!.")
            askQuestion()

        })
    })

}

function Mark(){
   read.question("Enter task id:",(task_id) =>{
    for(value of task_list){
        if(task_id==value.id){
            value.mark = "completed"
            console.log("Mark as completed successfully");
        }else
        {
            console.log("Invalid id");
        }
    }
    askQuestion()

   })
}

function Delete(){
    read.question("Enter id:" ,(task_id)=>{
        for(value of task_list){
            if(task_id==value.id){
                task_list.pop()
                console.log("Task is deleted successfully");
                
            }
            else{
                console.log("Invaild Task ID.")
                askQuestion()
            }
       }})
}

function askQuestion(){
    console.log("\nWelcome to To-Do List Application!\n")
    console.log("1.Add a new task.\n")
    console.log("2.View all task.\n")
    console.log("3.Mark a task as completed.\n")
    console.log("4.Delete a task.\n")
    console.log("5.Exit.\n \n")

    read.question("Please choose an option (1-5):",(num) =>{
        num = parseInt(num)
        if(num ==1)
        {
            addTask()

        }
        if(num ==2)
        {
            if(task_list.length ==0)
                {
                    console.log("Task list is empty!..")
                }
           
                else{
                    for(values of task_list){
                        console.log(values)
                }
            }
            askQuestion()
        }
        if(num ==3)
        {
            Mark()
            
        }
        if(num == 4)
        {
            Delete()
        }
        else{
           
        }
    

    })
}

askQuestion()

