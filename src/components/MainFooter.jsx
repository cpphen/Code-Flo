import React from 'react';
import { Link } from 'react-router';

class MainFooter extends React.Component {

  render() {

    return(
      <footer className='Footer'>
        <ul className="Footer-links">
          <li>
            <a target='_blank' href="https://github.com/henhen87/Code-Flo">|  Github Repository   |</a>
          </li>
          <li>
            <a target='_blank' href="https://github.com/henhen87">|   Henry Github | </a>
          </li>
          <li>
            <a target='_blank' href="https://www.linkedin.com/in/henry-lee-77170b78/">|   Henry LinkedIn  | </a>
          </li>
          <li><h4>CodeFlo&copy; 2017</h4></li>
        </ul>
      </footer>
    )
  }
};


export default MainFooter;