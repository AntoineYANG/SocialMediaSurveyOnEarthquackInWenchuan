/*
 * @Author: Antoine YANG 
 * @Date: 2019-08-08 15:15:25 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2019-08-09 18:36:48
 */

namespace Axis {
    export abstract class Axis {
        protected parent: JQuery<Element> = null;
        protected board: JQuery<Element> = null;
        protected box: JQuery<Element> = null;
        protected area: JQuery<Element> = null;
        protected margin: Array<number> = [20, 20, 20, 20];
        protected width: number = 0;
        protected height: number = 0;
        protected padding: Array<number> = [50, 20, 50, 20];
        protected w_: number = 0;
        protected h_: number = 0;
        protected fill: string = "#eee";
        protected background: string = "white";
        protected observed: Array< JQuery<Element> > = [];

        protected constructor(parent: JQuery<Element>) {
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
        }

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

        public abstract set(param: string, value: string): Axis;
        protected abstract adjustBox(): void;
        public abstract append(element: string, x: number, y: number): JQuery<Element>;
        public abstract text(text: string, x: number, y: number): JQuery<Element>;
        public abstract path(data: Array< Array<number> >): JQuery<Element>;
        protected abstract update(): void;
        public abstract handle(solution: string, limit: string): Axis;
    }

    export class Axis2d extends Axis {
        private scale_x: LinearScale = null;
        private scale_y: LinearScale = null;
        
        public constructor(parent: JQuery<Element>) {
            super(parent);
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
            this.update();
        }
    
        public handle(solution: string, limit: string = 'all'): Axis {
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
            return <Axis><any>this;
        }
    
        public set(param: string, value: string): Axis {
            value = value.toString();
            switch (param) {
                case 'background':
                    this.background = value;
                    this.box.css('fill', this.background);
                    return <Axis><any>this;
                case 'fill':
                    this.fill = value;
                    this.area.css('fill', this.fill);
                    return <Axis><any>this;
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
            return <Axis><any>this;
        }
    
        public append(element: string, x: number, y: number): JQuery<Element> {
            let svg: JQuery<Element> = $(jQuery.parseXML(`<${element}\
                style="fill: white; stroke: black; stroke-width: 1px; fill-opacity: 1;" \
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
            svg.attr('__data__', `${x},${y}`);
            svg.attr('x', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
            svg.attr('y', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
            svg.attr('cx', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
            svg.attr('cy', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
            this.board.append(svg);
            this.observed.push(svg);
            return svg;
        }

        public text(text: string, x: number, y: number): JQuery<Element> {
            let svg: JQuery<Element> = $(jQuery.parseXML(`<text\
                style="fill: black; fill-opacity: 1;" \
                xmlns="http://www.w3.org/2000/svg">${text}</text>`).documentElement);
            svg.attr('__style__', 'point');
            svg.attr('__data__', `${x},${y}`);
            svg.attr('x', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
            svg.attr('y', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
            svg.attr('cx', this.fx(parseFloat(svg.attr('__data__').toString().split(',')[0])));
            svg.attr('cy', this.fy(parseFloat(svg.attr('__data__').toString().split(',')[1])));
            this.board.append(svg);
            this.observed.push(svg);
            return svg;
        }

        public path(data: Array< Array<number> >): JQuery<Element> {
            let points: Array<string> = [];
            data.forEach(e => {
                points.push(e.join(','));
            });
            let d = `M${this.fx(data[0][0])} ${this.fy(data[0][1])}`;
            for (let i: number = 1; i < data.length; i++) {
                d += ` L${this.fx(data[i][0])} ${this.fy(data[i][1])}`;
            }
            let polyline: JQuery<Element> = $(jQuery.parseXML(`<path __data__="${points.join(';')};"\
                style="stroke: black; stroke-width: 1px; fill: none;" d="${d}"\
                xmlns="http://www.w3.org/2000/svg" __style__="path"></path>`).documentElement);
            this.board.append(polyline);
            this.observed.push(polyline);
            
            return polyline;
        }
    
        update(): void {
            this.observed.forEach(e => {
                if (e.attr('__style__') == 'point') {
                    e.attr('x', this.fx(parseFloat(e.attr('__data__').toString().split(',')[0])));
                    e.attr('y', this.fy(parseFloat(e.attr('__data__').toString().split(',')[1])));
                    e.attr('cx', this.fx(parseFloat(e.attr('__data__').toString().split(',')[0])));
                    e.attr('cy', this.fy(parseFloat(e.attr('__data__').toString().split(',')[1])));
                }
                else if (e.attr('__style__') == 'path') {
                    let data: Array<string> = e.attr('__data__').split(';');
                    let s: string = data[0];
                    let d = `M${this.fx(parseFloat(s.split(',')[0]))} ${this.fy(parseFloat(s.split(',')[1]))}`;
                    for (let i: number = 1; i < data.length; i++) {
                        s = data[i];
                        d += ` L${this.fx(parseFloat(s.split(',')[0]))} ${this.fy(parseFloat(s.split(',')[1]))}`;
                    }
                    e.attr('d', d);
                }
            });
        }
    }
    
    export interface Scale {
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
    
    export enum Solution {
        stuck, forbidden, hard
    }
    
    export class LinearScale implements Scale {
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
}