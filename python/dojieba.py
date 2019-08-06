# encoding=utf-8
import jieba

stopwords = ["迎", "费", "最", "请", "再", "微博", "记得", "天", "人", "说", "【", "】", "回复", "转发",
             "年", "月", "日", "时", "现在", "想起", "老子", "想", "获", "猪", "真的", "转", "做", "事情",
             "关注", "利用", "太", "分", "万", "发表", "博文", "分享", "却", "饭否", "感觉", "博", "发现",
             "被迫", "震", "报道", "踩", "时报", "打开", "脑", "吃", "问", "称", "交给", "图片", "视频",
             "想想", "网友", "跑", "忘记", "事", "曾", "回", "画面", "读", "毕业", "工作", "RT", "死",
             "生", "新闻", "戒", "烟", "剩", "带来", "实在", "楼", "无", "支持", "记者", "已", "事件",
             "嘿嘿", "还要", "要", "嗳", "赶早不赶晚", "这些", "日益", "倒不如", "逢", "立地", "不只",
             "一般", "豁然", "将近", "毫不", "嗬", "大张旗鼓", "嗯", "不可开交", "#", " ", "!",
             "&", "全力", "就算", "'", "$", "%", "...", "*", "+", "(", "她们", ")", ".", "/", "各位", ",",
             "-", "︿", "3", "2", "1", "不止", "基本", "0", "不拘", "7", "这里", "6", "5", "颇", "4", ";",
             ":", "如此", "9", "8", "极度", "?", ">", "首先", "=", "<", "也罢", "@", "A", "见", "当庭",
             "隔夜", "更", "不少", "不胜", "\\", "\"", "_", "替", "^", "到目前为止", "大大", "除开", "腾",
             "暗中", "而外", "开始", "`", "三番两次", "宁可", "这么", "权时", "结果", "大多", "除此以外", "单单",
             "如下", "几度", "何处", "喂", "如上", "矣", "喀", "喏", "~", "吧哒", "|", "放量", "即便", "当年",
             "不对", "那", "顷刻", "本人", "是", "岂非", "己", "看", "趁热", "哪边", "立马", "乘势", "啥",
             "何况", "这个", "啦", "人民", "率尔", "那种", "仍然", "不能", "根据", "并肩", "相对而言", "也好",
             "啐", "什么样", "累年", "啊", "扑通", "即使", "开外", "大概", "依照", "·", "乃至", "与否",
             "总而言之", "高低", "切切", "多次", "比如说", "不亦乐乎", "如期", "简言之", "何妨", "不管怎样",
             "顺", "顷", "将才", "呆呆地", "略为", "更为", "大约", "其次", "倍加", "满", "不定", "除了",
             "都", "之后", "着", "难道", "不可", "至", "风雨无阻", "陡然", "为了", "及至", "对于", "虽说",
             "唉", "彻夜", "嘎嘎", "臭", "不同", "大体上", "自", "！", "＃", "来得及", "哦", "而", "％",
             "＄", "的", "＆", "哪", "）", "老", "（", "＋", "哩", "＊", "，", "者", "人人", "比方", "０",
             "１", "简而言之", "这么些", "２", "３", "４", "５", "６", "不至于", "７", "这部", "谁知", "８",
             "几时", "９", "屡", "：", "；", "＜", "应当", "＞", "哼", "？", "人家", "如今", "＠", "哇",
             "哈", "哉", "尽量", "总的说来", "继之", "单纯", "方才", "哎", "这么点儿", "极", "乘胜", "八成",
             "光是", "倘或", "哗", "被", "忽然", "［", "从头", "出去", "哟", "］", "咦", "切不可", "尽",
             "哪年", "竟然", "是否", "而况", "加以", "从此以后", "省得", "就", "咳", "﻿我们", "不力",
             "各个", "咱", "充其极", "｜", "｝", "次第", "～", "岂止", "｛", "某", "尽管如此", "偶而", "看上去",
             "截然", "甚而", "和", "如常", "任何", "极端", "接着", "嘎登", "咋", "皆可", "具体地说", "凝神", "这就是说", "将", "千万", "好在",
             "从早到晚", "各自", "咚", "取道", "纯粹", "这种", "只限", "上去", "恐怕", "呢", "莫非", "虽然", "碰巧", "呸", "紧接着", "即若",
             "本", "等等", "按照", "呵", "不单", "具体说来", "一旦", "望", "朝", "纵", "不要", "呀", "怎样", "呃", "轰然", "有", "每当",
             "接连不断", "呜", "呐", "不比", "呕", "纯", "呗", "各种", "理应", "连袂", "吧", "绝", "什么", "那里", "后来", "给", "日渐",
             "暗自", "以免", "经", "不然", "来", "饱", "别人", "吱", "看来", "沙沙", "同", "趁势", "切莫", "从重", "尽心尽力", "切勿", "果真",
             "各", "￥", "要不是", "白", "并排", "自己", "保管", "岂", "差一点", "默然", "此中", "能", "吗", "向", "吓", "藉以", "不惟",
             "的确", "此后", "让", "待到", "末##末", "哪些", "不然的话", "其他", "毫无", "连声", "趁早", "归", "几经", "当", "论", "九", "也",
             "挨门挨户", "挨次", "乘", "保险", "从小", "莫若", "乒", "彼", "乎", "刚好", "么", "如若", "之", "默默地", "是的", "嗡嗡", "请勿",
             "乃", "为", "得起", "借此", "该", "汝", "从此", "然而", "亲眼", "略微", "刚才", "一定",
             "反倒是", "按时", "临", "个", "倘若", "差不多", "从无到有", "—", "起来", "’", "‘", "反之则", "弗", "”", "“", "何止", "惯常",
             "姑且", "与其", "…", "哪个", "反而", "常言道", "大抵", "不再", "且", "到了儿", "三", "上", "再者", "不", "并且", "与", "一",
             "趁着", "七", "两者", "等到", "不经意", "必", "如何", "来着", "不由得", "怎么样", "尽管", "知道", "任", "旁人", "不管", "由",
             "个人", "哪里", "似的", "以", "甭", "甫", "倒不如说", "用", "均", "其余", "长此下去", "们", "莫", "匆匆", "多少", "当着", "就是说",
             "他", "既然", "虽则", "纵使", "呼哧", "沿", "快", "仅", "联袂", "没", "或许", "仍", "来看", "俺们", "从", "倘然", "只是", "往",
             "大凡", "而言", "当真", "待", "因此", "很", "不如", "据此", "更进一步", "那么样", "纵然", "得", "不仅...而且", "极为", "尽然", "略",
             "长期以来", "全文", "刚刚", "了向", "秒拍", "超", "结束",
             "互", "五", "不妨", "不止一次", "地", "——", "较比", "必须", "或是", "向着", "从古到今", "在", "尽如人意", "了", "毕竟", "二",
             "川流不息", "确实", "于", "可以", "你", "并没有", "当场", "要不", "那儿", "纵令", "恰巧", "无宁", "四", "来讲", "局外", "近年来",
             "因", "并", "但", "起首", "﻿,", "赶快", "方", "需要", "即令", "大略", "将要", "活", "不特", "然则", "极了", "何", "但是",
             "固", "不独", "何苦", "一则", "猛然", "屡屡", "传", "到底", "在下", "设使", "经过", "至于", "老老实实", "猛然间", "截至", "譬如",
             "很多", "一切", "别的", "要么", "趁机", "。", "、", "越是", "常", "　", "按期", "何尝", "》", "《", "〉", "〈", "动不动",
             "不外", "因为", "使得", "会", "既", "如果", "按说", "不大", "带", "自从", "以便", "宁肯", "当下", "不光", "它们", "之类", "老大",
             "尽可能", "尔后", "成年累月", "如上所述", "每个", "彼此", "从宽", "俺", "就此", "粗", "达旦",
             "当口儿", "归根结底", "看起来", "或多或少", "当中", "据我所知", "据实", "不免", "遵照", "固然", "缕缕", "换言之", "策略地", "居然",
             "连日来", "若", "起见", "比照", "嘎", "不成", "不仅仅是", "长话短说", "因而", "设若", "不论", "嘘", "嘛", "沿着", "恍然", "慢说",
             "亲身", "哼唷", "故", "便", "以至", "以致", "本着", "论说", "除外", "之所以", "简直", "前后", "大家", "嘻", "果然", "共总", "嘿",
             "敢", "时候", "不怎么", "如次", "依", "鄙人", "亲手", "大", "顿时", "顺着", "叮当", "敞开儿", "等", "大面儿上", "年复一年", "冲",
             "打开天窗说亮话", "跟", "上来", "拿", "假若", "不曾", "着呢", "快要", "此刻", "而且", "背靠背", "假使", "陈年", "多多益善", "另方面",
             "冒", "他人", "到处", "大体", "下来", "云云", "全然", "何须", "为着", "每逢", "内", "多", "很少", "尚且", "只要", "不仅仅", "出",
             "  ", "顷刻间", "常常", "趁", "祸", "主持", "只能", "送", "关系", "告诉", "照片", "场景", "面对",
             "想到",
             "日臻", "恰似", "得天独厚", "另外", "敢情", "率然", "并无", "届时", "凭", "每每", "几", "她", "成为", "他们", "尔等", "尽快",
             "不消", "如其", "把", "反之亦然", "当即", "奇", "据悉", "奈", "前者", "第", "必定", " [", "处处", " ]", "断然", "绝非",
             "总的来看", "岂但", "分期", "古来", "我们", "啪达", "顷刻之间", "每次", "别说", "传闻", "从优", "总的来说", "非徒", "常言说得好", "非得",
             "由于", "难说", "可是", "从今以后", "比如", "所", "继而", "不可抗拒", "才", "如", "精光", "凭借", "略加", "起", "平素", "绝对",
             "赶", "于是", "打", "一样", "长线", "每时每刻", "不择手段", "理该", "共", "拦腰", "喔唷", "其", "仍旧", "屡次", "以及", "当然",
             "到头来", "抑或", "宁愿", "一方面", "举凡", "只有", "八", "咱们", "六", "从新", "兮", "这样", "不得已", "管", "十分", "自个儿",
             "呼啦", "我", "必将", "串行", "而论", "或", "牢牢",
             "成心", "光", "哈哈", "与此同时", "其一", "于是乎", "此", "看样子", "换句话说", "全身心", "除非", "有人", "以至于", "按理", "也许",
             "打从", "照着", "况且", "独", "除却", "不了", "不得", "反手", "成年", "哎呀", "关于", "恰恰相反", "这儿", "累次", "其中", "动辄",
             "立刻", "倒是", "毫无例外", "从古至今", "可见", "诚然", "莫不", "怎么办", "亲自", "经常", "决不", "自各儿", "这么样", "不必", "不得了",
             "除去", "由此可见", "像", "有些", "挨个", "不仅", "进来", "大事", "全年", "绝顶", "社会主义", "总之", "当头", "若是", "竟", "不外乎",
             "要不然", "如此等等", "分期分批", "那么", "毋宁", "立", "其二", "不会", "..", "背地里", "据", "此间", "哪儿", "不怕", "不问", "每",
             "为什么", "没有", "公然", "那会儿", "迫于", "来不及", "不起", "千万千万", "可能", "正如", "比", "还有", "借", "倘", "究竟", "及其",
             "不限", "偏偏", "据称", "故此", "谁", "伙同", "敢于", "弹指之间", "那些", "窃", "朝着", "叮咚", "临到", "即将", "哎哟", "而已",
             "尽心竭力", "到头", "亲口", "已经", "不但", "出来", "随着", "不得不", "非常", "另一个", "非但", "如前所述", "殆", "--", "诸位",
             "那时", "即是说", "按", "谨", "何时", "此外", "然后", "勃然", "从来", "近几年来", "近来", "莫如", "奋勇", "比起", "仅仅", "故而",
             "穷年累月", "历", "乌乎", "怪不得", "去", "借以", "主要",
             "间或", "方能", "白白", "除", "反过来", "全都", "并没", "过", "除此之外", "马上", "迄", "恰恰", "传说", "还", "这", "连", "近",
             "从速", "上下", "哪样", "这边", "从未", "不能不", "从不", "及", "那个", "边", "又", "迟早", "不知不觉", "挨家挨户", "多多少少", "几番",
             "有关", "您", "连同", "较", "互相", "怎么", "但愿", "可", "你们", "凑巧", "连日", "叫", "路经", "阿", "起先", "另", "二话没说",
             "之一", "这时", "後", "转载", "例子", "社", "會", "好好",
             "即或", "连连", "其后", "各式", "当儿", "独自", "它", "宁", "哪天", "就是", "乘机", "常言说", "不下", "定", "照", "昂然",
             "毫无保留地", "趁便", "屡次三番", "甚至", "那末", "充其量", "该当", "另一方面", "既...又", "瑟瑟", "的话", "呜呼", "或者", "立时",
             "反过来说", "有的", "挨着", "再说", "够瞧的", "过于", "零", "就地", "然", "极其", "何乐而不为", "进去", "单", "随", "起头", "无论",
             "怎", "据说", "综上所述", "抽冷子", "才能", "怕", "千", "离", "梆", "极大", "恰逢", "半", "大举", "漫说", "接下来", "忽地", "而是",
             "即", "难得", "不但...而且", "格外", "怪", "倘使", "还是", "从而", "对", "本身", "乘隙", "既是", "理当", "反倒", "焉", "可好",
             "不满", "交口", "基本上", "认为", "这会儿", "充分", "并非", "不迭", "老是", "倍感", "鉴于", "要是", "反之", "哪怕", "除此而外", "虽",
             "一下", "自身", "任凭", "几乎", "顶多", "靠", "而又", "不时", "一个", "否则", "自家", "三天两头", "砰", "啊呀",
             "难怪", "所以", "发生", "哗啦", "多年来", "罢了", "大致", "从轻", "那边", "那么些", "不巧", "完全", "起初", "某个", "加之", "大不了",
             "归根到底", "偶尔", "应该", "二话不说", "日见", "不是", "大都", "愤然", "而后", "多年前", "例如", "蛮", "切", "一些", "多多",
             "日复一日", "较之", "即刻", "那样", "齐", "其它", "则", "不料", "刚", "初", "决非", "乘虚", "恰如", "能够", "从严", "故意", "别",
             "啊哟", "从中", "不已", "加上", "具体来说", "较为", "分头", "直到", "到", ">>", "隔日", "多亏", "假如", "甚么", "作为", "暗地里",
             "挨门逐户", "恰好", "其实", "何必", "万一", "不过", "某些", "啊哈", "基于", "不日", "尽早", "刚巧", "概", "一来", "同时", "三番五次",
             "为何", "更加", "绝不", "除此", "不常", "进而", "另行", "急匆匆", "通过", "话说", "若非", "极力", "存心", "a", "able",
             "about", "above", "according", "accordingly", "across", "actually", "after", "afterwards", "again",
             "against", "ain't", "all", "allow", "allows", "almost", "alone", "along", "already", "also",
             "although", "always", "am", "among", "amongst", "an", "and", "another", "any", "anybody", "anyhow",
             "anyone", "anything", "anyway", "anyways", "anywhere", "apart", "appear", "appreciate",
             "appropriate", "are", "aren't", "around", "as", "a's", "aside", "ask", "asking", "associated",
             "at", "available", "away", "awfully", "be", "became", "because", "become", "becomes", "becoming",
             "been", "before", "beforehand", "behind", "being", "believe", "below", "beside", "besides", "best",
             "better", "between", "beyond", "both", "brief", "but", "by", "came", "can", "cannot", "cant",
             "can't", "cause", "causes", "certain", "certainly", "changes", "clearly", "c'mon", "co", "com",
             "come", "comes", "concerning", "consequently", "consider", "considering", "contain", "containing",
             "contains", "corresponding", "could", "couldn't", "course", "c's", "currently", "definitely",
             "described", "despite", "did", "didn't", "different", "do", "does", "doesn't", "doing", "done",
             "don't", "down", "downwards", "during", "each", "edu", "eg", "eight", "either", "else",
             "elsewhere", "enough", "entirely", "especially", "et", "etc", "even", "ever", "every", "everybody",
             "everyone", "everything", "everywhere", "ex", "exactly", "example", "except", "far", "few",
             "fifth", "first", "five", "followed", "following", "follows", "for", "former", "formerly", "forth",
             "four", "from", "further", "furthermore", "get", "gets", "getting", "given", "gives", "go", "goes",
             "going", "gone", "got", "gotten", "greetings", "had", "hadn't", "happens", "hardly", "has",
             "hasn't", "have", "haven't", "having", "he", "hello", "help", "hence", "her", "here", "hereafter",
             "hereby", "herein", "here's", "hereupon", "hers", "herself", "he's", "hi", "him", "himself", "his",
             "hither", "hopefully", "how", "howbeit", "however", "i'd", "ie", "if", "ignored", "i'll", "i'm",
             "immediate", "in", "inasmuch", "inc", "indeed", "indicate", "indicated", "indicates", "inner",
             "insofar", "instead", "into", "inward", "is", "isn't", "it", "it'd", "it'll", "its", "it's",
             "itself", "i've", "just", "keep", "keeps", "kept", "know", "known", "knows", "last", "lately",
             "later", "latter", "latterly", "least", "less", "lest", "let", "let's", "like", "liked", "likely",
             "little", "look", "looking", "looks", "ltd", "mainly", "many", "may", "maybe", "me", "mean",
             "meanwhile", "merely", "might", "more", "moreover", "most", "mostly", "much", "must", "my",
             "myself", "name", "namely", "nd", "near", "nearly", "necessary", "need", "needs", "neither",
             "never", "nevertheless", "new", "next", "nine", "no", "nobody", "non", "none", "noone", "nor",
             "normally", "not", "nothing", "novel", "now", "nowhere", "obviously", "of", "off", "often", "oh",
             "ok", "okay", "old", "on", "once", "one",
             "ones", "only", "onto", "or", "other", "others", "otherwise", "ought", "our", "ours", "ourselves",
             "out", "outside", "over", "overall", "own", "particular", "particularly", "per", "perhaps",
             "placed", "please", "plus", "possible", "presumably", "probably", "provides", "que", "quite", "qv",
             "rather", "rd", "re", "really", "reasonably", "regarding", "regardless", "regards", "relatively",
             "respectively", "right", "said", "same", "saw", "say", "saying", "says", "second", "secondly",
             "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sensible",
             "sent", "serious", "seriously", "seven", "several", "shall", "she", "should", "shouldn't", "since",
             "six", "so", "some", "somebody", "somehow", "someone", "something", "sometime", "sometimes",
             "somewhat", "somewhere", "soon", "sorry", "specified", "specify", "specifying", "still", "sub",
             "such", "sup", "sure", "take", "taken", "tell", "tends", "th", "than", "thank", "thanks", "thanx",
             "that", "thats", "that's", "the", "their", "theirs", "them", "themselves", "then", "thence",
             "there", "thereafter", "thereby", "therefore", "therein", "theres", "there's", "thereupon",
             "these", "they", "they'd", "they'll", "they're", "they've", "think", "third", "this", "thorough",
             "thoroughly", "those", "though", "three", "through", "throughout", "thru", "thus", "to",
             "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "t's",
             "twice", "two", "un", "under", "unfortunately", "unless", "unlikely", "until", "unto", "up",
             "upon", "us", "use", "used", "useful", "uses", "using", "usually", "value", "various", "very",
             "via", "viz", "vs", "want", "wants", "was", "wasn't", "way", "we", "we'd", "welcome", "well",
             "we'll", "went", "were", "we're", "weren't", "we've", "what", "whatever", "what's", "when",
             "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "where's",
             "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom",
             "who's", "whose", "why", "will", "willing", "wish", "with", "within", "without", "wonder", "won't",
             "would", "wouldn't", "yes", "yet", "you", "you'd", "you'll", "your", "you're", "yours", "yourself",
             "yourselves", "you've", "zero", "zt", "ZT", "zz", "ZZ", "一", "一下", "一些", "一切", "一则", "一天", "一定",
             "一方面", "一旦", "一时", "一来", "一样", "一次", "一片", "一直", "一致", "一般", "一起", "一边", "一面", "万一", "上下", "上升",
             "上去", "上来", "上述", "上面", "下列", "下去", "下来", "下面", "不一", "不久", "不仅", "不会", "不但", "不光", "不单", "不变",
             "不只", "不可", "不同", "不够", "不如", "不得", "不怕", "不惟", "不成", "不拘", "不敢", "不断", "不是", "不比", "不然", "不特",
             "不独", "不管", "不能", "不要", "不论", "不足", "不过", "不问", "与", "与其", "与否", "与此同时", "专门", "且", "两者", "严格",
             "严重", "个", "个人", "个别", "中小", "中间", "丰富", "临", "为", "为主", "为了", "为什么", "为什麽", "为何", "为着", "主张",
             "主要", "举行", "乃", "乃至", "么", "之", "之一", "之前", "之后", "之後", "之所以", "之类", "乌乎", "乎", "乘", "也", "也好",
             "也是", "也罢", "了", "了解", "争取", "于", "于是", "于是乎", "云云", "互相", "产生", "人们", "人家", "什么", "什么样", "什麽",
             "今后", "今天", "今年", "今後", "仍然", "从", "从事", "从而", "他", "他人", "他们", "他的", "代替", "以", "以上", "以下", "以为",
             "以便", "以免", "以前", "以及", "以后", "以外", "以後", "以来", "以至", "以至于", "以致", "们", "任", "任何", "任凭", "任务",
             "企图", "伟大", "似乎", "似的", "但", "但是", "何", "何况", "何处", "何时", "作为", "你", "你们", "你的", "使得", "使用", "例如",
             "依", "依照", "依靠", "促进", "保持", "俺", "俺们", "倘", "倘使", "倘或", "倘然", "倘若", "假使", "假如", "假若", "做到", "像",
             "允许", "充分", "先后", "先後", "先生", "全部", "全面", "兮", "共同", "关于", "其", "其一", "其中", "其二", "其他", "其余", "其它",
             "其实", "其次", "具体", "具体地说", "具体说来", "具有", "再者", "再说", "冒", "冲", "决定", "况且", "准备", "几", "几乎", "几时",
             "凭", "凭借", "出去", "出来", "出现", "分别", "则", "别", "别的", "别说", "到", "前后", "前者", "前进", "前面", "加之", "加以",
             "加入", "加强", "十分", "即", "即令", "即使", "即便", "即或", "即若", "却不", "原来", "又", "及", "及其", "及时", "及至", "双方",
             "反之", "反应", "反映", "反过来", "反过来说", "取得", "受到", "变成", "另", "另一方面", "另外", "只是", "只有", "只要", "只限", "叫",
             "叫做", "召开", "叮咚", "可", "可以", "可是", "可能", "可见", "各", "各个", "各人",
             "各位", "各地", "各种", "各级", "各自", "合理", "同", "同一", "同时", "同样", "后来", "后面", "向", "向着", "吓", "吗", "否则",
             "吧", "吧哒", "吱", "呀", "呃", "呕", "呗", "呜", "呜呼", "呢", "周围", "呵", "呸", "呼哧", "咋", "和", "咚", "咦", "咱",
             "咱们", "咳", "哇", "哈", "哈哈", "哉", "哎", "哎呀", "哎哟", "哗", "哟", "哦", "哩", "哪", "哪个", "哪些", "哪儿", "哪天",
             "哪年", "哪怕", "哪样", "哪边", "哪里", "哼", "哼唷", "唉", "啊", "啐", "啥", "啦", "啪达", "喂", "喏", "喔唷", "嗡嗡", "嗬",
             "嗯", "嗳", "嘎", "嘎登", "嘘", "嘛", "嘻", "嘿", "因", "因为", "因此", "因而", "固然", "在", "在下", "地", "坚决", "坚持",
             "基本", "处理", "复杂", "多", "多少", "多数", "多次", "大力", "大多数", "大大", "大家", "大批", "大约", "大量", "失去", "她",
             "她们", "她的", "好的", "好象", "如", "如上所述", "如下", "如何", "如其", "如果", "如此", "如若", "存在", "宁", "宁可", "宁愿",
             "宁肯", "它", "它们", "它们的", "它的", "安全", "完全", "完成", "实现", "实际", "宣布", "容易", "密切", "对", "对于", "对应", "将",
             "少数", "尔后", "尚且", "尤其", "就", "就是", "就是说", "尽", "尽管", "属于", "岂但", "左右", "巨大", "巩固", "己", "已经", "帮助",
             "常常", "并", "并不", "并不是", "并且", "并没有", "广大", "广泛", "应当", "应用", "应该", "开外", "开始", "开展", "引起", "强烈",
             "强调", "归", "当", "当前", "当时", "当然", "当着", "形成", "彻底", "彼", "彼此", "往", "往往", "待", "後来", "後面", "得",
             "得出", "得到", "心里", "必然", "必要", "必须", "怎", "怎么", "怎么办", "怎么样", "怎样", "怎麽", "总之", "总是", "总的来看",
             "总的来说", "总的说来", "总结", "总而言之", "恰恰相反", "您", "意思", "愿意", "慢说", "成为", "我", "我们", "我的", "或", "或是",
             "或者", "战斗", "所", "所以", "所有", "所谓", "打", "扩大", "把", "抑或", "拿", "按", "按照", "换句话说", "换言之", "据", "掌握",
             "接着", "接著", "故", "故此", "整个", "方便", "方面", "旁人", "无宁", "无法", "无论", "既", "既是", "既然", "时候", "明显", "明确",
             "是", "是否", "是的", "显然", "显著", "普通", "普遍", "更加", "曾经", "替", "最后", "最大", "最好", "最後", "最近", "最高", "有",
             "有些", "有关", "有利", "有力", "有所", "有效", "有时", "有点", "有的", "有着", "有著", "望", "朝", "朝着", "本", "本着", "来",
             "来着", "极了", "构成", "果然", "果真", "某", "某个", "某些", "根据", "根本", "欢迎", "正在", "正如", "正常", "此", "此外", "此时",
             "此间", "毋宁", "每", "每个", "每天", "每年", "每当", "比", "比如", "比方", "比较", "毫不", "没有", "沿", "沿着", "注意", "深入",
             "清楚", "满足", "漫说", "焉", "然则", "然后", "然後", "然而", "照", "照着", "特别是", "特殊", "特点", "现代", "现在", "甚么",
             "甚而", "甚至", "用", "由", "由于", "由此可见", "的", "的话", "目前", "直到", "直接", "相似", "相信", "相反", "相同", "相对",
             "相对而言", "相应", "相当", "相等", "省得", "看出", "看到", "看来", "看看", "看见", "真是", "真正", "着", "着呢", "矣", "知道",
             "确定", "离", "积极", "移动", "突出", "突然", "立即", "第", "等", "等等", "管", "紧接着", "纵", "纵令", "纵使", "纵然", "练习",
             "组成", "经", "经常", "经过", "结合", "结果", "给", "绝对", "继续", "继而", "维持", "综上所述", "罢了", "考虑", "者", "而", "而且",
             "而况", "而外", "而已", "而是", "而言", "联系", "能", "能否", "能够", "腾", "自", "自个儿", "自从", "自各儿", "自家", "自己",
             "自身", "至", "至于", "良好", "若", "若是", "若非", "范围", "莫若", "获得", "虽", "虽则", "虽然", "虽说", "行为", "行动", "表明",
             "表示", "被", "要", "要不", "要不是", "要不然", "要么", "要是", "要求", "规定", "觉得", "认为", "认真", "认识", "让", "许多", "论",
             "设使", "设若", "该", "说明", "诸位", "谁", "谁知", "赶", "起", "起来", "起见", "趁", "趁着", "越是", "跟", "转动", "转变",
             "转贴", "较", "较之", "边", "达到", "迅速", "过", "过去", "过来", "运用", "还是", "还有", "这", "这个", "这么", "这么些", "这么样",
             "这么点儿", "这些", "这会儿", "这儿", "这就是说", "这时", "这样", "这点", "这种", "这边", "这里", "这麽", "进入", "进步", "进而",
             "进行", "连", "连同", "适应", "适当", "适用", "逐步", "逐渐", "通常", "通过", "造成", "遇到", "遭到", "避免", "那", "那个", "那么",
             "那么些", "那么样", "那些", "那会儿", "那儿", "那时", "那样", "那边", "那里", "那麽", "部分", "鄙人", "采取", "里面", "重大", "重新",
             "重要", "鉴于", "问题", "防止", "阿", "附近", "限制", "除", "除了", "除此之外", "除非", "随", "随着", "随著", "集中", "需要",
             "非但", "非常", "非徒", "靠", "顺", "顺着", "首先", "高兴", "是不是", "说说"]

now = 0

with open("../../dataWenchuan/word2015.dat", encoding='utf-8') as file:
    fout = open("../../dataWenchuan/set2015.dat", 'w', encoding='utf-8')
    all_ = file.readlines()
    lines = len(all_)
    for each in all_:
        words = jieba.cut(each)
        words_after = (n for n in words if not n.isspace())
        words_box = (n for n in words_after if n not in stopwords)
        mixture = "/".join(words_box)
        if not mixture.endswith("/"):
            mixture += "/"
        fout.write(mixture)
        now += 1
        print(now/lines)
        pass
    fout.close()
    pass
