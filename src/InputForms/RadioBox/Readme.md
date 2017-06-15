    const RadioButton = require('material-ui/RadioButton').default;
    const CheckedIcon = require('material-ui/svg-icons/action/favorite.js').default;
    const UncheckedIcon = require('material-ui/svg-icons/action/favorite-border.js').default;
            
    <div>
        <RadioBox muiProps={{
            name: 'shipSpeed',
            defaultSelected: 'second'
        }}>
            <RadioButton value="first" label="Simple first"/>
            <RadioButton value="second" label="Simple second"/>
            <RadioButton 
                value="third" 
                label="Custom third" 
                checkedIcon={<CheckedIcon/>}
                uncheckedIcon={<UncheckedIcon/>}
            />
            <RadioButton disabled value="fourth" label="Simple fourth (disabled)"/>
        </RadioBox>  
        <br/><br/>
    </div>