class Results {
    totalOperations = 0;
    winningOperations = 0;
    losingOperations = 0;
    percentageGain = 0;
    percentageLoss = 0;
    amountGain = 0;
    amountLoss = 0;
    totalResult = 0;
    averageGain = 0;
    averageLoss = 0;
    highestGain = 0;
    highestLoss = 0;

    constructor() {

    }

    update(db) {
        var op = db.find('status', 0);
        this.totalOperations = op.length;
        var win = 0;
        var loss = 0;
        var winAmount = 0;
        var lossAmount = 0;
        for (var i=0;i<op.length;i++) {
            if (op[i].value > 0) {
                win++;
                winAmount = winAmount + op[i].value;
                if (op[i].value > this.highestGain) {
                    this.highestGain = op[i].value;
                }
            } else {
                loss++;
                lossAmount = lossAmount + op[i].value;
                if (op[i].value < this.highestLoss) {
                    this.highestLoss = op[i].value;
                }
            }
        }

        this.amountGain = winAmount;
        this.amountLoss = lossAmount;

        this.winningOperations = win;
        this.losingOperations = loss;

        this.percentageGain = this.percentage(this.winningOperations).toFixed(2);
        this.percentageLoss = this.percentage(this.losingOperations).toFixed(2);

        this.averageGain = this.average('gain').toFixed(2);
        this.averageLoss = this.average('loss').toFixed(2);

        this.totalResult = this.amountLoss + this.amountGain;
    }

    percentage(prop) {
        var percentage = prop * 100 / this.totalOperations;
        return +percentage;
    }

    average(type) {
        if (type == 'gain') {
            if (this.winningOperations == 0) {
                return 0;
            }
            return this.amountGain / this.winningOperations;
        }
        if (type == 'loss') {
            if (this.losingOperations == 0) {
                return 0;
            }
            return this.amountLoss / this.losingOperations;
        }
    }
}
