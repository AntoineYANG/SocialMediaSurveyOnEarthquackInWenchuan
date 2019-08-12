/*
 * @Author: Antoine YANG 
 * @Date: 2019-08-08 15:15:25 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2019-08-12 14:51:49
 */
namespace Visf {
    export namespace Color {
        /**
         *Rgb color code
         * @class
         */
        export class Rgb {
            private r: number;
            private g: number;
            private b: number;
            public constructor(r: number, g: number, b: number) {
                this.r = r < 0 ? 0 : r > 255 ? 255 : r;
                this.g = g < 0 ? 0 : g > 255 ? 255 : g;
                this.b = b < 0 ? 0 : b > 255 ? 255 : b;
            }
            public toString(): string {
                return `rgb(${this.r},${this.g},${this.b})`;
            }
            public brighter(k: number = 0.3): Rgb {
                let r: number = this.r + (255 - this.r) * k;
                let g: number = this.g + (255 - this.g) * k;
                let b: number = this.b + (255 - this.b) * k;
                return new Rgb(r, g, b);
            }
            public darker(k: number = 0.3): Rgb {
                let r: number = this.r * (1 - k);
                let g: number = this.g * (1 - k);
                let b: number = this.b * (1 - k);
                return new Rgb(r, g, b);
            }
        }

        /**
         *Color scheme
         * @export
         * @class Color
         */
        export abstract class Color {
            protected name: string;
            protected background1: Rgb;
            protected background2: Rgb;
            protected outstand: Rgb;
            protected list: Array<Rgb>;

            /**
             *Returns the theme name.
            * @returns {string} theme name
            * @memberof Color
            */
            public getName(): string {
                return this.name;
            }
            
            /**
             *Returns the number of colors contained.
            * @returns {number} number of colors
            * @memberof Color
            */
            public size(): number {
                return this.list.length;
            }

            /**
             *Returns the code of the (n)th color.
            * @param {number} n index
            * @returns {string} rgb code
            * @memberof Color
            */
            public at(n: number): string {
                return this.list[n % this.size()].toString();
            }

            /**
             *Returns the code of the suggested background color 1.
             * @returns {string} rgb code
             * @memberof Color
             */
            public getBackground1(): string {
                return this.background1.toString();
            }

            /**
             *Returns the code of the suggested background color 2.
             * @returns {string} rgb code
             * @memberof Color
             */
            public getBackground2(): string {
                return this.background2.toString();
            }

            /**
             *Returns the code of the suggested text or line color.
             * @returns {string} rgb code
             * @memberof Color
             */
            public getOutstand(): string {
                return this.outstand.toString();
            }
        }
        
        export namespace Artists {
            export namespace Monet {
                export class Monet_dark extends Color {
                    public constructor() {
                        super();
                        this.name = 'Monet_dark';
                        this.background1 = new Rgb(71, 42, 42);
                        this.background2 = new Rgb(57, 26, 26);
                        this.outstand =  new Rgb(251, 238, 238);
                        let list: Array< Array<number> > = [[246, 224, 237], [191, 96, 47], [236, 239, 165], [93, 121, 70], [217, 167, 143],
                            [167, 147, 97], [218, 168, 65], [167, 193, 194], [170, 130, 146], [165, 168, 91]];
                        this.list = [];
                        list.forEach(c => {
                            this.list.push(new Rgb(c[0], c[1], c[2]));
                        });
                    }
                }
                export class Monet_bright extends Color {
                    public constructor() {
                        super();
                        this.name = 'Monet_bright';
                        this.background1 = new Rgb(253, 244, 244);
                        this.background2 = new Rgb(251, 238, 238);
                        this.outstand = new Rgb(57, 26, 26);
                        let list: Array< Array<number> > = [[146, 74, 76], [74, 48, 47], [145, 172, 95], [167, 121, 144], [92, 139, 140],
                            [45, 97, 48], [46, 70, 119], [119, 119, 143], [143, 121, 48], [198, 198, 90]];
                        this.list = [];
                        list.forEach(c => {
                            this.list.push(new Rgb(c[0], c[1], c[2]));
                        });
                    }
                }
            }

