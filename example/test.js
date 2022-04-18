// js创建快排函数
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}

// svg实现边框样式
// Language: javascript
// Path: example\test.js
// svg实现边框样式
function drawBorder(svg, width, height, color) {
    var border = svg.rect(0, 0, width, height);
    border.attr({
        fill: 'none',
        stroke: color,
        'stroke-width': 1
    });
}


// canvas实现边框样式
function drawBorder(canvas, width, height, color) {
    canvas.beginPath();
    canvas.rect(0, 0, width, height);
    canvas.strokeStyle = color;
    canvas.stroke();
}

// canvas 动画
// Language: javascript
// Path: example\test.js
// canvas 动画
function draw(canvas, width, height) {
    var context = canvas.getContext('2d');
    var x = 0;
    var y = 0;
    var radius = 10;
    var color = '#000';
    var interval = setInterval(function () {
        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = color;
        context.fill();
        x += 1;
        y += 1;
        radius += 1;
        if (x > width || y > height) {
            clearInterval(interval);
        }
    }, 10);
}





















