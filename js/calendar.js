$.datetimepicker.setLocale('it');

$('#datetimepicker_format').datetimepicker({value:'2015/04/15 05:03', format: $("#datetimepicker_format_value").val()});
console.log($('#datetimepicker_format').datetimepicker('getValue'));

$("#datetimepicker_format_change").on("click", function(e){
  $("#datetimepicker_format").data('xdsoft_datetimepicker').setOptions({format: $("#datetimepicker_format_value").val()});
});
$("#datetimepicker_format_locale").on("change", function(e){
  $.datetimepicker.setLocale($(e.currentTarget).val());
});

$('#datetimepicker').datetimepicker({
dayOfWeekStart : 1,
lang:'it',
disabledDates:['1986/01/08','1986/01/09','1986/01/10'],
startDate:	'1986/01/05'
});
$('#datetimepicker').datetimepicker({value:'2015/04/15 05:03',step:10});

$('.calendar_class').datetimepicker({

  lang:'it',
  timepicker:false,
  format:'Y/m/d',
  formatDate:'Y/m/d',
  onGenerate:function( ct ){
    $(this).find('.xdsoft_date.xdsoft_weekend')
    .addClass('custom-date-style');
  },
  beforeShowDay: function(date) {
    /*for(var i=0; i<5; i++){
      if(date.getMonth() ==i){
          return [true, "custom-date-style"];
      }
    }*/


    /*if (date.getMonth() == dateToDisable.getMonth() && date.getDate() == dateToDisable.getDate()) {
      return [true, "custom-date-style"];
    }
    */
    return [true, ""];
  }
});
