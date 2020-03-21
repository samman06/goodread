import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {registerUser} from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class UsrSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '', lastName: '',
            email: '', password: '',
            password2: '', photo: '',
        };
    }

    onchange = ({target}) => this.setState({[target.name]: target.value});

    signUp = async (e) => {
        e.preventDefault();
        const {firstName, lastName, email, password, password2, photo} = this.state;
        const userData = {firstName, lastName, email, password, password2, photo};
        const {user} = await this.props.registerUser(userData);
        if (user) this.setState({firstName: "", lastName: "", email: "", password: "", password2: ""});
    };

    render() {
        const {firstName, lastName, email, password, password2} = this.state;
        const {errors} = this.props;
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 '>
                        <h4>Dont Have an Account ? Create one</h4>
                        <hr/>
                        <form onSubmit={this.signUp}>
                            <TextFieldGroup
                                type="name" name="firstName" placeholder="First name" error={errors.firstName}
                                value={firstName} pattern='[A-Za-z\\s]*' onChange={this.onchange}
                            />
                            <TextFieldGroup
                                type="name" name="lastName" placeholder="Last name" error={errors.lastName}
                                value={lastName} pattern='[A-Za-z\\s]*' onChange={this.onchange}
                            />
                            <TextFieldGroup
                                type="email" name="email" placeholder="E-mail" error={errors.email}
                                value={email} onChange={this.onchange}
                            />
                            <TextFieldGroup
                                type="password" name="password" placeholder="password " error={errors.password}
                                value={password} onChange={this.onchange}
                            />
                            <TextFieldGroup
                                type="password" name="password2" placeholder="reenter your password"
                                value={password2} onChange={this.onchange} error={errors.password2}
                            />
                            <button type="submit" className="btn btn-lg btn-primary"> Sign up</button>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

UsrSignUp.protoTypes = {
    registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({errors}) => ({errors});
export default connect(mapStateToProps, {registerUser})(UsrSignUp);
// 137
