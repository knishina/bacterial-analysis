# bacterial-analysis
## The project has been deployed: https://knishina-otu-bacteria.herokuapp.com/

<br />

### Summary.
The [Dunn Lab](http://robdunnlab.com/projects/belly-button-biodiversity/) performed a survey study to assess the diversity of bacteria in in participants' belly buttons.  The samples were subjected to PCR for the 16S rRNA gene, sequenced, and analysed for the type of bacterial strain.  The data was made public and ripe for analysis and visualization. Consequently, this project was to take the data, clean it, and build an interactive web-based dashboard.  Full stack!

![Plates of Bacteria](https://github.com/knishina/bacterial-analysis/blob/master/Images/01.png)

<br />

### Features.
The navigation block is in the upper left part of the page.  Samples are selected by this drop-down menu and the corresponding data is visualized in the three plots.

![Nav Block](https://github.com/knishina/bacterial-analysis/blob/master/Images/02.png)

<br />

#### Data Block: Sample MetaData.
The Data Block contains data associated with the selected sample.  The data displayed includes the participant's age, belly button type, ethnicity, gender, location, and sample ID.
![MetaData](https://github.com/knishina/bacterial-analysis/blob/master/Images/03.png)

<br />

#### Plot: Pie Chart.
The first plot is a pie chart.  This chart displays a maximum of the top ten bacteria found in each sample.  The legend indicates the identification number of the bacteria species seen in the chart.  For more information about the bacteria, over the pie chart.  A text box will display the species ID of the bacteria, the full classification of the bacteria, the number of bacteria in the sample, and the percent of the whole sample.
![Pie Chart](https://github.com/knishina/bacterial-analysis/blob/master/Images/04.png)

<br />

#### Plot: Gauge.
The second plot is a gauge.  The gauge indicates the freqeuncy of belly button washes performed by the participant.  It is interesting to observe if there is a correlation between bacterial type/quantity and the number of belly button washes.
![Gauge](https://github.com/knishina/bacterial-analysis/blob/master/Images/05.png)

<br />

#### Plot: Bubble Chart.
The third plot is a bubble plot.  This chart displays all bacteria found per sample.  The size of the bubble indicates the quantity of the bacterial strain found, which is also represented by the y-axis.  The x-axis of the plot is the bacterial species ID.  A text box will display the species ID of the bacteria, the quantity of that bacteria found, and the full classification of the bacteria.
![Bubble Chart](https://github.com/knishina/bacterial-analysis/blob/master/Images/06.png)

<br />

### License.
This project is licensed under the MIT License - see the [LICENSE](https://github.com/knishina/bacterial-analysis/blob/master/LICENSE) file for details.

