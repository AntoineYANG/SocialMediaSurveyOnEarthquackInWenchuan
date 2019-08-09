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
/*
 * @Author: Antoine YANG
 * @Date: 2019-08-08 15:15:25
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2019-08-10 02:39:03
 */
var Axis;
(function (Axis_1) {
    var Axis = /** @class */ (function () {
        /**
         *Creates an instance of Axis.
         * @param {JQuery<HTMLElement>} parent the parent <SVG> JQuery element
         * @memberof Axis
         */
        function Axis(parent) {
            this.parent = null;
            this.board = null;
            this.box = null;
            this.area = null;
            this.margin = [20, 20, 20, 20];
            this.width = 0;
            this.height = 0;
            this.padding = [60, 20, 50, 60];
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
        /**
         *Parses a string into 4d-array.
         * @protected
         * @static
         * @param {string} str
         * @returns {Array<number>} 4d-array
         * @memberof Axis
         */
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
        /**
         *Removes all the observed elements in the axis.
         * @memberof Axis
         */
        Axis.prototype.clear = function () {
            this.observed.forEach(function (e) {
                e.remove();
            });
            this.observed = [];
        };
        return Axis;
    }());
    Axis_1.Axis = Axis;
    var Axis2d = /** @class */ (function (_super) {
        __extends(Axis2d, _super);
        /**
         *Creates an instance of Axis2d.
         * @param {JQuery<HTMLElement>} parent the parent <SVG> JQuery element
         * @memberof Axis2d
         */
        function Axis2d(parent) {
            var _this = _super.call(this, parent) || this;
            _this.scale_x = null;
            _this.scale_y = null;
            _this.X = null;
            _this.Y = null;
            _this.X_domain_min = null;
            _this.X_domain_max = null;
            _this.Y_domain_min = null;
            _this.Y_domain_max = null;
            _this.X_ticks = [];
            _this.Y_ticks = [];
            _this.scale_x = new LinearScale();
            _this.scale_y = new LinearScale();
            _this.adjustBox();
            _this.X = $(jQuery.parseXML("<line                 style=\"stroke: black; stroke-width: 1px;\"                 x1=\"" + _this.padding[3] + "\" y1=\"" + (_this.padding[0] + _this.h_) + "\"                 x2=\"" + (_this.padding[3] + _this.w_) + "\" y2=\"" + (_this.padding[0] + _this.h_) + "\"                xmlns=\"http://www.w3.org/2000/svg\" __style__=\"scale\"></line>").documentElement);
            _this.board.append(_this.X);
            _this.Y = $(jQuery.parseXML("<line                 style=\"stroke: black; stroke-width: 1px;\"                 x1=\"" + _this.padding[3] + "\" y1=\"" + (_this.padding[0] + _this.h_) + "\"                 x2=\"" + _this.padding[3] + "\" y2=\"" + _this.padding[0] + "\"                xmlns=\"http://www.w3.org/2000/svg\" __style__=\"scale\"></line>").documentElement);
            _this.board.append(_this.Y);
            return _this;
        }
        /**
         *Sets the domain of the x scale.
         * @param {number} min minimum input value
         * @param {number} max maximun input value
         * @returns {Axis2d} the object itself
         * @memberof Axis2d
         */
        Axis2d.prototype.domain_x = function (min, max) {
            this.X_domain_min = min;
            this.X_domain_max = max;
            this.scale_x.domain(min, max);
            this.note(5, 'x');
            this.update();
            return this;
        };
        /**
         *Sets the domain of the y scale.
         * @param {number} min minimum input value
         * @param {number} max maximun input value
         * @returns {Axis2d} the object itself
         * @memberof Axis2d
         */
        Axis2d.prototype.domain_y = function (min, max) {
            this.Y_domain_min = min;
            this.Y_domain_max = max;
            this.scale_y.domain(min, max);
            this.note(5, 'y');
            this.update();
            return this;
        };
        /**
         *Returns the projection of x-corrdinate.
         * @param {number} x x-corrdinate
         * @returns {number} x-projection
         * @memberof Axis2d
         */
        Axis2d.prototype.fx = function (x) {
            return this.scale_x.to(x);
        };
        /**
         *Returns the projection of y-coordinate.
         * @param {number} y y-corrdinate
         * @returns {number} y-projection
         * @memberof Axis2d
         */
        Axis2d.prototype.fy = function (y) {
            return this.scale_y.to(y);
        };
        /**
         *Adjusts the box model.
         * @protected
         * @memberof Axis
         */
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
        };
        /**
         *Set the principle to act when input data is out of range, default=forbidden
         * @param {string} solution principle
         * * `hard` — calculate it by the scale
         * * `stuck` — regard it as the min / max value
         * * `forbidden` — raise an error
         * @param {string} limit the referred scale, default='both'
         * * `both` — both two scales
         * * `x` — x scale
         * * `y` — y scale
         * @returns {Axis} the object itself
         * @memberof Axis
         */
        Axis2d.prototype.handle = function (solution, limit) {
            if (limit === void 0) { limit = 'both'; }
            switch (limit) {
                case 'both':
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
            this.update();
            return this;
        };
        /**
         *Sets one attribute of this object.
         * @param {string} param the name of the attribute
         * * `background`
         * * `fill`
         * * `margin`
         * * `padding`
         * * `width`
         * * `height`
         * @param {string} value the new value of this attribute
         * @returns {Axis} the object itself
         * @memberof Axis
         */
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
            this.update();
            return this;
        };
        /**
         *Appends an SVG element by the coordinate.
         * @param {string} element the tab of the element needed appending
         * @param {number} data each dimension of the coordinate
         * @returns {JQuery<HTMLElement>} the appended jQuery element
         * @memberof Axis
         */
        Axis2d.prototype.append = function (element) {
            var data = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                data[_i - 1] = arguments[_i];
            }
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
            svg.attr('__data__', data[0] + "," + data[1]);
            svg.attr('x', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
            svg.attr('y', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
            svg.attr('cx', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
            svg.attr('cy', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
            this.board.append(svg);
            this.observed.push(svg);
            return svg;
        };
        /**
         *Appends a kind of SVG elements by a list of coordinates.
         * @param {string} element the tab of the elements needed appending
         * @param {Array< Array<number> >} nodes list of coordinates
         * @returns {JQuery<HTMLElement>} the appended jQuery elements
         * @memberof Axis
         */
        Axis2d.prototype.join = function (element, nodes) {
            var _this = this;
            var svg = $('_');
            nodes.forEach(function (d) {
                svg = svg.add(_this.append(element, d[0], d[1]));
            });
            return svg;
        };
        /**
         *Appends a <text> element by the coordinate.
         * @param {string} text the text of the element
         * @param {number} data each dimension of the coordinate
         * @returns {JQuery<HTMLElement>} the appended jQuery element
         * @memberof Axis
         */
        Axis2d.prototype.addtext = function (text) {
            var data = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                data[_i - 1] = arguments[_i];
            }
            var svg = $(jQuery.parseXML("<text                style=\"fill: black; fill-opacity: 1;\"                 xmlns=\"http://www.w3.org/2000/svg\">" + text + "</pa>").documentElement);
            svg.attr('__style__', 'point');
            svg.attr('__data__', data[0] + "," + data[1]);
            svg.attr('x', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
            svg.attr('y', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
            svg.attr('cx', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
            svg.attr('cy', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
            this.board.append(svg);
            this.observed.push(svg);
            return svg;
        };
        /**
         *Appends a <path> element by a list of coordinates.
         * @param {Array< Array<number> >} data list of coordinates
         * @returns {JQuery<HTMLElement>} the appended jQuery element
         * @memberof Axis
         */
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
        /**
         *Updates the scales and all the observed elements in the axis.
         * @protected
         * @abstract
         * @memberof Axis
         */
        Axis2d.prototype.update = function () {
            var _this = this;
            this.X.attr('x1', this.padding[3])
                .attr('y1', this.padding[0] + this.h_)
                .attr('x2', this.padding[3] + this.w_)
                .attr('y2', this.padding[0] + this.h_);
            this.Y.attr('x1', this.padding[3])
                .attr('y1', this.padding[0] + this.h_)
                .attr('x2', this.padding[3])
                .attr('y2', this.padding[0]);
            var ticks = this.X_ticks.length;
            if (ticks > 0)
                this.note(ticks, 'x');
            ticks = this.Y_ticks.length;
            if (ticks > 0)
                this.note(ticks, 'y');
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
        /**
         *Gets the scale(s).
         * @param {string} [limit='both'] referred scale(s)
         * * `both` — both two scales
         * * `x` — x scale
         * * `y` — y scale
         * @returns {JQuery<HTMLElement>} JQuery selection
         * @memberof Axis2d
         */
        Axis2d.prototype.scale = function (limit) {
            if (limit === void 0) { limit = 'both'; }
            switch (limit) {
                case 'both':
                    return this.X.add(this.Y);
                case 'x':
                    return this.X;
                case 'y':
                    return this.Y;
            }
            return null;
        };
        /**
         *Adds ticks on the scale(s)
         * @param {number} ticks number of ticks
         * @param {string} [limit='both'] referred scale(s)
         * * `both` — both two scales
         * * `x` — x scale
         * * `y` — y scale
         * @returns {JQuery<HTMLElement>} jQuery selection of the added <text> element
         * @memberof Axis2d
         */
        Axis2d.prototype.note = function (ticks, limit) {
            if (limit === void 0) { limit = 'both'; }
            var box = $('_');
            var step = 0;
            var level = 0;
            switch (limit) {
                case 'both':
                    box = box.add(this.note(ticks, 'x'));
                    box = box.add(this.note(ticks, 'y'));
                    break;
                case 'x':
                    this.X_ticks.forEach(function (e) {
                        e.remove();
                    });
                    this.X_ticks = [];
                    step = (this.X_domain_max - this.X_domain_min) / (ticks - 1);
                    level = levelof(step) - 1;
                    step = parseInt((step / Math.pow(10, level)).toString()) * Math.pow(10, level);
                    for (var i = 0; i < ticks; i++) {
                        var svg = $(jQuery.parseXML("<text text-anchor=\"middle\"                            style=\"fill: black; fill-opacity: 1;\" __style__=\"tick_x\"                            x=\"" + this.fx(this.X_domain_min + step * i) + "\"                             y=\"" + (this.padding[0] + this.h_) + "\" dy=\"18\"                             xmlns=\"http://www.w3.org/2000/svg\">" + (this.X_domain_min + step * i) + "</text>").documentElement);
                        this.board.append(svg);
                        this.X_ticks.push(svg);
                        box = box.add(svg);
                    }
                    break;
                case 'y':
                    this.Y_ticks.forEach(function (e) {
                        e.remove();
                    });
                    this.Y_ticks = [];
                    step = (this.Y_domain_max - this.Y_domain_min) / (ticks - 1);
                    level = levelof(step) - 1;
                    step = parseInt((step / Math.pow(10, level)).toString()) * Math.pow(10, level);
                    for (var i = 0; i < ticks; i++) {
                        var svg = $(jQuery.parseXML("<text text-anchor=\"end\"                            style=\"fill: black; fill-opacity: 1;\" __style__=\"tick_y\"                            x=\"" + this.padding[3] + "\" dx=\"-6\"                             y=\"" + this.fy(this.Y_domain_min + step * i) + "\"                            xmlns=\"http://www.w3.org/2000/svg\">" + (this.Y_domain_min + step * i) + "</text>").documentElement);
                        this.board.append(svg);
                        this.Y_ticks.push(svg);
                        box = box.add(svg);
                    }
                    break;
            }
            return box;
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
    /**
     *
     * Returns the base 10 logarithm of a number
     * @param {number} x
     * @returns {number} logarithm: int
     */
    function levelof(x) {
        var level = 1;
        if (x >= 10) {
            while (x > 100) {
                x /= 10;
                level++;
            }
        }
        else {
            while (x < 10) {
                x *= 10;
                level--;
            }
        }
        return level;
    }
})(Axis || (Axis = {}));
