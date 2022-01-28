// Importing Required Libraries and Components

import React from "react";
import SocialLogin from "react-social-login";
import { Button } from 'react-bootstrap';

// Class Component for Socail Button

class SocialButton extends React.Component {

    // Rendering Web Page

    render() {
        const { children, triggerLogin, ...props } = this.props;
        return (
            <Button onClick={triggerLogin} {...props} style={{ width: '100%' }}>
                {children}
            </Button>
        );
    }
}

// Exporting class Component

export default SocialLogin(SocialButton)