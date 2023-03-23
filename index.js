let token = "";
//On Page Load
if (document.readyState !== 'loading') {
    pageLoad();
} else {
    document.addEventListener('DOMContentLoaded', pageLoad);
}

async function pageLoad(){
    loadEmpleados()
    loadInventario();
};

async function loadEmpleados(){
    let inventario = await getInventario();
    fillSelect('inventario', 'Nombre', 'id', inventario)
}
async function loadInventario(){
    let empleados = await getEmpleados();
    fillSelect('empleado', 'Nombre', 'id', empleados)
}
function fillSelect(elementId, option, value, data){
    let select = document.getElementById(elementId);

    if(data){
        data.forEach(opt => {
            let elem = document.createElement("option");
            elem.value = opt[value];
            elem.innerHTML = opt[option];
            select.appendChild(elem);
        });
    }
    
};



async function guardarPoliza() {
    let poliza = {
        "Cantidad": parseInt(document.getElementById("cantidad").value),
        "Fecha": new Date().getTime(),
        "empleado_id": parseInt(document.getElementById("empleado").value),
        "inventario_id": parseInt(document.getElementById("inventario").value)
    };
    let result = await savePoliza(poliza);
    
    showMessage(result.Data, result.Meta.Status);
    showPolizas();
    
}

function showMessage(data, type) {
    var color = type === "OK" ? "is-success":"is-danger";
    document.getElementById("message").style.visibility = "visible";
    document.getElementById("message").classList.add(color);
    
    if(type === "OK")
        document.getElementById("message-content").innerHTML = JSON.stringify(data);
    else
        document.getElementById("message-content").innerHTML = data.Mensaje;

}

function closeMessage() {
    document.getElementById("message").style.visibility = "hidden";
    document.getElementById("message").classList.remove("is-success","is-danger");
    document.getElementById("message-content").innerHTML = "";
}

async function showPolizas() {
    let polizas = await getPolizas();
    
    if(!polizas.length)
        return;

        let table = document.getElementById("poliza-table")
        table.querySelector("tbody").innerHTML = "";
        polizas.forEach(p =>{
            let row = document.createElement("tr");
           
            
            row.appendChild(createTd(p["Poliza"].id));
            row.appendChild(createTd(p["Poliza"].Cantidad));
            row.appendChild(createTd(`${p["empleado"].Nombre} ${p["empleado"].Apellido}`));
            row.appendChild(createTd(p["DetalleArticulo"].Sku));
            row.appendChild(createTd(p["DetalleArticulo"].Nombre));


            table.querySelector("tbody").appendChild(row);
        });

        function createTd(text) {
            let td = document.createElement("td");
            td.innerHTML = text;
            return td;
        }
}

async function signIn() {
    let data = {
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value
    };
    let result = await login(data);
    token = result;
    document.getElementById("token").innerHTML = token;
    pageLoad();
}