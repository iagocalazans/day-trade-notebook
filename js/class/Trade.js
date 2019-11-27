class Trade {
    id;
    name;
    price;
    closePrice;
    qty;
    action;
    datetime = Date.now();
    status = 1;
    value;

    constructor(name, price, qty, action) {
        this.name = name;
        this.price = +price;
        this.qty = +qty;
        this.action = action;
    }

    setId(id) {
        this.id = id;
    }

    close(price, qty, partial = false) {
        if (partial) {
            this.qty = this.qty-qty;
            document.dispatchEvent(new CustomEvent("tableOpenedUpdate", { 'detail': this }));
            return true;
        }
        this.status = 0;
        this.closePrice = price;
        this.value = this.getValue();
        this.datetime = Date.now();
        return false;
    }

    createPartial(price) {
        document.dispatchEvent(new CustomEvent("newPartialUpdate", { 'detail': this }));
        this.status = 0;
        this.closePrice = price;
        this.value = this.getValue();
    }

    getTime() {
        var date = new Date(this.datetime);
        return (date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+" "+date.getHours()+":"+this.n(date.getMinutes()));
    }

    n(n){
        return n > 9 ? "" + n: "0" + n;
    }

    getValue() {
        var calc = (this.price - this.closePrice) * this.qty;

        if (this.action == 'Buy') {
            return (calc * -1);
        } else {
            return (calc);
        }
    }

}
