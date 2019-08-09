/*
 * @Author: Antoine YANG
 * @Date: 2019-08-08 15:15:25
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2019-08-09 18:36:48
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Axis;
(function (Axis_1) {
    var Axis = /** @class */ (function () {
        function Axis(parent) {
            this.parent = null;
            this.board = null;
            this.box = null;
            this.area = null;
            this.margin = [20, 20, 20, 20];
            this.width = 0;
            this.height = 0;
            this.padding = [50, 20, 50, 20];
            this.w_ = 0;
            this.h_ = 0;
            this.fill = "#eee";
            this.background = "white";
            this.observed = [];
            this.parent = parent;
            this.width = parseFloat(parent.attr('width')) - this.margin[1] - this.margin[3];
            this.height = parseFloat(parent.attr('height')) - this.margin[0] - this.margin[2];
            var board = jQuery.parseXML("<g xmlns=\"http://www.w3.org/2000/svg\" width=\"" + this.width + "px\" height=\"" + this.height + "px\"                 transform=\"translate(" + this.margin[3] + "," + this.margin[0] + ")\"                ></g>").documentElement;
            this.board = $(board);
            this.board.css('width', this.width - this.margin[1] - this.margin[3] + "px")
                .css('height', this.height - this.margin[0] - this.margin[2] + "px");
            this.parent.append(this.board);
            var box = jQuery.parseXML("<rect class=\"g-background\" style=\"fill: " + this.background + ";\"                 xmlns=\"http://www.w3.org/2000/svg\" width=\"" + (this.width - this.margin[1] - this.margin[3]) + "px\"                 height=\"" + (this.height - this.margin[0] - this.margin[2]) + "px\"                 ></rect>").documentElement;
            this.board.append(box);
            this.box = $(box);
            var area = jQuery.parseXML("<rect class=\"axis-background\" style=\"fill: " + this.fill + ";\"                 xmlns=\"http://www.w3.org/2000/svg\" width=\"" + this.w_ + "px\" height=\"" + this.h_ + "px\"                 x=\"" + this.padding[3] + "px\" y=\"" + this.padding[0] + "px\"                ></rect>").documentElement;
            this.board.append(area);
            this.area = $(area);
        }
        Axis.parseBox = function (str) {
            var val = [];
            var list = str.indexOf(',') != -1 ? str.split(',') : str.split(' ');
            list.forEach(function (s) {
                val.push(parseFloat(s));
            });
            var set = [];
            switch (val.length) {
                case 1:
                    set = [val[0], val[0], val[0], val[0]];
                    break;
                case 2:
                    set = [val[0], val[1], val[0], val[1]];
                    break;
                case 3:
                    set = [val[0], val[1], val[2], val[1]];
                    break;
                default:
                    set = [val[0], val[1], val[2], val[3]];
            }
            return set;
        };
        return Axis;
    }());
    Axis_1.Axis = Axis;
    var Axis2d = /** @class */ (function (_super) {
        __extends(Axis2d, _super);
        function Axis2d(parent) {
            var _this = _super.call(this, parent) || this;
            _this.scale_x = null;
            _this.scale_y = null;
            _this.scale_x = new LinearScale();
            _this.scale_y = new LinearScale();
            _this.adjustBox();
            return _this;
        }
        Axis2d.prototype.domain_x = function (min, max) {
            this.scale_x.domain(min, max);
            return this;
        };
        Axis2d.prototype.domain_y = function (min, max) {
            this.scale_y.domain(min, max);
            return this;
        };
        Axis2d.prototype.fx = function (x) {
            return this.scale_x.to(x);
        };
        Axis2d.prototype.fy = function (y) {
            return this.scale_y.to(y);
        };
        Axis2d.prototype.adjustBox = function () {
            this.width = parseFloat(this.parent.attr('width')) - this.margin[1] - this.margin[3];
            this.height = parseFloat(this.parent.attr('height')) - this.margin[0] - this.margin[2];
            this.board.css('width', this.width + "px")
                .css('height', this.height + "px")
                .attr('transform', "translate(" + this.margin[3] + "," + this.margin[0] + ")")
                .css('margin', this.margin[0] + "px " + this.margin[1] + "px " + this.margin[2] + "px " + this.margin[3] + "px");
            this.box.attr('width', this.width + "px")
                .attr('height', this.height + "px");
            this.w_ = this.width - this.padding[1] - this.padding[3];
            this.h_ = this.height - this.padding[0] - this.padding[2];
            this.area.attr('width', this.w_ + "px").attr('height', this.h_ + "px")
                .attr('x', this.padding[3] + "px")
                .attr('y', this.padding[0] + "px");
            this.scale_x.range(this.padding[3], this.padding[3] + this.w_);
            this.scale_y.range(this.padding[0] + this.h_, this.padding[0]);
            this.update();
        };
        Axis2d.prototype.handle = function (solution, limit) {
            if (limit === void 0) { limit = 'all'; }
            switch (limit) {
                case 'all':
                    this.handle(solution, 'x').handle(solution, 'y');
                    break;
                case 'x':
                    switch (solution) {
                        case 'hard':
                            this.scale_x.handle(Solution.hard);
                            break;
                        case 'stuck':
                            this.scale_x.handle(Solution.stuck);
                            break;
                        case 'forbidden':
                            this.scale_x.handle(Solution.forbidden);
                            break;
                    }
                    break;
                case 'y':
                    switch (solution) {
                        case 'hard':
                            this.scale_y.handle(Solution.hard);
                            break;
                        case 'stuck':
                            this.scale_y.handle(Solution.stuck);
                            break;
                        case 'forbidden':
                            this.scale_y.handle(Solution.forbidden);
                            break;
                    }
                    break;
            }
            return this;
        };
        Axis2d.prototype.set = function (param, value) {
            value = value.toString();
            switch (param) {
                case 'background':
                    this.background = value;
                    this.box.css('fill', this.background);
                    return this;
                case 'fill':
                    this.fill = value;
                    this.area.css('fill', this.fill);
                    return this;
                case 'margin':
                    this.margin = Axis2d.parseBox(value);
                    break;
                case 'padding':
                    this.padding = Axis2d.parseBox(value);
                    break;
                case 'width':
                    this.width = parseFloat(value);
                    break;
                case 'height':
                    this.height = parseFloat(value);
                    break;
            }
            this.adjustBox();
            return this;
        };
        Axis2d.prototype.append = function (element, x, y) {
            var svg = $(jQuery.parseXML("<" + element + "                style=\"fill: white; stroke: black; stroke-width: 1px; fill-opacity: 1;\"                 xmlns=\"http://www.w3.org/2000/svg\"></" + element + ">").documentElement);
            switch (element) {
                case 'circle':
                    svg.attr('r', 5);
                    break;
                case 'rect':
                    svg.attr('width', 10).attr('height', 10).attr('transform', 'translate(-5,-5)');
                    break;
            }
            svg.attr('__style__', 'point');
            svg.attr('__data__', x + "," + y);
            svg.attr('x', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
            svg.attr('y', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
            svg.attr('cx', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
            svg.attr('cy', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
            this.board.append(svg);
            this.observed.push(svg);
            return svg;
        };
        Axis2d.prototype.text = function (text, x, y) {
            var svg = $(jQuery.parseXML("<text                style=\"fill: black; fill-opacity: 1;\"                 xmlns=\"http://www.w3.org/2000/svg\">" + text + "</text>").documentElement);
            svg.attr('__style__', 'point');
            svg.attr('__data__', x + "," + y);
            svg.attr('x', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
            svg.attr('y', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
            svg.attr('cx', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
            svg.attr('cy', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
            this.board.append(svg);
            this.observed.push(svg);
            return svg;
        };
        Axis2d.prototype.path = function (data) {
            var points = [];
            data.forEach(function (e) {
                points.push(e.join(','));
            });
            var d = "M" + this.fx(data[0][0]) + " " + this.fy(data[0][1]);
            for (var i = 1; i < data.length; i++) {
                d += " L" + this.fx(data[i][0]) + " " + this.fy(data[i][1]);
            }
            var polyline = $(jQuery.parseXML("<path __data__=\"" + points.join(';') + ";\"                style=\"stroke: black; stroke-width: 1px; fill: none;\" d=\"" + d + "\"                xmlns=\"http://www.w3.org/2000/svg\" __style__=\"path\"></path>").documentElement);
            this.board.append(polyline);
            this.observed.push(polyline);
            return polyline;
        };
        Axis2d.prototype.update = function () {
            var _this = this;
            this.observed.forEach(function (e) {
                if (e.attr('__style__') == 'point') {
                    e.attr('x', _this.fx(parseFloat(e.attr('__data__').toString().split(',')[0])));
                    e.attr('y', _this.fy(parseFloat(e.attr('__data__').toString().split(',')[1])));
                    e.attr('cx', _this.fx(parseFloat(e.attr('__data__').toString().split(',')[0])));
                    e.attr('cy', _this.fy(parseFloat(e.attr('__data__').toString().split(',')[1])));
                }
                else if (e.attr('__style__') == 'path') {
                    var data = e.attr('__data__').split(';');
                    var s = data[0];
                    var d = "M" + _this.fx(parseFloat(s.split(',')[0])) + " " + _this.fy(parseFloat(s.split(',')[1]));
                    for (var i = 1; i < data.length; i++) {
                        s = data[i];
                        d += " L" + _this.fx(parseFloat(s.split(',')[0])) + " " + _this.fy(parseFloat(s.split(',')[1]));
                    }
                    e.attr('d', d);
                }
            });
        };
        return Axis2d;
    }(Axis));
    Axis_1.Axis2d = Axis2d;
    var Solution;
    (function (Solution) {
        Solution[Solution["stuck"] = 0] = "stuck";
        Solution[Solution["forbidden"] = 1] = "forbidden";
        Solution[Solution["hard"] = 2] = "hard";
    })(Solution = Axis_1.Solution || (Axis_1.Solution = {}));
    var LinearScale = /** @class */ (function () {
        function LinearScale() {
            this.domain_min = null;
            this.domain_max = null;
            this.range_min = null;
            this.range_max = null;
            this.out_of_range = Solution.forbidden;
        }
        LinearScale.prototype.domain = function (min, max) {
            this.domain_min = min;
            this.domain_max = max;
            return this;
        };
        LinearScale.prototype.range = function (min, max) {
            this.range_min = min;
            this.range_max = max;
            return this;
        };
        LinearScale.prototype.to = function (val) {
            if (this.domain_min == null || this.domain_max == null || this.range_min == null || this.range_max == null) {
                console.error('This scale is not defined yet: ', this);
                return null;
            }
            var num = (val - this.domain_min) * (this.range_max - this.range_min) / (this.domain_max - this.domain_min) + this.range_min;
            if (num > this.range_max && num > this.range_min || num < this.range_max && num < this.range_min) {
                switch (this.out_of_range) {
                    case Solution.hard:
                        return num;
                    case Solution.stuck:
                        return num > num > this.range_max && num > this.range_min
                            ? this.range_max > this.range_min ? this.range_max : this.range_min
                            : num < this.range_max && num < this.range_min
                                ? this.range_max > this.range_min ? this.range_min : this.range_max
                                : num;
                    case Solution.forbidden:
                        console.warn("Received value " + val + " out of range: [" + this.domain_min + ", " + this.domain_max + "]");
                        return null;
                }
            }
            return num;
        };
        LinearScale.prototype.from = function (cor) {
            if (this.domain_min == null || this.domain_max == null || this.range_min == null || this.range_max == null) {
                console.error('This scale is not defined yet: ', this);
                return null;
            }
            return (cor - this.range_min) * (this.domain_max - this.domain_min) / (this.range_max - this.range_min) + this.domain_min;
        };
        LinearScale.prototype.handle = function (s) {
            this.out_of_range = s;
            return this;
        };
        LinearScale.prototype.random = function () {
            if (this.domain_min == null || this.domain_max == null || this.range_min == null || this.range_max == null) {
                console.error('This scale is not defined yet: ', this);
                return null;
            }
            return this.to(Math.random() * (this.domain_max - this.domain_min) + this.domain_min);
        };
        return LinearScale;
    }());
    Axis_1.LinearScale = LinearScale;
})(Axis || (Axis = {}));
