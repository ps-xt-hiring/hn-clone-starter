import React from 'react'
import { HeaderSection, Logo } from '../Styled'


const Header = (props) => {
    return (
        <HeaderSection className="App-header">
            <Logo src={require('../../Assets/y18.gif')} />
        </HeaderSection>
    )
}

export default Header
