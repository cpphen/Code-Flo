import React, { Component } from 'react';
import Register from './Register.jsx';
import LoginModal from '../components/LoginModal.jsx';
// import regisCont from './registerCont.jsx';




class Home extends Component {
	render() {

        // let random = null;

        return (
        <div>

                {
                    this.props.isLoggedInCheck || this.props.isLoggedInReg

                    ?
										<div className="jumbotron home">
											<h1 className="homeBanner">Login Success!</h1>
										</div>

                    :
										<div className="jumbotron home">
											<h1 className="homeBanner">Welcome!</h1>

                    <Register
                        open={this.props.openModal}
                        close={this.props.closeModal}
                        show={this.props.showModal}
                        create={this.props.createUser}
                        regErr={this.props.errorMsgs}
                    />

                    <LoginModal
                        open={this.props.openModalL}
                        close={this.props.closeModalL}
                        show={this.props.loginModal}
                        logg={this.props.login}
                    />
                    </div>
                }




        </div>

    );
  }

};


export default Home;
