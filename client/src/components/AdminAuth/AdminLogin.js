import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoginAdmin} from '../../actions/authActions';
import TextFieldGroup from "../common/TextFieldGroup";
import '../../Styles/AdminPanel.css';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) this.props.history.push('/AdminControls');
    }

    componentWillReceiveProps({auth}) {
        if (auth.isAuthenticated) this.props.history.push('/AdminControls');
    }

    onchange = ({target}) => {
        this.setState({
            [target.name]: target.value
        });
    };

    onSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        await this.props.LoginAdmin({email, password});
    };

    render() {
        const {email, password} = this.state;
        const {errors} = this.props;
        return (
            <div className='container-fluid'>
                <div className="row">
                    <div className=' offset-lg-3 col-lg-6 AdminPanelSection '>
                        <h3>Admin Panel</h3>
                        <hr/>
                        <form onSubmit={this.onSubmit} className="form-group">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <TextFieldGroup
                                    placeholder="Email Address" className="form-control"
                                    type="email" error={errors.email} name="email"
                                     value={email} onChange={this.onchange}
                                />
                            </div>
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <TextFieldGroup
                                placeholder="Password" className="form-control"
                                type="password" name="password"  error={errors.password}
                                value={password} onChange={this.onchange}
                            />
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

AdminLogin.propTypes = {
    LoginAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {LoginAdmin})(AdminLogin);
