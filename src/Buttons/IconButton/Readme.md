    const UsedIcon = require('material-ui/svg-icons/action/home.js').default;
    
    <div>
        <IconButton icon={<UsedIcon/>}/>
        <IconButton 
            icon={<UsedIcon/>} 
            badged={true} 
            badgeProps={{
                badgeContent: '5',
                secondary: true,
                badgeStyle: {
                    top: '16px',
                    right: '16px'
                }
            }}
        />
        <IconButton icon={<UsedIcon/>} muiProps={{
            iconStyle: {
                width: '48px',
                height: '48px'
            },
            style: {
                width: '96px',
                height: '96px',
                padding: '24px'
            }
        }}/>
        <IconButton 
            icon={<UsedIcon/>} 
            badged={true} 
            badgeProps={{
                badgeContent: '10',
                secondary: true,
                badgeStyle: {
                    top: '24px',
                    right: '24px',
                    width: '36px',
                    height: '36px',
                    fontSize: '16px'
                }
            }}
            muiProps={{
                iconStyle: {
                    width: '48px',
                    height: '48px'
                },
                style: {
                    width: '96px',
                    height: '96px',
                    padding: '24px'
                }
            }}
        />
        <br/><br/>
    </div>
