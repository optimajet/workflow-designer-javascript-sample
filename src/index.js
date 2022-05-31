import WorkflowDesigner from '@optimajet/workflow-designer';
//import '@optimajet/workflow-designer/localization/workflowdesigner.localization_ru'

var wfdesigner = new WorkflowDesigner({
    name: 'simpledesigner',
    apiurl: 'http://localhost:5000/Designer/API',
    renderTo: 'root',
    graphwidth: window.innerWidth,
    graphheight: window.innerHeight,
});

const data = {
    schemecode: "WfeSample",
    processid: ""
};

if (wfdesigner.exists(data)) {
    wfdesigner.load(data);
} else {
    wfdesigner.create();
}