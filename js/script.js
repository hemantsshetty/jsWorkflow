// No API call should be made until the DOM has been initialized.
jsWorkflow.ready(function () {    



	// A list of jsWorkflow methods:
	//
	// #1 jsWorkflow.Instance() - A constructor to create a new workflow instance.
	//
	// #2 init() - A method to Initialize the workflow. A workflow can be initialized by passing either 
	// a workflow html element's id or the workflow JSON data comprising of details such as 
	// State transitions, State names, State positions and workflow container Id.
	//
	// #3 instance.createStateTrasitions() - A method to establish transitions among all the workflow States by passing the JSON data.
	//
	// #4 instance.getStateTransitions() - Get a list of all States and their transition (connection) with other States.
	//
	// #5 instance.getStateNames() - Get a list of all State element Ids with their respective names.
	//
	// #6 instance.getStatePositions() - Get a list of all State element Ids with their respective css positions (top and left).
	//
	// #7 instance.getWorkflow() - Get the current workflow object with details such as 
	// State transitions, State names, State positions and workflow container Id.


	// A sample JSON Workflow object
	//
	// {
	//   "transitions": {
	//     "new": "open",
	//     "open": "new,in-progress,resolved,closed",
	//     "in-progress": "open,resolved,closed",
	//     "resolved": "closed,reopened",
	//     "reopened": "closed,resolved,in-progress",
	//     "closed": "reopened"
	//   },
	//   "names": {
	//     "new": "New",
	//     "open": "Open",
	//     "in-progress": "In Progress",
	//     "resolved": "Resolved",
	//     "reopened": "Reopened",
	//     "closed": "Closed"
	//   },
	//   "positions": {
	//     "new": {
	//       "top": 100,
	//       "left": 500
	//     },
	//     "open": {
	//       "top": 200,
	//       "left": 500
	//     },
	//     "in-progress": {
	//       "top": 400,
	//       "left": 250
	//     },
	//     "resolved": {
	//       "top": 300,
	//       "left": 500
	//     },
	//     "reopened": {
	//       "top": 500,
	//       "left": 500
	//     },
	//     "closed": {
	//       "top": 400,
	//       "left": 750
	//     }
	//   },
	//   "container": "workflow-2"
	// }



	/**
	 *
	 * Workflow Demo 1: All States and no Transitions (pass Transition info in JSON)
	 *
	 */
	if ($('.demo-1').length > 0 ) {

		var transitionData,
			workflow1;

		// Transition (Connection between States) Data
		transitionData = '{"transitions":{"new":"open","open":"new,in-progress,resolved,closed","in-progress":"open,resolved,closed","resolved":"closed,reopened","reopened":"closed,resolved,in-progress","closed":"reopened"}}';
		
		// Create a new workflow instance as workflow1
		workflow1 = new jsWorkflow.Instance();

		// Initialize workflow1 with workflow container id
		workflow1.init('workflow-1');

		// Establish transitions among all the workflow States
		workflow1.instance.createStateTrasitions(JSON.parse(transitionData));
	} 
	/**
	 *
	 * Workflow Demo 2: No States and no Transitions (pass State and Transition info in JSON)
	 *
	 */
	else if ($('.demo-2').length > 0 ) {

		var workflowData,
			workflow2;

		// Workflow object to render new workflow State elements in the DOM
		workflowData = '{"transitions":{"new":"open","open":"new,in-progress,resolved,closed","in-progress":"open,resolved,closed","resolved":"closed,reopened","reopened":"closed,resolved,in-progress","closed":"reopened"},"names":{"new":"New","open":"Open","in-progress":"In Progress","resolved":"Resolved","reopened":"Reopened","closed":"Closed"},"positions":{"new":{"top":100,"left":500},"open":{"top":200,"left":500},"in-progress":{"top":400,"left":250},"resolved":{"top":300,"left":500},"reopened":{"top":500,"left":500},"closed":{"top":400,"left":750}},"container":"workflow-2"}';
		
		// Create a new workflow instance as workflow1
		workflow2 = new jsWorkflow.Instance();

		// Initialize workflow2 with workflow object
		workflow2.init(JSON.parse(workflowData)); // parse the workflowData string as JSON object.
	} 
	/**
	 *
	 * Workflow Demo 3: No States and no Transitions (create a dynamic workflow)
	 *
	 */
	else if ($('.demo-3').length > 0 ) {


		var workflow3;

		// Create a new workflow instance as workflow3
		workflow3 = new jsWorkflow.Instance();

		// Initialize workflow1 with workflow container id
		workflow3.init('workflow-3');
	}
});
// For more details refer README.md