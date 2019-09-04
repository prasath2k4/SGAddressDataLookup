import { IInputs, IOutputs } from "./generated/ManifestTypes";
import fetch from 'cross-fetch';
import * as $ from 'jquery';
import { any, string } from "prop-types";
import { strict, throws } from "assert";
export class SGPostcodeSearch implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _input: HTMLInputElement;
    private _output: HTMLTextAreaElement;
    private _submitButton: HTMLElement;
    private _breakElement1: HTMLElement;
    private _breakElement2: HTMLElement;
    private _breakElement3: HTMLElement;
    private _breakElement4: HTMLElement;
    private _span: HTMLSpanElement;

    private _submitClicked: EventListenerOrEventListenerObject;

    private _context: ComponentFramework.Context<IInputs>;
    private _notifyOutputChanged: () => void;
    private _container: HTMLDivElement;

    private _value: string;
    private _addressValue: string;


	/**
	 * Empty constructor.
	 */
    constructor() {

    }

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        // Add control initialization code
        this._context = context;
        this._notifyOutputChanged = notifyOutputChanged;
        this._container = container;

        this._container.setAttribute("style","text-align:left");

        this._submitClicked = this.submitClick.bind(this);

        this._input = document.createElement("input");
        this._input.setAttribute("type", "text");
        this._input.setAttribute("id", "in"); 
        this._input.setAttribute("autocomplete", "off");

        this._breakElement1 = document.createElement("br");
        this._breakElement2 = document.createElement("br");
        this._breakElement3 = document.createElement("br");
        this._breakElement4 = document.createElement("br");

        this._output = document.createElement("textarea");
        this._output.setAttribute("type", "text");
        this._output.setAttribute("id", "out"); 
        this._output.setAttribute("style","width: 167px;height: 100px;border: solid 1px;");
    

        // submit button 
        this._submitButton = document.createElement("input");
        this._submitButton.setAttribute("type", "button");
        this._submitButton.setAttribute("value", "Get Address");
        this._submitButton.addEventListener("click", this._submitClicked);

        this._span = document.createElement("span")


        
        

        this._container.appendChild(this._input);
        this._container.appendChild(this._breakElement1);    
        this._container.appendChild(this._breakElement2); 
        this._container.appendChild(this._output); 
        this._container.appendChild(this._breakElement3);  
        this._container.appendChild(this._breakElement4);  
        this._container.appendChild(this._submitButton);
       


    }


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Add code to update   control view

        this._context = context;

        debugger;
        // @ts-ignore 
        //var crmFileNameAttr = this._context.parameters.FileName.attributes.LogicalName;        

        //this._output.innerHTML = this._addressValue;
    }

    public submitClick(evt: Event): void {
        //let inVal = $("#in").val;

        //this._value = this._input.value;
        //(<HTMLInputElement>document.getElementById("out")).value = inVal;
        let address: string = "";
        (<HTMLInputElement>document.getElementById("out")).innerHTML = "";

        $.getJSON('https://gothere.sg/maps/geo?output=json&ll='.concat(this._input.value).concat('&client=&sensor=false&callback=?'))
        .done(function (info) {
            if(info.Placemark[0].address != null)
                //address = info.Placemark[0].address;
                (<HTMLInputElement>document.getElementById("out")).value = info.Placemark[0].address;            
        }).fail(function () {
            // something went wrong during the API request, consider valid
        });        
        }

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
    public getOutputs(): IOutputs {
        return {}
    }

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}