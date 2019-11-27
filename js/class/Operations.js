class Operations {
    stock;
    constructor(stock) {
        this.stock = stock;
    }

    value() {
        var calc = (this.stock.price-this.stock.closePrice)*this.stock.qty;

        if (this.stock.action == 'Buy') {
            return (calc * -1).toFixed(2);
        } else {
            return (calc).toFixed(2);
        }
    }
}
