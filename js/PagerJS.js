$("table.paginated").each(function() {
  var $table = $(this);
  var itemsPerPage = 10;
  var currentPage = 0;
  var pages = Math.ceil($table.find("tr:not(:has(th))").length / itemsPerPage);
  $table.bind("repaginate", function() {
    if (pages > 1) {
      var pager;
      if ($table.next().hasClass("pager")) pager = $table.next().empty();
      else pager = $('<div class="pager"></div>');

      $('<div class="pg-goto"></div>')
        .text("  First ")
        .bind("click", function() {
          currentPage = 0;
          $table.trigger("repaginate");
        })
        .appendTo(pager);

      $('<div class="pg-goto"> &laquo; </div>')
        .bind("click", function() {
          if (currentPage > 0) currentPage--;
          $table.trigger("repaginate");
        })
        .appendTo(pager);

      var startPager = currentPage > 2 ? currentPage - 2 : 0;
      var endPager = startPager > 0 ? currentPage + 3 : 5;
      if (endPager > pages) {
        endPager = pages;
        startPager = pages - 5;
        if (startPager < 0) startPager = 0;
      }

      for (var page = startPager; page < endPager; page++) {
        $(
          '<div id="pg' +
            page +
            '" class="' +
            (page == currentPage ? "pg-selected" : "pg-normal") +
            '"></div>'
        )
          .text(page + 1)
          .bind(
            "click",
            {
              newPage: page
            },
            function(event) {
              currentPage = event.data["newPage"];
              $table.trigger("repaginate");
            }
          )
          .appendTo(pager);
      }

      $('<div class="pg-goto"> &raquo; </div>')
        .bind("click", function() {
          if (currentPage < pages - 1) currentPage++;
          $table.trigger("repaginate");
        })
        .appendTo(pager);
      $('<div class="pg-goto"> Last  </div>')
        .bind("click", function() {
          currentPage = pages - 1;
          $table.trigger("repaginate");
        })
        .appendTo(pager);

      if (!$table.next().hasClass("pager")) pager.insertAfter($table);
      //pager.insertBefore($table);
    } // end $table.bind('repaginate', function () { ...

    $table
      .find("tbody tr:not(:has(th))")
      .hide()
      .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      .show();
  });

  $table.trigger("repaginate");
});
