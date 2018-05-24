function plotPie() {
    var default_url = "/samples/BB_940";
    Plotly.d3.json(default_url, function(error, response) {
        if (error) return console.warn(error);
        var labels = response.otu_ids.slice(0, 10);
        var values = response.sample_values.slice(0,10);

        
        for (let j=0; j<labels.length; j++) {
            var new_url = "/otu"
            var namesBact = []
            Plotly.d3.json(new_url, function(error, response1){
                namesBact.push(`${response1[labels[j]-1]}`)
            }) 
        }
        var trace1 = {
            values: values,
            labels: labels,
            text: namesBact,
            type: "pie",
        };
        var layout1 = {
            title: "Top Ten OTUs of Sample BB_940"
        }
        var data = [trace1];
        Plotly.newPlot("pie", data, layout1)
    });
}
plotPie();
    

function listy() {
    var def_url = "/metadata/BB_940";
    Plotly.d3.json(def_url, function(error, respond) {
        if (error) return console.warn(error);
        d3.select("#age").text(`AGE:   ${respond.AGE}`);
        d3.select("#bbtype").text(`BBTYPE:  ${respond.BBTYPE}`);
        d3.select("#ethnicity").text(`ETHNICITY:  ${respond.ETHNICITY}`);
        d3.select("#gender").text(`GENDER:  ${respond.GENDER}`);
        d3.select("#location").text(`LOCATION:  ${respond.LOCATION}`);
        d3.select("#sampleid").text(`SAMPLEID:  ${respond.SAMPLEID}`);
    })
}

listy();


function plotBubble() {
    var default_url = "/samples/BB_940";
    Plotly.d3.json(default_url, function(error, response){
        if (error) return console.warn(error);
        var labels = response.otu_ids;
        var values = response.sample_values;
        var namesBact = [];
        var new_url = "/otu"
        Plotly.d3.json(new_url, function(error, response1){
            for (var j=0; j<labels.length; j++) {
                namesBact.push(`${response1[labels[j]-1]}`)
            }
            var named = []
            for (var i=0; i<labels.length; i++) {
                var x = `(${labels[i]}, ${values[i]}) ${namesBact[i]}`
                named.push(x);
            }
            var trace1 = {
                x: labels,
                y: values,
                text: namesBact,
                labels: named,
                type: "scatter",
                mode: "markers",
                hoverinfo: "label",
                marker: {
                    symbol: "circle",
                    sizemode: "area",
                    size: values.map(j=>j*4),
                    color: labels.map(j=>`rgba(${j/40}, ${j/12}, ${j*2}, 0.75)`)
                }
            };
            var data = [trace1];
            var layout = {
                title: "Number of Bacterial Samples per OTU for Sample BB_940",
                hovermode: "closest",
                yaxis: {title: "Number of Samples",
                    showline: true,
                    zeroline: false},
                xaxis: {title: "OTU ID",
                    showline: true,
                    zeroline: false}
            }
            Plotly.newPlot("scatter", data, layout)
        })
    })
            

}
plotBubble();




