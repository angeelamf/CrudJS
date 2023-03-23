const getInventario = async () => {
    return await fetch("http://localhost:8080/api/inventario", {mode: 'cors', headers:{"Authorization" : `Bearer ${token}`}}).then( res => res.json()).then(data => data);
};
const getEmpleados = async () => {
    return await fetch("http://localhost:8080/api/empleado", {mode: 'cors', headers:{"Authorization" : `Bearer ${token}`}}).then( res => res.json()).then(data => data.Data);
};
const savePoliza = async (data) => {
    return await fetch("http://localhost:8080/api/poliza", {mode: 'cors', method: "POST", headers:{'content-type': 'application/json',"Authorization" : `Bearer ${token}`}, body:JSON.stringify(data)}).then( res => res.json()).then(data => data);
}

const getPolizas = async () => {
    return await fetch("http://localhost:8080/api/poliza",{mode: 'cors', headers:{"Authorization" : `Bearer ${token}`}}).then( res => res.json()).then(data => data);
}
const login = async (data) => {
    return await fetch("http://localhost:8080/login", {mode: 'cors', method: "POST", crossDomain:true, headers:{'content-type': 'text/plain'}, body:JSON.stringify(data)}).then( res => res.text()).then(data => data);
}