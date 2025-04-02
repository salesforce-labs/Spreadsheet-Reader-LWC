import { LightningElement } from 'lwc';
import sheetjs from '@salesforce/resourceUrl/sheetjs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

let XLS = {};
const TOAST_ERROR_VARIANT = 'error'
const TOAST_ERROR_TITLE = '¡Error!'
const TOAST_SUCCESS_VARIANT = 'success'
const TOAST_SUCCESS_TITLE = '¡Success!'
const FILE_UPLOADED_MESSAGE = 'File loaded';
const FILE_FORMAT_ERROR = 'Invalid file format';
const NO_DOCUMENTS_ERROR = 'No file was selected';
const ACEPTED_FORMATS = ['.xls', '.xlsx'];

export default class SpreadsheetReader extends LightningElement {
    
    importedData = '';
    showImportedDataSummary = false;
    showInputFile = true;
    validFileFormat = true;
    acceptedFormats = ACEPTED_FORMATS;

    /**
     * @description: Capture the event when the attachment is loaded, the extension is validated
     * @author: Juan Felipe Muriel
    */
    handleUploadFinished(event){
        const uploadedFiles = event.detail.files;

        try {
            if (uploadedFiles.length === 0) {
                throw new Error(NO_DOCUMENTS_ERROR);
            }

            const fileName = uploadedFiles[0].name.toLowerCase();
            if (this.acceptedFormats.some(format => fileName.endsWith(format))) {
                this.validFileFormat = true;
            }else{
                this.validFileFormat = false;
                throw new Error(FILE_FORMAT_ERROR);
            }
    
            if(uploadedFiles.length > 0 & this.validFileFormat) {   
                this.ExcelToJSON(uploadedFiles[0])
                this.showToast(TOAST_SUCCESS_VARIANT,TOAST_SUCCESS_TITLE, FILE_UPLOADED_MESSAGE)
            }
        } catch (error) {
            this.showToast(TOAST_ERROR_VARIANT,TOAST_ERROR_TITLE, error.message);
        }
    }

    /**
     * @description: Using the 'sheetjs' library, the uploaded file (the first page) is read and the content is converted into JSON format.
     * @author: Juan Felipe Muriel
    */
    ExcelToJSON(file){
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            this.importedData = sheetData
            this.showImportedDataSummary = true;
            this.showInputFile = false;
        };
        reader.readAsArrayBuffer(file);
    }

     /**
     * @description: Utility function for dispatching 'Toast' type error messages
     * @param {String} variant - Toast variant
     * @param {String} title - Toast title
     * @param {String} message - Toast message
     * @author: Juan Felipe Muriel
    */
     showToast(variant, title, message){
        const event = new ShowToastEvent({
            variant: variant,
            title: title,
            message: message,
        });
        this.dispatchEvent(event);
    }

    connectedCallback() {
        Promise.all([
            loadScript(this, sheetjs  )
        ]).then(() => {
            XLS = XLSX
        })
    }
}