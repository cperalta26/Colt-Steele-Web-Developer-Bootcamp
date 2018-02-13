//check off Specific Todos By Clicking
$('ul').on('click', 'li', function(){
 $(this).toggleClass('completed')
})

//Click on X to delete Todo
$('ul').on('click', 'span', function(event){
  $(this).parent().fadeOut(500, function() {
    $(this).remove()
  })
  event.stopPropagation()
})

//Add a Todo
$("input[type='text']").keypress(function(event) {
  if (event.which === 13) {
    const todoText = $(this).val()
    $(this).val('')
    $('ul').append('<li><span>X</span> ' + todoText + '</li>')
  }
})
