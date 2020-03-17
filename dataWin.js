    // HANOI
    $(".field1").hover(function(){
        $(".discr").html($(this).attr("data-tooltip"));
        $(".discr").fadeIn();
    },
        function(){
            $(".discr").fadeOut();
        }
    );
