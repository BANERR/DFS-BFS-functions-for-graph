export const drawArrow = (ctx, fromX, fromY, toX, toY, arrow, color) => {
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    if(arrow){
        ctx.save();
        ctx.translate(toX, toY);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.moveTo(-25, -3);
        ctx.lineTo(-15, 0);
        ctx.lineTo(-25, 3);
        ctx.fillStyle = color;
        ctx.fill();
    }

    ctx.restore();
}

export const drawAllArrow = (lines, vertices, arrow, rebraCount, ctx, color) => {
    if(color === "green") {
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'green';
        ctx.fillStyle = 'green';
    }

    lines.forEach((line, index) => {
        let flag = false;
        const start = vertices[line[0]];
        const end = vertices[line[1]];
        const oneRebro = rebraCount[0];
        const twoRebro = rebraCount[0] + rebraCount[1];
        const threeRebro = rebraCount[0]*2 + rebraCount[1];

        if(arrow){
            for(let i = index; i < lines.length; i++){
                
                if(line[0] === lines[i][1] && line[1] === lines[i][0]){
                    flag = true;
                }

            }
        }


        if (line[0] === line[1]){
            if(line[0] <= oneRebro){
                drawArrow(ctx, start.x, start.y, end.x-30, end.y-30, false, color);
                drawArrow(ctx, start.x-30, start.y-30, end.x-30, end.y+30, false, color);
                drawArrow(ctx, start.x-30, start.y+30, end.x, end.y, arrow, color);
            }
            if(line[0] > oneRebro && line[0] <= twoRebro){
                drawArrow(ctx, start.x, start.y, end.x-30, end.y-30, false, color);
                drawArrow(ctx, start.x-30, start.y-30, end.x+30, end.y-30, false, color);
                drawArrow(ctx, start.x+30, start.y-30, end.x, end.y, arrow, color);
            }
            if(line[0] > twoRebro && line[0] <= threeRebro){
                drawArrow(ctx, start.x, start.y, end.x+30, end.y-30, false, color);
                drawArrow(ctx, start.x+30, start.y-30, end.x+30, end.y+30, false, color);
                drawArrow(ctx, start.x+30, start.y+30, end.x, end.y, arrow, color);
            }
            if(line[0] > threeRebro){
                drawArrow(ctx, start.x, start.y, end.x-30, end.y+30, false, color);
                drawArrow(ctx, start.x-30, start.y+30, end.x+30, end.y+30, false, color);
                drawArrow(ctx, start.x+30, start.y+30, end.x, end.y, arrow, color);
            }
        }
        else{
            if(flag){
                if(line[0] <= oneRebro && line[1] <= oneRebro){
                    drawArrow(ctx, start.x, start.y, start.x-20, (start.y + end.y) / 2, false, color);
                    drawArrow(ctx, start.x-20, (start.y + end.y) / 2, end.x, end.y, arrow, color);
                }
                else if((line[0] >= oneRebro && line[0] <= twoRebro) && (line[1] >= oneRebro && line[1] <= twoRebro)){
                    drawArrow(ctx, start.x, start.y, (start.x + end.x) / 2, end.y-20, false, color);
                    drawArrow(ctx, (start.x + end.x) / 2, start.y-20, end.x, end.y, arrow, color);
                }
                else if((line[0] >= twoRebro && line[0] <= threeRebro) && (line[1] >= twoRebro && line[1] <= threeRebro)){
                    drawArrow(ctx, start.x, start.y, start.x+20, (start.y + end.y) / 2, false, color);
                    drawArrow(ctx, start.x+20, (start.y + end.y) / 2, end.x, end.y, arrow, color);
                }
                else if((line[0] >= threeRebro || line[0] === 0) && (line[1] >= threeRebro || line[1] === 0)){
                    drawArrow(ctx, start.x, start.y, (start.x + end.x) / 2, end.y+20, false, color);
                    drawArrow(ctx, (start.x + end.x) / 2, start.y+20, end.x, end.y, arrow, color);
                }
                else{
                    drawArrow(ctx, start.x, start.y, (start.x + end.x) / 2, end.y+30, false, color);
                    drawArrow(ctx, (start.x + end.x) / 2, end.y+30, end.x, end.y, arrow, color);
                }
            }else{
                if(line[0] === line[1]-1 || line[0]-1 === line[1]){
                    drawArrow(ctx, start.x, start.y, end.x, end.y, arrow, color);
                }
                else{
                    if(line[0] <= oneRebro && line[1] <= oneRebro){
                        drawArrow(ctx, start.x, start.y, start.x-30, (start.y + end.y) / 2, false, color);
                        drawArrow(ctx, start.x-30, (start.y + end.y) / 2, end.x, end.y, arrow, color);
                    }
                    else if((line[0] >= oneRebro && line[0] <= twoRebro) && (line[1] >= oneRebro && line[1] <= twoRebro)){
                        drawArrow(ctx, start.x, start.y, (start.x + end.x) / 2, end.y-30, false, color);
                        drawArrow(ctx, (start.x + end.x) / 2, start.y-30, end.x, end.y, arrow, color);
                    }
                    else if((line[0] >= twoRebro && line[0] <= threeRebro) && (line[1] >= twoRebro && line[1] <= threeRebro)){
                        drawArrow(ctx, start.x, start.y, start.x+30, (start.y + end.y) / 2, false, color);
                        drawArrow(ctx, start.x+30, (start.y + end.y) / 2, end.x, end.y, arrow, color);
                    }
                    else if((line[0] >= threeRebro || line[0] === 0) && (line[1] >= threeRebro || line[1] === 0)){
                        drawArrow(ctx, start.x, start.y, (start.x + end.x) / 2, end.y+30, false, color);
                        drawArrow(ctx, (start.x + end.x) / 2, start.y+30, end.x, end.y, arrow, color);
                    }
                    else{
                        drawArrow(ctx, start.x, start.y, end.x, end.y, arrow, color);
                    }
                }
            }
        }            
    });
}

