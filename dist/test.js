import { Maritime, Fragile, Food, Road } from "./Model/Cargaison.js";
import { FormHandler } from "./forms/Form.js";
class InputElement {
    constructor(templateId, hostId = 'app') {
        // this.templateElement = <HTMLTemplateElement>document.getElementById('input')!;
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        this.attach();
    }
    attach() {
        const shadowRoot = this.templateElement.content.cloneNode(true);
        this.hostElement.appendChild(shadowRoot);
    }
}
const updateTable = () => {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    data.forEach((cargo, index) => {
        const tr = cargo.info();
        console.log(tr);
        tbody.appendChild(tr);
    });
};
const header = new InputElement('header');
const main = new InputElement('main');
//
// interface User{
//     id: number;
//     login: string;
//     pass: string;
//     nom?: string;
//     prenom?: string;
//     cin : string;
//     photo?:string;
// }
const data = [];
// fetch("jdkfjdslfkls").then((res) => {
//     data = res.json();
// }
//
const formulaire = new FormHandler('#formCargo');
formulaire.handleSubmit((d) => {
    console.log('Form submitted successfully with data:', d);
    if (d.cargo == "road") {
        data.push(new Road(d.distance, 'New York', 'Dakar'));
    }
    data.push(new Maritime(100, 'New York', 'Dakar'));
    formulaire.resetForm();
    updateTable();
});
const m = new Maritime(123, "PAris", "Dakar");
const p = new Fragile("Coupe", 67);
const p1 = new Food("Coupe", 67);
m.addProduct(p1);
m.addProduct(p1);
m.addProduct(p1);
m.addProduct(p1);
m.addProduct(p1);
m.addProduct(p1);
m.addProduct(p1);
m.addProduct(p1);
console.log(m.calculateAmount(p1));
console.log(m.calculateTotal());
