$(function(){
  $("#start_btn").click(start_game);
  $("#pegs").on("click", ".donut", select_donut);
  $("#add1").click(select_peg);
  $("#add2").click(select_peg);
  $("#add3").click(select_peg);
  $("#reset_btn").click(reset_page);
});

var timer = null;
var selected;
var start_time = 0;

function start_game()
{
  var num = $("#num_donuts").val();
  if(num === "")
  {
    num = 3;
  }// end of if
  num = parseInt(num, 10);
  for (var i=0; i<num; i++)
  {
    var div = $("<div>").addClass("donut");
    div.css("width", ((i+1)*50)+"px");
    $("#peg1").append(div);
  }// end of for loop
  timer = setInterval(show_clock, 1000);
}// end of start game

function show_clock()
{
  start_time += 1;
  var mins = Math.floor(start_time/60);
  var secs = start_time%60;
  $("#timer").text("time: "+mins+":"+secs);
}

function select_donut()
{
  if($(this).prev().length === 0)
  {
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
    selected = $(this);
  }
}

function select_peg()
{
  var div = $(this).parent().next();

  if(selected != null)
  {
    if(div.children().length == 0 || is_bigger(div.children().first()))
    {
      move_donut(div);
    }
    else
    {
      $("#message").show().text("Sorry! That donut can't go there. It is larger than the existing donut(s).").fadeOut(3000);
    }
  }
  else
  {
    $("#message").show().text("Select a donut first!").fadeOut(3000);

  }
}

function is_bigger(e)
{

  var a = selected.css("width").replace("px", "");
  a = parseInt(a, 10);
  var b = $(e).css("width").replace("px", "");
  b = parseInt(b, 10);
  if(b < a)
  {
    return false;
  }
  else
  {
    return true;
  }

}// end of is_bigger

function move_donut(peg) {
  selected.detach();
  $(selected).removeClass("selected");
  peg.prepend(selected);
  selected=null;
}

function reset_page()
{
  clearInterval(timer);
  $("#peg1").empty();
  $("#peg2").empty();
  $("#peg3").empty();
  $("#timer").empty();
  selected = null;
  widths = [];
  $("#num_donuts").val("");
  start_time = 0;
}



