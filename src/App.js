import './App.css';
import { useEffect, useState } from 'react';

const App = () => {

    const [dataLinesRow, setLinesRow] = useState([])
    const [dataMatrix, setMetrix] = useState(null)
    const [dataVertices, setVertices] = useState(null)
    const [dataLines, setLines] = useState(null)
    const [dataStartVertices, setStartVertices] = useState([])
    const [dataVisitedVertices, setVisitedVertices] = useState([])
    const [dataVerticesRow, setVerticesRow] = useState([])
    const [dataRebraCount, setRebraCount] = useState(null)
    const [retreat, setRetreat] = useState(1)
    const [dataPrevVertice, setPrevVertice] = useState()
    
    const drawArrow = (ctx, fromX, fromY, toX, toY, arrow, color) => {
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

    const drawAllArrow = (lines, vertices, arrow, rebraCount, ctx, color) => {
        if(color == "green") {
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
                    
                    if(line[0] == lines[i][1] && line[1] == lines[i][0]){
                        flag = true;
                    }

                }
            }


            if (line[0] == line[1]){
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
                    else if((line[0] >= threeRebro || line[0] == 0) && (line[1] >= threeRebro || line[1] == 0)){
                        drawArrow(ctx, start.x, start.y, (start.x + end.x) / 2, end.y+20, false, color);
                        drawArrow(ctx, (start.x + end.x) / 2, start.y+20, end.x, end.y, arrow, color);
                    }
                    else{
                        drawArrow(ctx, start.x, start.y, (start.x + end.x) / 2, end.y+30, false, color);
                        drawArrow(ctx, (start.x + end.x) / 2, end.y+30, end.x, end.y, arrow, color);
                    }
                }else{
                    if(line[0] == line[1]-1 || line[0]-1 == line[1]){
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
                        else if((line[0] >= threeRebro || line[0] == 0) && (line[1] >= threeRebro || line[1] == 0)){
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



    useEffect(()=>{

        const generateVertices = (count) => {
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


        const generateLines = (matrix, vertexCount) => {
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

        const generateMatrixNapriamlena = (vertexCount) => {
            let matrix = [
                [1,1,0,1,1,0,0,0,1,1,1],
                [0,0,0,0,0,0,0,0,0,0,1,],
                [1,1,0,0,1,1,0,0,0,1,0],
                [1,0,0,1,1,0,0,0,0,1,0],
                [1,0,0,1,0,1,1,0,0,0,1],
                [1,0,0,0,0,1,1,0,0,0,0],
                [1,0,0,0,1,1,0,0,0,0,1],
                [0,1,0,0,1,0,0,0,1,0,0],
                [0,1,0,0,1,0,1,0,1,1,1],
                [0,0,0,0,0,1,0,1,1,0,0],
                [0,1,0,0,0,0,0,0,0,0,1],
            ]

            

            // for(let i = 0; i < matrix.length; i++){
            //     console.log(matrix[i].join(" "));
            // }

            return matrix
        }

        const generateMatrixNeNapriamlena = (matrixNapriamlena, vertexCount) => {
            // console.log("_____________________________________");

            let matrix = [];
            for(let i = 0; i < vertexCount; i++){
                matrix[i] = [];
                for(let j = 0; j < vertexCount; j++){
                    matrix[i][j] = matrixNapriamlena[i][j];
                }
            }

            for(let i = 0; i < vertexCount; i++){
                for(let j = 0; j < vertexCount; j++){
                    if(matrix[i][j] == 1){
                        matrix[j][i] = matrix[i][j];
                    }
                }
            }

            // for(let i = 0; i < matrix.length; i++){
            //     console.log(matrix[i].join(" "));
            // }

            return matrix
        }


        const drawGraph = (canvas, vertices, lines, rebraCount, arrow) => {  
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

        const main = () => {
            const vertexCount = 11;

            const matrixNapriamlena = generateMatrixNapriamlena(vertexCount)
            const matrixNeNapriamlena = generateMatrixNeNapriamlena(matrixNapriamlena, vertexCount)
            const [vertices, rebraCount] = generateVertices(vertexCount);

            const lines1 = generateLines(matrixNapriamlena, vertexCount);
            // const lines2 = generateLines(matrixNeNapriamlena, vertexCount);


            drawGraph(document.getElementById('graphCanvas1'), vertices, lines1, rebraCount, true)
            // drawGraph(document.getElementById('graphCanvas2'), vertices, lines2, rebraCount, false)

            // let visitedVertices = [{cordinates: vertices[0], index: 0}]
            // setData({matrixNapriamlena: matrixNapriamlena, vertices: vertices, lines: lines1, visitedVertices: visitedVertices})

            setMetrix(matrixNapriamlena);
            setVertices(vertices);
            setLines(lines1);
            setStartVertices([{cordinates: vertices[0], index: 0}])
            setRebraCount(rebraCount)
        }

        main()
    },[])

    const BFSFunction = () => {

        let verticesCount = dataVertices.length
        const ctx = document.getElementById('graphCanvas1').getContext('2d');
        document.getElementById('bfsButton').textContent = "Next"

        if(dataVerticesRow.length > 0){

            let vertex = dataVerticesRow[0]

            dataVerticesRow.shift()

            dataLinesRow.forEach((line) =>{
                if(line[1] == vertex.index){
                    drawAllArrow([line], dataVertices, true, dataRebraCount, ctx, "green")
                }
            })

            ctx.beginPath();
            ctx.arc(vertex.cordinates.x, vertex.cordinates.y, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = '10px Arial';
            ctx.fillText(vertex.index + 1, vertex.cordinates.x - 4, vertex.cordinates.y + 4);
            ctx.fillStyle = 'green';

            ctx.beginPath();
            ctx.arc(vertex.cordinates.x, vertex.cordinates.y, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = '10px Arial';
            ctx.fillText(vertex.index + 1, vertex.cordinates.x - 4, vertex.cordinates.y + 4);
            ctx.fillStyle = 'green';

        }else{

            let newVisitedVertices = []
            let newVisitedLines = []

            dataLines.forEach((line) => {
                for(let i = 0; i < dataStartVertices.length; i++){
                    if(line[0] == dataStartVertices[i].index && line[1] !== dataStartVertices[i].index){
                        newVisitedLines.push(line)
                        newVisitedVertices.push({cordinates: dataVertices[line[1]], index: line[1]})
                    }
                }
            })

            for(let i = 0; i < dataVisitedVertices.length; i++){
                for(let j = 0; j < newVisitedVertices.length; j++){
                    if(dataVisitedVertices[i].index == newVisitedVertices[j].index){
                        newVisitedVertices.splice(j, 1)
                    }
                }
            }

            dataStartVertices.forEach((vertex) => {

                ctx.beginPath();
                ctx.arc(vertex.cordinates.x, vertex.cordinates.y, 15, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = 'white';
                ctx.font = '10px Arial';
                ctx.fillText(vertex.index + 1, vertex.cordinates.x - 4, vertex.cordinates.y + 4);
                ctx.fillStyle = 'green';

                ctx.beginPath();
                ctx.arc(vertex.cordinates.x, vertex.cordinates.y, 15, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = 'white';
                ctx.font = '10px Arial';
                ctx.fillText(vertex.index + 1, vertex.cordinates.x - 4, vertex.cordinates.y + 4);
                ctx.fillStyle = 'green';
            });

            if(newVisitedVertices.length == 0){

                let indexArrey = []

                for(let i = 0; i < dataVertices.length; i++) indexArrey.push(i)
                
                dataVisitedVertices.forEach((item)=>{
                    for(let i = 0; i < indexArrey.length; i++){
                        if(item.index == indexArrey[i]){
                            indexArrey.splice(i, 1)
                        }
                    }
                })

                for(let i = 0; i < indexArrey.length; i++){
                    newVisitedVertices.push({cordinates: dataVertices[indexArrey[i]], index: indexArrey[i]})
                }

            }

            newVisitedVertices = Array.from(new Set(newVisitedVertices.map(obj => JSON.stringify(obj)))).map(str => JSON.parse(str));

            setStartVertices([...newVisitedVertices])
            setVerticesRow(newVisitedVertices)
            setLinesRow(newVisitedLines)
            setVisitedVertices([{cordinates: dataVertices[0], index: 0}, ...dataVisitedVertices, ...newVisitedVertices])
        }
    }

    const DFSFunction = () =>{
        const ctx = document.getElementById('graphCanvas1').getContext('2d');
        document.getElementById('dfsButton').textContent = "Next"

        let startVertice = dataStartVertices[0]
        let newVisitedVertices = []
        let newVisitedLines = []

        let addVertice = true

        if(dataVisitedVertices.length > 0){
            for(let i = 0; i < dataVisitedVertices.length; i++){
                if(dataVisitedVertices[i].index == startVertice.index){
                    addVertice = false
                }
            }
        }
        
        if(addVertice){
            dataVisitedVertices.push(startVertice)
        }
        

        dataLines.forEach((line) => {
            if(line[0] == startVertice.index && line[1] !== startVertice.index){
                newVisitedLines.push(line)
                newVisitedVertices.push({cordinates: dataVertices[line[1]], index: line[1]})
            }
        })

        dataVisitedVertices.forEach((item)=>{
            for(let i = 0; i < newVisitedVertices.length; i++){
                if(item.index == newVisitedVertices[i].index){
                    newVisitedVertices.splice(i, 1)
                }
            }
        })
        console.log("startV-",startVertice)
        console.log("NewV-",newVisitedVertices[0])
        console.log("VisitedV-",dataVisitedVertices)

        dataLines.forEach((line) =>{
            if(dataVisitedVertices.length > 1){
                if(line[1] == startVertice.index && dataPrevVertice.index == line[0] && retreat == 1){
                    drawAllArrow([line], dataVertices, true, dataRebraCount, ctx, "green")
                }
            }
        })

        ctx.beginPath();
        ctx.arc(startVertice.cordinates.x, startVertice.cordinates.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        ctx.fillText(startVertice.index + 1, startVertice.cordinates.x - 4, startVertice.cordinates.y + 4);
        ctx.fillStyle = 'green';

        ctx.beginPath();
        ctx.arc(startVertice.cordinates.x, startVertice.cordinates.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        ctx.fillText(startVertice.index + 1, startVertice.cordinates.x - 4, startVertice.cordinates.y + 4);
        ctx.fillStyle = 'green';

        if(newVisitedVertices.length != 0){
            setRetreat(1)
            setStartVertices([newVisitedVertices[0]])
            setPrevVertice(startVertice)
        }else{
            setRetreat(retreat+1)

            if(dataVisitedVertices.length - retreat == -1){
                let indexArrey = []

                for(let i = 0; i < dataVertices.length; i++) indexArrey.push(i)
                
                dataVisitedVertices.forEach((item)=>{
                    for(let i = 0; i < indexArrey.length; i++){
                        if(item.index == indexArrey[i]){
                            indexArrey.splice(i, 1)
                        }
                    }
                })

                for(let i = 0; i < indexArrey.length; i++){
                    newVisitedVertices.push({cordinates: dataVertices[indexArrey[i]], index: indexArrey[i]})
                }

                setStartVertices([newVisitedVertices[0]])
                setPrevVertice(startVertice)
            }else{
                setStartVertices([dataVisitedVertices[dataVisitedVertices.length-retreat]])
                setPrevVertice(startVertice)
            }
        }

    }



    return (
    <div className="container" style={{display: 'flex', alignItems: 'center'}}>
        <div className="graphContainer" style={{display: 'flex', alignItems: 'left', flexDirection: 'column'}}>
            <h1>Направлений граф</h1>
            <canvas id="graphCanvas1" width="900" height="900"></canvas>
        </div>
        <div className='infoContainer' style={{display: 'flex', flexDirection: 'column', gap: '3vw'}}>
            <button id="bfsButton" style={{height: 50, width: 200}} onClick={()=>{BFSFunction()}}>BFS start</button>
            <button id="dfsButton" style={{height: 50, width: 200}} onClick={()=>{DFSFunction()}}>DFS start</button>
            <div className='input' id="input"></div>
        </div>

        {/* <div class="graphContainer" style="display: flex; flex-direction: column; align-items: left;">
            <h1>Ненаправлений граф</h1>
            <canvas id="graphCanvas2" width="900" height="900"></canvas>
        </div> */}
    </div>
    );
}

export default App;
