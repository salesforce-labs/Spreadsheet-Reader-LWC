import { LightningElement, api } from 'lwc';

export default class DataSummary extends LightningElement {
    tableData = [];
    tableColumns = [];
    processedData = [];
    
    @api
    get jsonData() {
        return this.tableData;
    }
    set jsonData(value) {
        this.tableData = value;
        this.prepareTableData();
    }
    
    /**
     * @description: Prepare the information to display in the table
     * @author: Juan Felipe Muriel
    */
    prepareTableData() {
        if (!this.tableData || this.tableData.length === 0) return;
        
        const columnNames = Object.keys(this.tableData[0]);
        
        this.tableColumns = columnNames.map(colName => ({
            label: colName,
            fieldName: colName
        }));
        
        this.processedData = this.tableData.map((row, index) => ({
            ...row,
            id: `row_${index}`
        }));
    }
}