            export namespace Matisse {
                export class Matisse_dark extends Color {
                    public constructor() {
                        super();
                        this.name = 'Matisse_dark';
                        this.background1 = new Rgb(46, 48, 61);
                        this.background2 = new Rgb(79, 81, 94);
                        this.outstand =  new Rgb(220, 220, 223);
                        let list: Array< Array<number> > = [[221, 18, 14], [232, 172, 21], [234, 234, 234], [122, 122, 198], [245, 98, 0],
                            [89, 170, 117], [2, 97, 242], [119, 193, 193], [219, 97, 120], [202, 170, 119]];
                        this.list = [];
                        list.forEach(c => {
                            this.list.push(new Rgb(c[0], c[1], c[2]));
                        });
                    }
                }
                export class Matisse_bright extends Color {
                    public constructor() {
                        super();
                        this.name = 'Matisse_bright';
                        this.background1 = new Rgb(247, 245, 237);
                        this.background2 = new Rgb(246, 240, 220);
                        this.outstand = new Rgb(25, 25, 23);
                        let list: Array< Array<number> > = [[0, 44, 146], [80, 122, 0], [110, 45, 149], [249, 44, 17], [17, 17, 17],
                            [4, 195, 88], [2, 97, 242], [249, 220, 2], [168, 16, 18], [183, 218, 219]];
                        this.list = [];
                        list.forEach(c => {
                            this.list.push(new Rgb(c[0], c[1], c[2]));
                        });
                    }
                }
            }
        }
    }

    export namespace Axis {
        /**
         *Plot axis
        * @export
        * @abstract
        * @class Axis
        */
        export abstract class Axis {
            protected parent: JQuery<HTMLElement> = null;
            protected board: JQuery<HTMLElement> = null;
            protected box: JQuery<HTMLElement> = null;
            protected area: JQuery<HTMLElement> = null;
            protected margin: Array<number> = [20, 20, 20, 20];
            protected width: number = 0;
            protected height: number = 0;
            protected padding: Array<number> = [60, 20, 50, 60];
            protected w_: number = 0;
            protected h_: number = 0;
            protected theme: Color.Color = null;
            protected fill: string = "#ccc";
            protected background: string = "#eee";
            protected observed: Array< JQuery<HTMLElement> > = [];
            protected series: number = 0;

            /**
             *Creates an instance of Axis.
             * @param {JQuery<HTMLElement>} parent the parent <SVG> JQuery element
             * @memberof Axis
             */
            protected constructor(parent: JQuery<HTMLElement>, theme: Color.Color = null) {
                this.theme = theme;
                this.parent = parent;
                this.width = parseFloat(parent.attr('width')) - this.margin[1] - this.margin[3];
                this.height = parseFloat(parent.attr('height')) - this.margin[0] - this.margin[2];
                let board = jQuery.parseXML(`<g xmlns="http://www.w3.org/2000/svg" width="${this.width}px" height="${this.height}px" \
                    transform="translate(${this.margin[3]},${this.margin[0]})"\
                    ></g>`).documentElement;
                this.board = $(board);
                this.board.css('width', `${this.width - this.margin[1] - this.margin[3]}px`)
                    .css('height', `${this.height - this.margin[0] - this.margin[2]}px`);
                this.parent.append(this.board);
                let fill: string = this.theme === null ? this.background : this.theme.getBackground1();
                let box = jQuery.parseXML(`<rect class="g-background" style="fill: ${fill};" \
                    xmlns="http://www.w3.org/2000/svg" width="${this.width - this.margin[1] - this.margin[3]}px" \
                    height="${this.height - this.margin[0] - this.margin[2]}px" \
                    ></rect>`).documentElement;
                this.board.append(box);
                this.box = $(box);
                fill = this.theme === null ? this.fill : this.theme.getBackground2();
                let area = jQuery.parseXML(`<rect class="axis-background" style="fill: ${fill};" \
                    xmlns="http://www.w3.org/2000/svg" width="${this.w_}px" height="${this.h_}px" \
                    x="${this.padding[3]}px" y="${this.padding[0]}px"\
                    ></rect>`).documentElement;
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
            protected static parseBox(str: string): Array<number> {
                let val: Array<number> = [];
                let list: Array<string> = str.indexOf(',') != -1 ? str.split(',') : str.split(' ');
                list.forEach(s => {
                    val.push(parseFloat(s));
                });
                let set: Array<number> = [];
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
            }

            /**
             *Removes all the observed elements in the axis.
             * @memberof Axis
             */
            public clear(): void {
                this.observed.forEach(e => {
                    e.remove();
                });
                this.observed = [];
            }

            /**
             *Returns a jQuery selection of fitting elements in the axis.
             * @param {string} [key='*']
             * @returns {JQuery<HTMLElement>}
             * @memberof Axis
             */
            public all(key: string = '*'): JQuery<HTMLElement> {
                let svg: JQuery<HTMLElement> = $('_');
                this.observed.forEach(e => {
                    if (key != '*' && e.attr('__tab__') != key)
                        return;
                    svg = svg.add(e);
                })
                return svg;
            }
            
            /**
             *Sets one attribute of this object.
             * @abstract
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
            public abstract set(param: string, value: string): Axis;

            /**
             *Adjusts the box model.
            * @protected
            * @abstract
            * @memberof Axis
            */
            protected abstract adjustBox(): void;

            /**
             *Appends an SVG element by the coordinate.
            * @abstract
            * @param {string} element the tab of the element needed appending
            * @param {number} data each dimension of the coordinate
            * @returns {JQuery<HTMLElement>} the appended jQuery element
            * @memberof Axis
            */
            public abstract append(element: string, ...data: Array<number>): JQuery<HTMLElement>;

            /**
             *Appends a kind of SVG elements by a list of coordinates.
            * @abstract
            * @param {string} element the tab of the elements needed appending
            * @param {Array< Array<number> >} nodes list of coordinates
            * @returns {JQuery<HTMLElement>} the appended jQuery elements
            * @memberof Axis
            */
            public abstract join(element: string, nodes: Array< Array<number> >): JQuery<HTMLElement>;

            /**
             *Appends a <text> element by the coordinate.
            * @abstract
            * @param {string} text the text of the element
            * @param {number} data each dimension of the coordinate
            * @returns {JQuery<HTMLElement>} the appended jQuery element
            * @memberof Axis
            */
            public abstract addtext(text: string, ...data: Array<number>): JQuery<HTMLElement>;

            /**
             *Appends a <path> element by a list of coordinates.
            * @abstract
            * @param {Array< Array<number> >} data list of coordinates
            * @returns {JQuery<HTMLElement>} the appended jQuery element
            * @memberof Axis
            */
            public abstract path(data: Array< Array<number> >): JQuery<HTMLElement>;

            /**
             *Updates the scales and all the observed elements in the axis.
            * @protected
            * @abstract
            * @memberof Axis
            */
            protected abstract update(): void;

            /**
             *Sets the principle to act when input data is out of range, default=forbidden.
            * @abstract
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
            public abstract handle(solution: string, limit: string): Axis;

            /**
             *Sets a new theme for the axis.
             * @abstract
             * @param {Color.Color} theme color scheme
             * @returns {Axis} the object itself
             * @memberof Axis
             */
            public abstract fitIn(theme: Color.Color): Axis;

            /**
             *Recolor the elements.
             * @abstract
             * @memberof Axis
             */
            protected abstract color(): void;
        }

