/*
 * @Author: Antoine YANG
 * @Date: 2019-09-03 14:33:39
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2019-09-03 15:59:30
 */
var visCloud;
(function (visCloud) {
    var WordCloud = /** @class */ (function () {
        function WordCloud(container, width, height) {
            if (container === void 0) { container = $('body'); }
            if (width === void 0) { width = 400; }
            if (height === void 0) { height = 300; }
            this.sizeof = function (count, maxCount) {
                return 0.5 + count / maxCount;
            };
            this.container = container;
            this.width = width;
            this.height = height;
            this.svg = $(jQuery.parseXML("<svg xmlns=\"http://www.w3.org/2000/svg\"\n                    width=\"" + this.width + "px\" height=\"" + this.height + "px\"></svg>").documentElement);
            this.container.append(this.svg);
            this.wordlist = [];
            this.wordCount = [];
            this.stopwords = [];
            this.amount = 10;
            this.maxConsequence = null;
            this.colortab = ['rgb(221, 18, 14)', 'rgb(232, 172, 21)', 'rgb(234, 234, 234)', 'rgb(122, 122, 198)', 'rgb(245, 98, 0)',
                'rgb(89, 170, 117)', 'rgb(2, 97, 242)', 'rgb(119, 193, 193)', 'rgb(219, 97, 120)', 'rgb(202, 170, 119)'];
        }
        WordCloud.prototype.setOption = function (option) {
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
        };
        WordCloud.prototype.addStopWords = function (list) {
            var _a;
            (_a = this.stopwords).push.apply(_a, list);
            return this;
        };
        WordCloud.prototype.clearStopWords = function () {
            this.stopwords = [];
            return this;
        };
        WordCloud.prototype.load = function (list) {
            this.wordlist = list;
            this.count();
            return this;
        };
        WordCloud.prototype.count = function () {
            this.wordCount = [];
            var marker = {};
            this.wordlist.forEach(function (w) {
                if (marker[w]) {
                    marker[w]++;
                }
                else {
                    marker[w] = 1;
                }
            });
            var stopwords = {};
            this.stopwords.forEach(function (w) {
                stopwords[w] = true;
            });
            for (var word in marker) {
                if (marker.hasOwnProperty(word)) {
                    var count = marker.word;
                    if (stopwords.word || this.maxConsequence && count / this.wordlist.length > this.maxConsequence) {
                        continue;
                    }
                    if (this.wordCount.length < this.amount) {
                        this.wordCount.push({ word: word.toString(), count: count });
                        var idx = this.wordCount.length - 1;
                        while (idx >= 1 && count > this.wordCount[idx - 1].count) {
                            this.wordCount[idx] = this.wordCount[idx - 1];
                            idx--;
                        }
                        this.wordCount[idx] = { word: word.toString(), count: count };
                    }
                    else if (count > this.wordCount[this.wordCount.length - 1].count) {
                        var idx = this.wordCount.length - 1;
                        while (idx >= 1 && count > this.wordCount[idx - 1].count) {
                            this.wordCount[idx] = this.wordCount[idx - 1];
                            idx--;
                        }
                        this.wordCount[idx] = { word: word.toString(), count: count };
                    }
                }
            }
        };
        WordCloud.prototype.layout = function () {
            var _this = this;
            this.svg.html("");
            this.wordCount.forEach(function (e, index) {
                var svg = $(jQuery.parseXML("<text                     x=\"" + Math.random() * _this.width + "\" y=\"" + Math.random() * _this.height + "\"\n                    text-anchor=\"middle\"\n                    style=\"fill: " + _this.colortab[index % _this.colortab.length] + ";\n                    font-size: " + (_this.width < _this.height ? _this.width : _this.height) / _this.amount
                    * _this.sizeof(e.count, _this.wordCount[0].count) + "\"\n                    xmlns=\"http://www.w3.org/2000/svg\">\n                    " + e.word + "</text>").documentElement);
                _this.svg.add(svg);
            });
            return this;
        };
        WordCloud.prototype.handleSize = function (callback) {
            this.sizeof = callback;
        };
        return WordCloud;
    }());
    visCloud.WordCloud = WordCloud;
})(visCloud || (visCloud = {}));
