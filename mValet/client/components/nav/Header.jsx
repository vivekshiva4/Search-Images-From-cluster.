import React from 'react'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            test : "false"
        }
    }

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        };
    }

    componentWillMount() {
    }

    render(){
        let thisInstance = this
        let props = this.props
        let state = this.state
        return(<div>
            <nav className="navbar navbar-expand-sm bg-light navbar-light fixed-top">
                <input className="form-control mr-sm-2" type="file" placeholder="Ex Earth,Test"/>
                    <button className="btn btn-primary" type="submit">Search</button>
            </nav>
            </div>
        )
    }
}

export default Header