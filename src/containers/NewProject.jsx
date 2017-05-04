import React, { Component } from 'react';
import ProjectList from '../components/forms/ProjectList.jsx';


class NewProject extends Component {
	render(){
	   return(
			 <div className='container'>
				<ProjectList {...this.props}/>
			</div>
	   )
   }
}

export default NewProject;