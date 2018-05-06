$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

$("ul").on("click", "span", function(e){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	e.stopPropagation();
});

$("input[type='text']").keypress(function(e){
	if (e.which === 13) {
		// grab new todo text
		let todoText = $(this).val();
		// clear input
		$(this).val("");
		// append new todo
		let todoHTML = "<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>";
		$("ul").append(todoHTML);
	}
});

$(".fa-plus").click(function(){ 
	$("input[type='text']").fadeToggle();
});