        /**
         *2d plot axis
        * @export
        * @class Axis2d
        * @extends {Axis}
        */
        export class Axis2d extends Axis {
            private scale_x: Scale.Scale = null;
            private scale_y: Scale.Scale = null;
            private X: JQuery<HTMLElement> = null;
            private Y: JQuery<HTMLElement> = null;
            private X_domain_min: number = null;
            private X_domain_max: number = null;
            private Y_domain_min: number = null;
            private Y_domain_max: number = null;
            private X_ticks: Array< JQuery<HTMLElement> > = [];
            private Y_ticks: Array< JQuery<HTMLElement> > = [];
            private X_domain_list: Array<number> = null;
            private Y_domain_list: Array<number> = null;
            
            /**
             *Creates an instance of Axis2d.
            * @param {JQuery<HTMLElement>} parent the parent <SVG> JQuery element
            * @memberof Axis2d
            */
            public constructor(parent: JQuery<HTMLElement>, theme: Color.Color = null) {
                super(parent, theme);
                this.scale_x = Scale.getInstance();
                this.scale_y = Scale.getInstance();
                this.adjustBox();
                this.X = $(jQuery.parseXML(`<line \
                    style="stroke: black; stroke-width: 1px;" \
                    x1="${this.padding[3]}" y1="${this.padding[0] + this.h_}" \
                    x2="${this.padding[3] + this.w_}" y2="${this.padding[0] + this.h_}"\
                    xmlns="http://www.w3.org/2000/svg" __style__="scale"></line>`).documentElement);
                this.board.append(this.X);
                this.Y = $(jQuery.parseXML(`<line \
                    style="stroke: black; stroke-width: 1px;" \
                    x1="${this.padding[3]}" y1="${this.padding[0] + this.h_}" \
                    x2="${this.padding[3]}" y2="${this.padding[0]}"\
                    xmlns="http://www.w3.org/2000/svg" __style__="scale"></line>`).documentElement);
                this.board.append(this.Y);
            }

            /**
             *Sets the style of x scale.
             * @param {string} style kind of scale
             * * `linear`
             * * `log`
             * * `ordinal`
             * * `power`
             * @returns {Axis2d} the object itself
             * @memberof Axis2d
             */
            public xScale(style: string): Axis2d {
                this.scale_x = Scale.getInstance(style).range(this.padding[3], this.padding[3] + this.w_);
                return this;
            }

