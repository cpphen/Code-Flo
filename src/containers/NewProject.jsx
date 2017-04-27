// // Create Your Project Team
// -Enter Project Name
// -Enter Project Description
// -Add Project Tags (Tech stack, techonologies, industry, etc)
//

// if 1) Submit (update Team data for User model)

// else if 2) Add Members
//
// 1: Submit Team to Database (1 member -- curentUser), redirect to Project Home
// 2: Populate field with users -- linkedin/githubFinder style, searchable by username;
//   - Invite to Project
//
//
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
