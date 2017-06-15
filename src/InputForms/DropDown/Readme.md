    const MenuItem = require('material-ui/MenuItem').default;
    
    <div>
        <DropDown initialValue={2} muiProps={{
            maxHeight: 150
        }}>
            <MenuItem value={1} primaryText="First element" />
            <MenuItem value={2} primaryText="Second element" />
            <MenuItem value={3} primaryText="Third element" />
            <MenuItem value={4} primaryText="Fourth element" />
            <MenuItem value={5} primaryText="Fifth element" />
            <MenuItem value={6} primaryText="Sixth element" />
            <MenuItem value={7} primaryText="Seventh element" />
            <MenuItem value={8} primaryText="Eighth element" />
            <MenuItem value={9} primaryText="Ninth element" />
            <MenuItem value={10} primaryText="Tenth element" />
        </DropDown>
        <br/><br/>
    </div>
