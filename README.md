jsWorkflow - An open source JavaScript based API to manage workflow diagrams in various applications

---------------------------------------------------------------------------------------------------------

jsWorkflow 1.0

Copyright (c) 2014 Hemanatha Shetty (hemantsshetty@gmail.com)

http://github.com/hemantsshetty/jsWorkflow

Licensed under the MIT

---------------------------------------------------------------------------------------------------------

A Workflow Diagram is a simple form of Flowchart depicting the flow (tansition) of tasks or actions from one state to another. 

Workflow is an important part of many application such as The issue tracking system.

jsPlumb is an API which provides a means for a developer to visually connect elements on their web pages.

jsWorkflow uses jsPlumb to create and maintain workflow diagrams.

jsWorkflow is an abstract layer built on top of jsPlumb to manage workflow diagrams using few simple jsWorkflow methods.

---------------------------------------------------------------------------------------------------------

A list of jsWorkflow methods:

	#1 jsWorkflow.Instance() - A constructor to create a new workflow instance.

	#2 init() - A method to Initialize the workflow. A workflow can be initialized by passing either 
	a workflow html element's id or the workflow JSON data comprising of details such as 
	State transitions, State names, State positions and workflow container Id.

	#3 instance.createStateTrasitions() - A method to establish transitions among all the workflow States by passing the JSON data.

	#4 instance.getStateTransitions() - Get a list of all States and their transition (connection) with other States.

	#5 instance.getStateNames() - Get a list of all State element Ids with their respective names.

	#6 instance.getStatePositions() - Get a list of all State element Ids with their respective css positions (top and left).

	#7 instance.getWorkflow() - Get the current workflow object with details such as 
	State transitions, State names, State positions and workflow container Id.

---------------------------------------------------------------------------------------------------------

A sample JSON Workflow object
	
	{
	  "transitions": {
	    "new": "open",
	    "open": "new,in-progress,resolved,closed",
	    "in-progress": "open,resolved,closed",
	    "resolved": "closed,reopened",
	    "reopened": "closed,resolved,in-progress",
	    "closed": "reopened"
	  },
	  "names": {
	    "new": "New",
	    "open": "Open",
	    "in-progress": "In Progress",
	    "resolved": "Resolved",
	    "reopened": "Reopened",
	    "closed": "Closed"
	  },
	  "positions": {
	    "new": {
	      "top": 100,
	      "left": 500
	    },
	    "open": {
	      "top": 200,
	      "left": 500
	    },
	    "in-progress": {
	      "top": 400,
	      "left": 250
	    },
	    "resolved": {
	      "top": 300,
	      "left": 500
	    },
	    "reopened": {
	      "top": 500,
	      "left": 500
	    },
	    "closed": {
	      "top": 400,
	      "left": 750
	    }
	  },
	  "container": "workflow-2"
	}
