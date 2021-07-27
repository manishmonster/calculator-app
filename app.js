
$('input[name="state-d"]').change(function(){
    var value = $(this).val();
    $('body').attr('class', '');
    $('body').addClass(value);
})