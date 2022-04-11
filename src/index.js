import WorkflowDesigner from '@optimajet/workflow-designer';
//import '@optimajet/workflow-designer/localization/workflowdesigner.localization_ru'

var wfdesigner = new WorkflowDesigner({
    name: 'simpledesigner',
    apiurl: 'https://workflowengine.io/demo/Designer/API',
    renderTo: 'root',
    graphwidth: window.innerWidth,
    graphheight: window.innerHeight,
});

const data = {
    schemecode: "SimpleWF",
    processid: ""
};

if (wfdesigner.exists(data)) {
    wfdesigner.load(data);
} else {
    wfdesigner.create();
}
