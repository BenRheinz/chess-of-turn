var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvasStyle = window.getComputedStyle(canvas, null); //获取画布的CSS属性
var size = 4; //设置棋盘边长为4格
canvas.width = canvas.height = parseInt(canvasStyle["width"]); //画布的宽高一致，正方形
var blocksize = canvas.width / size; //根据格子的数量计算出单个格子的边长
var blocks = [];

function newgame() {
  //根据棋盘尺寸初始化
  blocks = [];
  for (var i = 0; i < size * size; i++) {
    //首先将全部格子都设为true
    blocks.push(true);
  }
  for (var i = 0; i < size + 1; i++) {
    //随机几个格子设为false
    blocks[parseInt(Math.random() * blocks.length)] = false;
  }
  draw();
}

function draw() {
  //绘制棋盘
  var count = 0; //用于计算胜利条件的计数器
  for (var i = 0; i < blocks.length; i++) {
    //遍历所有的格子
    block = blocks[i];
    if (block) {
      //根据格子状态设置填充颜色
      ctx.fillStyle = "white";
      count++;
    } else {
      ctx.fillStyle = "black";
    }
    ctx.beginPath(); //绘制圆形的棋子
    ctx.arc(
      (i % size) * blocksize + blocksize / 2,
      parseInt(i / size) * blocksize + blocksize / 2,
      blocksize / 2,
      0,
      Math.PI * 2,
      false
    );
    ctx.stroke();
    ctx.fill();
  }

  if (count <= 2) {
    //胜利条件为棋盘上的白色棋子小于等于2个的时候获胜
    setTimeout(function () {
      //延迟1秒等待棋盘绘制完成
      tellTime();
      window.location.replace("else/1.html");
    }, 1000);
  }
  if (count >= 15) {
    //胜利条件为棋盘上的白色棋子大于等于15个的时候取得特殊结局
    setTimeout(function () {
      //延迟1秒等待棋盘绘制完成
      tellTime();
      window.location.replace("else/2.html");
    }, 1000);
  }
}

newgame();
canvas.addEventListener("click", function (evt) {
  //用于计算翻转的棋子
  start();
  var cRect = canvas.getBoundingClientRect(); //获取画布的尺寸位置属性
  var canvasX = Math.round(evt.clientX - cRect.left); //根据画布的页边距计算鼠标在画布内的坐标位置
  var canvasY = Math.round(evt.clientY - cRect.top);
  var x = parseInt(canvasX / blocksize); //结合格子的尺寸计算当前点击的格子行列坐标
  var y = parseInt(canvasY / blocksize);
  var origin = y * size + x; // 根据行列坐标计算当前棋子在数组中的索引
  blocks[origin] = !blocks[origin]; //翻转当前棋子
  blocks[origin - size] = !blocks[origin - size]; //翻转上下的棋子
  blocks[origin + size] = !blocks[origin + size];
  if (origin % size == size - 1) {
    //判断棋子是否在棋盘左右的边缘，并进行翻转限制
    blocks[origin - 1] = !blocks[origin - 1];
  } else if (origin % size == 0) {
    blocks[origin + 1] = !blocks[origin + 1];
  } else {
    blocks[origin - 1] = !blocks[origin - 1];
    blocks[origin + 1] = !blocks[origin + 1];
  }
  blocks = blocks.slice(0, size * size); //清理多余的数组内容
  draw();
});

//初始化变量
let hour, minute, second; //时 分 秒
hour = minute = second = 0; //初始化
let millisecond = 0; //毫秒
let int;
//开始函数
function start() {
  int = setInterval(timer, 50); //每隔50毫秒执行一次timer函数
}
//计时函数
function timer() {
  millisecond = millisecond + 50;
  if (millisecond >= 1000) {
    millisecond = 0;
    second = second + 1;
  }
  if (second >= 60) {
    second = 0;
    minute = minute + 1;
  }

  if (minute >= 60) {
    minute = 0;
    hour = hour + 1;
  }
  document.getElementById("timetext").value =
    hour + "时" + minute + "分" + second + "秒" + millisecond + "毫秒";
}
//暂停函数
function stop() {
  window.clearInterval(int);
}
//重置函数
function Reset() {
  window.clearInterval(int);
  millisecond = hour = minute = second = 0;
  document.getElementById("timetext").value = "00时00分00秒000毫秒";
}
//报告计时结果函数
function tellTime() {
  stop();
  let end =
    "用时：" + document.getElementById("timetext").value + "。点击确定继续";
  alert(end);
  Reset();
}
