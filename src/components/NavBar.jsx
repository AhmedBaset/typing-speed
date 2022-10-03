import React from 'react'

function NavBar() {
   return (
      <nav className="bg-primary clr-white">
         <div className="container p-y-1">
            <span className="nav-log fs-150 fw-700">GoTyping</span>
            <div className="nav-icon"></div>
            <ul className="nav-list">
               <li>1</li>
               <li>2</li>
               <li>3</li>
               <li>4</li>
               <li>5</li>
            </ul>
         </div>
      </nav>
   )
}

export default NavBar