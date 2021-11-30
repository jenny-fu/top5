import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    
    let disabledRedo = true;
    let disabledUndo = true;
    let disabled = true;

    if(store.currentList && store.canUndo()) disabledUndo = false;
    if(store.currentList && store.canRedo()) disabledRedo = false;
    if(store.currentList) {disabled = false;}
    
    if(store.isItemEdit()) {disabledUndo = true; disabledRedo = true; disabled = true;}
    
    return (
        <div id="edit-toolbar">
            <Button 
                disabled={disabledUndo}
                id='undo-button'
                onClick={handleUndo}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button 
                disabled={disabledRedo}
                id='redo-button'
                onClick={handleRedo}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
                disabled={disabled}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;