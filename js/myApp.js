var cart = [
    {
        name: "Some name",
        quantity: "quantity",
        price: "price", 
        description: "some"
    }
    ];
$(document).ready(function () {
    
    showCartList();
    //call the list
    
    
   
    
    $(document).on("click", "#cartAreaList label", function() {
        var dataId = $(this).attr("data-id");
        $(this).parent().append("<input data-id='"+ dataId +"' id='thisFocus' value='"+ $(this).text() +"' />");
        $(this).parent().find("label").remove();
        $("#thisFocus").focus();
        
        showDetailsById(dataId);
        
        
        
    });
    
    $(document).on("click", "#cartAreaList input:checkbox", function() {
        var id = $(this).attr("data-id");
        $("#cartAreaList input:checkbox").each(function() {
            if($(this).attr("data-id") != id) {
                $(this).removeAttr('checked');
            }
        });
        showDetailsById(id);
    });
    
    $(document).on("focusout", "#thisFocus", function() {
        var id = $(this).attr("data-id");
        cart[id].name = $(this).val();
        showCartList();
    });
    
    $("#quantity").on("focusout", function() {
        var nowEditId = $("#nowEdit").val();
        cart[nowEditId].quantity = $(this).val();
    });
    
    $("#description").on("focusout", function() {
        var nowEditId = $("#nowEdit").val();
        cart[nowEditId].description = $(this).val();
    });
    
    $("#price").on("focusout", function() {
        var nowEditId = $("#nowEdit").val();
        cart[nowEditId].price = $(this).val();
    });
    
    $("#addMore").keydown(function(e) {
        if(e.which == 13) {
            if($(this).val() != "") {
                cart.push({
                    name: $(this).val()
                });
                showCartList();
                $(this).val("");
            }else{
                $("#error").fadeIn("slow").delay(1000).fadeOut("slow");
                
            }
        }
    });
    
    $(document).on("mouseenter", ".field", function() {
        var id = $(this).find("label").attr("data-id");
        $(this).append('<div class="remove" data-id="'+ id +'">X</div>');
        
    });
    $(document).on("mouseleave", ".field", function() {
        $(this).find(".remove").remove();
    });
    
    $(document).on("click", ".remove", function() {
       var id = $(this).attr("data-id");
       delete cart[id];
       if(id == $("#nowEdit").val()) {
           $(".detailsBlock").hide();
       }
       showCartList();
    });
    
    $("#addMore").on("focus", function() {
       $(".detailsBlock").hide(); 
    });
    
});

function showCartList() 
{
    $("#cartAreaList").html("");
     cart.forEach(function(val, index) {
        $("#cartAreaList").prepend('<div class="field">'
        +'<input type="checkbox" id="d'+ index +'" name="d1[]" data-id="'+ index +'" />'
        +'<label data-id="'+ index +'" for="d'+ index +'">'+ val["name"] +'</label>'
        +' </div>');
    });
    
}



function showDetailsById(id)
{
    
  
    $(".detailsBlock").show();
    console.log("id", id);
    $("#quantity").val(cart[id].quantity);
    $("#price").val(cart[id].price);
    $("#description").val(cart[id].description);
    $("#nowEdit").val(id);
    
    
      if($(window).width() <= 800) {
        $(window).scrollTop($('.formDetails').offset().top);


    }
}