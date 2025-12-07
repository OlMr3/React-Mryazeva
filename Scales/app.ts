class Product {
    
    constructor (private name: string, private weight: number){}

    getScale(): number {
        return this.weight
    }
    getName(): string {
        return this.name
    }
}

class Apple extends Product{
    constructor(name: string, weight: number){
        super (name, weight)
    }
}

class Tomato extends Product{
     constructor(name: string, weight: number){
        super (name, weight)
    }
}

class Scales{
    private products: Product[] = [];

    add(product: Product): void{
        this.products.push(product)
    }
    getSumScale(): number{
        return this.products.reduce((sum, product) =>sum + product.getScale(), 0)
    }
    getNameList (): string[]{
        return this.products.map(product => product.getName())
    }
}

const scales = new Scales;
const apple1 = new Apple ('Мельбу', 130);
const apple2 = new Apple ('Фуджи', 150);
const apple3 = new Apple ('Ранет', 200);
const tomato1 = new Tomato('Черный принц', 180);
const tomato2 = new Tomato('Чио-чио-сан', 30);
const tomato3 = new Tomato('Де Барао', 120);

scales.add(apple1);
scales.add(apple2);
scales.add(apple3);
scales.add(tomato1);
scales.add(tomato2);
scales.add(tomato3);

console.log(`Суммарные вес: ${scales.getSumScale()} г.`);
console.log(`Список продуктов: ${scales.getNameList()}`);

