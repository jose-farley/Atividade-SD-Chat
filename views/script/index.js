main();
const socket = io() 

function main(){
    const button = document.getElementById("btnEnviar");
    button.addEventListener("click", handleButtonClick)
}

function handleButtonClick(){

    let name =  document.getElementById("inputName").value
    let mensagem = document.getElementById("inputMensagem").value
    if(!name) return alert("Digite um nome de usuário")
    if(!mensagem) return alert("Digite uma mensagem")

    socket.emit('chat message', {
        name:name,
        mensagem:mensagem
    });

    document.getElementById("inputName").value=""
    document.getElementById("inputMensagem").value=""
}

socket.on("update", (msg)=>{
    console.log(msg)
    const view = document.getElementById('chatView');
    const div = document.createElement('div')
    div.classList.add("containerMensagem")

    const spanName = document.createElement('span')
    spanName.innerHTML=" < "+msg.name+" > "
    spanName.classList.add("name")
    const spanData = document.createElement('span')
    spanData.innerHTML=""+msg.data
    spanName.classList.add("data")
    const spanMessage = document.createElement('span')
    spanMessage.innerHTML=": "+msg.mensagem
    spanName.classList.add("mensagem")

    div.appendChild(spanData)
    div.appendChild(spanName)
    div.appendChild(spanMessage)
    
    view.appendChild(div)

})
