/**
 * jsWorkflow 1.0
 *
 * jsWorkflow, a jsPlumb based workfow API, helps to create JavaScript based workflow diagrams for various applications.
 * It abstracts all the complexities involved in designing and managing workflows.
 *
 * Copyright (c) 2014 Hemanatha Shetty (hemantsshetty@gmail.com)
 *
 * http://github.com/hemantsshetty/jsWorkflow
 *
 * Licensed under the MIT
 */
/**
 *@namespace jsWorkflow
 */
;
var jsWorkflow = jsWorkflow || {};

// Leveraging the ready function of jsPlumb.
jsWorkflow.ready = jsPlumb.ready;

// Self execute this code
(function () {
    // No API call should be made until the DOM has been initialized.
    jsWorkflow.ready(function () {
        /**
         *Create a workflow instance.
         *@constructor Instance
         */
        jsWorkflow.Instance = function () {

            // Get a new instance of jsPlumb.
            this.instance = jsPlumb.getInstance();
        }
        /**
         *Initialize the workflow instance.
         *@method init
         *@param {String} workflowData Id of an HTML container within which the worlflow is to be rendered
         *@param {Object} workflowData A workflow object to render new workflow State elements in the DOM
         *return {Object} instance Returns an initialized instance of the workflow object
         */
        jsWorkflow.Instance.prototype.init = function (workflowData) {

            var instance,
                windows,
                addNewState,
                bindStateEvents,
                workflow;

            if (typeof workflowData === 'object') {
                workflow = workflowData.container;
                jsWorkflow.Instance.createWorkflowDOM(workflowData);
            } else {
                workflow = workflowData;
            }

            instance = this.instance;

            // Import all the given defaults into this instance.
            instance.importDefaults({
                Endpoint: ["Dot", {
                    radius: 0.1
                }],
                HoverPaintStyle: {
                    strokeStyle: "#6699FF",
                    lineWidth: 2
                },
                ConnectionOverlays: [
                    ["Arrow", {
                        location: 1,
                        id: "arrow",
                        length: 14,
                        foldback: 0.8
                    }],
                    ["Label", {
                        label: "transition",
                        id: "label",
                        cssClass: "aLabel"
                    }]
                ],
                Container: workflow // Id of the workflow container.
            });

            // Bind a click listener to each transition (connection). On double click, the transition is deleted.
            instance.bind("dblclick", function (transition) {
                instance.detach(transition);
            });

            // Get an array of State elements.
            windows = jsPlumb.getSelector("#" + workflow + " .w");

            // Get a reference to the element in the workflow used to create a new State on click.
            addNewState = jsPlumb.getSelector("#" + workflow + " .create-state");

            /**
             *Bind required functionalities to State elements
             *@method bindStateEvents
             *@param {Object} windows List of all State elements
             */
            bindStateEvents = function (windows) {

                // Bind a click listener to each State elements. On double click, State elements are deleted.
                windows.bind("dblclick", function () {

                    var _this = this,
                        deleteState;

                    deleteState = confirm('Deleting State(' + jQuery(_this).attr('id').toUpperCase() + ') ...');

                    if (deleteState) {

                        // remove all the connections of this State element.
                        instance.detachAllConnections(_this);

                        // remove the State element.
                        jQuery(_this).remove();

                    } else {
                        return false;
                    }
                });

                // Initialize State elements as draggable.  
                instance.draggable(windows);

                // Initialize all State elements as Connection sources.
                instance.makeSource(windows, {
                    filter: ".ep",
                    anchor: "Continuous",
                    connector: ["StateMachine", {
                        curviness: 0
                    }],
                    connectorStyle: {
                        strokeStyle: "#bbb",
                        lineWidth: 1,
                        outlineColor: "transparent",
                        outlineWidth: 4
                    },
                    maxConnections: 10,
                    onMaxConnections: function (info, e) {
                        alert("Maximum connections (" + info.maxConnections + ") reached");
                    }
                });

                // Initialize all State elements as connection targets.  
                instance.makeTarget(windows, {
                    dropOptions: {
                        hoverClass: "dragHover"
                    },
                    anchor: "Continuous"
                });
            };

            // Initiate bindStateEvents on States elements present in the DOM
            if (windows.length > 0) {
                bindStateEvents(windows);
            }

            // Add new State event.
            addNewState.bind("click", function () {
                var _this = this,
                    stateName,
                    stateId,
                    stateElement;

                stateName = prompt("Enter the name of the State...");

                if (stateName && stateName !== '') {

                    stateName = stateName.replace(/[^a-zA-Z0-9 ]/g, '');

                    stateId = stateName.toLocaleLowerCase().replace(' ', '-');

                    if (jQuery(_this).parent().find('#' + stateId).length < 1) {

                        stateElement = '<div class="w state" id="' + stateId + '">' + stateName + '<div class="ep"></div></div>';

                        jQuery(_this).parent().append(stateElement);

                        // Bind required functionalities to this State element
                        bindStateEvents(jQuery('#' + stateId));

                    } else {
                        alert('This state is already present.');
                    }
                }
            });

            /**
             *Get all State transitions
             *@method getStateTransitions A public method
             *@return {Object} workflowTransition List of all States and their transition (connection) with other States
             */
            instance.getStateTransitions = function () {
                var plumbConnections = instance.getAllConnections(),
                    connectionCount = plumbConnections.length,
                    workflowTransition = {},
                    sourceID,
                    targetID;

                for (var i = 0; i < connectionCount; i += 1) {

                    sourceID = plumbConnections[i]['sourceId'];
                    targetID = plumbConnections[i]['targetId'];

                    workflowTransition[sourceID] = (workflowTransition[sourceID]) ?
                        (workflowTransition[sourceID] + ',' + plumbConnections[i]['targetId']) :
                        plumbConnections[i]['targetId'];
                }
                return workflowTransition;
            }

            /**
             *Get all State names
             *@method getStateNames A public method
             *@return {Object} workflowStateName List of all State Element Ids with their respective names
             */
            instance.getStateNames = function () {
                var stateCount = windows.length,
                    workflowStateName = {};

                for (var i = 0; i < stateCount; i += 1) {

                    workflowStateName[jQuery(windows[i]).attr('id')] = jQuery(windows[i]).text().trim();
                }
                return workflowStateName;
            }

            /**
             *Get all State position
             *@method getStatePositions A public method
             *@return {Object} workflowStatePosition List of all State Element Ids with their respective css positions (top and left)
             */
            instance.getStatePositions = function () {

                // Get updates array of State elements.
                windows = jsPlumb.getSelector("." + workflow + " .w");

                var stateCount = windows.length,
                    workflowStatePosition = {};

                for (var i = 0; i < stateCount; i += 1) {

                    workflowStatePosition[jQuery(windows[i]).attr('id')] = jQuery(windows[i]).position();
                }
                return workflowStatePosition;
            }

            /**
             *Get the workflow Object
             *@method getWorkflow A public method
             *@return {Object} workflow Current workflow object with details such as
             /* State transitions, State names, State positions and workflow container Id
             */
            instance.getWorkflow = function () {

                // Get updates array of State elements.
                windows = jsPlumb.getSelector("." + workflow + " .w");

                var workflowObject = {};

                workflowObject['transitions'] = instance.getStateTransitions();
                workflowObject['names'] = instance.getStateNames();
                workflowObject['positions'] = instance.getStatePositions();
                workflowObject['container'] = workflow;

                return workflowObject;
            }

            /**
             *Create workflow State transitions from the given Object.
             *@method createStateTrasitions A public method
             *@param {Object} workflowData A workflow object to create State transitions
             */
            instance.createStateTrasitions = function (workflowData) {

                var transitions = workflowData.transitions,
                    targetState;

                for (var name in transitions) {
                    targetState = transitions[name].split(',');
                    for (var i = 0; i < targetState.length; i += 1) {
                        instance.connect({
                            source: name,
                            target: targetState[i]
                        });
                    }
                }
            }

            // Create workflow State transitions from the given workflowData Object.
            if (typeof workflowData === 'object') {
                instance.createStateTrasitions(workflowData);
            }
                
            return instance;
        }
        /**
         *Create the workflow DOM from the given data.
         *@method createWorkflowDOM
         *@param {Object} workflowData A workflow object to render new workflow State elements in the DOM
         */
        jsWorkflow.Instance.createWorkflowDOM = function (workflowData) {

            var container = workflowData.container,
                names = workflowData.names,
                positions = workflowData.positions,
                elements = '';

            for (var name in names) {
                if (names.hasOwnProperty(name)) {
                    elements += '<div class="w state" id=' + name + ' style="left: ' + positions[name]['left'] + 'px; top: ' + positions[name]['top'] + 'px;">' + names[name] + '<div class="ep"></div></div>';
                }
            }

            jQuery('#' + container).append(elements);
        }
    });
})();