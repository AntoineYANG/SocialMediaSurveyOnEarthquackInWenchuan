/*
 * @Author: Antoine YANG 
 * @Date: 2019-08-08 15:15:25 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2019-08-08 20:11:59
 */

class Axis2d {
    private parent: JQuery<Element> = null;
    private board: JQuery<Element> = null;
    private box: JQuery<Element> = null;
    private area: JQuery<Element> = null;
    private margin: Array<number> = [20, 20, 20, 20];
    private width: number = 0;
    private height: number = 0;
    private padding: Array<number> = [50, 20, 50, 20];
    private w_: number = 0;
    private h_: number = 0;
    private fill: string = "#eee";
    private background: string = "white";
    private scale_x: LinearScale = null;
    private scale_y: LinearScale = null;
    private observed: Array< JQuery<Element> > = [];
    
    public constructor(parent: JQuery<Element>) {
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
        let box = jQuery.parseXML(`<rect class="g-background" style="fill: ${this.background};" \
            xmlns="http://www.w3.org/2000/svg" width="${this.width - this.margin[1] - this.margin[3]}px" \
            height="${this.height - this.margin[0] - this.margin[2]}px" \
            ></rect>`).documentElement;
        this.board.append(box);
        this.box = $(box);
        let area = jQuery.parseXML(`<rect class="axis-background" style="fill: ${this.fill};" \
            xmlns="http://www.w3.org/2000/svg" width="${this.w_}px" height="${this.h_}px" \
            x="${this.padding[3]}px" y="${this.padding[0]}px"\
            ></rect>`).documentElement;
        this.board.append(area);
        this.area = $(area);
        this.scale_x = new LinearScale();
        this.scale_y = new LinearScale();
        this.adjustBox();
    }

    public domain_x(min: number, max: number): Axis2d {
        this.scale_x.domain(min, max);
        return this;
    }
    public domain_y(min: number, max: number): Axis2d {
        this.scale_y.domain(min, max);
        return this;
    }

    public fx(x: number): number {
        return this.scale_x.to(x);
    }
    public fy(y: number): number {
        return this.scale_y.to(y);
    }

    private static parseBox(str: string): Array<number> {
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

    private adjustBox(): void {
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
        this.update();
    }

    public handle(solution: string, limit: string = 'all'): Axis2d {
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
    }

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
        return this;
    }

    public append(svg: JQuery<Element>, x: number, y: number): JQuery<Element> {
        svg.attr('__data__', `${x},${y}`);
        svg.attr('x', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
        svg.attr('y', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
        svg.attr('cx', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
        svg.attr('cy', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
        this.board.append(svg);
        this.observed.push(svg);
        return svg;
    }

    private update(): void {
        this.observed.forEach(e => {
            e.attr('x', this.fx(parseFloat(e.attr('__data__').toString().split(',')[0])));
            e.attr('y', this.fy(parseFloat(e.attr('__data__').toString().split(',')[1])));
            e.attr('cx', this.fx(parseFloat(e.attr('__data__').toString().split(',')[0])));
            e.attr('cy', this.fy(parseFloat(e.attr('__data__').toString().split(',')[1])));
        });
    }
}

interface Scale {
    domain_min: number;
    domain_max: number;
    range_min: number;
    range_max: number;
    out_of_range: Solution;
    to(val: number): number;
    from(cor: number): number;
    handle(s: Solution): Scale;
    random(): number;
}

enum Solution {
    stuck, forbidden, hard
}

class LinearScale implements Scale {
    domain_min = null;
    domain_max = null;
    range_min = null;
    range_max = null;
    out_of_range = Solution.forbidden;
    
    domain(min: number, max: number): LinearScale {
        this.domain_min = min;
        this.domain_max = max;
        return this;
    }
    range(min: number, max: number): LinearScale {
        this.range_min = min;
        this.range_max = max;
        return this;
    }
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
    from(cor: number): number {
        if (this.domain_min == null || this.domain_max == null || this.range_min == null || this.range_max == null) {
            console.error('This scale is not defined yet: ', this);
            return null;
        }
        return (cor - this.range_min) * (this.domain_max - this.domain_min) / (this.range_max - this.range_min) + this.domain_min;
    }
    handle(s: Solution): LinearScale {
        this.out_of_range = s;
        return this;
    }
    random(): number {
        if (this.domain_min == null || this.domain_max == null || this.range_min == null || this.range_max == null) {
            console.error('This scale is not defined yet: ', this);
            return null;
        }
        return this.to(Math.random() * (this.domain_max - this.domain_min) + this.domain_min);
    }
}