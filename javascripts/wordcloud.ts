/*
 * @Author: Antoine YANG 
 * @Date: 2019-09-03 14:33:39 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2019-09-03 15:59:30
 */

namespace visCloud {
    export class WordCloud {
        private container: JQuery<HTMLElement>;
        private svg: JQuery<HTMLElement>;
        private width: number;
        private height: number;
        private wordlist: Array<string>;
        private wordCount: Array<{word: string, count: number}>;
        private stopwords: Array<string>;
        private amount: number;
        private maxConsequence: number | null;
        private colortab: Array<string>;

        public constructor(container: JQuery<HTMLElement> = $('body'), width: number = 400, height: number = 300) {
            this.container = container;
            this.width = width;
            this.height = height;
            this.svg = $(
                jQuery.parseXML(`<svg xmlns="http://www.w3.org/2000/svg"
                    width="${this.width}px" height="${this.height}px"></svg>`).documentElement);
            this.container.append(this.svg);
            this.wordlist = [];
            this.wordCount = [];
            this.stopwords = [];
            this.amount = 10;
            this.maxConsequence = null;
            this.colortab = ['rgb(221, 18, 14)', 'rgb(232, 172, 21)', 'rgb(234, 234, 234)', 'rgb(122, 122, 198)', 'rgb(245, 98, 0)',
                'rgb(89, 170, 117)', 'rgb(2, 97, 242)', 'rgb(119, 193, 193)', 'rgb(219, 97, 120)', 'rgb(202, 170, 119)'];
        }

        public setOption(option: {
                container?: JQuery<HTMLElement>, width?: number, height?: number, amount?: number,
                colortab?: Array<string>, maxConsequence?: number | null}): WordCloud {
            if (option.container) {
                this.container = option.container;
            }
            if (option.width) {
                this.width = option.width;
            }
            if (option.height) {
                this.height = option.height;
            }
            if (option.amount) {
                this.amount = option.amount;
            }
            if (option.colortab) {
                this.colortab = option.colortab;
            }
            if (option.maxConsequence !== void 0) {
                this.maxConsequence = option.maxConsequence;
            }
            return this;
        }

        public addStopWords(list: Array<string>): WordCloud {
            this.stopwords.push(...list);
            return this;
        }

        public clearStopWords(): WordCloud {
            this.stopwords = [];
            return this;
        }

        public load(list: Array<string>): WordCloud {
            this.wordlist = list;
            this.count();
            return this;
        }

        private count(): void {
            this.wordCount = [];
            let marker: any = {};
            this.wordlist.forEach(w => {
                if (marker[w]) {
                    marker[w]++;
                }
                else {
                    marker[w] = 1;
                }
            });
            let stopwords: any = {};
            this.stopwords.forEach(w => {
                stopwords[w] = true;
            });
            for (const word in marker) {
                if (marker.hasOwnProperty(word)) {
                    const count: number = marker.word;
                    if (stopwords.word || this.maxConsequence && count / this.wordlist.length > this.maxConsequence) {
                        continue;
                    }
                    if (this.wordCount.length < this.amount) {
                        this.wordCount.push({word: word.toString(), count: count});
                        let idx: number = this.wordCount.length - 1;
                        while (idx >= 1 && count > this.wordCount[idx - 1].count) {
                            this.wordCount[idx] = this.wordCount[idx - 1];
                            idx--;
                        }
                        this.wordCount[idx] = {word: word.toString(), count: count};
                    }
                    else if (count > this.wordCount[this.wordCount.length - 1].count) {
                        let idx: number = this.wordCount.length - 1;
                        while (idx >= 1 && count > this.wordCount[idx - 1].count) {
                            this.wordCount[idx] = this.wordCount[idx - 1];
                            idx--;
                        }
                        this.wordCount[idx] = {word: word.toString(), count: count};
                    }
                }
            }
        }

        private sizeof: (count: number, maxCount?: number) => number
            = (count: number, maxCount: number) => {
                return 0.5 + count / maxCount;
            }

        public layout(): WordCloud {
            this.svg.html("");
            this.wordCount.forEach((e, index) => {
                let svg: JQuery<HTMLElement> = $(jQuery.parseXML(`<text \
                    x="${Math.random() * this.width}" y="${Math.random() * this.height}"
                    text-anchor="middle"
                    style="fill: ${this.colortab[index % this.colortab.length]};
                    font-size: ${(this.width < this.height ? this.width : this.height) / this.amount
                        * this.sizeof(e.count, this.wordCount[0].count)}"
                    xmlns="http://www.w3.org/2000/svg">
                    ${e.word}</text>`).documentElement);
                this.svg.add(svg);
            });
            return this;
        }

        public handleSize(callback: ((count: number, maxCount: number) => number) | ((count: number) => number)): void {
            this.sizeof = callback;
        }
    }
}
