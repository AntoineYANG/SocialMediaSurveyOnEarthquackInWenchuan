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
 * @Last Modified time: 2019-08-14 00:52:47
 */
var Visf;
(function (Visf) {
    var Color;
    (function (Color_1) {
        /**
         *Rgb color code
         * @class
         */
        var Rgb = /** @class */ (function () {
            function Rgb(r, g, b) {
                this.r = r < 0 ? 0 : r > 255 ? 255 : r;
                this.g = g < 0 ? 0 : g > 255 ? 255 : g;
                this.b = b < 0 ? 0 : b > 255 ? 255 : b;
            }
            Rgb.prototype.toString = function () {
                return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
            };
            Rgb.prototype.brighter = function (k) {
                if (k === void 0) { k = 0.3; }
                var r = this.r + (255 - this.r) * k;
                var g = this.g + (255 - this.g) * k;
                var b = this.b + (255 - this.b) * k;
                return new Rgb(r, g, b);
            };
            Rgb.prototype.darker = function (k) {
                if (k === void 0) { k = 0.3; }
                var r = this.r * (1 - k);
                var g = this.g * (1 - k);
                var b = this.b * (1 - k);
                return new Rgb(r, g, b);
            };
            return Rgb;
        }());
        Color_1.Rgb = Rgb;
        /**
         *Color scheme
         * @export
         * @class Color
         */
        var Color = /** @class */ (function () {
            function Color() {
            }
            /**
             *Returns the theme name.
            * @returns {string} theme name
            * @memberof Color
            */
            Color.prototype.getName = function () {
                return this.name;
            };
            /**
             *Returns the number of colors contained.
            * @returns {number} number of colors
            * @memberof Color
            */
            Color.prototype.size = function () {
                return this.list.length;
            };
            /**
             *Returns the code of the (n)th color.
            * @param {number} n index
            * @returns {string} rgb code
            * @memberof Color
            */
            Color.prototype.at = function (n) {
                return this.list[n % this.size()].toString();
            };
            /**
             *Returns the code of the suggested background color 1.
             * @returns {string} rgb code
             * @memberof Color
             */
            Color.prototype.getBackground1 = function () {
                return this.background1.toString();
            };
            /**
             *Returns the code of the suggested background color 2.
             * @returns {string} rgb code
             * @memberof Color
             */
            Color.prototype.getBackground2 = function () {
                return this.background2.toString();
            };
            /**
             *Returns the code of the suggested text or line color.
             * @returns {string} rgb code
             * @memberof Color
             */
            Color.prototype.getOutstand = function () {
                return this.outstand.toString();
            };
            return Color;
        }());
        Color_1.Color = Color;
        var Artists;
        (function (Artists) {
            var Monet;
            (function (Monet) {
                var Monet_dark = /** @class */ (function (_super) {
                    __extends(Monet_dark, _super);
                    function Monet_dark() {
                        var _this = _super.call(this) || this;
                        _this.name = 'Monet_dark';
                        _this.background1 = new Rgb(71, 42, 42);
                        _this.background2 = new Rgb(57, 26, 26);
                        _this.outstand = new Rgb(251, 238, 238);
                        var list = [[246, 224, 237], [191, 96, 47], [236, 239, 165], [93, 121, 70], [217, 167, 143],
                            [167, 147, 97], [218, 168, 65], [167, 193, 194], [170, 130, 146], [165, 168, 91]];
                        _this.list = [];
                        list.forEach(function (c) {
                            _this.list.push(new Rgb(c[0], c[1], c[2]));
                        });
                        return _this;
                    }
                    return Monet_dark;
                }(Color));
                Monet.Monet_dark = Monet_dark;
                var Monet_bright = /** @class */ (function (_super) {
                    __extends(Monet_bright, _super);
                    function Monet_bright() {
                        var _this = _super.call(this) || this;
                        _this.name = 'Monet_bright';
                        _this.background1 = new Rgb(253, 244, 244);
                        _this.background2 = new Rgb(251, 238, 238);
                        _this.outstand = new Rgb(57, 26, 26);
                        var list = [[146, 74, 76], [74, 48, 47], [145, 172, 95], [167, 121, 144], [92, 139, 140],
                            [45, 97, 48], [46, 70, 119], [119, 119, 143], [143, 121, 48], [198, 198, 90]];
                        _this.list = [];
                        list.forEach(function (c) {
                            _this.list.push(new Rgb(c[0], c[1], c[2]));
                        });
                        return _this;
                    }
                    return Monet_bright;
                }(Color));
                Monet.Monet_bright = Monet_bright;
            })(Monet = Artists.Monet || (Artists.Monet = {}));
            var Matisse;
            (function (Matisse) {
                var Matisse_dark = /** @class */ (function (_super) {
                    __extends(Matisse_dark, _super);
                    function Matisse_dark() {
                        var _this = _super.call(this) || this;
                        _this.name = 'Matisse_dark';
                        _this.background1 = new Rgb(46, 48, 61);
                        _this.background2 = new Rgb(79, 81, 94);
                        _this.outstand = new Rgb(220, 220, 223);
                        var list = [[221, 18, 14], [232, 172, 21], [234, 234, 234], [122, 122, 198], [245, 98, 0],
                            [89, 170, 117], [2, 97, 242], [119, 193, 193], [219, 97, 120], [202, 170, 119]];
                        _this.list = [];
                        list.forEach(function (c) {
                            _this.list.push(new Rgb(c[0], c[1], c[2]));
                        });
                        return _this;
                    }
                    return Matisse_dark;
                }(Color));
                Matisse.Matisse_dark = Matisse_dark;
                var Matisse_bright = /** @class */ (function (_super) {
                    __extends(Matisse_bright, _super);
                    function Matisse_bright() {
                        var _this = _super.call(this) || this;
                        _this.name = 'Matisse_bright';
                        _this.background1 = new Rgb(247, 245, 237);
                        _this.background2 = new Rgb(246, 240, 220);
                        _this.outstand = new Rgb(25, 25, 23);
                        var list = [[0, 44, 146], [80, 122, 0], [110, 45, 149], [249, 44, 17], [17, 17, 17],
                            [4, 195, 88], [2, 97, 242], [249, 220, 2], [168, 16, 18], [183, 218, 219]];
                        _this.list = [];
                        list.forEach(function (c) {
                            _this.list.push(new Rgb(c[0], c[1], c[2]));
                        });
                        return _this;
                    }
                    return Matisse_bright;
                }(Color));
                Matisse.Matisse_bright = Matisse_bright;
            })(Matisse = Artists.Matisse || (Artists.Matisse = {}));
        })(Artists = Color_1.Artists || (Color_1.Artists = {}));
    })(Color = Visf.Color || (Visf.Color = {}));
    var Axis;
    (function (Axis_1) {
        /**
         *Plot axis
        * @export
        * @abstract
        * @class Axis
        */
        var Axis = /** @class */ (function () {
            /**
             *Creates an instance of Axis.
             * @param {JQuery<HTMLElement>} parent the parent <SVG> JQuery element
             * @memberof Axis
             */
            function Axis(parent, theme) {
                if (theme === void 0) { theme = null; }
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
                this.theme = null;
                this.fill = "#ccc";
                this.background = "#eee";
                this.observed = [];
                this.series = 0;
                this.theme = theme;
                this.parent = parent;
                this.width = parseFloat(parent.attr('width')) - this.margin[1] - this.margin[3];
                this.height = parseFloat(parent.attr('height')) - this.margin[0] - this.margin[2];
                var board = jQuery.parseXML("<g xmlns=\"http://www.w3.org/2000/svg\" width=\"" + this.width + "px\" height=\"" + this.height + "px\"                     transform=\"translate(" + this.margin[3] + "," + this.margin[0] + ")\"                    ></g>").documentElement;
                this.board = $(board);
                this.board.css('width', this.width - this.margin[1] - this.margin[3] + "px")
                    .css('height', this.height - this.margin[0] - this.margin[2] + "px");
                this.parent.append(this.board);
                var fill = this.theme === null ? this.background : this.theme.getBackground1();
                var box = jQuery.parseXML("<rect class=\"g-background\" style=\"fill: " + fill + ";\"                     xmlns=\"http://www.w3.org/2000/svg\" width=\"" + (this.width - this.margin[1] - this.margin[3]) + "px\"                     height=\"" + (this.height - this.margin[0] - this.margin[2]) + "px\"                     ></rect>").documentElement;
                this.board.append(box);
                this.box = $(box);
                fill = this.theme === null ? this.fill : this.theme.getBackground2();
                var area = jQuery.parseXML("<rect class=\"axis-background\" style=\"fill: " + fill + ";\"                     xmlns=\"http://www.w3.org/2000/svg\" width=\"" + this.w_ + "px\" height=\"" + this.h_ + "px\"                     x=\"" + this.padding[3] + "px\" y=\"" + this.padding[0] + "px\"                    ></rect>").documentElement;
                this.board.append(area);
                this.area = $(area);
                this.series = 0;
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
            /**
             *Returns a jQuery selection of fitting elements in the axis.
             * @param {string} [key='*']
             * @returns {JQuery<HTMLElement>}
             * @memberof Axis
             */
            Axis.prototype.all = function (key) {
                if (key === void 0) { key = '*'; }
                var svg = $('_');
                this.observed.forEach(function (e) {
                    if (key != '*' && e.attr('__tab__') != key)
                        return;
                    svg = svg.add(e);
                });
                return svg;
            };
            return Axis;
        }());
        Axis_1.Axis = Axis;
        /**
         *2d plot axis
        * @export
        * @class Axis2d
        * @extends {Axis}
        */
        var Axis2d = /** @class */ (function (_super) {
            __extends(Axis2d, _super);
            /**
             *Creates an instance of Axis2d.
            * @param {JQuery<HTMLElement>} parent the parent <SVG> JQuery element
            * @memberof Axis2d
            */
            function Axis2d(parent, theme) {
                if (theme === void 0) { theme = null; }
                var _this = _super.call(this, parent, theme) || this;
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
                _this.X_domain_list = null;
                _this.Y_domain_list = null;
                _this.scale_x = Scale.getInstance();
                _this.scale_y = Scale.getInstance();
                _this.adjustBox();
                _this.X = $(jQuery.parseXML("<line                     style=\"stroke: black; stroke-width: 1px;\"                     x1=\"" + _this.padding[3] + "\" y1=\"" + (_this.padding[0] + _this.h_) + "\"                     x2=\"" + (_this.padding[3] + _this.w_) + "\" y2=\"" + (_this.padding[0] + _this.h_) + "\"                    xmlns=\"http://www.w3.org/2000/svg\" __style__=\"scale\"></line>").documentElement);
                _this.board.append(_this.X);
                _this.Y = $(jQuery.parseXML("<line                     style=\"stroke: black; stroke-width: 1px;\"                     x1=\"" + _this.padding[3] + "\" y1=\"" + (_this.padding[0] + _this.h_) + "\"                     x2=\"" + _this.padding[3] + "\" y2=\"" + _this.padding[0] + "\"                    xmlns=\"http://www.w3.org/2000/svg\" __style__=\"scale\"></line>").documentElement);
                _this.board.append(_this.Y);
                return _this;
            }
            /**
             *Sets the style of x scale.
             * @param {string} style kind of scale
             * * `linear`
             * * `log`
             * * `ordinal`
             * * `power`
             * @param {any} [content=null] as style defined...
             * * `linear` useless
             * * `log` base of the logarithm
             * * `ordinal` domain list of ordinal scale
             * * `power`
             * @returns {Axis2d} the object itself
             * @memberof Axis2d
             */
            Axis2d.prototype.xScale = function (style, content) {
                if (content === void 0) { content = null; }
                this.scale_x = Scale.getInstance(style)
                    .domain(this.X_domain_min, this.X_domain_max).range(this.padding[3], this.padding[3] + this.w_);
                if (content == null) {
                    this.update();
                    return this;
                }
                if (style == 'ordinal') {
                    this.scale_x.among(content);
                    this.X_domain_list = content;
                }
                else if (style == 'log') {
                    this.scale_x.base(content);
                }
                else if (style == 'power') {
                    this.scale_x.base(content);
                }
                this.update();
                return this;
            };
            /**
             *Sets the style of y scale.
             * @param {string} style kind of scale
             * * `linear`
             * * `log`
             * * `ordinal`
             * * `power`
             * @param {any} [content=null] as style defined...
             * * `linear` useless
             * * `log` base of the logarithm
             * * `ordinal` domain list of ordinal scale
             * * `power`
             * @returns {Axis2d} the object itself
             * @memberof Axis2d
             */
            Axis2d.prototype.yScale = function (style, content) {
                if (content === void 0) { content = null; }
                this.scale_y = Scale.getInstance(style)
                    .domain(this.Y_domain_min, this.Y_domain_max).range(this.padding[0] + this.h_, this.padding[0]);
                if (content == null) {
                    this.update();
                    return this;
                }
                if (style == 'ordinal') {
                    this.scale_y.among(content);
                    this.Y_domain_list = content;
                }
                else if (style == 'log') {
                    this.scale_y.base(content);
                }
                else if (style == 'power') {
                    this.scale_y.base(content);
                }
                this.update();
                return this;
            };
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
                var ticks = this.X_ticks.length > 0 ? this.X_ticks.length : 5;
                this.note(ticks, 'x');
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
                var ticks = this.Y_ticks.length > 0 ? this.Y_ticks.length : 5;
                this.note(ticks, 'y');
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
             * @returns {Axis2d} the object itself
             * @memberof Axis2d
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
                                this.scale_x.handle(Scale.Solution.hard);
                                break;
                            case 'stuck':
                                this.scale_x.handle(Scale.Solution.stuck);
                                break;
                            case 'forbidden':
                                this.scale_x.handle(Scale.Solution.forbidden);
                                break;
                        }
                        break;
                    case 'y':
                        switch (solution) {
                            case 'hard':
                                this.scale_y.handle(Scale.Solution.hard);
                                break;
                            case 'stuck':
                                this.scale_y.handle(Scale.Solution.stuck);
                                break;
                            case 'forbidden':
                                this.scale_y.handle(Scale.Solution.forbidden);
                                break;
                        }
                        break;
                }
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
                var fill = this.theme === null ? 'white' : this.theme.at(this.series);
                var stroke = this.theme === null ? 'black' : this.theme.at(this.series + 1);
                var svg = $(jQuery.parseXML("<" + element + "                    style=\"fill: " + fill + "; stroke: " + stroke + "; stroke-width: 1px; fill-opacity: 1;\"                     xmlns=\"http://www.w3.org/2000/svg\"></" + element + ">").documentElement);
                switch (element) {
                    case 'circle':
                        svg.attr('r', 5);
                        break;
                    case 'rect':
                        svg.attr('width', 10).attr('height', 10).attr('transform', 'translate(-5,-5)');
                        break;
                }
                svg.attr('__style__', 'point');
                svg.attr('__tab__', element);
                svg.attr('__data__', data[0] + "," + data[1]);
                svg.attr('__serie__', this.series);
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
                this.series++;
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
                var fill = this.theme === null ? 'black' : this.theme.getOutstand();
                var svg = $(jQuery.parseXML("<text                    style=\"fill: " + fill + "; fill-opacity: 1;\"                     xmlns=\"http://www.w3.org/2000/svg\">" + text + "</text>").documentElement);
                svg.attr('__style__', 'point');
                svg.attr('__tab__', 'text');
                svg.attr('__serie__', this.series);
                svg.attr('__data__', data[0] + "," + data[1]);
                var x = this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0]));
                var y = this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1]));
                svg.attr('x', x).attr('y', y).attr('cx', x).attr('cy', y);
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
                var d = '';
                for (var i = 0; i < data.length; i++) {
                    var x = this.fx(data[i][0]);
                    var y = this.fy(data[i][1]);
                    if (x === null || y === null || isNaN(x) || isNaN(y))
                        continue;
                    if (d == '')
                        d = "M" + this.fx(data[i][0]) + " " + this.fy(data[i][1]);
                    else
                        d += " L" + x + " " + y;
                }
                var fill = this.theme === null ? 'black' : this.theme.at(this.series);
                var polyline = $(jQuery.parseXML("<path __data__=\"" + points.join(';') + ";\"                    style=\"stroke: " + fill + "; stroke-width: 1px; fill: none;\" d=\"" + d + "\" __tab__=\"path\" __serie__=\"" + this.series + "\"                     xmlns=\"http://www.w3.org/2000/svg\" __style__=\"path\"></path>").documentElement);
                this.board.append(polyline);
                this.observed.push(polyline);
                this.series++;
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
                if (this.scale_x instanceof Scale.OrdinalScale) {
                    this.Y.attr('x1', this.padding[3])
                        .attr('y1', this.padding[0] + this.h_)
                        .attr('x2', this.padding[3])
                        .attr('y2', this.padding[0]);
                }
                else if (this.X_domain_min != null && this.X_domain_max != null) {
                    var x = this.X_domain_min <= 0 && this.X_domain_max >= 0
                        ? this.fx(0)
                        : this.X_domain_min > 0 && this.X_domain_max > 0
                            ? this.padding[3] : this.padding[3] + this.w_;
                    this.Y.attr('x1', x)
                        .attr('y1', this.padding[0] + this.h_)
                        .attr('x2', x)
                        .attr('y2', this.padding[0]);
                }
                if (this.scale_y instanceof Scale.OrdinalScale) {
                    this.X.attr('x1', this.padding[3])
                        .attr('y1', this.padding[0] + this.h_)
                        .attr('x2', this.padding[3] + this.w_)
                        .attr('y2', this.padding[0] + this.h_);
                }
                else if (this.Y_domain_min != null && this.Y_domain_max != null) {
                    var y = this.Y_domain_min <= 0 && this.Y_domain_max >= 0
                        ? this.fy(0)
                        : this.Y_domain_min > 0 && this.Y_domain_max > 0
                            ? this.padding[0] + this.h_ : this.padding[0];
                    this.X.attr('x1', this.padding[3])
                        .attr('y1', y)
                        .attr('x2', this.padding[3] + this.w_)
                        .attr('y2', y);
                }
                var ticks = this.X_ticks.length;
                if (ticks > 0)
                    this.note(ticks, 'x');
                ticks = this.Y_ticks.length;
                if (ticks > 0)
                    this.note(ticks, 'y');
                this.observed.forEach(function (e) {
                    if (e.attr('__style__') == 'point') {
                        var x = _this.fx(parseFloat(e.attr('__data__').toString().split(',')[0]));
                        var y = _this.fy(parseFloat(e.attr('__data__').toString().split(',')[1]));
                        if (x === null || y === null || isNaN(x) || isNaN(y)) {
                            e.hide();
                        }
                        else {
                            e.attr('x', x).attr('y', y).attr('cx', x).attr('cy', y).show();
                        }
                    }
                    else if (e.attr('__style__') == 'path') {
                        var data = e.attr('__data__').split(';');
                        var s = '';
                        var d = '';
                        for (var i = 0; i < data.length - 1; i++) {
                            s = data[i];
                            var x = _this.fx(parseFloat(s.split(',')[0]));
                            var y = _this.fy(parseFloat(s.split(',')[1]));
                            if (x === null || y === null || isNaN(x) || isNaN(y))
                                continue;
                            if (d == '')
                                d = "M" + _this.fx(parseFloat(s.split(',')[0])) + " " + _this.fy(parseFloat(s.split(',')[1]));
                            d += " L" + x + " " + y;
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
                        var y = this.padding[0] + this.h_;
                        if (!(this.scale_y instanceof Scale.OrdinalScale) && this.Y_domain_min != null && this.Y_domain_max != null) {
                            y = this.Y_domain_min <= 0 && this.Y_domain_max >= 0
                                ? this.fy(0)
                                : this.Y_domain_min > 0 && this.Y_domain_max > 0
                                    ? this.padding[0] + this.h_ : this.padding[0];
                        }
                        if (this.scale_x instanceof Scale.OrdinalScale) {
                            step = parseInt((this.X_domain_list.length / ticks).toString());
                            step = step < 1 ? 1 : step > this.X_domain_list.length ? this.X_domain_list.length : step;
                            for (var i = 0; i < this.X_domain_list.length; i += step) {
                                var svg = $(jQuery.parseXML("<text text-anchor=\"middle\"                                    style=\"fill-opacity: 1;\" __style__=\"tick_x\"                                    x=\"" + this.fx(this.X_domain_list[i]) + "\"                                     y=\"" + y + "\" dy=\"18\"                                     xmlns=\"http://www.w3.org/2000/svg\">" + this.X_domain_list[i] + "</text>").documentElement);
                                if (this.theme === null)
                                    svg.css('fill', 'black');
                                else
                                    svg.css('fill', this.theme.getOutstand());
                                this.board.append(svg);
                                this.X_ticks.push(svg);
                                box = box.add(svg);
                            }
                            break;
                        }
                        step = (this.X_domain_max - this.X_domain_min) / (ticks - 1);
                        level = levelof(step) - 1;
                        step = parseInt((step / Math.pow(10, level)).toString()) * Math.pow(10, level);
                        for (var i = 0; i < ticks; i++) {
                            var svg = $(jQuery.parseXML("<text text-anchor=\"middle\"                                style=\"fill-opacity: 1;\" __style__=\"tick_x\"                                x=\"" + this.fx(this.X_domain_min + step * i) + "\"                                 y=\"" + y + "\" dy=\"18\"                                 xmlns=\"http://www.w3.org/2000/svg\">" + (this.X_domain_min + step * i) + "</text>").documentElement);
                            if (this.theme === null)
                                svg.css('fill', 'black');
                            else
                                svg.css('fill', this.theme.getOutstand());
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
                        var x = this.padding[3];
                        if (!(this.scale_x instanceof Scale.OrdinalScale) && this.X_domain_min != null && this.X_domain_max != null) {
                            x = this.X_domain_min <= 0 && this.X_domain_max >= 0
                                ? this.fx(0)
                                : this.X_domain_min > 0 && this.X_domain_max > 0
                                    ? this.padding[3] : this.padding[3] + this.w_;
                        }
                        if (this.scale_y instanceof Scale.OrdinalScale) {
                            step = parseInt((this.Y_domain_list.length / ticks).toString());
                            step = step < 1 ? 1 : step > this.Y_domain_list.length ? this.Y_domain_list.length : step;
                            for (var i = 0; i < this.Y_domain_list.length; i += step) {
                                var svg = $(jQuery.parseXML("<text text-anchor=\"end\"                                    style=\"fill-opacity: 1;\" __style__=\"tick_y\"                                    x=\"" + x + "\" dx=\"-6\"                                     y=\"" + this.fy(this.Y_domain_list[i]) + "\"                                    xmlns=\"http://www.w3.org/2000/svg\">" + this.Y_domain_list[i] + "</text>").documentElement);
                                if (this.theme === null)
                                    svg.css('fill', 'black');
                                else
                                    svg.css('fill', this.theme.getOutstand());
                                this.board.append(svg);
                                this.X_ticks.push(svg);
                                box = box.add(svg);
                            }
                            break;
                        }
                        step = (this.Y_domain_max - this.Y_domain_min) / (ticks - 1);
                        level = levelof(step) - 1;
                        step = parseInt((step / Math.pow(10, level)).toString()) * Math.pow(10, level);
                        for (var i = 0; i < ticks; i++) {
                            var svg = $(jQuery.parseXML("<text text-anchor=\"end\"                                style=\"fill-opacity: 1;\" __style__=\"tick_y\"                                x=\"" + x + "\" dx=\"-6\"                                 y=\"" + this.fy(this.Y_domain_min + step * i) + "\"                                xmlns=\"http://www.w3.org/2000/svg\">" + (this.Y_domain_min + step * i) + "</text>").documentElement);
                            if (this.theme === null)
                                svg.css('fill', 'black');
                            else
                                svg.css('fill', this.theme.getOutstand());
                            this.board.append(svg);
                            this.Y_ticks.push(svg);
                            box = box.add(svg);
                        }
                        break;
                }
                return box;
            };
            /**
             *Sets a new theme for the axis.
             * @param {Color.Color} theme color scheme
             * @returns {Axis} the object itself
             * @memberof Axis
             */
            Axis2d.prototype.fitIn = function (theme) {
                this.theme = theme;
                this.fill = this.theme.getBackground2();
                this.background = this.theme.getBackground1();
                this.color();
                return this;
            };
            /**
             *Recolor the elements.
             * @abstract
             * @memberof Axis
             */
            Axis2d.prototype.color = function () {
                var _this = this;
                this.box.css('fill', this.theme.getBackground1());
                this.area.css('fill', this.theme.getBackground2());
                this.scale().css('stroke', this.theme.getOutstand());
                var ticks = this.X_ticks.length;
                if (ticks > 0)
                    this.note(ticks, 'x');
                ticks = this.Y_ticks.length;
                if (ticks > 0)
                    this.note(ticks, 'y');
                var count = 0;
                this.observed.forEach(function (e) {
                    if (e.attr('__tab__') == 'text' || e.attr('__style__') === 'tick_x' || e.attr('__style__') === 'tick_y') {
                        e.css('fill', _this.theme.getOutstand());
                    }
                    else if (e.attr('__style__') == 'point') {
                        var index = e.attr('__serie__') === null ? 0 : parseInt(e.attr('__serie__'));
                        e.css('fill', _this.theme.at(index)).css('stroke', _this.theme.at(index + 1));
                    }
                    else if (e.attr('__style__') == 'path') {
                        e.css('stroke', _this.theme.at(count));
                        count++;
                    }
                });
            };
            return Axis2d;
        }(Axis));
        Axis_1.Axis2d = Axis2d;
    })(Axis = Visf.Axis || (Visf.Axis = {}));
    var Scale;
    (function (Scale) {
        function getInstance(style) {
            if (style === void 0) { style = 'linear'; }
            switch (style) {
                case 'linear':
                    return new LinearScale();
                case 'ordinal':
                    return new OrdinalScale();
                case 'log':
                    return new LogScale();
                case 'power':
                    return new PowerScale();
            }
            return null;
        }
        Scale.getInstance = getInstance;
        /**
         *Action principle of out_of_range input data
        * @export
        * @enum {number}
        */
        var Solution;
        (function (Solution) {
            Solution[Solution["stuck"] = 0] = "stuck";
            Solution[Solution["forbidden"] = 1] = "forbidden";
            Solution[Solution["hard"] = 2] = "hard";
        })(Solution = Scale.Solution || (Scale.Solution = {}));
        /**
         *Linear scale
        * @export
        * @class LinearScale
        * @implements {Scale}
        */
        var LinearScale = /** @class */ (function () {
            function LinearScale() {
                this.domain_min = null;
                this.domain_max = null;
                this.range_min = null;
                this.range_max = null;
                this.out_of_range = Solution.forbidden;
            }
            /**
             *Sets the input range of the scale.
            * @param {number} min minimum of the input
            * @param {number} max maximun of the input
            * @returns {LinearScale} the object itself
            * @memberof LinearScale
            */
            LinearScale.prototype.domain = function (min, max) {
                this.domain_min = min;
                this.domain_max = max;
                return this;
            };
            /**
             *Sets the output range of the scale.
            * @param {number} min minimum of the output
            * @param {number} max maximun of the output
            * @returns {LinearScale} the object itself
            * @memberof LinearScale
            */
            LinearScale.prototype.range = function (min, max) {
                this.range_min = min;
                this.range_max = max;
                return this;
            };
            /**
             *Returns the projection of the input value.
            * @param {number} val input
            * @returns {number} project
            * @memberof LinearScale
            */
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
            /**
             *Returns the calculation result of the possible input value of the projection.
            * @param {number} cor projection value
            * @returns {number} possible origin value
            * @memberof LinearScale
            */
            LinearScale.prototype.from = function (cor) {
                if (this.domain_min == null || this.domain_max == null || this.range_min == null || this.range_max == null) {
                    console.error('This scale is not defined yet: ', this);
                    return null;
                }
                return (cor - this.range_min) * (this.domain_max - this.domain_min) / (this.range_max - this.range_min) + this.domain_min;
            };
            /**
             *Sets the principle to act when input data is out of range, default=forbidden.
            * @param {Solution} s principle
            * * `hard` — calculate it by the scale
            * * `stuck` — regard it as the min / max value
            * * `forbidden` — raise an error
            * @returns {Scale} the object itself
            * @memberof Scale
            */
            LinearScale.prototype.handle = function (s) {
                this.out_of_range = s;
                return this;
            };
            return LinearScale;
        }());
        Scale.LinearScale = LinearScale;
        /**
         *Ordinal scale
         * @export
         * @class OrdinalScale
         * @implements {Scale}
         */
        var OrdinalScale = /** @class */ (function () {
            function OrdinalScale() {
                this.domain_min = null;
                this.domain_max = null;
                this.range_min = null;
                this.range_max = null;
                this.out_of_range = Solution.forbidden;
                this.domain_list = null;
            }
            /**
             *Not supported
            * @param {number} min
            * @param {number} max
            * @returns {OrdinalScale}
            * @memberof OrdinalScale
            */
            OrdinalScale.prototype.domain = function (min, max) {
                return this;
            };
            /**
             *Sets the allowed input value of the scale
             * @param {*} Array
             * @param {*}
             * @param {*} number
             * @memberof OrdinalScale
             */
            OrdinalScale.prototype.among = function (list) {
                this.domain_list = list;
                return this;
            };
            /**
             *Sets the output range of the scale.
            * @param {number} min minimum of the output
            * @param {number} max maximun of the output
            * @returns {OrdinalScale} the object itself
            * @memberof OrdinalScale
            */
            OrdinalScale.prototype.range = function (min, max) {
                this.range_min = min;
                this.range_max = max;
                return this;
            };
            /**
             *Returns the projection of the input value.
            * @param {number} val input
            * @returns {number} projection
            * @memberof OrdinalScale
            */
            OrdinalScale.prototype.to = function (val) {
                if (this.domain_list === null || this.range_min == null || this.range_max == null) {
                    console.error('This scale is not defined yet: ', this);
                    return null;
                }
                var idx = -1;
                for (var i = this.domain_list.length - 1; i >= 0; i--) {
                    if (this.domain_list[i] === val) {
                        idx = i;
                        break;
                    }
                }
                if (idx == -1) {
                    if (this.out_of_range === Solution.forbidden) {
                        console.warn("Received value " + val + " out of range: ", this.domain_list);
                    }
                    return null;
                }
                return (idx + 0.5) * (this.range_max - this.range_min) / this.domain_list.length + this.range_min;
            };
            /**
             *Returns the calculation result of the possible input value of the projection.
            * @param {number} cor projection value
            * @returns {number} possible origin value
            * @memberof OrdinalScale
            */
            OrdinalScale.prototype.from = function (cor) {
                if (this.domain_list === null || this.range_min == null || this.range_max == null) {
                    console.error('This scale is not defined yet: ', this);
                    return null;
                }
                return this.domain_list[parseInt(((cor - this.range_min) * this.domain_list.length / (this.range_max - this.range_min) - 0.5).toString())];
            };
            /**
             *Sets the principle to act when input data is out of range, default=forbidden.
            * @param {Solution} s principle
            * * `hard` — skip it
            * * `stuck` — skip it
            * * `forbidden` — raise an error
            * @returns {Scale} the object itself
            * @memberof Scale
            */
            OrdinalScale.prototype.handle = function (s) {
                this.out_of_range = s;
                return this;
            };
            return OrdinalScale;
        }());
        Scale.OrdinalScale = OrdinalScale;
        /**
         *Logarithm scale
        * @export
        * @class LogScale
        * @implements {Scale}
        */
        var LogScale = /** @class */ (function () {
            function LogScale() {
                this.domain_min = null;
                this.domain_max = null;
                this.range_min = null;
                this.range_max = null;
                this._base = Math.E;
                this.out_of_range = Solution.forbidden;
            }
            /**
             *Sets the input range of the scale.
            * @param {number} min minimum of the input
            * @param {number} max maximun of the input
            * @returns {LogScale} the object itself
            * @memberof LogScale
            */
            LogScale.prototype.domain = function (min, max) {
                this.domain_min = min;
                this.domain_max = max;
                return this;
            };
            /**
             *Sets the output range of the scale.
            * @param {number} min minimum of the output
            * @param {number} max maximun of the output
            * @returns {LogScale} the object itself
            * @memberof LogScale
            */
            LogScale.prototype.range = function (min, max) {
                this.range_min = min;
                this.range_max = max;
                return this;
            };
            /**
             *Sets the base of the logarithm.
             * @param {number} b base
             * @returns {LogScale} the object itself
             * @memberof LogScale
             */
            LogScale.prototype.base = function (b) {
                this._base = b;
                return this;
            };
            /**
             *Returns the projection of the input value.
            * @param {number} val input
            * @returns {number} project
            * @memberof LogScale
            */
            LogScale.prototype.to = function (val) {
                if (this.base == null || this.domain_min == null || this.domain_max == null
                    || this.range_min == null || this.range_max == null) {
                    console.error('This scale is not defined yet: ', this);
                    return null;
                }
                var num = Math.log((val - this.domain_min) * (this._base - 1) / (this.domain_max - this.domain_min) + 1)
                    / Math.log(this._base) * (this.range_max - this.range_min) + this.range_min;
                if (num > this.range_max && num > this.range_min || num < this.range_max && num < this.range_min) {
                    switch (this.out_of_range) {
                        case Solution.hard:
                            return num >= 0 ? num : null;
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
            /**
             *Returns the calculation result of the possible input value of the projection.
            * @param {number} cor projection value
            * @returns {number} possible origin value
            * @memberof LogScale
            */
            LogScale.prototype.from = function (cor) {
                if (this.domain_min == null || this.domain_max == null || this.range_min == null || this.range_max == null) {
                    console.error('This scale is not defined yet: ', this);
                    return null;
                }
                return (Math.exp((cor - this.range_min) * Math.log(this._base) / (this.range_max - this.range_min)) - 1)
                    * (this.domain_max - this.domain_min) / (this._base - 1) + this.domain_min;
            };
            /**
             *Sets the principle to act when input data is out of range, default=forbidden.
            * @param {Solution} s principle
            * * `hard` — calculate it by the scale
            * * `stuck` — regard it as the min / max value
            * * `forbidden` — raise an error
            * @returns {Scale} the object itself
            * @memberof Scale
            */
            LogScale.prototype.handle = function (s) {
                this.out_of_range = s;
                return this;
            };
            return LogScale;
        }());
        Scale.LogScale = LogScale;
        /**
         *Power scale
        * @export
        * @class PowerScale
        * @implements {Scale}
        */
        var PowerScale = /** @class */ (function () {
            function PowerScale() {
                this.domain_min = null;
                this.domain_max = null;
                this.range_min = null;
                this.range_max = null;
                this._base = Math.E;
                this.out_of_range = Solution.forbidden;
            }
            /**
             *Sets the input range of the scale.
            * @param {number} min minimum of the input
            * @param {number} max maximun of the input
            * @returns {PowerScale} the object itself
            * @memberof PowerScale
            */
            PowerScale.prototype.domain = function (min, max) {
                this.domain_min = min;
                this.domain_max = max;
                return this;
            };
            /**
             *Sets the output range of the scale.
            * @param {number} min minimum of the output
            * @param {number} max maximun of the output
            * @returns {PowerScale} the object itself
            * @memberof PowerScale
            */
            PowerScale.prototype.range = function (min, max) {
                this.range_min = min;
                this.range_max = max;
                return this;
            };
            /**
             *Sets the base of the pow.
                * @param {number} b base
                * @returns {PowerScale} the object itself
                * @memberof PowerScale
                */
            PowerScale.prototype.base = function (b) {
                this._base = b;
                return this;
            };
            /**
             *Returns the projection of the input value.
            * @param {number} val input
            * @returns {number} project
            * @memberof PowerScale
            */
            PowerScale.prototype.to = function (val) {
                if (this.base == null || this.domain_min == null || this.domain_max == null
                    || this.range_min == null || this.range_max == null) {
                    console.error('This scale is not defined yet: ', this);
                    return null;
                }
                var num = (Math.pow(this._base, (val - this.domain_min) / (this.domain_max - this.domain_min)) - 1)
                    / (this._base - 1) * (this.range_max - this.range_min) + this.range_min;
                if (num > this.range_max && num > this.range_min || num < this.range_max && num < this.range_min) {
                    switch (this.out_of_range) {
                        case Solution.hard:
                            return num >= 0 ? num : null;
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
            /**
             *Returns the calculation result of the possible input value of the projection.
            * @param {number} cor projection value
            * @returns {number} possible origin value
            * @memberof PowerScale
            */
            PowerScale.prototype.from = function (cor) {
                if (this.domain_min == null || this.domain_max == null || this.range_min == null || this.range_max == null) {
                    console.error('This scale is not defined yet: ', this);
                    return null;
                }
                return Math.log((cor - this.range_min) * (this._base - 1) / (this.range_max - this.range_min) + 1) / Math.log(this._base)
                    * (this.domain_max - this.domain_min) + this.domain_min;
            };
            /**
             *Sets the principle to act when input data is out of range, default=forbidden.
            * @param {Solution} s principle
            * * `hard` — calculate it by the scale
            * * `stuck` — regard it as the min / max value
            * * `forbidden` — raise an error
            * @returns {Scale} the object itself
            * @memberof Scale
            */
            PowerScale.prototype.handle = function (s) {
                this.out_of_range = s;
                return this;
            };
            return PowerScale;
        }());
        Scale.PowerScale = PowerScale;
    })(Scale = Visf.Scale || (Visf.Scale = {}));
    var Struct;
    (function (Struct) {
        /**
         *Multidimensional data cube.
         * @export
         * @class Cube
         */
        var Cube = /** @class */ (function () {
            function Cube(l) {
                this.maxDimension = l.length;
                this.label = l;
                this.data = [];
            }
            /**
             *Adds one or more data into the cube.
             * @param {Array<object>} obj data
             * @returns {Cube} the object itself
             * @memberof Cube
             */
            Cube.prototype.add = function (obj) {
                for (var i in obj) {
                    var o = obj[i];
                    if (o['value'] == null)
                        continue;
                    var m = { value: o['value'] };
                    var flag = true;
                    for (var l in this.label) {
                        if (o[this.label[l]] == null) {
                            flag = false;
                            break;
                        }
                        m[this.label[l]] = o[this.label[l]];
                    }
                    if (flag)
                        this.data.push(m);
                }
                return this;
            };
            /**
             *Slices old cube at some certain dimensions, returns a new cube.
             * @param {object} limit dimension limit
             * @returns {Cube} new cube
             * @memberof Cube
             */
            Cube.prototype.slice = function (limit) {
                var labelNew = [];
                this.label.forEach(function (l) {
                    for (var n in limit) {
                        if (n == l)
                            return;
                    }
                    labelNew.push(l);
                });
                var c = new Cube(labelNew);
                this.data.forEach(function (d) {
                    for (var l in limit) {
                        if (d[l] != null && limit[l] != d[l])
                            return;
                    }
                    c.add([d]);
                });
                return c;
            };
            /**
             *Projects old cube into a lower-dimensional space, returns a new cube.
             * @param {...Array<string>} dimension dimensions needed
             * @returns {Cube} new cube
             * @memberof Cube
             */
            Cube.prototype.project = function () {
                var dimension = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    dimension[_i] = arguments[_i];
                }
                var labelNew = [];
                this.label.forEach(function (l) {
                    for (var n in dimension) {
                        if (dimension[n] == l)
                            labelNew.push(l);
                    }
                });
                var c = new Cube(labelNew);
                c.add(this.data);
                return c;
            };
            /**
             *Projects 2d cube on a 2d axis.
             * @param {Axis.Axis2d} axis target axis
             * @returns {boolean} whether the projection is completed or not
             * @memberof Cube
             */
            Cube.prototype.displayOn = function (axis) {
                var _this = this;
                if (this.maxDimension != 2) {
                    console.error('Dimension error: not 2');
                    return false;
                }
                axis.clear();
                var list = [];
                var x_min = this.data[0][this.label[0]];
                var x_max = this.data[0][this.label[0]];
                var y_min = this.data[0][this.label[1]];
                var y_max = this.data[0][this.label[1]];
                this.data.forEach(function (d) {
                    list.push([d[_this.label[0]], d[_this.label[1]]]);
                    if (d[_this.label[0]] < x_min)
                        x_min = d[_this.label[0]];
                    if (d[_this.label[0]] > x_max)
                        x_max = d[_this.label[0]];
                    if (d[_this.label[1]] < y_min)
                        y_min = d[_this.label[1]];
                    if (d[_this.label[1]] > y_max)
                        y_max = d[_this.label[1]];
                });
                // axis.xScale('linear').yScale('linear').domain_x(x_min, x_max).domain_y(y_min, y_max).join('circle', list);
                axis.domain_x(x_min, x_max).domain_y(y_min, y_max).join('circle', list);
                this.data.forEach(function (d) {
                    axis.addtext(d['value'], d[_this.label[0]], d[_this.label[1]]);
                });
                return true;
            };
            /**
             *Filts the data in the cube, returns a new cube.
             * @param {() => boolean} callback callback function
             * @returns {Cube} new cube
             * @memberof Cube
             */
            Cube.prototype.filter = function (callback) {
                var c = new Cube(this.label);
                this.data.forEach(function (d) {
                    if (callback(d))
                        c.add([d]);
                });
                return c;
            };
            return Cube;
        }());
        Struct.Cube = Cube;
    })(Struct = Visf.Struct || (Visf.Struct = {}));
    /**
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
})(Visf || (Visf = {}));
