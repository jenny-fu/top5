import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    let { index } = props;
    const [text, setText] = useState(store.currentList.items[index]);

    function handleSetText(e){
        setText(e.target.value);
    }
    function handleItem(){
        props.updateItems(index, text);
    }

    return (
        <ListItem
            id={'item-' + (index + 1)}
            // key={props.key}
            sx={{ display: 'flex'}}
            style={{
                height: '20%',
                width: '100%',
            }}
            >
                <TextField 
                    style={{
                        width : '100%', 
                        backgroundColor:'goldenrod', 
                        borderRadius:'10px', 
                        border: 'solid 1px', 
                    }}
                    inputProps={{ style: { height: "89%", fontSize: '20px' } }}
                    id="name"
                    name="name"
                    value={text}
                    onChange={handleSetText}
                    onBlur={handleItem}
                />
        </ListItem>
    );
}

export default Top5Item;