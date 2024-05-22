type ToxicityRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
let x: (number | string)[];

export abstract class Product {
  constructor(protected _name: string, protected _weight: number) {}
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get weight(): number {
    return this._weight;
  }
  set weight(value: number) {
    this._weight = value;
  }
  //
  info(): void {
    console.log(`Name: ${this.name}, Weight: ${this.weight}`);
  }
}

export class Food extends Product {
  constructor(name: string, weight: number) {
    super(name, weight);
  }
}

export abstract class Material extends Product {
  constructor(name: string, weight: number) {
    super(name, weight);
  }
}

export class Unbreakable extends Material {
  constructor(name: string, weight: number) {
    super(name, weight);
  }
}

export class Fragile extends Material {
  constructor(name: string, weight: number) {
    super(name, weight);
  }
}

export class Chemical extends Product {
  constructor(name: string, weight: number, private _toxicity: ToxicityRange) {
    super(name, weight);
  }
  get toxicity(): ToxicityRange {
    return this._toxicity;
  }
  set toxicity(value: ToxicityRange) {
    this._toxicity = value;
  }
}

//================================================================

export abstract class Cargo {
  static readonly max: number = 10;
  // static  globalIds: number = 0;
  protected abstract products: Product[];
  // private _id : string;
  constructor(private _distance: number, private _from:string, private _to:string) {}
  get distance(): number {
    return this._distance;
    // this._id =  ++Cargo.globalIds ;
    // this._id = Math.random().toString()
    
  }
 
  set distance(distance: number) {
    this._distance = distance;
  }
  //
  get from(): string {
    return this._from;
  }
  set from(distance: string) {
    this._from = distance;
  }
  //
  get to(): string {
    return this._to;
  }
  set to(distance: string) {
    this._to = distance;
  }
  //
  abstract addProduct(product: Product): void;
  abstract calculateAmount(product: Product): number;
  calculateTotal(): number {
    // let total: number = 0;
    // this.products.forEach(product => {
    //     total += this.calculateAmount(product);
    // });
    // return total;
    return this.products.reduce(
      (total, product) => total + this.calculateAmount(product),
      0
    );
  }
  getNbrProduct(): number {
    return this.products.length;
  }
  //
  info(): HTMLTableRowElement {
    const tr: HTMLTableRowElement = document.createElement("tr");
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

export class Maritime extends Cargo {
  products: (Food | Unbreakable | Chemical)[];
  constructor(distance: number, dep:string,arr:string) {
    super(distance,dep,arr);
    this.products = [];
  }
  addProduct(product: Food | Unbreakable | Chemical): void {
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
  calculateAmount(product: Food | Unbreakable | Chemical): number {
    if (product instanceof Fragile) {
      console.log("Impossible to add");
      return 0;
    }
    let amount: number;
    if (product instanceof Chemical) {
      amount = 500 * product.weight * product.toxicity + 10000;
    } else if (product instanceof Material) {
      amount = 400 * product.weight * this.distance;
    } else {
      amount = 90 * product.weight * this.distance + 5000;
    }

    return amount;
  }
}

export class Air extends Cargo {
  products: (Food | Material)[];
  constructor(distance: number, dep:string,arr:string) {
    super(distance,dep,arr);
    this.products = [];
  }
  addProduct(product: Food | Material): void {
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
  calculateAmount(product: Food | Material): number {
    if (product instanceof Chemical) {
      console.log("Impossible to add");
      return 0;
    }
    let amount: number;
    if (product instanceof Food) {
      amount = 300 * product.weight * this.distance + 5000;
    } else {
      amount = 1000 * product.weight * this.distance;
    }

    return amount;
  }
}

export class Road extends Cargo {
  products: (Food | Material)[];
  constructor(distance: number, dep:string,arr:string) {
    super(distance,dep,arr);
    this.products = [];
  }
  addProduct(product: Food | Material): void {
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
  calculateAmount(product: Food | Material): number {
    let amount: number;
    if (product instanceof Food) {
      amount = 100 * product.weight * this.distance;
    } else {
      amount = 200 * product.weight * this.distance;
    }

    return amount;
  }
}