function optionList() {
    var url = "/name"
    Plotly.d3.json(url, function(error, response){
        var ddlItems = document.getElementById("ddlitemslist"), itemArray=response;            
        for (var i=0; i<itemArray.length; i++) {
            var opt = itemArray[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            ddlItems.appendChild(el);
        }
    })
}
optionList();


function optionChanged(route){
    Plotly.d3.json(`/samples/${route}`, function (error,data){
        if (data.otu_ids.length >10) {
            var labels1 = data.otu_ids.slice(0, 10);
            var values1 = data.sample_values.slice(0,10);
            for (let j=0; j<labels1.length; j++) {
                var new_url = "/otu"
                var namesBact1 = []
                Plotly.d3.json(new_url, function(error, response2){
                    namesBact1.push(response2[labels1[j]-1])
                }) 
            }
            var trace2 = {
                values: values1,
                labels: labels1,
                text: namesBact1,
                type: "pie"
            };
            var data1 = [trace2];
            var layouts = {
                title: `Bacterial OTUs of Sample ${route}`
            }
        }
        else {
            var labels1 = data.otu_ids;
            var values1 = data.sample_values;
            for (let j=0; j<labels1.length; j++) {
                var new_url = "/otu"
                var namesBact1 = []
                Plotly.d3.json(new_url, function(error, response2){
                namesBact1.push(response2[labels1[j]-1])
                }) 
            }
            var trace2 = {
                values: values1,
                labels: labels1,
                text: namesBact1,
                type: "pie"
            };
            var layouts = {
                title: `Top Ten OTUs of Sample ${route}`
            }
            var data1 = [trace2];
        }
        Plotly.newPlot("pie", data1, layouts);
    })
    labels1 = [];
    values1 = [];
    namesBact1 = [];
}


function optionChanged1(route){
    Plotly.d3.json(`/samples/${route}`, function (error,data){
        var labels2 = data.otu_ids;
        var values2 = data.sample_values;
        var namesBact2 = [];
        var new_url = "/otu";
        Plotly.d3.json(new_url, function(error, response3){
            for (var j=0; j<labels2.length; j++){
            namesBact2.push(`${response3[labels2[j]-1]}`)
            }
            var named1 = [];
            for (var i=0; i<labels2.length; i++) {
                var x = `(${labels2[i]}, ${values2[i]}) ${namesBact2[i]}`
                named1.push(x);
            } 
            var trace3 = {
                x: labels2,
                y: values2,
                text: namesBact2,
                labels: named1,
                type: "scatter",
                mode: "markers",
                hoverinfo: "label",
                marker: {
                    symbol: "circle",
                    sizemode: "area",
                    size: values2.map(j=>j*4),
                    color: labels2.map(j=>`rgba(${j/40}, ${j/12}, ${j*2}, 0.75)`)
                }
            };
            var data2 = [trace3];
            var layout2 = {
                title: `Number of Bacterial Samples per OTU for Sample ${route}`,
                hovermode: "closest",
                yaxis: {title: "Number of Samples",
                    showline: true,
                    zeroline: false},
                xaxis: {title: "OTU ID",
                    showline: true,
                    zeroline: false}
            }
            Plotly.newPlot("scatter", data2, layout2);
        })
    })
}

function listy1(route) {
    Plotly.d3.json(`/metadata/${route}`, function(error, respond1) {
        if (error) return console.warn(error);
        d3.select("#age").text(`AGE:   ${respond1.AGE}`);
        d3.select("#bbtype").text(`BBTYPE:  ${respond1.BBTYPE}`);
        d3.select("#ethnicity").text(`ETHNICITY:  ${respond1.ETHNICITY}`);
        d3.select("#gender").text(`GENDER:  ${respond1.GENDER}`);
        d3.select("#location").text(`LOCATION:  ${respond1.LOCATION}`);
        d3.select("#sampleid").text(`SAMPLEID:  ${respond1.SAMPLEID}`);
    })
}


function spedometer() {
    var default_url = "/wfreq/BB_940";
    Plotly.d3.json(default_url, function(error, response4) {
        if (error) return console.warn(error);
        var level = response4.WFREQ;
        var degrees = 180-(level*20);
        var radius = .5;
        var radians = degrees*Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type: 'category',
            x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'Washes',
            text: level,
            hoverinfo: 'text+name'},
            { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
            rotation: 90,
            text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
            textinfo: 'text',
            textposition:'inside',      
            marker: {colors:['rgba(21, 67, 96, 0.5)', 'rgba(31, 97, 114, 0.5)', 'rgba(36, 113, 163, 0.5)', 'rgba(41, 128, 185, 0.5)', 'rgba(84, 153, 199, 0.5)', 'rgba(127, 179, 213, 0.5)', 'rgba(169, 204, 227, 0.5)', 'rgba(212, 230, 241, 0.5)', 'rgba(234, 242, 248, 0.5)', 'rgba(255, 255, 255, 0)']},
            labels: ['8-9 Washes per Week', '7-8 Washes per Week', '6-7 Washes per Week', '5-6 Washes per Week', '4-5 Washes per Week', '3-4 Washes per Week', '2-3 Washes per Week', '1-2 Washes per Week', '0-1 Washes per Week', ''],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
        }];

        var layout = {
            shapes:[{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                color: '850000'
                }
            }],
            title: 'Belly Button Washing Frequency for Sample BB_940',
            height: 500,
            width: 600,
            xaxis: {type:'category',zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
            yaxis: {type:'category',zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot('myDiv', data, layout);
    })
}
spedometer();

function spedometer1(route) {
    Plotly.d3.json(`/wfreq/${route}`, function(error, response4) {
        if (error) return console.warn(error);
        var level = response4.WFREQ;
        var degrees = 180-(level*20);
        var radius = .5;
        var radians = degrees*Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type: 'category',
            x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'Washes',
            text: level,
            hoverinfo: 'text+name'},
            { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
            rotation: 90,
            text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
            textinfo: 'text',
            textposition:'inside',      
            marker: {colors:['rgba(21, 67, 96, 0.5)', 'rgba(31, 97, 114, 0.5)', 'rgba(36, 113, 163, 0.5)', 'rgba(41, 128, 185, 0.5)', 'rgba(84, 153, 199, 0.5)', 'rgba(127, 179, 213, 0.5)', 'rgba(169, 204, 227, 0.5)', 'rgba(212, 230, 241, 0.5)', 'rgba(234, 242, 248, 0.5)', 'rgba(255, 255, 255, 0)']},
            labels: ['8-9 Washes per Week', '7-8 Washes per Week', '6-7 Washes per Week', '5-6 Washes per Week', '4-5 Washes per Week', '3-4 Washes per Week', '2-3 Washes per Week', '1-2 Washes per Week', '0-1 Washes per Week', ''],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
        }];

        var layout = {
            shapes:[{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                color: '850000'
                }
            }],
            title: `Belly Button Washing Frequency for Sample ${route}`,
            height: 500,
            width: 600,
            xaxis: {type:'category',zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
            yaxis: {type:'category',zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
            };
            Plotly.newPlot('myDiv', data, layout);
        })
        
    }

