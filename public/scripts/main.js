(function() {

  $(function() {
    return $('#bug-list').masonry({
      itemSelector: '.bug',
      columnWidth: 10
    });
  });

}).call(this);
