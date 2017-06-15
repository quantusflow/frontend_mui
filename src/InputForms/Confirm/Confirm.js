import React, { PropTypes, Component } from 'react';

import { RaisedButton } from '../../';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based text field
 */
class Confirm extends Component {
    static propTypes = {
        /**
         * Applies a given MaterialUI theme.
         */
        theme: PropTypes.object,
        /**
         * Forwarded to wrapper component.
         */
        qflProps: PropTypes.object,
        /**
         * Setup of the shown choosable buttons.
         */
        layout: PropTypes.array,
        /**
         * Message shown above confirmation.
         */
        message: PropTypes.string
    };

    constructor() {
        super();

        this.state = {
            confirmData: {}
        }
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(this.props.theme)
        };
    }

    handleConfirm(key) {
        if (this.props.onChoose) {
            this.props.onChoose(key);
        }
    }

    render() {
        const { qflProps } = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'Confirm'
        });

        const { layout } = this.props;

        const resultingButtons = layout.map((element, elementIdx) => (
            <RaisedButton
                key={element.key}
                theme={element.theme}
                muiProps={{
                    label: element.label,
                    primary: true,
                    ...element.muiProps
                }}
                qflProps={{
                    onClick: (e) => {
                        this.handleConfirm(element.key);
                    }
                }}
            />
        ));

        return (
            <div {...qflProps}>
                <p>{this.props.message}</p>
                {resultingButtons}
            </div>
        );
    }
}

Confirm.childContextTypes = {
    muiTheme: React.PropTypes.object
};

Confirm.defaultProps = {
    theme: 'Default',
    qflProps: {}
};

export default Confirm;
