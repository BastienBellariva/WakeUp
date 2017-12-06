$( "#divButtonUpdate" ).click(function() {
    $( ".divAlarm:first" ).animate({
        left: 100
      }, {
        duration: 1000,
        step: function( now, fx ){
          $( ".divAlarm:gt(0)" ).css( "left", now );
        }
      });
  });