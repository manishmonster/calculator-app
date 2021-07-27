var outputText = "";
var numbers = [];
var opeartors = [];
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
        if(opeartors.length == numbers.length){
            opeartors.pop(opeartors[opeartors.length - 1]);
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
    if (opeartors.length == numbers.length) {
        opeartors[opeartors.length - 1] = opt;
    }
    else{
        opeartors.push(opt);
    }
    newEntry = true;
    displayOut();
});
function lastNumberEdit(){
    numbers[numbers.length - 1] = currentnumber;
}
function displayOut(){
    outputText = '';
    if(numbers.length > 0){
        for(var i = 0; i < numbers.length; i++){
            outputText = outputText + numbers[i];
            if ( opeartors[i]) {
                outputText = outputText + opeartors[i];
            }
        }
    }
    else{
        outputText = 0;
    }
    console.log(numbers);
    console.log(opeartors);
    console.log(currentnumber);
    $('.outputs').text(outputText);
}
function formatingNumbers(digit){
    return digit.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
function opeartor(){
    var outputs = 0;
    if(numbers.length > 0){
        switch (opeartors[0]) {
            case '+':
                outputs = parseFloat(numbers[0]) + parseFloat(numbers[1]);
                break;
            case '-':
                outputs = parseFloat(numbers[0]) - parseFloat(numbers[1]);
                break;
            case '/':
                outputs = parseFloat(numbers[0]) / parseFloat(numbers[1]);
                break;
            case '*':
                outputs = parseFloat(numbers[0]) * parseFloat(numbers[1]);
                break;
        } 
        for(var i = 2; i < numbers.length; i++){
            var num =  parseFloat(numbers[i]);
            outputs = parseFloat(outputs);
            if ( opeartors[i-1]) {
                switch (opeartors[i-1]) {
                    case '+':
                        outputs = outputs + num;
                        break;
                    case '-':
                        outputs = outputs - num;
                        break;
                    case '/':
                        outputs = outputs / num;
                        break;
                    case '*':
                        outputs = outputs * num;
                        break;
                }
            }
        }
    }
}
