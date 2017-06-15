    const ToolbarGroup = require('material-ui/Toolbar/ToolbarGroup').default;
    
    <div>
        <ToolBar>
            <ToolbarGroup firstChild={true} style={{
                float: "left"
            }}>
                A
            </ToolbarGroup>
            
            <ToolbarGroup lastChild={true} style={{
                float: "right"
            }}>
                B
            </ToolbarGroup>   
        </ToolBar>
    </div>
