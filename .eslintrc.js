module.exports = {
  root: true,
  env: {
      node: true
  },
  parser: 'vue-eslint-parser',
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-unused-vars": [1, { 
     // 允许声明未使用变量
     "vars": "local",
     // 参数不检查
     "args": "none"
    }], 
    'no-spaced-func': 2, //函数调用时 函数名与()之间不能有空格 - 开启
    // 关闭语句强制分号结尾
    "semi": [2],
    //key值前面是否要有空格
    "key-spacing": [0, {
      "singleLine": {
        "beforeColon": false,
        "afterColon": true
      },
      "multiLine": {
        "beforeColon": true,
        "afterColon": true,
        "align": "colon"
       }
    }],
    //空行最多不能超过150行
    "no-multiple-empty-lines": [0, {"max": 150}],
    //关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
    // 数组第一个指定是否启用这个规则，第二个指定几个空格
    "indent":[2, 2], 
    "eqeqeq": 2, // 必须使用全等 
    "no-alert": 1, // 禁止使用alert confirm prompt
    "no-console": 1, // 禁止使用console
    "no-debugger": 1,//禁止使用debugger
    "no-extra-parens": 2, //禁止非必要的括号
    "no-extra-semi": 2, //禁止多余的冒号
    "no-func-assign": 2,//禁止重复的函数声明
    "padded-blocks": 0,//块语句内行首行尾是否要空行
    "prefer-const": 0,//首选const
    "prefer-spread": 0,//首选展开运算
    "quotes": [1, "single"],//引号类型 `` "" ''
    "quote-props":[0, "always"],//对象字面量中的属性名是否强制双引号
    "radix": 2,//parseInt必须指定第二个参数
    "id-match": 0,//命名检测
    "require-yield": 0,//生成器函数必须有yield
    "semi": [0, "always"],//语句强制分号结尾
    "semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
    "sort-vars": 0,//变量声明时排序
    "space-after-keywords": [0, "always"],//关键字后面是否要空一格
    "space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
    "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
    "space-in-parens": [0, "never"],//小括号里面要不要有空格
    "space-infix-ops": 0,//中缀操作符周围要不要有空格
    "spaced-comment": 2,//注释风格要不要有空格什么的
  }
}
