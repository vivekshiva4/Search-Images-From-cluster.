import React from 'react'
import Header from '../nav/Header.jsx'
import reqwest from 'reqwest'
import {Link} from 'react-router'
class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            picData : [],
            keywordName : ""
        }
        this._getPicturesList = this._getPicturesList.bind(this);
        this._searchPictures = this._searchPictures.bind(this);
        this._handleOnChange = this._handleOnChange.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    componentWillMount() {
    }
    _handleOnChange(event) {

        console.log("name " + event.target.name)
        console.log("value " + event.target.value);

        let state = {}
        state[event.target.name] = event.target.value;
        this.setState(state)

    }

    _searchPictures(){
        if(this.state.keywordName ==null || this.state.keywordName ==""){
            this.setState({
                picData:{}
            })
        }else{
            this._getPicturesList( this.state.keywordName)
        }
    }

    _handleKeyDown (e) {
        if (e.key === 'Enter') {
            console.log('do validate');
            if(this.state.keywordName ==null || this.state.keywordName ==""){
                this.setState({
                    picData:{}
                })
            }else{
                this._getPicturesList( this.state.keywordName)
            }
        }
    }

    _getPicturesList(keywordName) {
        reqwest({
            url: global.BASE_URL + '/api/picListByKeywordSearch?keywordName=' + keywordName,
            type: 'json',
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            crossOrigin: true,
            withCredentials: false,
            error: function (error) {
                console.log("error " + error)
            },
            success: function (response) {
                if(response.status === 200) {
                    let picData = response['picInfo'];
                    this.setState({
                        picData: picData
                    })
                } else {
                    if(response.status == 404){
                        this.props.router.push('/');
                    }
                }
            }.bind(this)
        })
    }
    render() {
        let thisInstance = this
        let props = this.props
        let state = this.state
        console.log("in MediaValet HomePage")
        return (
            <div>
                <nav className="navbar navbar-expand-sm bg-light navbar-light fixed-top">
                    <input name="keywordName" className="form-control mr-sm-2" type="text" onChange={thisInstance._handleOnChange} onKeyDown={this._handleKeyDown} placeholder="Ex Earth......"/>
                    <button className="btn btn-primary" onClick={thisInstance._searchPictures}>Search</button>
                </nav>
                    <div className="container-fluid picsdiv" >
                        {function () {
                            if (state.picData.length > 0) {
                                let count =0
                                return (
                                    state.picData.map(pic => {
                                        count = count + 1
                                        const unid = "row_" + count
                                        return (
                                            <a key ={unid} href="#">
                                                <figure>
                                                    <img src={pic.url} alt=""/>
                                                    <figcaption>
                                                        {pic.title}
                                                    </figcaption>
                                                </figure>
                                            </a>
                                        )
                                    })
                                )
                            }else {
                                return (
                                    <div>
                                        <div className="finalBody">
                                            <div className="container-fluid picsdiv" >
                                                <h1 className="h1Styling">No results to display.</h1>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        }
                        ()}
                        <p className="p">Demo by vivek shiva for mediaValet assessment. <a
                            href="https://www.linkedin.com/in/vivek-shiva-2763393b"
                            target="_blank">See LinkedIn Profile</a>.</p>
                    </div>
                </div>
        )
    }
}

export default HomePage
