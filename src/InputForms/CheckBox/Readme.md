    const CheckedIcon = require('material-ui/svg-icons/action/favorite.js').default;
    const UncheckedIcon = require('material-ui/svg-icons/action/favorite-border.js').default;
        
    <div>
        <CheckBox muiProps={{
            label: 'Simple'
        }}/><br/>
        <CheckBox muiProps={{
            disabled: true,
            label: 'Simple (disabled)'
        }}/><br/>
        <CheckBox muiProps={{
            checkedIcon: <CheckedIcon/>,
            uncheckedIcon: <UncheckedIcon/>,
            label: 'Custom icon'
        }}/>
        <br/><br/>
    </div>
    