export const generateVertices = (count) => {
    const vertices = [];

    const leftAndRightRebroCount = Math.round(count / 4);
    const topRebroCount = Math.round((count - 2*leftAndRightRebroCount) / 2);
    const bottomRebroCount = count - 2*leftAndRightRebroCount - topRebroCount;

    const startCoordinat = {x: 50, y: leftAndRightRebroCount*200};


    //left rebro
    for (let i = 0; i < leftAndRightRebroCount; i++) {
        vertices.push({ x: startCoordinat.x, y: startCoordinat.y - 150*i});
    }

    startCoordinat.y -= leftAndRightRebroCount*150;

    //top rebro
    for (let i = 0; i < topRebroCount; i++) {
        vertices.push({ x: startCoordinat.x + i*150, y: startCoordinat.y});
    }

    startCoordinat.x += topRebroCount*150;

    //right rebro
    for (let i = 0; i < leftAndRightRebroCount; i++) {
        vertices.push({ x: startCoordinat.x, y: startCoordinat.y + 150*i});
    }

    startCoordinat.y += leftAndRightRebroCount*150;

    //bottom rebro
    for (let i = 0; i < bottomRebroCount; i++) {
        vertices.push({ x: startCoordinat.x - 150*i, y: startCoordinat.y});
    }
    return [vertices, [leftAndRightRebroCount, topRebroCount]];
}


export const generateLines = (matrix, vertexCount) => {
    const lines = [];

    for (let i = 0; i < vertexCount; i++) {
        for (let j = 0; j < vertexCount; j++) {
            if(matrix[i][j] == 1){
                lines.push([i, j])
            }
        }
    }

    return lines;
}

export const drawGraph = (canvas, vertices, lines, rebraCount, arrow) => {  
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'blue';
    ctx.lineWidth = 2;

    drawAllArrow(lines, vertices, arrow, rebraCount, ctx, "black")


    vertices.forEach((vertex, index) => {

        ctx.beginPath();
        ctx.arc(vertex.x, vertex.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        ctx.fillText(index + 1, vertex.x - 4, vertex.y + 4);
        ctx.fillStyle = 'blue';

    });
}
