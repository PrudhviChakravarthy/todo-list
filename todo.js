var glob = {}
var comp = 0
var rem = 0
var tot = 0
setInterval(timer,1000)
function timer (){
    var time = new Date()
    document.getElementById("timer").innerHTML = ("0"+(24-time.getHours())).slice(-2) + ":" + ("0"+("60"-time.getMinutes())).slice(-2)+ ":" + ("0"+("60"-(time.getSeconds()))).slice(-2)
}

const element = document.querySelector('form');
element.addEventListener('submit', event => {
  event.preventDefault();
  let input = document.getElementById("input").value
  if (input.length == 0 ){
    alert("Please enter a value")
    return
  }
  createtask(submit = input,false)
});

function sum(){
    comp = document.getElementById("completedelements").childNodes.length
    rem = document.getElementById("newelements").childNodes.length
    tot = comp + rem
    document.getElementById("total").innerHTML = tot
    document.getElementById("completed").innerHTML = comp
    document.getElementById("remaining").innerHTML = rem
    console.log(comp,rem,tot)
}

function rand(){
    return Math.floor(Math.random()*500)
}
let createtask = (submit,check) =>{
    let input = submit
    document.getElementById("input").value = null
    let Task = document.createElement("div")
    let btn = document.createElement("i")
    let p = document.createElement("p")
    p.innerHTML = input
    let toggle = document.createElement("input")
    toggle.setAttribute("type", "checkbox")
    toggle.setAttribute("class", "toggle")
    toggle.className = "progress "
    btn.className = "fa-solid fa-trash delbutton"
    Task.className= "Maintask"
    btn.setAttribute("onclick","deletetask(this.id,true)")
    toggle.setAttribute("onclick","checklisten(this.id)")
    toggle.id = "tog"+(rand()*rand()*1434)
    btn.id = "btn"+(rand()*rand()*123)
    var id
    id = "testing"+(rand()*rand()*154)
    input = [id,input,check]
    localstorage(input, true)
    Task.id =  id
    if(check){
        toggle.checked = true
        Task.style.backgroundColor = "#e04fa1"
        document.getElementById("completedelements").appendChild(Task)
    }else{
        toggle.checked = false
        Task.style.backgroundColor = "#29e668"
        document.getElementById("newelements").appendChild(Task)
    }
    document.getElementById(id).appendChild(toggle)
    document.getElementById(id).appendChild(p)
    document.getElementById(id).appendChild(btn)
    sum()
}

let localstorage =  (e, value) => {
    if (value){
        glob[""+e[0]] = [e[1],e[2]]
        localStorage.setItem("userdata",JSON.stringify(glob))
    }else{
        delete glob.e
        localStorage.setItem("userdata",JSON.stringify(glob))
    }
} 

let deletetask = (e) => {
    let parent =document.getElementById(e).parentElement.id
    let x1 = document.getElementById(parent)
    x1.remove()
    delete glob[""+parent]
    localstorage(parent,false) 
    sum()
}

function checklisten(e){
    let item = document.getElementById(e)
    let parent = document.getElementById(item.parentElement.id)
    input = parent.childNodes[1].innerText
    if (item.checked == true){
        deletetask(e)
        createtask(input,true)
    }else{
        createtask(input,false)
        deletetask(e)
    }
    sum()
}

var storage = JSON.parse(localStorage.getItem('userdata'))
let preload = () => {
    if (Object.values(storage).length != 0){
    Object.values(storage).forEach(val => {createtask(val[0],val[1])})
    }
}
window.onload = preload()

