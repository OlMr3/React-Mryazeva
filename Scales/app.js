var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Product = /** @class */ (function () {
    function Product(name, weight) {
        this.name = name;
        this.weight = weight;
    }
    Product.prototype.getScale = function () {
        return this.weight;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    return Product;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(name, weight) {
        return _super.call(this, name, weight) || this;
    }
    return Apple;
}(Product));
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato(name, weight) {
        return _super.call(this, name, weight) || this;
    }
    return Tomato;
}(Product));
var Scales = /** @class */ (function () {
    function Scales() {
        this.products = [];
    }
    Scales.prototype.add = function (product) {
        this.products.push(product);
    };
    Scales.prototype.getSumScale = function () {
        return this.products.reduce(function (sum, product) { return sum + product.getScale(); }, 0);
    };
    Scales.prototype.getNameList = function () {
        return this.products.map(function (product) { return product.getName(); });
    };
    return Scales;
}());
var scales = new Scales;
var apple1 = new Apple('Мельбу', 130);
var apple2 = new Apple('Фуджи', 150);
var apple3 = new Apple('Ранет', 200);
var tomato1 = new Tomato('Черный принц', 180);
var tomato2 = new Tomato('Чио-чио-сан', 30);
var tomato3 = new Tomato('Де барао', 120);
scales.add(apple1);
scales.add(apple2);
scales.add(apple3);
scales.add(tomato1);
scales.add(tomato2);
scales.add(tomato3);
console.log("\u0421\u0443\u043C\u043C\u0430\u0440\u043D\u044B\u0435 \u0432\u0435\u0441: ".concat(scales.getSumScale(), " \u0433."));
console.log("\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432: ".concat(scales.getNameList()));
//# sourceMappingURL=app.js.map