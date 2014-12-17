/**
 * Created by ranjanam on 16-Dec-14.
 */
function Calculator(type) {
    var that = this, name = type, res = 0, length, special_buttons, number_btns, operator_btns, number_div, operator_div, textbox_result, textbox_div, input = 0, operator = "", index;
    number_btns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    operator_btns = ["+", "-", "*", "/", "%"];
    special_buttons = ["B", "C", "="];
    this.create_buttons = function (id, value, event, div_append) {
        var btn;
        btn = document.createElement("button");
        btn.id = id;
        btn.value = value;
        btn.onclick = function () {
            event(this.value);
        }
        btn.appendChild(document.createTextNode(value));
        div_append.appendChild(btn);
    }
    this.generate_number_buttons = function() {
        index=0;
        number_div = document.createElement('div');
        number_div.id = "numbers_div";
        while (index < number_btns.length) {
            that.create_buttons("b" + number_btns[index], index,that.append,number_div);
            index++;
        }
        document.getElementById(name).appendChild(number_div);
    }
    this.generate_operators = function(){
        index = 0;
        operator_div = document.createElement('div');
        operator_div.id = "operators_div";
        while (index < operator_btns.length) {
            that.create_buttons("operator" + operator_btns[index], operator_btns[index],that.compute,operator_div);
            index++;
        }
        that.generate_special_buttons(operator_div);
        document.getElementById(name).appendChild(operator_div);
    }
    this.generate_textbox = function ()
    {
        textbox_div = document.createElement("div");
        textbox_div.id = name+"textbox_div";
        textbox_result = document.createElement("input");
        textbox_result.type = "text";
        textbox_result.id = name+"resulttextbox";
        textbox_result.value = 0;
        textbox_div.appendChild(textbox_result);
        document.getElementById(name).appendChild(textbox_div);
    }
    this.generate_special_buttons = function (operator_div) {
        var event,name;
        index=0;
        while (index < special_buttons.length) {
            switch(index){
                case 0: event = that.backspace;
                        name="backspace";
                        break;
                case 1: event = that.clear;
                        name="clear";
                        break;
                case 2: event = that.compute;
                        name="equalTo";
                        break;
            }
            that.create_buttons(name, special_buttons[index],event,operator_div);
            index = index + 1;
        }
    }
    this.init = function () {
        that.generate_textbox();
        that.generate_number_buttons();
        that.generate_operators();
    }
    this.append = function (value) {
        if (input !== 0) {
            input = input + value;
        }
        else {             //if initially 0 is pressed
            input = value;
        }
        textbox_result.value = input;
    }
    this.backspace=function(){
        var input_text;
        input = textbox_result.value;
        input_text = input.toString();
        length = input_text.length;
        input_text = input_text.substring(0, length - 1);
        input = Number(input_text);
        if(input === 0 ) {
            res = 0;
        }
        textbox_result.value = input;
    }
    this.clear = function(){
        input = 0;
        res = 0;
        textbox_result.value = input;
    }
    this.compute=function(value)		//function to create the input
    {
        var index, operand;
        length = input.length;
        if(res === 0) {
            res = Number(input);
            operator = value;
        }
        else
        {
            operand = Number(input);
            switch (operator) {
                case '+':res += operand;
                    break;
                case '-':res -= operand;
                    break;
                case '*':res *= operand;
                    break;
                case '/':res /= operand;
                    break;
                case '%':res %= operand;
                    break;
            }
            operator = value;
        }
        if(operator !== "")
            input = 0;
        textbox_result.value = res.toString();
    }
    that.init();
}