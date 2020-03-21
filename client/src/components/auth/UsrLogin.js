import React from 'react';
import {connect} from "react-redux"
import PropTypes from "prop-types"
import TextFieldGroup from "../common/TextFieldGroup"
import {loginUser} from "../../actions/authActions"
import "../../App.css"

class UrsLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    componentDidMount() {
        if (localStorage.getItem('userToken')) {
            window.location = "http://localhost:3000/home";
        }
    }

    onchange = ({target}) => this.setState({[target.name]: target.value});
    logIn = async (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const data = await this.props.loginUser({email, password});
        if (data.token){
            this.setState({email: "", password: ""})
            window.location = "http://localhost:3000/home";
        }
    };

    render() {
        const {email, password} = this.state;
        const {errors} = this.props;
        return (
            <div className='container-fluid row'>
                <div className=' col-lg-12'>
                    <form className="logo" onSubmit={this.logIn}>
                        <div className="UsrLogin loginDivSize mr-2">
                            <TextFieldGroup
                                placeholder="Email Address"
                                type="email"
                                name="email"
                                value={email}
                                error={errors.email}
                                onChange={this.onchange}
                            />
                        </div>
                        <div className="UsrLogin loginDivSize mr-2">
                            <TextFieldGroup
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={password}
                                error={errors.password}
                                onChange={this.onchange}
                            />
                        </div>
                        <div className=" UsrLogin loginDivSize ">
                            <button type="submit" className='btn btn-lg btn-primary'>Login</button>
                        </div>
                    </form>
                    <br/>
                </div>
            </div>
        );
    }
}

UrsLogin.protoTypes = {
    loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = ({errors, auth}) => ({errors, auth});
export default connect(mapStateToProps, {loginUser})(UrsLogin);
// 70
