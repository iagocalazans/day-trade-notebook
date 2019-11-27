class Db {
    trades;
    constructor() {
        this.trades = Array();
    }

    list() {
        return this.trades;
    }

    find(prop, param = null) {
        var result = Array();
        for(var i=0;i<this.trades.length;i++) {
            if (this.trades[i][prop] == param) {
                result.push(this.trades[i]);
            }
        }
        return result;
    }

    add(trade) {
        this.trades.push(trade);
        return this.trades.length;
    }

    get(field, id) {
        for(var i=0;i<this.trades.length;i++) {
            if (this.trades[i].id == id) {
                var result = this.trades[i][field];
            }
        }
        return result;
    }

}
