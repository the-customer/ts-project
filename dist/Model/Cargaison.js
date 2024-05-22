let x;
export class Product {
    constructor(_name, _weight) {
        this._name = _name;
        this._weight = _weight;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get weight() {
        return this._weight;
    }
    set weight(value) {
        this._weight = value;
    }
    //
    info() {
        console.log(`Name: ${this.name}, Weight: ${this.weight}`);
    }
}
export class Food extends Product {
    constructor(name, weight) {
        super(name, weight);
    }
}
export class Material extends Product {
    constructor(name, weight) {
        super(name, weight);
    }
}
export class Unbreakable extends Material {
    constructor(name, weight) {
        super(name, weight);
    }
}
export class Fragile extends Material {
    constructor(name, weight) {
        super(name, weight);
    }
}
export class Chemical extends Product {
    constructor(name, weight, _toxicity) {
        super(name, weight);
        this._toxicity = _toxicity;
    }
    get toxicity() {
        return this._toxicity;
    }
    set toxicity(value) {
        this._toxicity = value;
    }
}
//================================================================
export class Cargo {
    // private _id : string;
    constructor(_distance, _from, _to) {
        this._distance = _distance;
        this._from = _from;
        this._to = _to;
    }
    get distance() {
        return this._distance;
        // this._id =  ++Cargo.globalIds ;
        // this._id = Math.random().toString()
    }
    set distance(distance) {
        this._distance = distance;
    }
    //
    get from() {
        return this._from;
    }
    set from(distance) {
        this._from = distance;
    }
    //
    get to() {
        return this._to;
    }
    set to(distance) {
        this._to = distance;
    }
    calculateTotal() {
        // let total: number = 0;
        // this.products.forEach(product => {
        //     total += this.calculateAmount(product);
        // });
        // return total;
        return this.products.reduce((total, product) => total + this.calculateAmount(product), 0);
    }
    getNbrProduct() {
        return this.products.length;
    }
    //
    info() {
        const tr = document.createElement("tr");
        tr.className = "tr-hoverable";
        tr.innerHTML = `
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img
                  src="https://www.inc-conso.fr/sites/default/files/avion-800_1.png"
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div class="font-bold">101</div>
              <div class="border-2 border-white text-xs opacity-50 badge badge-xs badge-error"></div>
            </div>
          </div>
        </td>
        <td>
          ${this._from}
          <br />
          <span class="text-xs opacity-50">
            le 10/10/2004
          </span>
        </td>
        <td>
        ${this._to}
        <br />
        <span class="text-xs opacity-50">
            le 10/10/2004
          </span>
        </td>
        <td>
          ${this.distance}
        </td>
        `;
        return tr;
    }
}
Cargo.max = 10;
export class Maritime extends Cargo {
    constructor(distance, dep, arr) {
        super(distance, dep, arr);
        this.products = [];
    }
    addProduct(product) {
        if (product instanceof Fragile) {
            console.log("Impossible to add");
            return;
        }
        if (this.products.length === Maritime.max) {
            console.log("Impossible d'ajouter la cargaison est pleine!");
            return;
        }
        this.products.push(product);
    }
    calculateAmount(product) {
        if (product instanceof Fragile) {
            console.log("Impossible to add");
            return 0;
        }
        let amount;
        if (product instanceof Chemical) {
            amount = 500 * product.weight * product.toxicity + 10000;
        }
        else if (product instanceof Material) {
            amount = 400 * product.weight * this.distance;
        }
        else {
            amount = 90 * product.weight * this.distance + 5000;
        }
        return amount;
    }
}
export class Air extends Cargo {
    constructor(distance, dep, arr) {
        super(distance, dep, arr);
        this.products = [];
    }
    addProduct(product) {
        if (product instanceof Chemical) {
            console.log("Impossible to add");
            return;
        }
        if (this.products.length === Air.max) {
            console.log("Impossible d'ajouter la cargaison est pleine!");
            return;
        }
        this.products.push(product);
    }
    calculateAmount(product) {
        if (product instanceof Chemical) {
            console.log("Impossible to add");
            return 0;
        }
        let amount;
        if (product instanceof Food) {
            amount = 300 * product.weight * this.distance + 5000;
        }
        else {
            amount = 1000 * product.weight * this.distance;
        }
        return amount;
    }
}
export class Road extends Cargo {
    constructor(distance, dep, arr) {
        super(distance, dep, arr);
        this.products = [];
    }
    addProduct(product) {
        if (product instanceof Chemical) {
            console.log("Impossible to add");
            return;
        }
        if (this.products.length === Road.max) {
            console.log("Impossible d'ajouter la cargaison est pleine!");
            return;
        }
        this.products.push(product);
    }
    calculateAmount(product) {
        let amount;
        if (product instanceof Food) {
            amount = 100 * product.weight * this.distance;
        }
        else {
            amount = 200 * product.weight * this.distance;
        }
        return amount;
    }
}
