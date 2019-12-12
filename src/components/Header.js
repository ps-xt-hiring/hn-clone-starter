import React from 'react'
import {Headers,Headeritem} from '../styles/StoryStyles'
import {StaticText} from '../constant/StaticText'

const Header=()=>

<Headers>
<Headeritem><a href="#home">{StaticText.top}</a></Headeritem>
<Headeritem><a href="#home">{StaticText.new}</a></Headeritem>
</Headers>

export default Header;