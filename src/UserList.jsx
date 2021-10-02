import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import Pagination from './Pagination';
import './App.css';

function UserList() {
    const [userList, setUserList] = useState([]);
    const [userListBkp, setUserListBkp] = useState([]);
    const [name, setName] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(4);


    const handleInput = (e)=>{
        setName(e.target.value);

        let newListClone = [...userListBkp]
        if(!!e.target.value){

            const newList = newListClone.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
            setUserList(getSortedData(newList));
        }else{
            setUserList(getSortedData(newListClone));
        }
       
    }
 
    const getSortedData = (list)=>{ 
        let userTrue = list.filter((u)=>u.isFavorite ==true);
        let userFalse = list.filter((u)=>u.isFavorite ==false);

        return [...userTrue, ...userFalse];
    }
    const pushDataToUsers =(e)=>{
        if (e.which == 13 || e.keyCode == 13) {
       if(name.trim()==''){
           window.alert("Please Enter name");
           return false;
       }
        const obj ={
            id: Math.random(),
            name: name,
            isFavorite: false,
        }
        const newUserList = [...userListBkp, {...obj} ];
        setUserList(getSortedData(newUserList));
        setUserListBkp(newUserList);
        setName('');
    }
    }

    const setIsFavorite = (id)=>{
        const newList = userList.map((item) => {
            if (item.id === id) {
              const updatedItem = {
                ...item,
                isFavorite: !item.isFavorite,
              };
       
              return updatedItem;
            }
       
            return item;
          });

        setUserList(getSortedData(newList));
    }

    const deleteUser = (id)=>{
        if(window.confirm("Do you want to delete?")){
            const newList = userList.filter((item) => item.id !==id);
            setUserList(getSortedData(newList));
            setUserListBkp(newList);
        }
       
    }

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = userList.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="userlist">
        <div className="friend-list">
                <ul>
                <li className="title-li">
                    <span className="title">Friends List</span></li>
                <li className="input-field-li">
                    <input name="add name" className="input-field" 
                    placeholder="Enter your friend's name" 
                    onChange={handleInput}
                    value={name}
                    onKeyPress={pushDataToUsers}>
                        </input></li>

                        {currentPosts.map((u)=>{
                            return (
                                <li className="user-li">
                                    <div className="userDetails">
                                        <div className="userDetails-name-div">
                                        <span className="userDetails-name">{u.name}</span><br/>
                                        <span className="userDetails-info">is your friend</span>
                                        </div>
                                        <div className="userDetails-f-d-div">
                                            {u.isFavorite ? 
                                            <span className="star-icon" onClick={()=>setIsFavorite(u.id)}>&#9733;</span> :
                                            <span className="star-icon" onClick={()=>setIsFavorite(u.id)}>&#9734;</span>}

                                <i style={{fontSize:'24px'}} className="fa star-icon" 
                                onClick={()=>deleteUser(u.id)}>&#xf014;</i>
                                    
                                        </div>
                                          
                                    </div>
                               
                                </li>
                            )
                        })}
                </ul>
        </div>
        <Pagination
        postsPerPage={postPerPage}
        totalPosts={userList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default UserList;