            /**
             *Sets the style of y scale.
             * @param {string} style kind of scale
             * * `linear`
             * * `log`
             * * `ordinal`
             * * `power`
             * @returns {Axis2d} the object itself
             * @memberof Axis2d
             */
            public yScale(style: string): Axis2d {
                this.scale_y = Scale.getInstance(style).range(this.padding[0] + this.h_, this.padding[0]);
                return this;
            }
        
            /**
             *Sets the domain of the x scale.
            * @param {number} min minimum input value
            * @param {number} max maximun input value
            * @returns {Axis2d} the object itself
            * @memberof Axis2d
            */
            public domain_x(min: number, max: number): Axis2d {
                this.X_domain_min = min;
                this.X_domain_max = max;
                this.scale_x.domain(min, max);
                let ticks: number = this.X_ticks.length > 0 ? this.X_ticks.length : 5;
                this.note(ticks, 'x');
                this.update();
                return this;
            }

            /**
             *Sets the domain of the y scale.
            * @param {number} min minimum input value
            * @param {number} max maximun input value
            * @returns {Axis2d} the object itself
            * @memberof Axis2d
            */
            public domain_y(min: number, max: number): Axis2d {
                this.Y_domain_min = min;
                this.Y_domain_max = max;
                this.scale_y.domain(min, max);
                let ticks: number = this.Y_ticks.length > 0 ? this.Y_ticks.length : 5;
                this.note(ticks, 'y');
                this.update();
                return this;
            }

            /**
             *Sets the domain list of the ordinal scale x.
            * @param {Array<number>} list input list
            * @returns {Axis2d} the object itself
            * @memberof Axis2d
            */
            public among_x(list: Array<number>): Axis2d {
                if (this.scale_x instanceof Scale.OrdinalScale) {
                    this.X_domain_list = list;
                    this.scale_x.among(list);
                    this.note(list.length, 'x');
                    this.update();
                }
                else{
                    console.error('Scale x is not a legal OrdinalScale type. ');
                }
                return this;
            }

            /**
             *Sets the domain list of the ordinal scale y.
            * @param {Array<number>} list input list
            * @returns {Axis2d} the object itself
            * @memberof Axis2d
            */
            public among_y(list: Array<number>): Axis2d {
                if (this.scale_y instanceof Scale.OrdinalScale) {
                    this.Y_domain_list = list;
                    this.scale_y.among(list);
                    this.note(list.length, 'y');
                    this.update();
                }
                else{
                    console.error('Scale y is not a legal OrdinalScale type. ');
                }
                return this;
            }

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
            public set(param: string, value: string): Axis2d {
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
            }
        
            /**
             *Returns the projection of x-corrdinate.
            * @param {number} x x-corrdinate
            * @returns {number} x-projection
            * @memberof Axis2d
            */
            public fx(x: number): number {
                return this.scale_x.to(x);
            }

            /**
             *Returns the projection of y-coordinate.
            * @param {number} y y-corrdinate
            * @returns {number} y-projection
            * @memberof Axis2d
            */
            public fy(y: number): number {
                return this.scale_y.to(y);
            }
        
            /**
             *Adjusts the box model.
            * @protected
            * @memberof Axis
            */
            adjustBox(): void {
                this.width = parseFloat(this.parent.attr('width')) - this.margin[1] - this.margin[3];
                this.height = parseFloat(this.parent.attr('height')) - this.margin[0] - this.margin[2];
                this.board.css('width', `${this.width}px`)
                    .css('height', `${this.height}px`)
                    .attr('transform', `translate(${this.margin[3]},${this.margin[0]})`)
                    .css('margin', `${this.margin[0]}px ${this.margin[1]}px ${this.margin[2]}px ${this.margin[3]}px`);
                this.box.attr('width', `${this.width}px`)
                    .attr('height', `${this.height}px`);
                this.w_ = this.width - this.padding[1] - this.padding[3];
                this.h_ = this.height - this.padding[0] - this.padding[2];
                this.area.attr('width', `${this.w_}px`).attr('height', `${this.h_}px`)
                    .attr('x', `${this.padding[3]}px`)
                    .attr('y', `${this.padding[0]}px`);
                this.scale_x.range(this.padding[3], this.padding[3] + this.w_);
                this.scale_y.range(this.padding[0] + this.h_, this.padding[0]);
            }
        
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
            public handle(solution: string, limit: string = 'both'): Axis2d {
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
            }
        
