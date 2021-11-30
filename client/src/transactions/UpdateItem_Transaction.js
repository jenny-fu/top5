import jsTPS_Transaction from "../common/jsTPS.js"

/**
 * UpdateItem_Transaction
 * 
 * This class represents a transaction that updates the text
 * for a given item. It will be managed by the transaction stack.
    
    @author McKilla Gorilla
 */
export default class UpdateItem_Transaction extends jsTPS_Transaction {
    constructor(initStore, id, initOld, initNew) {
        super();
        this.store = initStore;
        this.id = id
        this.oldItem = initOld;
        this.newItem = initNew;
    }

    doTransaction() {
        this.store.updateItems(this.id, this.newItem);
    }
    
    undoTransaction() {
        this.store.updateItems(this.id, this.oldItem);
    }
}