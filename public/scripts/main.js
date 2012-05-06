(function() {

  require(['raphael'], function(raphael) {
    var circle, circle2, circleSet, line, paper;
    paper = raphael('bug-area', 500, 500);
    line = paper.path('M 100 100 L 200 200');
    line.attr({
      stroke: '#ccc',
      'stroke-width': '3'
    });
    circleSet = paper.set();
    circle = paper.circle(100, 100, 80);
    circle.attr({
      stroke: '#444',
      'stroke-width': '2',
      fill: 'blue',
      'fill-opacity': '.2'
    });
    circle2 = paper.circle(200, 200, 30);
    circle2.attr({
      stroke: '#444',
      'stroke-width': '2',
      fill: 'green',
      'fill-opacity': '.2'
    });
    circleSet.push(circle, circle2);
    return circleSet.hover((function() {
      return this.attr('stroke-width', '3');
    }), (function() {
      return this.attr('stroke-width', '2');
    }));
  });

}).call(this);
