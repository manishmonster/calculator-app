var outputText = "";
var numbers = [];
var operators = [];
var currentnumber = 0;
var newEntry = false;
$('input[name="state-d"]').change(function(){
    var value = $(this).val();
    $('body').attr('class', '');
    $('body').addClass(value);
});
$('.number').click(function(){
    var enterNumber = $(this).val();
   
    if(numbers.length < 1 || newEntry){
        currentnumber = enterNumber;
        numbers.push(enterNumber);
        newEntry = false;
    }
    else{
       currentnumber = currentnumber + enterNumber;
       lastNumberEdit();
    }
    displayOut();
});
$('.decimal').click(function(){
    if ( currentnumber.indexOf(".") > -1 )  {
    }
    else{
        currentnumber = currentnumber + '.';
        lastNumberEdit();
    }
    displayOut();
});
$('.secondary-key').click(function(){
    var func = $(this).val();
    if( func == 'del'){
        if(operators.length == numbers.length){
            operators.pop(operators[operators.length - 1]);
        }
        else if(currentnumber.length > 0){
            currentnumber = currentnumber.slice(0, -1);
            if(currentnumber.length == 0){
                numbers.pop(numbers[numbers.length - 1]);
                currentnumber = numbers[numbers.length - 1];
            }
            else{
                lastNumberEdit();
            }
        }
        displayOut();
    }
    
})
$('.operator').click(function(){
    var opt = $(this).val();
    if (operators.length == numbers.length) {
        operators[operators.length - 1] = opt;
    }
    else{
        operators.push(opt);
    }
    newEntry = true;
    displayOut();
});
$('.enter').click(function(){
    operator();
});
$('.reset').click(function(){
    resetFun();
    $('.outputs').text(0);
})
function lastNumberEdit(){
    numbers[numbers.length - 1] = currentnumber;
}
function displayOut(){
    outputText = '';
    if(numbers.length > 0){
        for(var i = 0; i < numbers.length; i++){
            outputText = outputText + numbers[i];
            if ( operators[i]) {
                outputText = outputText + operator_view(operators[i]);
            }
        }
    }
    else{
        outputText = 0;
    }
    $('.outputs').text(outputText);
}
function operator_view(operator_){
    switch (operator_) {
        case 'add':
            return ' + ';
            break;
        case 'subtract':
            return ' - ';
            break;
        case 'divide':
            return ' / ';
            break;
        case 'multiply':
            return ' * ';
            break;
    }
}
function formatingNumbers(digit){
    return digit.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
function operator(){
    var outputs = 0;
    if(numbers.length > 0){
        console.log(operators[0]);
        switch (operators[0]) {
            case 'add':
                outputs = parseFloat(numbers[0]) + parseFloat(numbers[1]);
                break;
            case 'subtract':
                outputs = parseFloat(numbers[0]) - parseFloat(numbers[1]);
                break;
            case 'divide':
                outputs = parseFloat(numbers[0]) / parseFloat(numbers[1]);
                break;
            case 'multiply':
                outputs = parseFloat(numbers[0]) * parseFloat(numbers[1]);
                break;
        } 
        console.log(outputs);
        for(var i = 2; i < numbers.length; i++){
            var num =  parseFloat(numbers[i]);
            outputs = parseFloat(outputs);
            if ( operators[i-1]) {
                switch (operators[i-1]) {
                    case 'add':
                        outputs = outputs + num;
                        break;
                    case 'subtract':
                        outputs = outputs - num;
                        break;
                    case 'divide':
                        outputs = outputs / num;
                        break;
                    case 'multiply':
                        outputs = outputs * num;
                        break;
                }
            }
        }
        console.log(outputs);
        $('.outputs').text(outputs);
        resetFun();
    }
}
function resetFun(){
    numbers = [];
    currentnumber = 0;
    operators = [];
}
