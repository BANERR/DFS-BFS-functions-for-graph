import './App.css';
import { useEffect, useState } from 'react';
import { drawAllArrow, generateVertices, generateLines, drawGraph } from './functions'

const App = () => {

    const [dataLinesRow, setLinesRow] = useState([])
    const [dataMatrixW, setMetrixW] = useState(null)
    const [dataVertices, setVertices] = useState(null)
    const [dataLines, setLines] = useState(null)
    const [dataStartVertices, setStartVertices] = useState([])
    const [dataVisitedVertices, setVisitedVertices] = useState([])
    const [dataVerticesRow, setVerticesRow] = useState([])
    const [dataRebraCount, setRebraCount] = useState(null)
    const [retreat, setRetreat] = useState(1)
    const [dataPrevVertice, setPrevVertice] = useState()
    const [dataStartLine, setStartLine] = useState()

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

            console.log(dataVisitedVertices)
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
        // console.log("startV-",startVertice)
        // console.log("NewV-",newVisitedVertices[0])
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


    useEffect(()=>{

        const generateMatrixNapriamlena = (vertexCount) => {
            // let matrix = [
            //     [1,1,0,1,1,0,0,0,1,1,1],
            //     [0,0,0,0,0,0,0,0,0,0,1],
            //     [1,1,0,0,1,1,0,0,0,1,0],
            //     [1,0,0,1,1,0,0,0,0,1,0],
            //     [1,0,0,1,0,1,1,0,0,0,1],
            //     [1,0,0,0,0,1,1,0,0,0,0],
            //     [1,0,0,0,1,1,0,0,0,0,1],
            //     [0,1,0,0,1,0,0,0,1,0,0],
            //     [0,1,0,0,1,0,1,0,1,1,1],
            //     [0,0,0,0,0,1,0,1,1,0,0],
            //     [0,1,0,0,0,0,0,0,0,0,1],
            // ]

            const matrix = [
                [1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0],
                [1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
                [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
                [0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1],
                [1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
                [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1]
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
                    if(matrix[i][j] === 1){
                        matrix[j][i] = matrix[i][j];
                    }
                }
            }

            // for(let i = 0; i < matrix.length; i++){
            //     console.log(matrix[i].join(" "));
            // }

            return matrix
        }

        const generateMatrixW = (matrixB, matrixNeNapriamlena, vertexCount) => {
            console.log("_________________MatrixC____________________");

            let matrixC = [];
            for(let i = 0; i < vertexCount; i++){
                matrixC[i] = [];
                for(let j = 0; j < vertexCount; j++){
                    matrixC[i][j] = Math.round(matrixB[i][j] * 100 * matrixNeNapriamlena[i][j])
                }
            }

            for(let i = 0; i < matrixC.length; i++){
                console.log(matrixC[i].join(" "));
            }
            console.log("_______________MatrixD______________________");

            let matrixD = [];
            for(let i = 0; i < vertexCount; i++){
                matrixD[i] = [];
                for(let j = 0; j < vertexCount; j++){
                    if(matrixC[i][j] > 0){
                        matrixD[i][j] = 1
                    }else{
                        matrixD[i][j] = 0
                    }
                }
            }

            for(let i = 0; i < matrixD.length; i++){
                console.log(matrixD[i].join(" "));
            }
            console.log("_______________MatrixH______________________");

            let matrixH = [];
            for(let i = 0; i < vertexCount; i++){
                matrixH[i] = [];
                for(let j = 0; j < vertexCount; j++){
                    if(matrixD[i][j] != matrixD[j][i]){
                        matrixH[i][j] = 1
                    }else{
                        matrixH[i][j] = 0
                    }
                }
            }

            for(let i = 0; i < matrixH.length; i++){
                console.log(matrixH[i].join(" "));
            }
            console.log("_______________MatrixW______________________");

            let matrixW = [];
            for(let i = 0; i < vertexCount; i++){
                matrixW[i] = [];
                for(let j = 0; j < vertexCount; j++){
                    matrixW[i][j] = matrixD[i][j] * matrixC[i][j]
                }
            }

            for(let i = 0; i < matrixW.length; i++){
                console.log(matrixW[i].join(" "));
            }


            return matrixW
        }

        const main = () => {
            const vertexCount = 11;

            const matrixNapriamlena = generateMatrixNapriamlena(vertexCount)
            const matrixNeNapriamlena = generateMatrixNeNapriamlena(matrixNapriamlena, vertexCount)
            const [vertices, rebraCount] = generateVertices(vertexCount);


            const matrixB = [
                [1.8527028484224253, 1.4360173228187758, 0.9079409002916531, 1.8368730090116783, 1.3218157327559272, 0.5832236483417328, 1.1012804170033825, 0.36003519232122777, 1.742595584316041, 1.3934496566124945, 1.782340239758202],
                [0.3972761297376107, 0.04221385666051392, 0.8115908785362701, 0.547099064965544, 0.4138570473690734, 0.36916944867528, 0.5348522895191916, 0.21198596892711002, 0.2614892068394775, 0.5971211301563043, 1.418726318382745],
                [1.8475274075432766, 1.6558375156955307, 0.3084156740929591, 0.21771070454517444, 1.4641186359047094, 1.297385688888564, 0.9277504518416543, 0.9182615790286576, 0.4471196551562304, 1.4181175010148899, 1.0819218390036693],
                [1.4819825218349647, 1.0131503062938072, 0.8285156410174205, 1.7786907965039553, 1.3334701912530247, 0.5746431087445986, 0.8263342586130469, 0.05863773887004475, 0.9098637985336823, 1.5269023391462082, 0.2716754500780927],
                [1.6228253903844472, 0.7529092527855364, 0.6014508842635945, 1.709451623198399, 0.34101020094526535, 1.3598656853932636, 1.1624312680402191, 0.6290586191752954, 0.41023746994371013, 0.5657934518380497, 1.6092487455824465],
                [1.1714495934739746, 0.45854966182896556, 0.6049098783881048, 0.7697743013930697, 0.37052276776381426, 1.2149708347861967, 1.4064658428990222, 0.22255597669149735, 0.34008038862986234, 0.7988724400509728, 0.6700296977285831],
                [1.7513090994124496, 0.5071172663951571, 0.4057310578145285, 0.621666074068072, 1.1554662417190689, 1.144780515757639, 0.5626792516359681, 0.6539097861520611, 0.04029404553094787, 0.6576213794168939, 1.3547909913237404],
                [0.5536927450204291, 1.2799847870483534, 0.3326387529201919, 0.14242940857295852, 1.3864094997114629, 0.21601063453724204, 0.9801594848750825, 0.9482714611672597, 1.4149213262791938, 0.13829535147172253, 0.04761844271510318],
                [0.11358558729953827, 1.5531187475796002, 0.9163110608703113, 0.26163093270389404, 1.5983841011328916, 0.19455151962077677, 1.8198307025941278, 0.6208286233139179, 1.2862924740600192, 1.3236551452002527, 1.3148658436607747],
                [1.0723697420846239, 1.0502081264712742, 0.7646448072514344, 0.7239597739827123, 0.7037320676510971, 1.5925824285713188, 1.0447392995436129, 1.3228592881027499, 1.3838879886502569, 0.43860074593551296, 0.4741842722693173],
                [0.8510948621484452, 1.402335341871512, 0.5098379533818592, 1.1193804886957104, 0.8071370692340133, 0.4936019675054846, 0.8891654321569975, 0.5347504272556765, 0.6059469393117198, 0.4591805306037645, 1.8197735948820124]
            ]

            const matrixW = generateMatrixW(matrixB, matrixNeNapriamlena, vertexCount)
            
            const lines1 = generateLines(matrixNapriamlena, vertexCount);
            const lines2 = generateLines(matrixNeNapriamlena, vertexCount);


            drawGraph(document.getElementById('graphCanvas1'), vertices, lines1, rebraCount, true)
            drawGraph(document.getElementById('graphCanvas2'), vertices, lines2, rebraCount, false)

            
            setMetrixW(matrixW);
            setVertices(vertices);
            setLines(lines1);
            setStartVertices([{cordinates: vertices[0], index: 0}])
            setRebraCount(rebraCount)
        }

        main()
    },[])

    const findMinimumSpanningTree = () =>{
        const ctx = document.getElementById('graphCanvas2').getContext('2d');
        if(dataLinesRow.length == 0){
            const vertexCount = 11
            const setOfVertices = []
            let minimumSpanningTreeWeight = 0

            const lines = [];

            for (let i = 0; i < vertexCount; i++) {
                setOfVertices.push(i)
                for (let j = 0; j < vertexCount; j++) {
                    if(dataMatrixW[i][j] > 0){
                        lines.push([i, j, dataMatrixW[i][j]])
                    }
                }
            }

            lines.sort((a, b) => { 
                let thirdElementA = a[2];
                let thirdElementB = b[2];

                if (thirdElementA < thirdElementB) {
                    return -1;
                } else if (thirdElementA > thirdElementB) {
                    return 1;
                } else {
                    return 0;
                }
            })

            const kruskal = (edges, vertices) => {
                let mnogunaVershin = {};
                let rank = {};
            
                const findMnogunaVershin = (vertex) => {
                    if(mnogunaVershin[vertex] !== vertex){
                        mnogunaVershin[vertex] = findMnogunaVershin(mnogunaVershin[vertex]);
                    }
                    return mnogunaVershin[vertex];
                }
            
                const mergeTwoMnogunuVershin = (vertex1, vertex2) => {
                    let mnogunaVershin1 = findMnogunaVershin(vertex1);
                    let mnogunaVershin2 = findMnogunaVershin(vertex2);
            
                    if(mnogunaVershin1 !== mnogunaVershin2){
                        if (rank[mnogunaVershin1] > rank[mnogunaVershin2]){
                            mnogunaVershin[mnogunaVershin2] = mnogunaVershin1;
                        }else if(rank[mnogunaVershin1] < rank[mnogunaVershin2]){
                            mnogunaVershin[mnogunaVershin1] = mnogunaVershin2;
                        }else{
                            mnogunaVershin[mnogunaVershin2] = mnogunaVershin1;
                            console.log(mnogunaVershin)
                            rank[mnogunaVershin1]++;
                        }
                    }
                }
            
                for (let i = 0; i < vertices.length; i++) {
                    mnogunaVershin[vertices[i]] = vertices[i];
                    rank[vertices[i]] = 0;
                }
            
                let dataLines = [];
            
                edges.forEach(edge => {
                    let vertex1 = edge[0];
                    let vertex2 = edge[1];
                    if (findMnogunaVershin(vertex1) !== findMnogunaVershin(vertex2)) {
                        dataLines.push(edge);
                        mergeTwoMnogunuVershin(vertex1, vertex2);
                    }
                });
            
                return dataLines;
            }

            setLinesRow(kruskal(lines, setOfVertices))
            setStartLine(0)
        }else{
            const line = dataLinesRow[dataStartLine]
            console.log(line)
            drawAllArrow([[line[0], line[1]]], dataVertices, false, dataRebraCount, ctx, "green")

            ctx.beginPath();
            ctx.arc(dataVertices[line[1]].x, dataVertices[line[1]].y, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = '10px Arial';
            ctx.fillText(line[1] + 1, dataVertices[line[1]].x - 4, dataVertices[line[1]].y + 4);
            ctx.fillStyle = 'green';

            ctx.beginPath();
            ctx.arc(dataVertices[line[1]].x, dataVertices[line[1]].y, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = '10px Arial';
            ctx.fillText(line[1] + 1, dataVertices[line[1]].x - 4, dataVertices[line[1]].y + 4);
            ctx.fillStyle = 'green';

            ctx.beginPath();
            ctx.arc(dataVertices[line[0]].x, dataVertices[line[0]].y, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = '10px Arial';
            ctx.fillText(line[0] + 1, dataVertices[line[0]].x - 4, dataVertices[line[0]].y + 4);
            ctx.fillStyle = 'green';

            ctx.beginPath();
            ctx.arc(dataVertices[line[0]].x, dataVertices[line[0]].y, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = '10px Arial';
            ctx.fillText(line[0] + 1, dataVertices[line[0]].x - 4, dataVertices[line[0]].y + 4);
            ctx.fillStyle = 'green';
            if(dataStartLine < 10){
                setStartLine(dataStartLine+1)
            }
            
        }
    }


    return (
    <div className="container" style={{display: 'flex', alignItems: 'center', gap: '5vw'}}>
        <div className="graphContainer" style={{display: 'flex', alignItems: 'left', flexDirection: 'column'}}>
            <h1>Направлений граф</h1>
            <canvas id="graphCanvas1" width="900" height="900"></canvas>
        </div>
        <div className='infoContainer' style={{display: 'flex', flexDirection: 'column', gap: '3vw'}}>
            <button id="bfsButton" style={{height: 50, width: 200}} onClick={()=>{BFSFunction()}}>BFS start</button>
            <button id="dfsButton" style={{height: 50, width: 200}} onClick={()=>{DFSFunction()}}>DFS start</button>
            <button id="dfsButton" style={{height: 50, width: 200}} onClick={()=>{findMinimumSpanningTree()}}>MinimumSpanningTree start</button>
            <div className='input' id="input"></div>
        </div>

        <div className="graphContainer" style={{display: 'flex', alignItems: 'left', flexDirection: 'column'}}>
            <h1>Ненаправлений граф</h1>
            <canvas id="graphCanvas2" width="900" height="900"></canvas>
        </div>
    </div>
    );
}

export default App;
