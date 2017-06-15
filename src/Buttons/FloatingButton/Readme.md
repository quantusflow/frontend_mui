    const UsedIcon = require('material-ui/svg-icons/content/add.js').default;
    
    <div>
        <FloatingButton icon={<UsedIcon/>}/>
        <FloatingButton icon={<UsedIcon/>} muiProps={{
            mini: true
        }}/>
        <FloatingButton icon={<UsedIcon/>} muiProps={{
            secondary: true
        }}/>
        <FloatingButton icon={<UsedIcon/>} muiProps={{
            secondary: true,
            mini: true
        }}/>
        <FloatingButton icon={<UsedIcon/>} muiProps={{
            disabled: true
        }}/>
        <FloatingButton icon={<UsedIcon/>} muiProps={{
            disabled: true,
            mini: true
        }}/>
        <br/><br/>
    </div>
