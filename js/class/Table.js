class Table {
    tbody;

    constructor(query) {
        this.tbody = query;
    }

    set(object, type) {
        var tdList = Array();
        tdList.push(this.td(object.name));
        tdList.push(this.td(object.qty));
        tdList.push(this.td('US$ '+object.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')));
        if (type == 'opened') {
            var closePrice = this.newElement('input', 'text', 'closePrice');
            tdList.push(this.td(closePrice, 'element'));
            var qty = this.newElement('input', 'text', 'qty');
            tdList.push(this.td(qty, 'element'));
        }
        if (type == 'closed') {
            tdList.push(this.td('US$ '+object.closePrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')));
            var value = object.value;
            if ((object.action == 'Buy') && (value > 0)) {
                tdList.push(this.td('US$ '+value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'), null, 'text-success'));
            } else if ((object.action == 'Buy') && (value < 0)){
                tdList.push(this.td('US$ '+value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'), null, 'text-danger'));
            }

            if ((object.action == 'Sell') && (value < 0)) {
                tdList.push(this.td('US$ '+value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'), null, 'text-danger'));
            } else if ((object.action == 'Sell') && (value > 0)){
                tdList.push(this.td('US$ '+value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'), null, 'text-success'));
            }
        }
        tdList.push(this.td(object.action));
        tdList.push(this.td(object.getTime()));
        if (type == 'opened') {
            var btn = this.newElement('input', 'button', 'closeTrade', 'Close trade', ['closeTrade']);
            tdList.push(this.td(btn, 'element'));
        }
        var tr = this.tr(tdList, 'stock-'+object.id);

        if (type == 'opened') {
            btn.addEventListener('click', function() {
                if (+qty.value < +object.qty) {
                    var partial = new Trade(object.name, +object.price, +qty.value, object.action);
                    partial.createPartial(+closePrice.value);
                    object.close(+closePrice.value, +qty.value, true);
                    var update = new CustomEvent("tableClosedUpdate", { 'detail': partial });
                } else {
                    object.close(+closePrice.value, qty.value);
                    var update = new CustomEvent("tableClosedUpdate", { 'detail': object });
                }
                tr.remove();
                document.dispatchEvent(update);
            });
        }

        this.tbody.appendChild(tr);
    }

    tr(tdList, id) {
        var tr = document.createElement('tr');
        tr.classList.add(id);
        for (var i=0;i<tdList.length;i++) {
            tr.appendChild(tdList[i]);
        }

        return tr;
    }

    td(value, type = null, classTag) {
        var td = document.createElement('td');
        if (type == 'element') {
            td.appendChild(value);
            return td;
        }
        td.textContent = value;
        td.classList.add(classTag);
        return td;
    }

    newElement(element, type, name, value = null, classList = Array()) {
        var element = document.createElement(element);
        element.name = name;
        element.type = type;
        element.value = value;
        for (var i=0;i<classList.length;i++) {
            element.classList.add(classList[i]);
        }
        return element;
    }
}
