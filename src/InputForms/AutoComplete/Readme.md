    const filter = require('material-ui/AutoComplete').default.fuzzyFilter;
    const MenuItem = require('material-ui/MenuItem').default;
    
    const dataSource1 = ['First element', 'Second element', 'Third element'];
    const dataSource2 = [
        {
            text: 'First element',
            value: (
                <MenuItem
                    primaryText="First element"
                    secondaryText="1"
                    innerDivStyle={{color: "darkred"}}
                />
            )
        },
        {
            text: 'Second element',
            value: (
                <MenuItem
                    primaryText="Second element"
                    secondaryText="2"
                    innerDivStyle={{color: "darkorange"}}
                />
            )
        },
        {
            text: 'Third element',
            value: (
                <MenuItem
                    primaryText="Third element"
                    secondaryText="3"
                    innerDivStyle={{color: "darkgreen"}}
                />
            )
        }
    ];
    
    <div>
        <AutoComplete muiProps={{
            hintText: 'Example items',
            filter: filter,
            dataSource: dataSource1
        }}/>
        <AutoComplete muiProps={{
            hintText: 'Example items',
            hintStyle: {
                color: 'darkorange'
            },
            filter: filter,
            dataSource: dataSource2
        }}/>
        <br/><br/>
    </div>
