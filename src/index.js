import WorkflowDesigner from '@optimajet/workflow-designer';
import el from './localization/el.json';
import elElementUILocalization from './localization/el.js';

el.elementUILocalization = elElementUILocalization;

var wfdesigner = new WorkflowDesigner({
  apiurl: 'https://demo.workflowengine.io/Designer/API',
  name: 'wfe',
  language: 'en',
  renderTo: 'root',
  graphwidth: window.innerWidth,
  graphheight: window.innerHeight,
  customLocalization: [el]
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