            /**
             *Appends an SVG element by the coordinate.
            * @param {string} element the tab of the element needed appending
            * @param {number} data each dimension of the coordinate
            * @returns {JQuery<HTMLElement>} the appended jQuery element
            * @memberof Axis
            */
            public append(element: string, ...data: Array<number>): JQuery<HTMLElement> {
                let fill: string = this.theme === null ? 'white' : this.theme.at(this.series);
                let stroke: string = this.theme === null ? 'black' : this.theme.at(this.series + 1);
                let svg: JQuery<HTMLElement> = $(jQuery.parseXML(`<${element}\
                    style="fill: ${fill}; stroke: ${stroke}; stroke-width: 1px; fill-opacity: 1;" \
                    xmlns="http://www.w3.org/2000/svg"></${element}>`).documentElement);
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
                svg.attr('__data__', `${data[0]},${data[1]}`);
                svg.attr('__serie__', this.series);
                svg.attr('x', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
                svg.attr('y', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
                svg.attr('cx', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
                svg.attr('cy', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
                this.board.append(svg);
                this.observed.push(svg);
                return svg;
            }

            /**
             *Appends a kind of SVG elements by a list of coordinates.
            * @param {string} element the tab of the elements needed appending
            * @param {Array< Array<number> >} nodes list of coordinates
            * @returns {JQuery<HTMLElement>} the appended jQuery elements
            * @memberof Axis
            */
            public join(element: string, nodes: Array< Array<number> >): JQuery<HTMLElement> {
                let svg: JQuery<HTMLElement> = $('_');
                nodes.forEach(d => {
                    svg = svg.add(this.append(element, d[0], d[1]));
                });
                this.series++;
                return svg;
            }

            /**
             *Appends a <text> element by the coordinate.
            * @param {string} text the text of the element
            * @param {number} data each dimension of the coordinate
            * @returns {JQuery<HTMLElement>} the appended jQuery element
            * @memberof Axis
            */
            public addtext(text: string, ...data: Array<number>): JQuery<HTMLElement> {
                let fill: string = this.theme === null ? 'black' : this.theme.getOutstand();
                let svg: JQuery<HTMLElement> = $(jQuery.parseXML(`<text\
                    style="fill: ${fill}; fill-opacity: 1;" \
                    xmlns="http://www.w3.org/2000/svg">${text}</text>`).documentElement);
                svg.attr('__style__', 'point');
                svg.attr('__tab__', 'text');
                svg.attr('__serie__', this.series);
                svg.attr('__data__', `${data[0]},${data[1]}`);
                let x: number = this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0]));
                let y: number = this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1]));
                svg.attr('x', x).attr('y', y).attr('cx', x).attr('cy', y);
                this.board.append(svg);
                this.observed.push(svg);
                return svg;
            }

            /**
             *Appends a <path> element by a list of coordinates.
            * @param {Array< Array<number> >} data list of coordinates
            * @returns {JQuery<HTMLElement>} the appended jQuery element
            * @memberof Axis
            */
            public path(data: Array< Array<number> >): JQuery<HTMLElement> {
                let points: Array<string> = [];
                data.forEach(e => {
                    points.push(e.join(','));
                });
                let d: string = '';
                for (let i: number = 0; i < data.length; i++) {
                    let x: number = this.fx(data[i][0]);
                    let y: number = this.fy(data[i][1]);
                    if (x === null || y === null || isNaN(x) || isNaN(y))
                        continue;
                    if (d == '')
                        d = `M${this.fx(data[i][0])} ${this.fy(data[i][1])}`
                    else
                        d += ` L${x} ${y}`;
                }
                let fill: string = this.theme === null ? 'black' : this.theme.at(this.series);
                let polyline: JQuery<HTMLElement> = $(jQuery.parseXML(`<path __data__="${points.join(';')};"\
                    style="stroke: ${fill}; stroke-width: 1px; fill: none;" d="${d}" __tab__="path" __serie__="${this.series}" \
                    xmlns="http://www.w3.org/2000/svg" __style__="path"></path>`).documentElement);
                this.board.append(polyline);
                this.observed.push(polyline);
                this.series++;
                
                return polyline;
            }
        
