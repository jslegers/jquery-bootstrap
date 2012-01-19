$(document).ready(function(){

  // Google code prettify
  // ====================

  prettyPrint();

  // scroll spy logic
  // ================

  var activeTarget,
      position = {},
      $window = $(window),
      nav = $('body > .ui-menubar li a'),
      targets = nav.map(function () {
        return $(this).attr('href');
      }),
      offsets = $.map(targets, function (id) {
        return $(id).offset().top - 50;
      });


  function setButton(id) {
    nav.parent("li").removeClass("ui-state-active");
    $(nav[$.inArray(id, targets)]).parent("li").addClass("ui-state-active");
  }

  function processScroll(e) {
    var scrollTop = $window.scrollTop() + 10, i;
    for (i = offsets.length; i--;) {
      if (activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1])) {
        activeTarget = targets[i];
        setButton(activeTarget);
      }
    }
  }

  nav.click(function () {
    processScroll();
  });

  processScroll();

  $window.scroll(processScroll);


  // Dropdown example for ui-menubar nav
  // ===============================

  $("body").bind("click", function (e) {
    $('.ui-menu').hide();
    $('.ui-button').removeClass("ui-state-active");
  });

  $(".ui-menubar .ui-button, .ui-tabs-nav .ui-button").click(function (e) {
    if(! $(this).hasClass("ui-state-active")){
       $('.ui-button').removeClass("ui-state-active");
       $('.ui-menu').hide();
    }
    var $state = $(this).toggleClass("ui-state-active");
    var $child = $(this).next().toggle();
    return false;
  });


  // table sort example
  // ==================

  $("#sortTableExample").tablesorter( {sortList: [[1,0]], widgets: ['zebra']} );


  // add on logic
  // ============

  $('.add-on :checkbox').click(function() {
    if ($(this).attr('checked')) {
      $(this).parents('.add-on').addClass("ui-state-active");
    } else {
      $(this).parents('.add-on').removeClass("ui-state-active");
    }
  });


  // Disable certain links in docs
  // =============================

  $('ul.tabs a, ul.pills a, .pagination a, .well .btn, .actions .btn, .alert-message .btn, a.close').click(function(e) {
    e.preventDefault();
  });

  // Copy code blocks in docs
  $(".copy-code").focus(function() {
    var el = this;
    // push select to event loop for chrome :{o
    setTimeout(function () { $(el).select(); }, 1);
  });


  // POSITION TWIPSIES
  // =================

  $('.twipsies.well a').each(function () {
    var type = this.title
      , $anchor = $(this)
      , $tooltip = $('.twipsies.well .ui-tooltip.' + type)

      , uitooltip = {
          width: $tooltip.width() + 10
        , height: $tooltip.height() + 10
        }

      , anchor = {
          position: $anchor.position()
        , width: $anchor.width()
        , height: $anchor.height()
        }

      , offset = {
          above: {
            top: anchor.position.top - uitooltip.height
          , left: anchor.position.left + (anchor.width/2) - (uitooltip.width/2)
          }
        , below: {
            top: anchor.position.top + anchor.height
          , left: anchor.position.left + (anchor.width/2) - (uitooltip.width/2)
          }
        , left: {
            top: anchor.position.top + (anchor.height/2) - (uitooltip.height/2)
          , left: anchor.position.left - uitooltip.width - 5
          }
        , right: {
            top: anchor.position.top + (anchor.height/2) - (uitooltip.height/2)
          , left: anchor.position.left + anchor.width + 5
          }
      }

    $tooltip.css(offset[type])

  });

});