            /**
             *Updates the scales and all the observed elements in the axis.
            * @protected
            * @abstract
            * @memberof Axis
            */
            update(): void {
                if (this.scale_x instanceof Scale.OrdinalScale) {
                    this.Y.attr('x1', this.padding[3])
                        .attr('y1', this.padding[0] + this.h_)
                        .attr('x2', this.padding[3])
                        .attr('y2', this.padding[0]);
                }
                else if (this.X_domain_min != null && this.X_domain_max != null) {
                    let x: number = this.X_domain_min <= 0 && this.X_domain_max >= 0
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
                    let y: number = this.Y_domain_min <= 0 && this.Y_domain_max >= 0
                        ? this.fy(0)
                        : this.Y_domain_min > 0 && this.Y_domain_max > 0
                            ? this.padding[0] + this.h_ : this.padding[0];
                    this.X.attr('x1', this.padding[3])
                        .attr('y1', y)
                        .attr('x2', this.padding[3] + this.w_)
                        .attr('y2', y);
                }
                let ticks: number = this.X_ticks.length;
                if (ticks > 0)
                    this.note(ticks, 'x');
                ticks = this.Y_ticks.length;
                if (ticks > 0)
                    this.note(ticks, 'y');
                this.observed.forEach(e => {
                    if (e.attr('__style__') == 'point') {
                        let x: number = this.fx(parseFloat(e.attr('__data__').toString().split(',')[0]));
                        let y: number = this.fy(parseFloat(e.attr('__data__').toString().split(',')[1]));
                        if (x === null || y === null || isNaN(x) || isNaN(y)) {
                            e.hide();
                        }
                        else {
                            e.attr('x', x).attr('y', y).attr('cx', x).attr('cy', y).show();
                        }
                    }
                    else if (e.attr('__style__') == 'path') {
                        let data: Array<string> = e.attr('__data__').split(';');
                        let s: string = '';
                        let d: string = '';
                        for (let i: number = 0; i < data.length - 1; i++) {
                            s = data[i];
                            let x: number = this.fx(parseFloat(s.split(',')[0]));
                            let y: number = this.fy(parseFloat(s.split(',')[1]));
                            if (x === null || y === null || isNaN(x) || isNaN(y))
                                continue;
                            if (d == '')
                                d = `M${this.fx(parseFloat(s.split(',')[0]))} ${this.fy(parseFloat(s.split(',')[1]))}`;
                            d += ` L${x} ${y}`;
                        }
                        e.attr('d', d);
                    }
                });
            }

            /**
             *Gets the scale(s).
            * @param {string} [limit='both'] referred scale(s)
            * * `both` — both two scales
            * * `x` — x scale
            * * `y` — y scale
            * @returns {JQuery<HTMLElement>} JQuery selection
            * @memberof Axis2d
            */
            public scale(limit: string = 'both'): JQuery<HTMLElement> {
                switch (limit) {
                    case 'both':
                        return this.X.add(this.Y);
                    case 'x':
                        return this.X;
                    case 'y':
                        return this.Y;
                }
                return null;
            }

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
            public note(ticks: number, limit: string = 'both'): JQuery<HTMLElement> {
                let box: JQuery<HTMLElement> = $('_');
                let step: number = 0;
                let level: number = 0;
                switch (limit) {
                    case 'both':
                        box = box.add(this.note(ticks, 'x'));
                        box = box.add(this.note(ticks, 'y'));
                        break;
                    case 'x':
                        this.X_ticks.forEach(e => {
                            e.remove();
                        });
                        this.X_ticks = [];

                        let y: number = this.padding[0] + this.h_;
                        if (!(this.scale_y instanceof Scale.OrdinalScale) && this.Y_domain_min != null && this.Y_domain_max != null) {
                            y = this.Y_domain_min <= 0 && this.Y_domain_max >= 0
                                ? this.fy(0)
                                : this.Y_domain_min > 0 && this.Y_domain_max > 0
                                    ? this.padding[0] + this.h_ : this.padding[0];
                        }
                        if (this.scale_x instanceof Scale.OrdinalScale) {
                            step = parseInt((this.X_domain_list.length / ticks).toString());
                            step = step < 1 ? 1 : step > this.X_domain_list.length ? this.X_domain_list.length : step;
                            for (let i: number = 0; i < this.X_domain_list.length; i += step) {
                                let svg: JQuery<HTMLElement> = $(jQuery.parseXML(`<text text-anchor="middle"\
                                    style="fill-opacity: 1;" __style__="tick_x"\
                                    x="${this.fx(this.X_domain_list[i])}" \
                                    y="${y}" dy="18" \
                                    xmlns="http://www.w3.org/2000/svg">${this.X_domain_list[i]}</text>`).documentElement);
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
                        for (let i: number = 0; i < ticks; i++) {
                            let svg: JQuery<HTMLElement> = $(jQuery.parseXML(`<text text-anchor="middle"\
                                style="fill-opacity: 1;" __style__="tick_x"\
                                x="${this.fx(this.X_domain_min + step * i)}" \
                                y="${y}" dy="18" \
                                xmlns="http://www.w3.org/2000/svg">${this.X_domain_min + step * i}</text>`).documentElement);
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
                        this.Y_ticks.forEach(e => {
                            e.remove();
                        });
                        this.Y_ticks = [];
                        let x: number = this.padding[3];
                        if (!(this.scale_x instanceof Scale.OrdinalScale) && this.X_domain_min != null && this.X_domain_max != null) {
                            x = this.X_domain_min <= 0 && this.X_domain_max >= 0
                                ? this.fx(0)
                                : this.X_domain_min > 0 && this.X_domain_max > 0
                                    ? this.padding[3] : this.padding[3] + this.w_;
                        }
                        if (this.scale_y instanceof Scale.OrdinalScale) {
                            step = parseInt((this.Y_domain_list.length / ticks).toString());
                            step = step < 1 ? 1 : step > this.Y_domain_list.length ? this.Y_domain_list.length : step;
                            for (let i: number = 0; i < this.Y_domain_list.length; i += step) {
                                let svg: JQuery<HTMLElement> = $(jQuery.parseXML(`<text text-anchor="end"\
                                    style="fill-opacity: 1;" __style__="tick_y"\
                                    x="${x}" dx="-6" \
                                    y="${this.fy(this.Y_domain_list[i])}"\
                                    xmlns="http://www.w3.org/2000/svg">${this.Y_domain_list[i]}</text>`).documentElement);
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
                        for (let i: number = 0; i < ticks; i++) {
                            let svg: JQuery<HTMLElement> = $(jQuery.parseXML(`<text text-anchor="end"\
                                style="fill-opacity: 1;" __style__="tick_y"\
                                x="${x}" dx="-6" \
                                y="${this.fy(this.Y_domain_min + step * i)}"\
                                xmlns="http://www.w3.org/2000/svg">${this.Y_domain_min + step * i}</text>`).documentElement);
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
            }

            /**
             *Sets a new theme for the axis.
             * @param {Color.Color} theme color scheme
             * @returns {Axis} the object itself
             * @memberof Axis
             */
            public fitIn(theme: Color.Color): Axis2d {
                this.theme = theme;
                this.fill = this.theme.getBackground2();
                this.background = this.theme.getBackground1();
                this.color();
                return this;
            }

            /**
             *Recolor the elements.
             * @abstract
             * @memberof Axis
             */
            protected color(): void {
                this.box.css('fill', this.theme.getBackground1());
                this.area.css('fill', this.theme.getBackground2());
                this.scale().css('stroke', this.theme.getOutstand());
                let ticks: number = this.X_ticks.length;
                if (ticks > 0)
                    this.note(ticks, 'x');
                ticks = this.Y_ticks.length;
                if (ticks > 0)
                    this.note(ticks, 'y');
                let count: number = 0;
                this.observed.forEach(e => {
                    if (e.attr('__tab__') == 'text' || e.attr('__style__') === 'tick_x' || e.attr('__style__') === 'tick_y') {
                        e.css('fill', this.theme.getOutstand());
                    }
                    else if (e.attr('__style__') == 'point') {
                        let index: number = e.attr('__serie__') === null ? 0 : parseInt(e.attr('__serie__'));
                        e.css('fill', this.theme.at(index)).css('stroke', this.theme.at(index + 1));
                    }
                    else if (e.attr('__style__') == 'path') {
                        e.css('stroke', this.theme.at(count));
                        count++;
                    }
                });
            }
        }
    }

    export namespace Scale {   
        /**
         *Scale, a function to project data
        * @export
        * @interface Scale
        */
        export interface Scale {
            domain_min: number;
            domain_max: number;
            range_min: number;
            range_max: number;
            out_of_range: Solution;
            domain(min: number, max: number): Scale;
            range(min: number, max: number): Scale;
            to(val: number): number;
            from(cor: number): number;
            handle(s: Solution): Scale;
        }
        
        export function getInstance(style: string = 'linear'): Scale {
            switch (style) {
                case 'linear':
                    return new LinearScale();
                case 'ordinal':
                    return new OrdinalScale();
            }
            return
        }
        /**
         *Action principle of out_of_range input data
        * @export
        * @enum {number}
        */
        export enum Solution {
            stuck, forbidden, hard
        }
        
        /**
         *Linear scale
        * @export
        * @class LinearScale
        * @implements {Scale}
        */
        export class LinearScale implements Scale {
            domain_min = null;
            domain_max = null;
            range_min = null;
            range_max = null;
            out_of_range = Solution.forbidden;
            
            /**
             *Sets the input range of the scale.
            * @param {number} min minimum of the input
            * @param {number} max maximun of the input
            * @returns {LinearScale} the object itself
            * @memberof LinearScale
            */
            domain(min: number, max: number): LinearScale {
                this.domain_min = min;
                this.domain_max = max;
                return this;
            }

            /**
             *Sets the output range of the scale.
            * @param {number} min minimum of the output
            * @param {number} max maximun of the output
            * @returns {LinearScale} the object itself
            * @memberof LinearScale
            */
            range(min: number, max: number): LinearScale {
                this.range_min = min;
                this.range_max = max;
                return this;
            }

            /**
             *Returns the projection of the input value.
            * @param {number} val input
            * @returns {number} project
            * @memberof LinearScale
            */
            to(val: number): number {
                if (this.domain_min == null || this.domain_max == null || this.range_min == null || this.range_max == null) {
                    console.error('This scale is not defined yet: ', this);
                    return null;
                }
                let num = (val - this.domain_min) * (this.range_max - this.range_min) / (this.domain_max - this.domain_min) + this.range_min;
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
                            console.warn(`Received value ${val} out of range: [${this.domain_min}, ${this.domain_max}]`);
                            return null;
                    }
                }
                return num;
            }  

            /**
             *Returns the calculation result of the possible input value of the projection.
            * @param {number} cor projection value
            * @returns {number} possible origin value
            * @memberof LinearScale
            */
            from(cor: number): number {
                if (this.domain_min == null || this.domain_max == null || this.range_min == null || this.range_max == null) {
                    console.error('This scale is not defined yet: ', this);
                    return null;
                }
                return (cor - this.range_min) * (this.domain_max - this.domain_min) / (this.range_max - this.range_min) + this.domain_min;
            }

            /**
             *Sets the principle to act when input data is out of range, default=forbidden.
            * @param {Solution} s principle
            * * `hard` — calculate it by the scale
            * * `stuck` — regard it as the min / max value
            * * `forbidden` — raise an error
            * @returns {Scale} the object itself
            * @memberof Scale
            */
            handle(s: Solution): LinearScale {
                this.out_of_range = s;
                return this;
            }
        }

        /**
         *Linear scale
         * @export
         * @class OrdinalScale
         * @implements {Scale}
         */
        export class OrdinalScale implements Scale {
            domain_min = null;
            domain_max = null;
            range_min = null;
            range_max = null;
            out_of_range = Solution.forbidden;
            private domain_list: Array<number> = null;
            
            /**
             *Not supported
            * @param {number} min
            * @param {number} max
            * @returns {OrdinalScale}
            * @memberof OrdinalScale
            */
            domain(min: number, max: number): OrdinalScale {
                throw Error('Method domain(number, number) is not supported for OrdinalScale object. \
                    Try to use method among(Array<number>) instead.');
            }
            
            /**
             *Sets the allowed input value of the scale
             * @param {*} Array
             * @param {*} 
             * @param {*} number
             * @memberof OrdinalScale
             */
            public among(list: Array<number>): OrdinalScale {
                this.domain_list = list;
                return this;
            }

            /**
             *Sets the output range of the scale.
            * @param {number} min minimum of the output
            * @param {number} max maximun of the output
            * @returns {OrdinalScale} the object itself
            * @memberof OrdinalScale
            */
            range(min: number, max: number): OrdinalScale {
                this.range_min = min;
                this.range_max = max;
                return this;
            }

            /**
             *Returns the projection of the input value.
            * @param {number} val input
            * @returns {number} projection
            * @memberof OrdinalScale
            */
            to(val: number): number {
                if (this.domain_list === null || this.range_min == null || this.range_max == null) {
                    console.error('This scale is not defined yet: ', this);
                    return null;
                }
                let idx: number = -1;
                for (let i: number = this.domain_list.length - 1; i >= 0; i--) {
                    if (this.domain_list[i] === val) {
                        idx = i;
                        break;
                    }
                }
                if (idx == -1) {
                    if (this.out_of_range === Solution.forbidden) {
                        console.warn(`Received value ${val} out of range: `, this.domain_list);
                    }
                    return null;
                }
                return (idx + 0.5) * (this.range_max - this.range_min) / this.domain_list.length + this.range_min;
            }  

            /**
             *Returns the calculation result of the possible input value of the projection.
            * @param {number} cor projection value
            * @returns {number} possible origin value
            * @memberof OrdinalScale
            */
            from(cor: number): number {
                if (this.domain_list === null || this.range_min == null || this.range_max == null) {
                    console.error('This scale is not defined yet: ', this);
                    return null;
                }
                return this.domain_list[parseInt(
                    ((cor - this.range_min) * this.domain_list.length / (this.range_max - this.range_min) - 0.5).toString())];
            }

            /**
             *Sets the principle to act when input data is out of range, default=forbidden.
            * @param {Solution} s principle
            * * `hard` — skip it
            * * `stuck` — skip it
            * * `forbidden` — raise an error
            * @returns {Scale} the object itself
            * @memberof Scale
            */
            handle(s: Solution): OrdinalScale {
                this.out_of_range = s;
                return this;
            }
        }
    }

    /**
     *
     * Returns the base 10 logarithm of a number
     * @param {number} x
     * @returns {number} logarithm: int
     */
    function levelof(x: number): number {
        let level: number = 1;
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
}